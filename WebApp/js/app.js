var website = "http://localhost:8080"

$(document).ready(function(){
  $("#head").click(function(){
  	menuChange(head, "head")
  })
  $("#lower").click(function(){
  	menuChange(lower, "lower")
  })
  $("#upper").click(function(){
  	menuChange(upper, "upper")
  })
  $("#trunk").click(function(){
  	menuChange(trunk, "trunk")
  })
});

function menuChange(region, regionName) {
  $(".subRegion").remove();
  $(".subSubRegion").remove();
  var curSelected = document.getElementsByClassName("regionSelected");
  if(!(curSelected.length == 1 && curSelected[0].id == regionName)){
    $(".regionSelected").removeClass("regionSelected");
    addMenuItems(region, regionName, "region", function(thisElement){
      $(".subRegionSelected").removeClass("subRegionSelected")
      $(thisElement).addClass("subRegionSelected")
    });
  } else {
    $(".regionSelected").removeClass("regionSelected");
    $(".management-area").empty();
    $(".management-area").append('<img src="https://www.wcpss.net/cms/lib/NC01911451/Centricity/Domain/6218/anatbanner.jpg" id="banner">')
    $(".questions-scroll").children().remove();
  }
}

function subMenuChange(region, regionName) {
  var curSelected = document.getElementsByClassName("subRegionSelected");
  if(!(curSelected.length == 1 && curSelected[0].id == regionName)){
    $(".subRegionSelected").removeClass("subRegionSelected")
    addMenuItems(region, regionName, "subRegion" , function(thisElement){
      $("#B").removeClass("subSubRegionSelected")
      $(thisElement).addClass("subSubRegionSelected")
    })
    $(".subRegionSelected").prop("disabled", true)
  }else {
    $(".subSubRegion").remove();
    $(".subRegionSelected").removeClass("subRegionSelected")

  }
}

function addMenuItems(region, regionName, regionLevel, onClick){
  $(".subSubRegion").remove();
  $(".management-area").empty();
  $(".management-area").append('<img src="https://www.wcpss.net/cms/lib/NC01911451/Centricity/Domain/6218/anatbanner.jpg" id="banner">')
  $(".question").remove();
  $("#" + regionName).addClass(regionLevel + "Selected");
  for(item in region){
    if(regionLevel == "region"){
      $("#" + regionName).after('<li id="' + region[item].replace(/\s/g, '') + '" class="subRegion"' +  ' title="' + region[item] + '"> ' )
      $('#' + region[item].replace(/\s/g, '')).prepend('<h5 class="category-title">' + region[item] + '</h5>')
    } else{
      $("#" + regionName).after('<li id="' + region[item].replace(/\s/g, '') +  '" title="' + region[item] + '" class="subSubRegion"> ')
      $('#' + region[item].replace(/\s/g, '')).prepend('<h6 class="category-title">' + region[item] + '</h6>')
    }
    if(regionName != "trunk"){
      $('#' + region[item].replace(/\s/g, '')).click(function(){
      	ajaxGet(website + "/quiz?region=" + this.title, function(response) {
      		quizLayout(response)
    	}, function(error){
    		alert(error)
    	})
        onClick(this);
      })
    }else {
      trunkSetup();
    }
  }
}

function optionSelected(number){
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

function quizLayout(quizzes){
	console.log(quizzes)
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

function quizOnclick(thisElement, quizzes){
  $(".qselected").removeClass("qselected");
  $(thisElement).addClass("qselected")
  $("#opt-1").val(quizzes[thisElement.title].options[0])
  $("#opt-2").val(quizzes[thisElement.title].options[1])
  $("#opt-3").val(quizzes[thisElement.title].options[2])
  $("#opt-4").val(quizzes[thisElement.title].options[3])
  $("#question").val(quizzes[thisElement.title].question)
  $("#explanation").val(quizzes[thisElement.title].explanation)
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
  $(".options-panel").children().remove();
  $(".options-panel").append('<button onclick="deleteQuiz()">Delete Question</button><button onclick="makeNewQuiz()">Make New Quiz</button>') 
}

function trunkSetup() {
  $("#Back").unbind("click").click(function() {
    subMenuChange(Back, "Back");
  })
  $("#Thorax").unbind("click").click(function() {
    subMenuChange(Thorax, "Thorax");
  })
  $("#Abdomen").unbind("click").click(function() {
    subMenuChange(Abdomen, "Abdomen");
  })
  $("#Pelvis").unbind("click").click(function() {
    subMenuChange(Pelvis, "Pelvis");
  })
}

function loadQuizManager() {
 $(".management-area").empty();
 $(".management-area").append('<div class="question-content"</div>')
 $(".question-content").prepend('<form class="question-display"></form>')
 $(".question-display").append('<label for="question">Question</label><textarea id="question" name="question" placeholder="Enter your question" rows="1"></textarea>')           
 var letter = "A"
 for(var i = 1; i < 5; i++){
  $(".question-display").append('<div id="question-option' + i + '" class="question-option"></div>');
  $("#question-option" + i).append('<button type="button" id="opt-' + i + '-button" for="opt-' + i + '" onclick="optionSelected(' + i + ')"> ' + letter + ' </button>')
  $("#question-option" + i).append('<textarea id="opt-' + i + '" name="opt-' + i + '" rows="1"></textarea>')
  letter = String.fromCharCode(letter.charCodeAt(0) +  1 )
 }
 $(".question-display").append('<label for="explanation">Explanation</label><textarea id="explanation" name="explanation" placeholder="Enter your explanation" rows="3"></textarea>')
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
 $(".options-panel").append('<button onclick="deleteQuiz()">Delete Question</button><button onclick="makeNewQuiz()">Make New Quiz</button>')         
}

function makeNewQuiz() {
  $(".options-panel").empty();
  enableQuizFields();
  $(".optionSelected").removeClass("optionSelected")
  $(".options-panel").append('<button onclick="submitQuiz()">Submit</button>');
}

function submitQuiz() {
  var data = {};
  data.image = "image.com";
  if($("#question").val() == ""){
    alert("Please fill in question field");
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
  if($(".regionSelected").attr('id') == "trunk"){
    data.region = $(".subSubRegionSelected").attr('title');
  } else{
    data.region = $(".subRegionSelected").attr('title');
  }
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
  console.log(JSON.stringify(data))
  ajaxPost(website + "/quiz", data, function(){
    alert("item added correctly");
    if($(".regionSelected").attr('id') == "trunk"){
    //$(".subSubRegionSelected").trigger("click");
  } else{
    //$(".subRegionSelected").trigger("click");
  }
  },
  function(){
    //alert("item failed to be added")
  });

}

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
}

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
}

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
      if($(".regionSelected").attr('id') == "trunk"){
        //$(".subSubRegionSelected").trigger("click");
      } else{
        //$(".subRegionSelected").trigger("click");
      }
    }, function(){
      alert("question was not deleted");
    })
  }
}



var Back = ["Trunk bones", "Trunk joints"];
var Thorax = ["Pectoral region", "Lungs and pleura", "Heart", "Superior and posterior mediastinum"]
var Abdomen = ["Anterior abdominal wall", "Foregut organs", "Midgut and hindgut organs", "Posterior abdominal wall"]
var Pelvis = ["Pelvic bones and muscles", "Pelvic joints and ligaments", "Male pelvis", "Female pelvis", "Perineum"]


var trunk = ["Back", "Thorax", "Abdomen", "Pelvis"];
var lower = ["Gluteal region", "Thigh", "Leg", "Foot", "Lower limb bones", "Lower limb joints"]
var upper = ["Scapular region", "Axilla", "Arm", "Forearm", "Hand", "Upper limb bones", "Upper limb Joints"];
var head = ["Skull and meninges", "Cavernous Sinus", "Orbit", "Neck", "Face", "Infratemporal fossa", "Oral Cavity", "Pharynx", "Larynx"]

