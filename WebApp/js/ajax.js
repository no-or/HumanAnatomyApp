
var ajaxDelete = function (url, onSuccess, onError){
  this.url = url;
  this.onSuccess = onSuccess;
  this.onError = onError;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            onSuccess(xhttp.responseText);            
        }
        //else onError(xhttp.responseText);
    }
    xhttp.open('DELETE', this.url, true);
    xhttp.setRequestHeader('Auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMxMGMyZjUzZmZjMjFhMGEzYjNlZmYiLCJpYXQiOjE1ODAyNzc2OTl9.XZnj5CtA_rYOxDo48d_kK3l4_EkEvf91ZoeG4-0naXA');
    xhttp.setRequestHeader('Content-Type', "application/json")
    xhttp.send();
}

var ajaxPost = function (url, data, onSuccess, onError){
    this.url = url;
    this.onSuccess = onSuccess;
    this.onError = onError;

    var xhttp = new XMLHttpRequest();
    //xhttp.timeout = 5000;
    var i = 0;

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            onSuccess(xhttp.responseText);
        }
        else {
          if (xhttp.readyState == 4) {
            onError(xhttp.responseText);
          }
        }
    }
    xhttp.open('POST', this.url, true);
    xhttp.setRequestHeader('Auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTMxMGMyZjUzZmZjMjFhMGEzYjNlZmYiLCJpYXQiOjE1ODAyNzc2OTl9.XZnj5CtA_rYOxDo48d_kK3l4_EkEvf91ZoeG4-0naXA');
    xhttp.setRequestHeader('Content-Type', "application/json")
    xhttp.send(JSON.stringify(data));

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