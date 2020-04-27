

/**
 * @desc sets up the Code Manager interface
 * @param section - name of the current section (Code Manager)
*/
function buildCodeMenu(section){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".category-area").append('<div class="anatomy-section"></div>');
    $(".anatomy-section").append('<div class="management-area"/>');
   	$(".management-area").append('<div class="question-content"</div>')
	$(".question-content").prepend('<form class="question-display"></form>')
	$(".question-display").append('<label for="code">Code</label><textarea id="code" name="code" placeholder="Enter your Secret Code" rows="1"></textarea>') 
	$(".management-area").append('<div class="options-panel"></div>')
	$(".options-panel").append('<button onclick="makeNewCode()">Submit Code</button>')   
	$(".options-panel").append('<button onclick="deleteCodePressed()">Delete Code</button>')
};


/**
 * @desc deletes the code of the current user
*/
function deleteCodePressed() {
	var x = confirm("Are you sure you want to delete your Code?");
  		if(x){
			var data = {};
			var token = getCookie("accessToken")
			if(!token){
				window.location.href = 'login.html'
			}
			data.createdBy = parseJwt(token);
			url = website + '/code?createdBy=' + data.createdBy;
			ajaxDelete(url, function(result){
				alert("code deleted, you can now make a new one")
				$("#codeManager").trigger("click")
			}, function(error) {
				alert("There was an error deleting your code.\nerror: " + error);
			}, 1)
		}
}


/**
 * @desc sets a new code for the current user, only if they do not currently have one
*/
function makeNewCode(){
	if($("#code").val() == ""){
		alert("Please fill in code field");
		return;
	}

	if($("#authBy").val() == ""){
		alert("Please fill in authorizing field");
		return;
	}

	var data = {};
	data.code = $("#code").val();
	var token = getCookie("accessToken")
	if(!token){
		alert("login again")
	}
	data.createdBy = parseJwt(token);
	url = website + '/code/';

	ajaxPost(url, data, function(result) {
		alert("success")
		$("#codeManager").trigger("click")
	}, function(error){
		alert("failed to add code, you already have one")
	}, 1)
}