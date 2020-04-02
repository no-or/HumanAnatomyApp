
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
            onSuccess(xhttp.responseText);            
        }
        else {
            if(tryNumber == 2) {
                if(xhttp.readyState == XMLHttpRequest.DONE)
                onError(xhttp.responseText);
            } else if(xhttp.readyState == XMLHttpRequest.DONE){
                updateAccessToken(function(){
                    ajaxDelete(newUrl, newOnSuccess, newOnError, 2)
                })
            }
        }
    }


    var token = getCookie("accessToken")
    var accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('DELETE', newUrl, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send();
    }
}

/**
 * @desc Ajax call for posting content
 * @param url - website url 
 * @param onSuccess - callback for a successful post
 * @param onError - callback for a failed post
 * @param tryNumber - number of attempts to post content, used for authentication synchronization. Set to 1 when calling.
*/
var ajaxPost = function (url, data, onSuccess, onError, tryNumber){
    var newUrl = url;
    var newData = data;
    var newOnSuccess = onSuccess;
    var newOnError = onError;

    console.log("posting\n url=" + url + "\n data = " + JSON.stringify(data) + "\n tryNumber = " + tryNumber) 
    
    var xhttp1 = new XMLHttpRequest();

    xhttp1.onreadystatechange = function() {
        if(xhttp1.readyState == 4 && xhttp1.status == 200) {
            onSuccess(xhttp1.responseText);
        }
        else {
            if(tryNumber == 2) { 
                if(xhttp1.readyState == XMLHttpRequest.DONE){
                    onError(xhttp1.responseText);
                }
            } else if(xhttp1.readyState == XMLHttpRequest.DONE){
                updateAccessToken(function(){
                    console.log("posting from inside post");
                    ajaxPost(newUrl, newData, newOnSuccess, newOnError, 2)
                });
            }
        }
    }

    var token = getCookie("accessToken")
    var accessToken = 'Bearer ' + token
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
            onSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if(tryNumber == 2) {
                if(xhttp.readyState == 4){
                    onError(xhttp.responseText);
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

var ajaxGet = function (url, onSuccess, onError) {
    var newUrl = url;
    var newOnSuccess = onSuccess;
    var newOnError = onError;
    var i = 0

    var xhttp = new XMLHttpRequest();
    xhttp.timeout = 5000;
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
            console.log("response: ");
            console.log(typeof(JSON.parse(xhttp.responseText)));
            newOnSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if (i > 2) {
                console.log("error: ");
                console.log(xhttp.responseText);
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
        alert("fail")
        console.log("error: ");
        console.log("timeout");
        newOnError(xhttp.responseText);
    }
    xhttp.open("GET", newUrl, true);
    xhttp.send();
}



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
      alert("fail")
        console.log("error: ");
        console.log("timeout");
        newOnError(xhttp.responseText);
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
                    //console.log("new token: " + response.accessToken)
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
                    console.log("error: ");
                    console.log(xhttp.responseText);
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
                console.log(error);
            }, 1)
        } else{
            data.module = mod;
            data.subRegion = region;
            ajaxPost(url, data, function(result) {

            }, function(error){
                console.log(error);
            }, 1)
        }
    }, function(error) {
        console.log(error);
    })
}