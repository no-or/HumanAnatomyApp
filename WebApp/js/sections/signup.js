
function buildSignupMenu(section){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".category-area").append('<div class="anatomy-section"></div>');
    $(".anatomy-section").append('<div class="management-area"/>');
   	$(".management-area").append('<div class="question-content"</div>')
	$(".question-content").prepend('<form class="question-display"></form>')
	$(".question-display").append('<label for="code">Code</label><textarea id="code" name="code" placeholder="Enter your Secret Code" rows="1"></textarea>') 
	$(".question-display").append('<label for="yourName">Your Name (First and Last)</label><textarea id="yourName" name="yourName" placeholder="Enter your name" rows="1"></textarea>')  
	$(".question-display").append('<label for="password">New Password</label><textarea id="password" name="password" placeholder="Enter your password" rows="3"></textarea>')
	$(".question-display").append('<label for="email">Your Email</label><textarea id="email" name="email" placeholder="Enter your email" rows="3"></textarea>')
	$(".management-area").append('<div class="options-panel"></div>')
	$(".options-panel").append('<button onclick="makeNewAdmin()">Submit Admin</button>')   
};

function makeNewAdmin(){
	if($("#code").val() == ""){
		alert("Please fill in code field");
		return;
	}


	if($("#yourName").val() == ""){
		alert("Please fill in Your name field");
		return;
	}

	if($("#password").val() == ""){
		alert("Please fill in your password field");
		return;
	}

	if($("#email").val() == ""){
		alert("Please fill in your email");
		return;
	}
	var data = {};
	data.code = $("#code").val();
	data.code = data.code.replace(/(\r\n|\n|\r)/gm, "");
	data.code = data.code.trim();

	var token = getCookie("accessToken");
	if(!token){
		alert("login again")
	}
	data.authorizedBy = parseJwt(token);
	data.name = $("#yourName").val();
	data.password = $("#password").val();
	data.email = $("#email").val();
	url = website + '/code/compare';
	ajaxPost(url, data, function(result) {
		alert("success")
		$("#signup").trigger("click")
	}, function(error){
		console.log(error)
		alert("failed to add admin, double check Both names have at least first and last names\n error: " + error)
	}, 1)
}