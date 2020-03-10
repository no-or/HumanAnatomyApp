function exploreLayout(explore){
  console.log(explore)
  loadExploreManager();
  $(".question").remove()
  if(explore.length == 0){
    disableExploreFields();
  }else{
    for(item in explore){
      $(".questions-scroll").append('<div id="' + explore[item]._id + '" title="' + item +'" class="question">Q' + item + '</div>')
      $('#' + explore[item]._id ).click( function(){
        exploreOnclick(this, explore);
      })
      if(item == 0){
        var first = document.getElementById(explore[item]._id)
        exploreOnclick(first, explore)
      }
    }
  }
}


function exploreOnclick(thisElement, explore){
  $(".qselected").removeClass("qselected");
  $(thisElement).addClass("qselected")
  $("#title").val(explore[thisElement.title].title)
  $("#image").val(explore[thisElement.title].imageUrl)
  $("#explanation").val(explore[thisElement.title].explanation)
   $(".image-gallery").empty();
  var img = '<img src="http://' + explore[thisElement.title].imageUrl + '" id="yourImage"/>'
  $(".image-gallery").append(img)
  //$("#explanation").val(flashcards[thisElement.title].explanation)
  disableExploreFields();
  $(".options-panel").children().remove();
  $(".options-panel").append('<button onclick="deleteExplore()">Delete Explore Section</button><button onclick="makeNewExplore()">Make New Explore Section</button>') 
}

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

function makeNewExplore() {
  $(".options-panel").empty();
  $(".image-gallery").empty();
  enableExploreFields();
  $(".options-panel").append('<button onclick="submitExplore()">Submit</button>');
  $(".question-display").append('<form id="myform"><input type="file" name="filename"></form>')
}

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


  var imageFile = document.forms.myform.elements.filename.files[0];
  if(!(imageFile)){
    alert("please select an image")
    return;
  }
  ajaxPostImage("http://localhost:8090/image/s3", imageFile, function(link){
    alert(link.imageUrl)
    console.log(link.imageUrl)
    var data2 = data;
    data2.imageUrl = link.imageUrl
    var data3 = {};
    data3.region = data2.region;
    data3.imageUrl = link.imageUrl;
    ajaxPost(website + "/explore", data2, function(){
      alert("item added correctly");
      if($(".subSubRegionSelected")[0]){
        $(".subSubRegionSelected").trigger("click");
      } else{
        $(".subRegionSelected").trigger("click");
      }
    },
    function(){
      alert("item failed to be added")
    });
    ajaxPost(website + "/image", data3, function(){
      alert("image added to scroll correctly");
    },
    function(){
      alert("iamge failed to be added to scroll")
    });
  },
  function(){
    alert("image failed to be added")
  });

}


function disableExploreFields(){
	$("#title").prop("readonly", true);
	$("#explanation").prop("readonly", true);
	$("#image").prop("readonly", true);
}

function enableExploreFields(){
  $("#title").val("").prop("readonly", false);
	$("#explanation").prop("readonly", false);
	$("#image").val("").prop("readonly", false);
}

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
      if($(".regionSelected").attr('id') == "trunk"){
        $(".subSubRegionSelected").trigger("click");
      } else{
        $(".subRegionSelected").trigger("click");
      }
    }, function(){
      alert("Explore section was not deleted");
    })
  }
}