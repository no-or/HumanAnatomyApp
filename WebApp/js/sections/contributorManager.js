function buildContributorMenu(section){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".category-area").append('<div class="anatomy-section"></div>');
    $(".anatomy-section").append('<div class="management-area"/>');
    $(".management-area").append('<div class="video-area1"/>');
    $(".management-area").append('<div class="video-area2"/>');
    var url = website + '/contributor';
    ajaxGet(url, function(result) {
    	var regionNumber = 0;
    	for(item in result){
            if(regionNumber % 2 == 0){
                $(".video-area1").append('<div class="videoMenu" id="videoRegion' + regionNumber + '" />')
            } else{
                $(".video-area2").append('<div class="videoMenu" id="videoRegion' + regionNumber + '" />')
            }
			$("#videoRegion" + regionNumber).append('<h3>' + result[item].name + '</h3>');
			$("#videoRegion" + regionNumber).append('<div class="video" id="video' + item + '" title="' + result[item]._id + '"/>');
			$("#video" + item).append("<h4>" + result[item].title + "</h4>");
			$("#video" + item).append('<button onclick="deleteContributor(' + item + ')">Delete Contributor</button>');
			regionNumber++;
    	}
    	$(".management-area").append('<div class="options-panel"></div>')
 		$(".options-panel").append('<button onclick="makeNewContributor()">Add New Contributor</button>')  
        $(".options-panel").append('<button onclick="goAbout()">Go to contributors page</button>')        

    }, function (error){
    	console.log(error)
    });    
};

function goAbout(){
    window.location.href = 'about.html'
}

function deleteContributor(number){
	var id = document.getElementById("video" + number).getAttribute('title');
	var url = website + "/contributor/" + id;
	ajaxDelete(url, function(result){
		alert("contributor deleted")
		$("#contributorManager").trigger("click")
	}, function(error){
		alert("contributor failed to be deleted\n error: " + error)
	}, 1)
}

function makeNewContributor() {
	$(".management-area").empty();
	$(".management-area").append('<div class="question-content"</div>')
 	$(".question-content").prepend('<form class="question-display"></form>')
 	$(".question-display").append('<label for="title">Title</label><textarea id="title" name="title" placeholder="Enter their title" rows="1"></textarea>') 
 	$(".question-display").append('<label for="name">Name</label><textarea id="name" name="name" placeholder="Enter the name of this contributor" rows="1"></textarea>')
 	$(".management-area").append('<div class="options-panel"></div>')
 	$(".options-panel").append('<button onclick="submitContributor()">Submit</button>');
    $(".options-panel").append('<button onclick="cancelContributor()">Cancel</button>');
}

function cancelContributor() {
    $("#contributorManager").trigger("click");
}
function submitContributor() {
    var data = {};
    if($("#title").val() == ""){
        alert("Please fill in title field");
        return;
    }
    if($("#name").val() == ""){
        alert("Please fill out name");
        return;
    }
    data.title = $("#title").val()
    data.name = $("#name").val()


    ajaxPost(website + "/contributor", data, function(){
        alert("contributor added correctly");
        $("#contributorManager").trigger("click")
    }, function(){
        alert("contributor failed to be added\n error: " + error)
    },1);
}