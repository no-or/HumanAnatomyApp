var website = "http://localhost:8080"

$(document).ready(function(){
  $("#quizzes").unbind().click(function(){
    buildRegionMenu("Quizzes");
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




