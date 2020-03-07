var website = "http://localhost:8090"

$(document).ready(function(){
  $("#quizzes").unbind().click(function(){
    buildRegionMenu("Quizzes", function(onClick, thisElement){
      ajaxGet(website + "/quiz?region=" + thisElement.title, function(response) {
      quizLayout(response)
      }, function(error){
        //alert(error)
      })
      onClick(thisElement);
    })
  })
  $("#flashcards").click(function(){
    buildRegionMenu("Flashcards", function(onClick, thisElement){
      ajaxGet(website + "/flashcard?region=" + thisElement.title, function(response) {
      flashcardLayout(response)
      }, function(error){
        //alert(error)
      })
      onClick(thisElement);
    })
  })
  $("#explore").click(function(){
    buildRegionMenu("Explore Lab", function(onClick, thisElement){
      ajaxGet(website + "/explore?region=" + thisElement.title, function(response) {
      exploreLayout(response)
      }, function(error){
        //alert(error)
      })
      onClick(thisElement);
    })
  })
  $("#stats").click(function(){
    buildRegionMenu("user analytics");
  })
  $("#quizzes").trigger("click")
});




