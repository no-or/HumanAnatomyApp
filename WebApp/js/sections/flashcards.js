//need to make

function flashcardLayout(flashcards){
  console.log(flashcards)
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


function flashcardOnclick(thisElement, flashcards){
  $(".qselected").removeClass("qselected");
  $(thisElement).addClass("qselected")
  $("#question").val(flashcards[thisElement.title].question)
  $("#answer").val(flashcards[thisElement.title].answer)
  //$("#explanation").val(flashcards[thisElement.title].explanation)
  disableFlashcardFields();
  $(".options-panel").children().remove();
  $(".options-panel").append('<button onclick="deleteFlashcard()">Delete Flashcard</button><button onclick="makeNewFlashcard()">Make New Flashcard</button>') 
}

function loadFlashcardManager() {
 $(".management-area").empty();
 $(".management-area").append('<div class="question-content"</div>')
 $(".question-content").prepend('<form class="question-display"></form>')
 $(".question-display").append('<label for="question">Question</label><textarea id="question" name="question" placeholder="Enter your question" rows="1"></textarea>') 
 $(".question-display").append('<label for="answer">Answer</label><textarea id="answer" name="answer" placeholder="Enter your Answer" rows="1"></textarea>')           
 //$(".question-display").append('<label for="explanation">Explanation</label><textarea id="explanation" name="explanation" placeholder="Enter your explanation" rows="3"></textarea>')
 $(".management-area").append('<div class="image-gallery"></div>')
 $(".image-gallery").append('<div id="column1" class="column"></div>')
 for(var i = 0; i < 7; i++){
 $("#column1").append('<img src="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2533&q=80">')
 }
 $(".image-gallery").append('<div id="column2" class="column"></div>')
 for(var i = 0; i < 7; i++){
 $("#column2").append('<img src="https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2533&q=80">')
 }
 $(".management-area").append('<div class="options-panel"></div>')
 $(".options-panel").append('<button onclick="deleteFlashCard()">Delete Flashcard</button><button onclick="makeNewFlashcard()">Make New Flashcard</button>')         
}

function makeNewFlashcard() {
  $(".options-panel").empty();
  enableFlashcardFields();
  $(".options-panel").append('<button onclick="submitFlashcard()">Submit</button>');
}

function submitFlashcard() {
  var data = {};
  data.image = "image.com";
  if($("#question").val() == ""){
    alert("Please fill in question field");
    return;
  }
  // if($("#explanation").val() == ""){
  //   alert("Please fill out explanation");
  //   return;
  // }
  if($("#answer").val() == ""){
    alert("Please fill in flashcard field");
    return;
  }
  if($(".regionSelected").attr('id') == "trunk"){
    data.region = $(".subSubRegionSelected").attr('title');
  } else{
    data.region = $(".subRegionSelected").attr('title');
  }
  //data.explanation = [$("#explanation").val()];
  data.question = $("#question").val()
  data.answer = $("#answer").val()
  console.log(JSON.stringify(data))
  ajaxPost(website + "/flashcard", data, function(){
    alert("item added correctly");
    if($(".regionSelected").attr('id') == "trunk"){
    $(".subSubRegionSelected").trigger("click");
  } else{
    $(".subRegionSelected").trigger("click");
  }
  },
  function(){
    //alert("item failed to be added")
  });

}


function disableFlashcardFields(){
	$("#question").prop("readonly", true);
	//$("#explanation").prop("readonly", true);
	$("#answer").prop("readonly", true);
}

function enableFlashcardFields(){
  	$("#question").val("").prop("readonly", false);
	//$("#explanation").prop("readonly", true);
	$("#answer").val("").prop("readonly", false);
}

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
      if($(".regionSelected").attr('id') == "trunk"){
        $(".subSubRegionSelected").trigger("click");
      } else{
        $(".subRegionSelected").trigger("click");
      }
    }, function(){
      alert("flashcard was not deleted");
    })
  }
}