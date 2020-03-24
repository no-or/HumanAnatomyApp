$(document).ready(function(){	
	$("#code-form").submit(function( event ) {
    codeToSignup(event, $(this).serializeArray())
	});
})


function codeToSignup(event, values) {
  var url = "http://137.82.155.92:8090/code";
  var onSuccess = function(response) {
    var inputCode = values[0].value;
    var dbCode = response[0].code;
    if (inputCode == dbCode) {
      window.location.href = 'signup.html';
    } else {
      alert("Invalid Secret Code")
    }
  }
  var onFailure = function (response) {alert(response)};
  ajaxGet(url, onSuccess, onFailure);
  event.preventDefault();
}