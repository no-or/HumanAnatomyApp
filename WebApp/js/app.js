var website = "http://localhost:8080"

$(document).ready(function(){
  $("#quizzes").unbind().click(function(){
    buildRegionMenu("Quizzes", function(onClick, thisElement){
      ajaxGet(website + "/quiz?region=" + thisElement.title, function(response) {
      quizLayout(response)
      }, function(error){
        alert(error)
      })
      onClick(thisElement);
    })
  })
  $("#flashcards").click(function(){
    buildRegionMenu("flashcards");
  })
  $("#explore").click(function(){
    buildRegionMenu("explore lab");
  })
  $("#stats").click(function(){
    buildRegionMenu("user analytics");
  })
  $("#quizzes").trigger("click")
});




