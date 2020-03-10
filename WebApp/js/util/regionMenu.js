
var selectedRegion;
var menu; 

function buildRegionMenu(section, onClick){
$(".content").children().remove()
$(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
$(".content").append('<div class="category-area"></div>');
$(".category-area").append('<div class="area-selection"></div>');
$(".area-selection").append('<ul class="selection-container"></ul>');
for(item in menu[0].regions){
  $(".selection-container").append('<li id="' + menu[0].regions[item].region.replace(/\s/g, '') + '"name="' + item + '"><h3 class="category-title">' + menu[0].regions[item].region + '</h3><h4 class="category-question-number"> 20 Questions | Default</h4></li>')
  $("#" + menu[0].regions[item].region.replace(/\s/g, '')).click(function(){
    console.log(this.getAttribute("name"));
    menuChange(menu[0].regions[this.getAttribute("name")], menu[0].regions[this.getAttribute("name")].region.replace(/\s/g, ''))
  })
}
$(".category-area").append('<div class="anatomy-section"><div class="management-area"><img src="https://www.medicalexamprep.co.uk/wp-content/uploads/2017/10/Anatomy-Prep-Banner.jpg" id="banner"></div> <div class="questions-scroll"></div>')    
  
  selectedRegion = onClick;
};

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
    $(".management-area").append('<img src="https://www.medicalexamprep.co.uk/wp-content/uploads/2017/10/Anatomy-Prep-Banner.jpg" id="banner">')
    $(".questions-scroll").children().remove();
  }
}

function subMenuChange(region, regionName) {
  var curSelected = document.getElementsByClassName("subRegionSelected");
  if(!(curSelected.length == 1 && curSelected[0].id == regionName)){
    $(".subRegionSelected").removeClass("subRegionSelected")
    addMenuItems(region, regionName, "subRegion" , function(thisElement){
      $(".subSubRegionSelected").removeClass("subSubRegionSelected")
      $(thisElement).addClass("subSubRegionSelected")
    })
    $(".subRegionSelected").prop("disabled", true)
  }else {
    $(".subSubRegion").remove();
    $(".subRegionSelected").removeClass("subRegionSelected")
    $(".management-area").empty();
    $(".management-area").append('<img src="https://www.medicalexamprep.co.uk/wp-content/uploads/2017/10/Anatomy-Prep-Banner.jpg" id="banner">')
    $(".questions-scroll").children().remove();
  }
}

function addMenuItems(region, regionName, regionLevel, onClick){
  console.log(region)
  $(".subSubRegion").remove();
  $(".management-area").empty();
  $(".management-area").append('<img src="https://www.medicalexamprep.co.uk/wp-content/uploads/2017/10/Anatomy-Prep-Banner.jpg" id="banner">')
  $(".question").remove();
  $("#" + regionName).addClass(regionLevel + "Selected");
  if(regionLevel == "region"){ 
    for(item in region.subRegions){
      $("#" + regionName).after('<li id="' + region.subRegions[item].subRegion.replace(/\s/g, '') + '"name="' + item +  '" class="subRegion"' +  ' title="' + region.subRegions[item].subRegion + '"> ' )
      $('#' + region.subRegions[item].subRegion.replace(/\s/g, '')).prepend('<h5 class="category-title">' + region.subRegions[item].subRegion + '</h5>')
      if(region.subRegions[item].subSubRegions[0] == undefined){
        $('#' + region.subRegions[item].subRegion.replace(/\s/g, '')).unbind().click(function(){
          selectedRegion(onClick, this);
        })
      }else{
        $('#' + region.subRegions[item].subRegion.replace(/\s/g, '')).unbind().click(function(){
          subMenuChange(region.subRegions[this.getAttribute("name")], region.subRegions[this.getAttribute("name")].subRegion.replace(/\s/g, ''));
        })
      }
    }
  }else{
    for(item in region.subSubRegions){
      $("#" + regionName).after('<li id="' + region.subSubRegions[item].subSubRegion.replace(/\s/g, '') +  '" title="' + region.subSubRegions[item].subSubRegion + '" class="subSubRegion"> ')
      $('#' + region.subSubRegions[item].subSubRegion.replace(/\s/g, '')).prepend('<h6 class="category-title">' + region.subSubRegions[item].subSubRegion + '</h6>')
      $('#' + region.subSubRegions[item].subSubRegion.replace(/\s/g, '')).unbind().click(function() {
        selectedRegion(onClick, this);
      })
    }
  }
}


function getMenuObject() {
   ajaxGet(website + "/hierarchy" , function(response) {
        menu = JSON.parse(JSON.stringify(response));
      }, function(error){
        alert(error)
      })
}


