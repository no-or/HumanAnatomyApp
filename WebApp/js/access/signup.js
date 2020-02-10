$(document).ready(function(){
  $("#signup-form").submit(function( event ) {
    userSignup(event, $(this).serializeArray())
  });
})

function userSignup(event, values) {
  var data = {
    name: values[0].value,
    email: values[1].value,
    password: values[2].value,
  }
  var url = 'http://localhost:8080/admin/register'
  var onSuccess = function() {
    alert("Successful User Creation")
    window.location.href = 'login.html';
  }
  var onFailure = function (response) {alert(response)};
  ajaxPost(url, data, onSuccess, onFailure);
  event.preventDefault();
}