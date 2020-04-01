
/**
 * @desc Ajax call for deleting content
 * @param url - website url 
 * @param onSuccess - callback for a successful deletion
 * @param onError - callback for a failed deletion
 * @param tryNumber - number of attempts to delete content, used for authentication synchronization. Set to 1 when calling.
*/

var ajaxDelete = function (url, onSuccess, onError, tryNumber){
  this.url = url;
  this.onSuccess = onSuccess;
  this.onError = onError;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            onSuccess(xhttp.responseText);            
        }
        else {
            if(tryNumber == 2) {
                onError(xhttp.responseText);
            } else if(xhttp.readyState == 4){
                updateAccessToken()
                ajaxDelete(this.url, this.onSuccess, this.onError, 2)
            }
        }
    }


    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('DELETE', this.url, true);
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
    this.url = url;
    this.onSuccess = onSuccess;
    this.onError = onError;
    var retError = onError;
    this.data = data;

    var xhttp1 = new XMLHttpRequest();
    //xhttp.timeout = 5000;
    var i = 0;

    xhttp1.onreadystatechange = function() {
        if(xhttp1.readyState == 4 && xhttp1.status == 200) {
            onSuccess(xhttp1.responseText);
        }
        else {
            if(tryNumber == 2) {
                onError(xhttp1.responseText);
            } else if(this.readyState == XMLHttpRequest.DONE){
                updateAccessToken(function(){
                    console.log("posting from inside post");
                    ajaxPost(this.url, this.data, this.onSuccess, retError, 2)
                });
            }
        }
    }

    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp1.open('POST', this.url, true);
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
    this.url = url;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.file = file;

    var formdata = new FormData();
    formdata.append('image', this.file);
    var xhttp = new XMLHttpRequest();
    //xhttp.timeout = 5000;
    var i = 0;

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            onSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if(tryNumber == 2) {
                onError(xhttp.responseText);
            } else if(xhttp.readyState == 4){
                updateAccessToken(function(){
                    ajaxPostImage(url, file, onSuccess, onError, 2);
                });
            }
        }
    }


    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('POST', this.url, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.send(formdata);
    }

}

var ajaxGet = function (url, onSuccess, onError) {
    this.url = url;
    this.onSuccess = onSuccess;
    this.onError = onError;
    var i = 0

    var xhttp = new XMLHttpRequest();
    xhttp.timeout = 5000;
    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log("response: ");
            console.log(typeof(JSON.parse(xhttp.responseText)));
            onSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if (i > 2) {
                console.log("error: ");
                console.log(xhttp.responseText);
                if(this.status == 404){
                  var obj = [];
                  onSuccess(obj);
                }else{
                  onError(xhttp.responseText);
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
        onError(xhttp.responseText);
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}

var ajaxGetAuth = function (url, onSuccess, onError, tryNumber) {
    this.url = url;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.tryNumber = tryNumber
    var i = 0

    var xhttp = new XMLHttpRequest();
    xhttp.timeout = 5000;
    xhttp.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log("response: ");
            console.log(typeof(JSON.parse(xhttp.responseText)));
            onSuccess(JSON.parse(xhttp.responseText));
        }
        else {
            if (i > 2) {
                console.log("error: ");
                console.log(xhttp.responseText);
                if(this.status == 404){
                  var obj = [];
                  onSuccess(obj);
                }else{
                    if(tryNumber == 2) {
                        onError(xhttp.responseText);
                    } else if(this.readyState == XMLHttpRequest.DONE){
                        updateAccessToken();
                        ajaxGetAuth(this.url, this.onSuccess, this.onError, 2);
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
        onError(xhttp.responseText);
    }

    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open("GET", url, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.send();
    }
}



var updateAccessToken = function(onSuccess) {
    this.onSuccess = onSuccess;
    var refreshToken = getCookie("refreshToken");
    if(refreshToken){
        var body = {};
        body.refreshToken = refreshToken;
        this.url = website + "/admin/refreshToken";
        var i = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.timeout = 5000;
        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                if(response.accessToken){
                    //console.log("new token: " + response.accessToken)
                    setCookie("accessToken", response.accessToken);
                    if(onSuccess){
                        onSuccess()
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
        xhttp.open("POST", this.url, true);
        xhttp.setRequestHeader('Content-Type', "application/json")
        console.log(JSON.stringify(body));
        xhttp.send(JSON.stringify(body));

    } else{
        window.location.href = 'login.html'
    }
}


var ajaxPut = function (url, data, onSuccess, onError, tryNumber){
    this.url = url;
    this.onSuccess = onSuccess;
    this.onError = onError;
    this.data = data;

    var xhttp = new XMLHttpRequest();
    //xhttp.timeout = 5000;
    var i = 0;

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            onSuccess(xhttp.responseText);
        }
        else {
          if(tryNumber == 2) {
                onError(xhttp.responseText);
            } else if(xhttp.readyState == 4){
                updateAccessToken()
                ajaxPut(this.url, this.data, this.onSuccess, this.onError, 2)
            }
        }
    }

    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        window.location.href = 'login.html'
    }else{
        xhttp.open('PUT', this.url, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send(JSON.stringify(data));
    }

}

var updateVersion = function(mod, region) {
    data = {};

    url = website + '/version?module=' + mod + "&subRegion=" + region;
    ajaxGet(url, function(result) {
        data = {};
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