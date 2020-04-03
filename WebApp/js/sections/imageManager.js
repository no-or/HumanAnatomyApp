

function imageLayout(image){
	console.log(image)
	$(".management-area").empty();
	$(".image-gallery").remove()
	$(".management-area").append('<div class="image-gallery"></div>')
	$(".management-area").append('<div class="options-panel"></div>')
	var region = getRegion();
	buildImageScroll(region);
	$(".options-panel").append('<button id="imageDeleteButton" onclick="deleteImage()">Delete Image</button>')
}

function deleteImage(){
	var imageID = $("#yourImage").attr("title");
	if(!imageID){
		alert("please select an image to delete");
		return;
	}
	var x = confirm("Are you sure you want to delete image id=" + imageID + "? Make sure this image isn't used in any flashcards, quizzes, or explore sections as they will show blank for students.");
  	if(x){
		ajaxDelete(website+ "/image/" + imageID, function(){
			alert("image deleted");
			if($(".subSubRegionSelected")[0]){
				$(".subSubRegionSelected").trigger("click");
			} else{
				$(".subRegionSelected").trigger("click");
			}
		}, function(error){
			alert("image was not deleted\n error: " + error);
		}, 1)
  	}
}