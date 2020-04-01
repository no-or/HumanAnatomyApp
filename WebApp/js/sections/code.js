//code 

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
	$(".question-display").append('<label for="authBy">Your Name (First and Last)</label><textarea id="authBy" name="authBy" placeholder="Enter the name of authorizing member" rows="1"></textarea>')    
	$(".management-area").append('<div class="options-panel"></div>')
	$(".options-panel").append('<button onclick="makeNewCode()">Submit Code</button>')   
	$(".options-panel").append('<button onclick="deleteCodePressed()">Delete Code</button>')
};

function deleteCodePressed() {
	$(".management-area").empty();
	$(".management-area").append('<div class="question-content"</div>')
	$(".question-content").prepend('<form class="question-display"></form>')
	$(".question-display").append('<label for="authBy">Your name (first and last) </label><textarea id="authBy" name="authBy" placeholder="Enter your Name (first and last)" rows="1"></textarea>') 
	$(".management-area").append('<div class="options-panel"></div>')
	$(".options-panel").append('<button onclick="deleteCode()">Delete Users Code</button>')  
}

function deleteCode() {
	if($("#authBy").val() == ""){
		alert("Please fill in name field");
		return;
	}

	var data = {};
	data.createdBy = $("#authBy").val();
	url = website + '/code?createdBy=' + data.createdBy;
	ajaxDelete(url, function(result){
		alert("code deleted, you can now make a new one")
		$("#codeManager").trigger("click")
	}, function(error) {
		console.log(error);
	}, 1)
}

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
	data.createdBy = $("#authBy").val();
	url = website + '/code/';

	ajaxPost(url, data, function(result) {
		alert("success")
		$("#codeManager").trigger("click")
	}, function(error){
		console.log(error)
		alert("failed to add code, you already have one")
	}, 1)
}