
/**
 * @desc Ajax call for deleting content
 * @param url - website url 
 * @param onSuccess - callback for a successful deletion
 * @param onError - callback for a failed deletion
 * @param tryNumber - number of attempts to delete content, used for authentication synchronization. Set to 1 when calling.
*/

var ajaxDelete = function (url, onSuccess, onError, tryNumber){
    var newUrl = url;
    var newOnSuccess = onSuccess;
    var newOnError = onError;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            newOnSuccess(xhttp.responseText);            
        }
        else {
            if(tryNumber == 2) {
                if(xhttp.readyState == XMLHttpRequest.DONE)
                newOnError(xhttp.responseText);
            } else if(xhttp.readyState == XMLHttpRequest.DONE){
                updateAccessToken(function(){
                    ajaxDelete(newUrl, newOnSuccess, newOnError, 2)
                })
            }
        }
    }


    var token = getCookie("accessToken")
    var name = parseJwt(token);
    var data = {}
    if(name){
        data.authorizedBy = name;
    }
    var accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('DELETE', newUrl, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send(JSON.stringify(data));
    }
}

/**
 * @desc Ajax call for posting content
 * @param url - website url 
 * @param data - data being added to the database
 * @param onSuccess - callback for a successful post
 * @param onError - callback for a failed post
 * @param tryNumber - number of attempts to post content, used for authentication synchronization. Set to 1 when calling.
*/
var ajaxPost = function (url, data, onSuccess, onError, tryNumber){
    var newUrl = url;
    var newData = data;
    var newOnSuccess = onSuccess;
    var newOnError = onError;
    
    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function() {
        if(xhttp1.readyState == 4 && xhttp1.status == 200) {
            newOnSuccess(xhttp1.responseText);
        }
        else {
            if(tryNumber == 2) { 
                if(xhttp1.readyState == XMLHttpRequest.DONE){
                    newOnError(xhttp1.responseText);
                }
            } else if(xhttp1.readyState == XMLHttpRequest.DONE){
                updateAccessToken(function(){
                    ajaxPost(newUrl, newData, newOnSuccess, newOnError, 2)
                });
            }
        }
    }

    var token = getCookie("accessToken")
    var accessToken = 'Bearer ' + token
    if(!data.authorizedBy){
        var name = parseJwt(token);
        if(name){
            data.authorizedBy = name;
        }
    }
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp1.open('POST', newUrl, true);
        xhttp1.setRequestHeader('Authorization', accessToken);
        xhttp1.setRequestHeader('Content-Type', "application/json")
        xhttp1.send(JSON.stringify(data));
    }

}

/**
 * @desc Ajax call for posting images
 * @param url - website url 
 * @param file - file for the image to be uploaded
 * @param onSuccess - callback for a successful post
 * @param onError - callback for a failed post
 * @param tryNumber - number of attempts to post content, used for authentication synchronization. Set to 1 when calling.
*/
var ajaxPostImage = function (url, file, onSuccess, onError, tryNumber){
    var newUrl = url;
    var newFile = file;
    var newOnSuccess = onSuccess;
    var newOnError = onError;

    var formdata = new FormData();
    formdata.append('image', newFile);
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            newOnSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if(tryNumber == 2) {
                if(xhttp.readyState == 4){
                    newOnError(xhttp.responseText);
                }
            } else if(xhttp.readyState == 4){
                updateAccessToken(function(){
                    ajaxPostImage(newUrl, newFile, newOnSuccess, newOnError, 2);
                });
            }
        }
    }


    var token = getCookie("accessToken")
    var accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('POST', newUrl, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.send(formdata);
    }

}


/**
 * @desc Ajax call for getting content
 * @param url - website url 
 * @param onSuccess - callback for a successful post
 * @param onError - callback for a failed post
*/
var ajaxGet = function (url, onSuccess, onError) {
    var newUrl = url;
    var newOnSuccess = onSuccess;
    var newOnError = onError;
    var i = 0

    var xhttp = new XMLHttpRequest();
    xhttp.timeout = 5000;
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            newOnSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if (i > 2) {
                if(xhttp.status == 404){
                    var obj = [];
                    newOnSuccess(obj);
                }else{
                    newOnError(xhttp.responseText);
                }
                i = 0;
            }else{
                i++;
            }
        }
    }
    xhttp.ontimeout = function (e) {
        newOnError(e);
    }
    xhttp.open("GET", newUrl, true);
    xhttp.send();
}


/**
 * @desc Ajax call for getting content requiring authentication
 * @param url - website url 
 * @param onSuccess - callback for a successful post
 * @param onError - callback for a failed post
 * @param tryNumber - number of attempts to post content, used for authentication synchronization. Set to 1 when calling.
*/
var ajaxGetAuth = function (url, onSuccess, onError, tryNumber) {
    var newUrl = url;
    var newOnSuccess = onSuccess;
    var newOnError = onError;
    var i = 0

    var xhttp = new XMLHttpRequest();
    xhttp.timeout = 5000;
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            newOnSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if (i > 2) {
                if(xhttp.status == 404){
                  var obj = [];
                  newOnSuccess(obj);
                }else{
                    if(tryNumber == 2) {
                        if(xhttp.readyState == XMLHttpRequest.DONE){
                            newOnError(xhttp.responseText);
                        }
                    } else if(xhttp.readyState == XMLHttpRequest.DONE){
                        updateAccessToken(function() {
                            ajaxGetAuth(newUrl, newOnSuccess, newOnError, 2);
                        });
                    }
                }
                i = 0;
            }else{
              i++;
            }
        }
    }
    xhttp.ontimeout = function (e) {
        newOnError(e);
    }

    var token = getCookie("accessToken")
    var accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open("GET", newUrl, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.send();
    }
}


/**
 * @desc Gets a new accessToken to continue using the web portal
 * @param onSuccess - function to call once the accessToken is refreshed, used
 *                    to redo ajax call with new token
*/
var updateAccessToken = function(onSuccess) {
    var newOnSuccess = onSuccess;
    var refreshToken = getCookie("refreshToken");
    if(refreshToken){
        var body = {};
        body.refreshToken = refreshToken;
        var newUrl = website + "/admin/refreshToken";
        var i = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.timeout = 5000;
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                if(response.accessToken){
                    setCookie("accessToken", response.accessToken);
                    if(newOnSuccess){
                        newOnSuccess()
                    }
                }else {
                    window.location.href = 'login.html'
                }
            }
            else {
                if (i > 2) {
                    window.location.href = 'login.html'
                    i = 0;
                }else{
                  i++;
                }
            }
        }
        xhttp.open("POST", newUrl, true);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send(JSON.stringify(body));
    } else{
        window.location.href = 'login.html'
    }
}

/**
 * @desc Ajax call for updating content
 * @param url - website url 
 * @param data - updated data object
 * @param onSuccess - callback for a successful post
 * @param onError - callback for a failed post
 * @param tryNumber - number of attempts to post content, used for authentication synchronization. Set to 1 when calling.
*/
var ajaxPut = function (url, data, onSuccess, onError, tryNumber){
    var newUrl = url;
    var newData = data;
    var newOnSuccess = onSuccess;
    var newOnError = onError;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            newOnSuccess(xhttp.responseText);
        }
        else {
            if(tryNumber == 2) {
                if(xhttp.readyState == XMLHttpRequest.DONE){
                    newOnError(xhttp.responseText);
                }
            } else if(xhttp.readyState == XMLHttpRequest.DONE){
                updateAccessToken(function(){
                    ajaxPut(newUrl, newData, newOnSuccess, newOnError, 2)
                })
            }
        }
    }

    var token = getCookie("accessToken")
    var accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('PUT', newUrl, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send(JSON.stringify(newData));
    }

}


/**
 * @desc Updates the version number of content. Each region gets updated when content is modified signalling the app
 *       to download the new content if it is selected for offline capability on the users phone
 * @param mod - module that has been updated (quiz, flashcard, or explore)
 * @param region - region that has been updated (lowest level region in menu)
*/
var updateVersion = function(mod, region) {
    var data = {};
    var url = website + '/version?module=' + mod + "&subRegion=" + region;
    ajaxGet(url, function(result) {
        url = website + '/version';
        if(result[0]) {
            data.module = result[0].module;
            data.subRegion = result[0].subRegion;
            ajaxPut(url, data, function(result) {

            }, function(error) {
                alert("error updating version \nerror:" + error);
            }, 1)
        } else{
            data.module = mod;
            data.subRegion = region;
            ajaxPost(url, data, function(result) {

            }, function(error){
                alert("error updating version \nerror:" + error);
            }, 1)
        }
    }, function(error) {
        alert("error updating version \nerror:" + error);
    })
}
