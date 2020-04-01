var website = "http://137.82.155.92:8090"
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

  $("#imageManager").unbind().click(function(){
    buildRegionMenu("Image Manager", function(onClick, thisElement){
      ajaxGet(website + "/image?region=" + thisElement.title, function(response) {
      imageLayout(response)
      }, function(error){
        console.log(error)
      })
      onClick(thisElement);
    })

  })

  $("#menuManager").unbind().click(function(){
    buildRegionMenu("Menu Manager");
  })

  $("#videoManager").unbind().click(function(){
    buildVideoMenu("Video Manager");
  })

  $("#stats").click(function(){
    buildStatsMenu("User Analytics");
  })

  $("#signup").click(function(){
    buildSignupMenu("Sign Up");
  })

  $("#codeManager").click(function(){
    buildCodeMenu("Code Manager");
  })

});


function logout(){
  var refreshToken = getCookie("refreshToken");
    if(refreshToken){
    var body = {};
    body.refreshToken = refreshToken;
    url = website + "/admin/logout";
    ajaxPost(url, body, function(result){
      eraseCookie("accessToken");
      eraseCookie("refreshToken");
      window.location.href = 'login.html'
    }, function(error){
      console.log(error)
    }, 1)
  }else{
    window.location.href = 'login.html'
  }
}



