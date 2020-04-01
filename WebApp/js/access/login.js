$(document).ready(function(){
	$("#login-form").submit(function( event ) {
	    userLogin(event, $(this).serializeArray())
	  });
})
function userLogin(event, values) {
    var data = {
      email: values[0].value,
      password: values[1].value
    }
    this.url = 'http://137.82.155.92:8090/admin/login'
    //this.url = 'http://localhost:8090/admin/login'
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
          console.log("logged in");
          var response = JSON.parse(xhttp.responseText);
          setCookie("accessToken", response.accessToken, 2)
          setCookie("refreshToken", response.refreshToken, 2);
          console.log(response)
          window.location.href = 'index.html'
        }
        else {
          if (xhttp.readyState == 4) {
            console.log("failed")
            alert(xhttp.responseText);

          }
        }
    }
    xhttp.open('POST', this.url, true);
    xhttp.setRequestHeader('Content-Type', "application/json")
    xhttp.send(JSON.stringify(data));
    event.preventDefault();
}