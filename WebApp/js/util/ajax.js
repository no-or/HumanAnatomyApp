
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
                updateToken()
                ajaxDelete(this.url, this.onSuccess, this.onError, 2)
            }
        }
    }


    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        console.log("login again", token);
    }else{
        xhttp.open('DELETE', this.url, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send();
    }
}

var ajaxPost = function (url, data, onSuccess, onError, tryNumber){
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
                updateToken()
                ajaxPost(this.url, this.data, this.onSuccess, this.onError, 2)
            }
        }
    }

    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        console.log("login again");
    }else{
        xhttp.open('POST', this.url, true);
        xhttp.setRequestHeader('Authorization', accessToken);
        xhttp.setRequestHeader('Content-Type', "application/json")
        xhttp.send(JSON.stringify(data));
    }

}

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
                updateToken();
                ajaxPostImage(this.url, this.file, this.onSuccess, this.onError, 2);
            }
        }
    }


    var token = getCookie("accessToken")
    accessToken = 'Bearer ' + token
    if(!(token)){
        console.log("login again");
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

var updateToken = function() {
    var refreshToken = getCookie("refreshToken");
    if(refreshToken){
        var body = {};
        body.refreshToken = refreshToken;
        this.url = "http://localhost:8090/admin/refreshToken";
        var i = 0;
        var xhttp = new XMLHttpRequest();
        xhttp.timeout = 5000;
        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(xhttp.responseText);
                if(response.accessToken){
                    setCookie("accessToken", response.accessToken);
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
        xhttp.send(JSON.stringify(body));

    } else{
        window.location.href = 'login.html'
    }
}
