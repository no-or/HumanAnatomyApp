

/**
 * @desc sets up the Flashcard interface
 * @param section - name of the current section (Flashcard)
*/
function flashcardLayout(flashcards){
    loadFlashcardManager();
    $(".question").remove()
    if(flashcards.length == 0){
        disableFlashcardFields();
    }else{
        for(item in flashcards){
            $(".questions-scroll").append('<div id="' + flashcards[item]._id + '" title="' + item +'" class="question">Q' + item + '</div>')
            $('#' + flashcards[item]._id ).click( function(){
                flashcardOnclick(this, flashcards);
            })
            if(item == 0){
                var first = document.getElementById(flashcards[item]._id)
                flashcardOnclick(first, flashcards)
            }
        }
    }
}


/**
 * @desc sets up the interface once a flashcard section that is selected by the user
 * @param thisElement - region menu element selected by the user
 * @param flashcards - object of all the flashcards in the selected region
*/
function flashcardOnclick(thisElement, flashcards){
    $(".qselected").removeClass("qselected");
    $(thisElement).addClass("qselected")
    $("#question").val(flashcards[thisElement.title].question)
    $("#answer").val(flashcards[thisElement.title].answer)
    $("#image").val(flashcards[thisElement.title].imageUrl)
    $(".image-gallery").empty();
    var img = '<img src="' + flashcards[thisElement.title].imageUrl + '" id="yourImage"/>'
    $(".image-gallery").append(img)
    disableFlashcardFields();
    $(".options-panel").children().remove();
    $(".options-panel").append('<button onclick="deleteFlashcard()">Delete Flashcard</button><button onclick="makeNewFlashcard()">Make New Flashcard</button>') 
}


/**
 * @desc sets up the flashcard interface for viewing content
*/
function loadFlashcardManager() {
    $(".management-area").empty();
    $(".image-gallery").remove()
    $(".management-area").append('<div class="question-content"</div>')
    $(".question-content").prepend('<form class="question-display"></form>')
    $(".question-display").append('<label for="question">Question</label><textarea id="question" name="question" placeholder="Enter your question" rows="1"></textarea>') 
    $(".question-display").append('<label for="answer">Answer</label><textarea id="answer" name="answer" placeholder="Enter your Answer" rows="1"></textarea>')  
    $(".management-area").append('<div class="image-gallery"></div>')
    $(".management-area").append('<div class="options-panel"></div>')
    $(".options-panel").append('<button onclick="deleteFlashcard()">Delete Flashcard</button><button onclick="makeNewFlashcard()">Make New Flashcard</button>')         
}


/**
 * @desc changes the interface to allow the user to make a flashcard
*/
function makeNewFlashcard() {
    $(".options-panel").empty();
    $(".image-gallery").empty();
    enableFlashcardFields();
    var region = getRegion();
    buildImageScroll(region);
    $(".options-panel").append('<button onclick="submitFlashcard()">Submit</button>');
    $(".question-display").append('<form id="myform"><input id="fileUploader" type="file" name="filename"></form>')
    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", handleFiles, false);
}


/**
 * @desc gets all the needed content for the new flashcard and submits it to the server
*/
function submitFlashcard() {
    var data = {};

    if($("#question").val() == ""){
        alert("Please fill in question field");
        return;
    }
    if($("#answer").val() == ""){
        alert("Please fill in flashcard field");
        return;
    }
    data.region = getRegion();
    data.question = $("#question").val()
    data.answer = $("#answer").val()
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
            addFlashcard(data, link);
            addImage(data, link);
        }, function(error){
            alert("image failed to be added. \nerror: " + error)
        },1);
    //images was selected from the gallery and doesn't need to be added to s3
    } else{
        var link = {};
        link.imageUrl = $("#yourImage").attr("src");
        addFlashcard(data, link)
    }
}


/**
 * @desc submits the new flashcard to the server 
*/
function addFlashcard(data, link) {
    var data2 = data;
    data2.imageUrl = link.imageUrl
    ajaxPost(website + "/flashcard", data2, function(){
        alert("item added correctly");

        //update the version of flashcards for this region
        if($(".subSubRegionSelected")[0]){
            $(".subSubRegionSelected").trigger("click");
            updateVersion("flashcard", $(".subSubRegionSelected").attr("title"))
        } else{
            $(".subRegionSelected").trigger("click");
            updateVersion("flashcard", $(".subRegionSelected").attr("title"))
        }

    }, function(error){
        alert("item failed to be added\n error: " + error)
    },1);
}


/**
 * @desc disables all the fields when viewing current flashcards
*/
function disableFlashcardFields(){
	$("#question").prop("readonly", true);
	$("#answer").prop("readonly", true);
}


/**
 * @desc enables are explore fields for adding a new flashcard
*/
function enableFlashcardFields(){
    $("#question").val("").prop("readonly", false);
	$("#answer").val("").prop("readonly", false);
}


/**
 * @desc removes the current explore section from the database
*/
function deleteFlashcard(){
    var id = $(".qselected").attr("id")
    if(id == undefined){
        alert("Please select a flashcard to delete.")
        return;
    }
    var x = confirm("Are you sure you want to delete flashcard id=" + id);
    if(x){
        ajaxDelete(website+ "/flashcard/" + id, function(){
            alert("flashcard deleted");

            //update the version of flashcards for this region
            if($(".subSubRegionSelected")[0]){
                $(".subSubRegionSelected").trigger("click");
                updateVersion("flashcard", $(".subSubRegionSelected").attr("title"))
            } else{
                $(".subRegionSelected").trigger("click");
                updateVersion("flashcard", $(".subRegionSelected").attr("title"))
            }

        }, function(error){
            alert("flashcard was not deleted\n error: " + error);
        }, 1)
    }
}