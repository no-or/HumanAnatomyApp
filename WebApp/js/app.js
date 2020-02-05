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
  }
}

function subMenuChange(region, regionName) {
  $(".subRegionSelected").removeClass("subRegionSelected")
  var curSelected = document.getElementsByClassName("subSubRegionSelected");
  if(!(curSelected.length == 1 && curSelected[0].id == regionName)){
    addMenuItems(region, regionName, "subRegion" , function(thisElement){
      $(".subSubRegionSelected").removeClass("subSubRegionSelected")
      $(thisElement).addClass("subSubRegionSelected")
    })   
  }else {
    $(".subSubRegionSelected").removeClass("subSubRegionSelected")
  }
}

function addMenuItems(region, regionName, regionLevel, onClick){
  $(".subSubRegion").remove();
  $("#" + regionName).addClass(regionLevel + "Selected");
  for(item in region){
    if(regionLevel == "region"){
      $("#" + regionName).after('<li id="' + region[item].replace(/\s/g, '') + '" class="subRegion"> ')
      $('#' + region[item].replace(/\s/g, '')).prepend('<h5 class="category-title">' + region[item] + '</h5>')
    } else{
      $("#" + regionName).after('<li id="' + region[item].replace(/\s/g, '') + '" class="subSubRegion"> ')
      $('#' + region[item].replace(/\s/g, '')).prepend('<h6 class="category-title">' + region[item] + '</h6>')
    }
    if(regionName != "trunk"){
      $('#' + region[item].replace(/\s/g, '')).click(function(){
        onClick(this);
      })
    }else {
      trunkSetup();
    }
  }
}

function trunkSetup() {
  $("#Back").click(function() {
    subMenuChange(Back, "Back");
  })
  $("#Thorax").click(function() {
    subMenuChange(Thorax, "Thorax");
  })
  $("#Abdomen").click(function() {
    subMenuChange(Abdomen, "Abdomen");
  })
  $("#Pelvis").click(function() {
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

