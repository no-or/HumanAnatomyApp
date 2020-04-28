

/**
 * @desc sets up the Quizzes interface
 * @param section - name of the current section (Quizzes)
*/
function quizLayout(quizzes){
    loadQuizManager();
    $(".question").remove()
    if(quizzes.length == 0){
        disableQuizFields();
    }else{
        for(item in quizzes){
            $(".questions-scroll").append('<div id="' + quizzes[item]._id + '" title="' + item +'" class="question">Q' + item + '</div>')
            $('#' + quizzes[item]._id ).click( function(){
                quizOnclick(this, quizzes);
            })
            if(item == 0){
                var first = document.getElementById(quizzes[item]._id)
                quizOnclick(first, quizzes)
            }
        }
    }
}


/**
 * @desc sets up the interface once a quiz section that is selected by the user
 * @param thisElement - region menu element selected by the user
 * @param quizzes - object of all the quizzes in the selected region
*/
function quizOnclick(thisElement, quizzes){
    $(".qselected").removeClass("qselected");
    $(thisElement).addClass("qselected")
    $("#opt-1").val(quizzes[thisElement.title].options[0])
    $("#opt-2").val(quizzes[thisElement.title].options[1])
    $("#opt-3").val(quizzes[thisElement.title].options[2])
    $("#opt-4").val(quizzes[thisElement.title].options[3])
    $("#question").val(quizzes[thisElement.title].question)
    $("#explanation").val(quizzes[thisElement.title].explanation)
    $(".image-gallery").empty();
    var img = '<img src="' + quizzes[thisElement.title].imageUrl + '" id="yourImage"/>'
    $(".image-gallery").append(img)
    disableQuizFields();
    $(".optionSelected").removeClass("optionSelected")
    switch(quizzes[thisElement.title].correctAnswer){
        case quizzes[thisElement.title].options[0]: 
            $("#opt-1").addClass("optionSelected");
            break;
        case quizzes[thisElement.title].options[1]: 
            $("#opt-2").addClass("optionSelected");
            break;
        case quizzes[thisElement.title].options[2]: 
            $("#opt-3").addClass("optionSelected");
            break;
        case quizzes[thisElement.title].options[3]: 
            $("#opt-4").addClass("optionSelected");
            break;
        default: alert("no selected answer");
  }
    $("#myform").remove();
    $(".options-panel").children().remove();
    $(".options-panel").append('<button onclick="deleteQuiz()">Delete Question</button><button onclick="makeNewQuiz()">Make New Quiz</button>') 
}


/**
 * @desc sets up the flashcard interface for viewing content
*/
function loadQuizManager() {
    $(".management-area").empty();
    $(".management-area").append('<div class="question-content"</div>')
    $(".question-content").prepend('<form class="question-display"></form>')
    $(".question-display").append('<label for="question">Question</label><textarea id="question" name="question" placeholder="Enter your question" rows="1"></textarea>')           
    var letter = "A"
    for(var i = 1; i < 5; i++){
        $(".question-display").append('<div id="question-option' + i + '" class="question-option"></div>');
        $("#question-option" + i).append('<button type="button" id="opt-' + i + '-button" for="opt-' + i + '" onclick="quizOptionSelected(' + i + ')"> ' + letter + ' </button>')
        $("#question-option" + i).append('<textarea id="opt-' + i + '" name="opt-' + i + '" rows="1"></textarea>')
        letter = String.fromCharCode(letter.charCodeAt(0) +  1 )
    }
    $(".question-display").append('<label for="explanation">Explanation</label><textarea id="explanation" name="explanation" placeholder="Enter your explanation" rows="3"></textarea>')
    $(".management-area").append('<div class="image-gallery"></div>')
    $(".management-area").append('<div class="options-panel"></div>')
    $(".options-panel").append('<button onclick="deleteQuiz()">Delete Question</button><button onclick="makeNewQuiz()">Make New Quiz</button>')   
}


/**
 * @desc changes the interface to allow the user to make a quiz
*/
function makeNewQuiz() {
    $(".options-panel").empty();
    $(".image-gallery").empty();
    enableQuizFields();
    $(".optionSelected").removeClass("optionSelected")
    $(".options-panel").append('<button onclick="submitQuiz()">Submit</button>');
    $(".question-display").append('<form id="myform"><input id="fileUploader" type="file" name="filename"></form>')
    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", handleFiles, false);
    var region = getRegion();
    buildImageScroll(region);
}


/**
 * @desc highlights which option was selected as the correct answer for the multiple choice quize=
 * @param number - number of the selected option (1=A, 2=B, 3=C, 4=D)
*/
function quizOptionSelected(number){
    $(".optionSelected").removeClass("optionSelected")
    switch(number) {
        case 1: 
        $("#opt-1").addClass("optionSelected");
        break;
    case 2: 
        $("#opt-2").addClass("optionSelected");
        break;
    case 3: 
        $("#opt-3").addClass("optionSelected");
        break;
    case 4: 
        $("#opt-4").addClass("optionSelected");
        break;
    default : alert("none selected")
    }
}


/**
 * @desc gets all the needed content for the new quiz and submits it to the server
*/
function submitQuiz() {
    var data = {};
    if($("#question").val() == ""){
        alert("Please fill in question field");
        return;
    }
    if($("#yourImage").attr("src") == ""){
        alert("Please select an in image field");
        return;
    }
    if($("#opt-1").val() == "" || $("#opt-2").val() == "" || $("#opt-3").val() == "" || $("#opt-4").val() == "" ){
        alert("Please fill out all options");
        return;
    }
    if($("#explanation").val() == ""){
        alert("Please fill out explanation");
        return;
    }
    if($(".optionSelected").length < 1){
        alert("Please select a correct answer by pressing the letter");
        return;
    }
    data.questionType = "multiple choice";
    if($(".subSubRegionSelected")[0]){
        data.region = $(".subSubRegionSelected").attr('title');
    } else{
        data.region = $(".subRegionSelected").attr('title');
    }
    data.imageUrl = $("#image").val();
    data.options = [$("#opt-1").val(), $("#opt-2").val(), $("#opt-3").val(), $("#opt-4").val()]
    switch($(".optionSelected").attr('id')){
        case "opt-1": data.correctAnswer = data.options[0]; break;
        case "opt-2": data.correctAnswer = data.options[1]; break;
        case "opt-3": data.correctAnswer = data.options[2]; break;
        case "opt-4": data.correctAnswer = data.options[3]; break;
        default:  alert("no option selected");
    }
    data.explanation = [$("#explanation").val()];
    data.question = $("#question").val()

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
            addQuiz(data, link);
            addImage(data, link);
        }, function(error){
            alert("image failed to be added\n error: " + error)
        },1);

        //images was selected from the gallery and doesn't need to be added to s3
    } else{
        var link = {};
        link.imageUrl = $("#yourImage").attr("src");
        addQuiz(data, link)
    }
}


/**
 * @desc submits the new quiz to the server 
*/
function addQuiz(data, link) {
    var data2 = data;
    data2.imageUrl =  link.imageUrl
    ajaxPost(website + "/quiz", data2, function(){
        alert("item added correctly");

        //update the version of quizzes for this region
        if($(".subSubRegionSelected")[0]){
            $(".subSubRegionSelected").trigger("click");
            updateVersion("quiz", $(".subSubRegionSelected").attr("title"))
        } else{
            $(".subRegionSelected").trigger("click");
            updateVersion("quiz", $(".subRegionSelected").attr("title"))
        }

    }, function(error){
        alert("item failed to be added\n error: " + error)
    },1);
}


/**
 * @desc disables all the fields when viewing current quizzes
*/
function disableQuizFields(){
    $("#opt-1").prop("readonly", true);
    $("#opt-2").prop("readonly", true);
    $("#opt-3").prop("readonly", true);
    $("#opt-4").prop("readonly", true);
    $("#question").prop("readonly", true);
    $("#explanation").prop("readonly", true);
    $("#opt-1-button").prop("disabled", true);
    $("#opt-2-button").prop("disabled", true);
    $("#opt-3-button").prop("disabled", true);
    $("#opt-4-button").prop("disabled", true);
    $("#image").prop("disabled", true);
}


/**
 * @desc enables are explore fields for adding a new quiz
*/
function enableQuizFields(){
    $("#opt-1").val("").prop("readonly", false)
    $("#opt-2").val("").prop("readonly", false)
    $("#opt-3").val("").prop("readonly", false)
    $("#opt-4").val("").prop("readonly", false)
    $("#question").val("").prop("readonly", false)
    $("#explanation").val("").prop("readonly", false)
    $("#opt-1-button").prop("disabled", false);
    $("#opt-2-button").prop("disabled", false);
    $("#opt-3-button").prop("disabled", false);
    $("#opt-4-button").prop("disabled", false);
    $("#image").val("").prop("disabled", false);
}


/**
 * @desc removes the current quiz from the database
*/
function deleteQuiz(){
    var id = $(".qselected").attr("id")
    if(id == undefined){
        alert("Please select a question to delete.")
        return;
    }
    var x = confirm("Are you sure you want to delete question id=" + id);
    if(x){
        ajaxDelete(website+ "/quiz/" + id, function(){
            alert("question deleted");

            //update the version of quizzes for this region
            if($(".subSubRegionSelected")[0]){
                $(".subSubRegionSelected").trigger("click");
                updateVersion("quiz", $(".subSubRegionSelected").attr("title"))
            } else{
                $(".subRegionSelected").trigger("click");
                updateVersion("quiz", $(".subRegionSelected").attr("title"))
            }

        }, function(error){
            alert("question was not deleted\n error: " + error);
        })
    }
}