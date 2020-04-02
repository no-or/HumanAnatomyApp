

function buildVideoMenu(section, onClick){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".category-area").append('<div class="anatomy-section"></div>');
    $(".anatomy-section").append('<div class="management-area"/>');
    $(".management-area").append('<div class="video-area1"/>');
    $(".management-area").append('<div class="video-area2"/>');
    var url = website + '/video';
    ajaxGet(url, function(result) {
    	var regionList = []
    	var regionNumber = 0;
    	for(item in result){
    		var regionListIndex = regionList.indexOf(result[item].region);
    		if(regionListIndex == -1){
                if(regionNumber % 2 == 0){
                    $(".video-area1").append('<div class="videoMenu" id="videoRegion' + regionNumber + '" />')
                } else{
                    $(".video-area2").append('<div class="videoMenu" id="videoRegion' + regionNumber + '" />')
                }
    			$("#videoRegion" + regionNumber).append('<h3>' + result[item].region + '</h3>');
    			$("#videoRegion" + regionNumber).append('<div class="video" id="video' + item + '" title="' + result[item]._id + '"/>');
    			$("#video" + item).append("<h4>" + result[item].title + "</h4>");
    			$("#video" + item).append('<button onclick="deleteVideo(' + item + ')">Delete Video</button>');
    			regionList.push(result[item].region);
    			regionNumber++;
    		}else{
    			$("#videoRegion" + regionListIndex).append('<div class="video" id="video' + item + '" title="' + result[item]._id + '"/>');
    			$("#video" + item).append("<h4>" + result[item].title + "</h4>");
    			$("#video" + item).append('<button onclick="deleteVideo(' + item + ')">Delete Video</button>');
    		}
    	}
    	$(".management-area").append('<div class="options-panel"></div>')
 		$(".options-panel").append('<button onclick="makeNewVideo()">Add New Video</button>')         

    }, function (error){
    	console.log(error)
    });    
};

function deleteVideo(number){
	var id = document.getElementById("video" + number).getAttribute('title');
	var url = website + "/video/" + id;
	ajaxDelete(url, function(result){
		alert("video deleted")
		$("#videoManager").trigger("click")
	}, function(error){
		alert(error)
	}, 1)
}

function makeNewVideo() {
	$(".management-area").empty();
	$(".management-area").append('<div class="question-content"</div>')
 	$(".question-content").prepend('<form class="question-display"></form>')
 	$(".question-display").append('<label for="title">Title</label><textarea id="title" name="title" placeholder="Enter the title" rows="1"></textarea>') 
 	$(".question-display").append('<label for="url">Url</label><textarea id="url" name="url" placeholder="Enter the video url" rows="1"></textarea>')
 	$(".question-display").append('<label for="region">Region</label><textarea id="region" name="region" placeholder="Enter the region this video is for" rows="1"></textarea>')
 	$(".management-area").append('<div class="options-panel"></div>')
 	$(".options-panel").append('<button onclick="submitVideo()">Submit</button>');
    $(".options-panel").append('<button onclick="cancelVideo()">Cancel</button>');
}

function cancelVideo() {
    $("#videoManager").trigger("click");
}
function submitVideo() {
    var data = {};
    if($("#title").val() == ""){
        alert("Please fill in title field");
        return;
    }
    if($("#url").val() == ""){
        alert("Please fill out url");
        return;
    }
    if($("#region").val() == ""){
        alert("Please fill out region");
        return;
    }
    data.region = $("#region").val()
    data.link = $("#url").val();
    data.title = $("#title").val()


    ajaxPost(website + "/video", data, function(){
        alert("video added correctly");
        $("#videoManager").trigger("click")
    }, function(){
        alert("item failed to be added")
    },1);
}