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
    var url = 'http://localhost:8080/admin/login'
    var onSuccess = function() {window.location.href = 'index.html';}
    var onFailure = function (response) {alert(response)};
    ajaxPost(url, data, onSuccess, onFailure);
    event.preventDefault();
}