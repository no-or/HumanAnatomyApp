$(document).ready(function(){
  $("#head").click(function(){
  	$(".subregion").remove();
  	$(".selected").removeClass("selected");
  	$("#head").addClass("selected");
  	for(item in head){
  		$("#head").after('<li id="' + head[item].replace(/\s/g, '') + '" class="subregion">')
  		$('#' + head[item].replace(/\s/g, '')).prepend('<h3 class="category-title">' + head[item] + '</h3>')
  	}
  })
  $("#lower").click(function(){
  	$(".subregion").remove();
  	$(".selected").removeClass("selected");
  	$("#lower").addClass("selected");
  	for(item in lower){
  		$("#lower").after('<li id="' + lower[item].replace(/\s/g, '') + '" class="subregion">')
  		$('#' + lower[item].replace(/\s/g, '')).prepend('<h3 class="category-title">' + lower[item] + '</h3>')
  	}
  })
  $("#upper").click(function(){
  	$(".subregion").remove();
  	$(".selected").removeClass("selected");
  	$("#upper").addClass("selected");
  	for(item in upper){
  		$("#upper").after('<li id="' + upper[item].replace(/\s/g, '') + '" class="subregion">')
  		$('#' + upper[item].replace(/\s/g, '')).prepend('<h3 class="category-title">' + upper[item] + '</h3>')
  	}
  })
  $("#trunk").click(function(){
  	$(".subregion").remove();
  	$(".selected").removeClass("selected");
  	$("#trunk").addClass("selected");
  	for(item in trunk){
  		$("#trunk").after('<li id="' + trunk[item].label.replace(/\s/g, '') + '" class="subregion">')
  		$('#' + trunk[item].label.replace(/\s/g, '')).prepend('<h3 class="category-title">' + trunk[item].label + '</h3>')
  	}
  })
});

var Back = {label: "Back", subregions : ["Trunk bones", "Trunk joints"]}
var Thorax = {label: "Thorax", subregions : ["Pectoral region", "Lungs & pleura", "Heart", "Superior and posterior mediastinum"]}
var Abdomen = {label: "Abdomen", subregions : ["Anterior abdominal wall", "Foregut organs", "Midgut & hindgut organs", "Posterior abdominal wall"]}
var Pelvis = {label: "Pelvis", subregions: ["Pelvic bones and muscles", "Pelvic joints & ligaments", "Male pelvis", "Female pelvis", "Perineum"]}

var trunk = [Back, Thorax, Abdomen, Pelvis];
var lower = ["Gluteal region", "Thigh", "Leg", "Foot", "Lower limb bones", "Lower limb joints"]
var upper = ["Scapular region", "Axilla", "Arm", "Forearm", "Hand", "Upper limb bones", "Upper limb Joints"];
var head = ["Skull and meninges", "Cavernous Sinus", "Orbit", "Neck", "Face", "Infratemporal fossa", "Oral Cavity", "Pharynx", "Larynx"]