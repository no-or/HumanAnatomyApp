
var selectedRegion;

function buildRegionMenu(section, onClick){
$(".content").children().remove()
$(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
$(".content").append('<div class="category-area"></div>');
$(".category-area").append('<div class="area-selection"></div>');
$(".area-selection").append('<ul class="selection-container"></ul>');
$(".selection-container").append('<li id="head"><h3 class="category-title">Head & Neck</h3><h4 class="category-question-number"> 20 Questions | Default</h4></li>')
$(".selection-container").append('<li id="upper"><h3 class="category-title">Upper Limb</h3><h4 class="category-question-number"> 20 Questions | Default</h4></li>')
$(".selection-container").append('<li id = "lower"><h3 class="category-title">Lower Limb</h3><h4 class="category-question-number"> 20 Questions | Default</h4></li>')
$(".selection-container").append('<li id = "trunk"><h3 class="category-title">Trunk</h3><h4 class="category-question-number"> 20 Questions | Default</h4></li>')
$(".category-area").append('<div class="anatomy-section"><div class="management-area"><img src="https://www.wcpss.net/cms/lib/NC01911451/Centricity/Domain/6218/anatbanner.jpg" id="banner"></div> <div class="questions-scroll"></div>')    
  
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
    $(".management-area").append('<img src="https://www.wcpss.net/cms/lib/NC01911451/Centricity/Domain/6218/anatbanner.jpg" id="banner">')
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
      	selectedRegion(onClick, this);
      })
    }else {
      trunkSetup();
    }
  }
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


var Back = ["Trunk bones", "Trunk joints"];
var Thorax = ["Pectoral region", "Lungs and pleura", "Heart", "Superior and posterior mediastinum"]
var Abdomen = ["Anterior abdominal wall", "Foregut organs", "Midgut and hindgut organs", "Posterior abdominal wall"]
var Pelvis = ["Pelvic bones and muscles", "Pelvic joints and ligaments", "Male pelvis", "Female pelvis", "Perineum"]


var trunk = ["Back", "Thorax", "Abdomen", "Pelvis"];
var lower = ["Gluteal region", "Thigh", "Leg", "Foot", "Lower limb bones", "Lower limb joints"]
var upper = ["Scapular region", "Axilla", "Arm", "Forearm", "Hand", "Upper limb bones", "Upper limb Joints"];
var head = ["Skull and meninges", "Cavernous Sinus", "Orbit", "Neck", "Face", "Infratemporal fossa", "Oral Cavity", "Pharynx", "Larynx"]

