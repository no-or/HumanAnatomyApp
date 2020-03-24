var website = "http://localhost:8090"
$(document).ready(function(){
  updateToken();
  getMenuObject();
  $("#quizzes").unbind().click(function(){
    console.log(menu)
    buildRegionMenu("Quizzes", function(onClick, thisElement){
      ajaxGet(website + "/quiz?region=" + thisElement.title, function(response) {
      quizLayout(response)
      }, function(error){
        console.log(error)
      })
      onClick(thisElement);
    })
  })
  $("#flashcards").unbind().click(function(){
    buildRegionMenu("Flashcards", function(onClick, thisElement){
      ajaxGet(website + "/flashcard?region=" + thisElement.title, function(response) {
      flashcardLayout(response)
      }, function(error){
        console.log(error)
      })
      onClick(thisElement);
    })
  })
  $("#explore").unbind().click(function(){
    buildRegionMenu("Explore Lab", function(onClick, thisElement){
      ajaxGet(website + "/explore?region=" + thisElement.title, function(response) {
      exploreLayout(response)
      }, function(error){
        console.log(error)
      })
      onClick(thisElement);
    })

  })

  $("#imageManager").click(function(){
    buildRegionMenu("Image Manager", function(onClick, thisElement){
      ajaxGet(website + "/image?region=" + thisElement.title, function(response) {
      imageLayout(response)
      }, function(error){
        console.log(error)
      })
      onClick(thisElement);
    })

  })

  $("#menuManager").click(function(){
    buildRegionMenu("Menu Manager");
  })

  $("#stats").click(function(){
    buildRegionMenu("User Analytics");
  })

});



