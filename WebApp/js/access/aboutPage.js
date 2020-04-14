
var website = "http://137.82.155.92:8090"
//var website = "http://localhost:8090"

$(document).ready(function(){
	ajaxGet(website + "/contributor", function(contributors) {
		if(contributors == null || contributors.length == 0){
			alert("Sorry there are no contributors to show");
		} else{
			console.log(contributors);
			for(item in contributors){
				$("#contributors").append('<li>' + contributors[item].name + "  -  "  + contributors[item].title + '</li>');
			}
		}
	}, function(error){
		alert("Unable to get contributors. \n error: " + error)
	})
})