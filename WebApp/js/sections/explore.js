

/**
 * @desc sets up the Explore Lab interface
 * @param section - name of the current section (Explore Lab)
*/
function exploreLayout(explore){
    loadExploreManager();
    $(".question").remove()
    if(explore.length == 0){
        disableExploreFields();
    }else{
        for(item in explore){
            $(".questions-scroll").append('<div id="' + explore[item]._id + '" title="' + item +'" class="question">Q' + item + '</div>')
            $('#' + explore[item]._id ).unbind().click( function(){
                exploreOnclick(this, explore);
            })
            if(item == 0){
                var first = document.getElementById(explore[item]._id)
                exploreOnclick(first, explore)
            }
        }
    }
}


/**
 * @desc sets up the interface once an explore section that is selected by the user
 * @param thisElement - region menu element selected by the user
 * @param explore - object of all the explore sections in the region
*/
function exploreOnclick(thisElement, explore){
    $(".qselected").removeClass("qselected");
    $(thisElement).addClass("qselected")
    $("#title").val(explore[thisElement.title].title)
    $("#image").val(explore[thisElement.title].imageUrl)
    $("#explanation").val(explore[thisElement.title].explanation)
    $(".image-gallery").empty();
    var img = '<img src="' + explore[thisElement.title].imageUrl + '" id="yourImage"/>'
    $(".image-gallery").append(img)
    disableExploreFields();
    $(".options-panel").children().remove();
    $("#myform").remove();
    $(".options-panel").append('<button onclick="deleteExplore()">Delete Explore Section</button><button onclick="makeNewExplore()">Make New Explore Section</button>') 
}


/**
 * @desc sets up the explore manager interface for viewing content
*/
function loadExploreManager() {
    $(".management-area").empty();
    $(".image-gallery").remove()
    $(".management-area").append('<div class="question-content"</div>')
    $(".question-content").prepend('<form class="question-display"></form>')
    $(".question-display").append('<label for="title">Title</label><textarea id="title" name="title" placeholder="Enter the title" rows="1"></textarea>') 
    $(".question-display").append('<label for="explanation">Explanation</label><textarea id="explanation" name="explanation" placeholder="Enter your Explanation" rows="1"></textarea>')   
    $(".management-area").append('<div class="image-gallery"></div>')       
    $(".management-area").append('<div class="options-panel"></div>')
    $(".options-panel").append('<button onclick="deleteExplore()">Delete Explore Section</button><button onclick="makeNewExplore()">Make New Explore Section</button>')         
}


/**
 * @desc changes the interface to allow the user to make a new explore section
*/
function makeNewExplore() {
    $(".options-panel").empty();
    $(".image-gallery").empty();
    enableExploreFields();
    var region = getRegion();
    buildImageScroll(region);
    $(".options-panel").append('<button onclick="submitExplore()">Submit</button>');
    $(".question-display").append('<form id="myform"><input id="fileUploader" type="file" name="filename"></form>')
    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", handleFiles, false);
}


/**
 * @desc gets all the needed content for the new explore section and submits it to the server
*/
function submitExplore() {
    var data = {};
    if($("#title").val() == ""){
        alert("Please fill in title field");
        return;
    }
    if($("#explanation").val() == ""){
        alert("Please fill out explanation");
        return;
    }
    if($(".subSubRegionSelected")[0]){
        data.region = $(".subSubRegionSelected").attr('title');
    } else{
        data.region = $(".subRegionSelected").attr('title');
    }
    data.explanation = $("#explanation").val();
    data.title = $("#title").val()

    if(imageSelectedSource == 2){
        alert("select an image");
        return;
    }

    //image is new and being uploaded, must be added to s3 and the image manager
    if(imageSelectedSource == 1){
        var imageFile = document.forms.myform.elements.filename.files[0];
        if(!(imageFile)){
            alert("please select an image")
            return;
        }
        ajaxPostImage(website + "/image/s3", imageFile, function(link){
            var realLink = 'http://' + link.imageUrl;
            link.imageUrl = realLink;
            addExplore(data, link);
            addImage(data, link);
        }, function(error){
            alert("image failed to be added\nerror: " + error)
        }, 1);
    //images was selected from the gallery and doesn't need to be added to s3
    } else{
        var link = {};
        link.imageUrl = $("#yourImage").attr("src");
        addExplore(data, link)
    }

}


/**
 * @desc submits the new explore section to the server 
*/
function addExplore(data, link) {
    var data2 = data;
    data2.imageUrl =  link.imageUrl
    ajaxPost(website + "/explore", data2, function(){
        alert("item added correctly");

        //update the version of explore section for this region
        if($(".subSubRegionSelected")[0]){
            $(".subSubRegionSelected").trigger("click");
            updateVersion("explore", $(".subSubRegionSelected").attr("title"))
        } else{
            $(".subRegionSelected").trigger("click");
            updateVersion("explore", $(".subRegionSelected").attr("title"))
        }

    },
    function(error){
        alert("item failed to be added\n" + error)
    },1);
}


/**
 * @desc disables all the fields when viewing current explore labs
*/
function disableExploreFields(){
	$("#title").prop("readonly", true);
	$("#explanation").prop("readonly", true);
	$("#image").prop("readonly", true);
}


/**
 * @desc enables are explore fields for adding a new explore section
*/
function enableExploreFields(){
    $("#title").val("").prop("readonly", false);
	$("#explanation").val("").prop("readonly", false);
	$("#image").val("").prop("readonly", false);
}


/**
 * @desc removes the current explore section from the database
*/
function deleteExplore(){
    var id = $(".qselected").attr("id")
    if(id == undefined){
        alert("Please select an explore section to delete.")
        return;
    }
    var x = confirm("Are you sure you want to delete explore section id=" + id);
    if(x){
        ajaxDelete(website+ "/explore/" + id, function(){
            alert("Explore section deleted");

            //update the version of explore section for this region
            if($(".subSubRegionSelected")[0]){
                $(".subSubRegionSelected").trigger("click");
                updateVersion("explore", $(".subSubRegionSelected").attr("title"))
            } else{
                $(".subRegionSelected").trigger("click");
                updateVersion("explore", $(".subRegionSelected").attr("title"))
            }
            
        }, function(error){
            alert("Explore section was not deleted\n error: " + error);
        })
    }
}