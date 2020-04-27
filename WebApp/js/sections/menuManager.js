

/**
 * @desc sets up the Menu Manager interface
*/
function menuManager(){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title"> Menu Manager</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".area-selection").append('<ul class="selection-container"></ul>');
    for(item in menu[0].regions){
        $(".selection-container").append('<li id="' + menu[0].regions[item].region.replace(/\s/g, '') + '" title="' + menu[0].regions[item].region + '" name="' + item + '"><h3 class="category-title">' + menu[0].regions[item].region + '</h3><h4 class="category-question-number"> 20 Questions | Default</h4></li>')
        $("#" + menu[0].regions[item].region.replace(/\s/g, '')).unbind().click(function(){
            managerMenuChange(menu[0].regions[this.getAttribute("name")], menu[0].regions[this.getAttribute("name")].region.replace(/\s/g, ''))
        })
    }
    $(".category-area").append('<div class="anatomy-section"><div class="management-area"/></div>')    
    $(".management-area").append('<div class="question-content"</div>')
 	$(".question-content").prepend('<form class="question-display"></form>')
 	$(".management-area").append('<div class="image-gallery"></div>')       
 	$(".management-area").append('<div class="options-panel"></div>')
 	$(".question-display").append('<label for="regionName">Name of Region</label><textarea id="regionName" name="regionName" placeholder="Enter the RegionName" rows="1"></textarea>')
 	$(".question-display").append('<form id="myform"><input id="fileUploader" type="file" name="filename"></form>')
    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", menuHandleFiles, false);
};


/**
 * @desc alters the menu when a top level region is selected
 * @param region - tree representation of the selected region holding any subregions
 * @param string regionName - name for the selected region
*/
function managerMenuChange(region, regionName) {
	$(".subRegion").remove();
    $(".subSubRegion").remove();
    var curSelected = document.getElementsByClassName("regionSelected");
    if(!(curSelected.length == 1 && curSelected[0].id == regionName)){
        $(".regionSelected").removeClass("regionSelected");
        addMenuManagerItems(region, regionName, "region", function(thisElement){
            $(".subRegionSelected").removeClass("subRegionSelected")
            $(thisElement).addClass("subRegionSelected")
            $("#submit").remove();
        });
        $("#myform").remove();
        $(".options-panel").empty();
 		$(".options-panel").append('<button id="submit" onclick="submitMenu()">Submit</button>')
 		$(".options-panel").append('<button id="delete" onclick="deleteMenu()">Delete Region</button>')

    } else {
        $(".regionSelected").removeClass("regionSelected");
        $(".questions-scroll").children().remove();
        $(".options-panel").empty();
        $(".question-display").append('<form id="myform"><input id="fileUploader" type="file" name="filename"></form>')
	    const inputElement = document.getElementById("fileUploader");
	    inputElement.addEventListener("change", menuHandleFiles, false);
    }
}



/**
 * @desc adds all the specified regions subregions to the menu 
 * @param region - tree representation of the selected region holding any subregions
 * @param string regionName - name for the selected region
 * @param string regionLevel - level of the selected region (subRegion or region)
 * @param onClick - called when the new menu items are clicked
*/
function addMenuManagerItems(region, regionName, regionLevel, onClick){
    $(".subSubRegion").remove();
    $("#" + regionName).addClass(regionLevel + "Selected");
    for(item in region.subRegions){
        $("#" + regionName).after('<li id="' + region.subRegions[item].subRegion.replace(/\s/g, '') + '"name="' + item +  '" class="subRegion"' +  ' title="' + region.subRegions[item].subRegion + '"> ' )
        $('#' + region.subRegions[item].subRegion.replace(/\s/g, '')).prepend('<h5 class="category-title">' + region.subRegions[item].subRegion + '</h5>')
        if(region.subRegions[item].subSubRegions[0] == undefined){
            $('#' + region.subRegions[item].subRegion.replace(/\s/g, '')).unbind().click(function(){
                onClick(this);
            })
        }
    }
}

/**
 * @desc creates an uploadable image object for when the user uploads the question
*/
function menuHandleFiles() {
    const imageFile = this.files[0];
    var reader  = new FileReader();
    // it's onload event and you forgot (parameters)
    reader.onload = function(e)  {
        var img = '<img src="' + 'placeholder"' + '" id="yourImage"/>'
        $(".image-gallery").empty();
        $(".image-gallery").append(img)
        $("#yourImage").attr("src", e.target.result);
     }
     // you have to declare the file loading
     reader.readAsDataURL(imageFile);
     $(".options-panel").empty();
     $(".options-panel").append('<button id="submit" onclick="submitMenu()">Submit</button>')
}

/**
 * @desc gets all the needed content for the new Menu Region and submits it to the server
*/
function submitMenu() {
    var data = {};
  	if($("#regionName").val() == ""){
    	alert("Please fill in region field");
    	return;
  	}

  	var reg = $("#regionName").val();
  	if(!(/^[a-zA-Z]+$/.test(reg.replace(/\s/g, '')))){
  		alert("Please remove symbols from region name")
  		return;
  	}
    //sub region is being added
  	if($(".regionSelected")[0]){
        var found = 0;
        var i = 0;
        var title = $(".regionSelected").attr("title");
        while(found == 0){
        	if(menu[0].regions[i].region == title) {
        		found = 1;
        	} else{
        		i++;
        	}
        }
        data.subSubRegions = [];
        data.subRegion = $("#regionName").val();
        menu[0].regions[i].subRegions.push(data);
        addMenu(data.subRegion);
    //main region is being added
    } else{
        var imageFile = document.forms.myform.elements.filename.files[0];
		if(!(imageFile)){
			alert("please select an image")
			return;
		}
		ajaxPostImage(website + "/image/s3", imageFile, function(link){
	        var realLink = 'http://' + link.imageUrl;
	        link.imageUrl = realLink;
	        data.subRegions = [];
		    data.region = $("#regionName").val();
		    data.imageUrl =  link.imageUrl;
		    menu[0].regions.push(data)
	        addMenu();
		}, function(){
			alert("image failed to be added")
		}, 1);


    }
}


/**
 * @desc submits the new flashcard to the server 
*/
function addMenu(title) {
    url = website + "/hierarchy";
    ajaxPut(url, menu[0], function(result) {
        
    }, function (error) {
        alert("unable to update menu\n error: " + error);
    }, 1)
    if(title) {
        updateVersion("flashcard", title)
        updateVersion("quiz", title)
        updateVersion("explore", title)
    }
    $("#menuManager").trigger("click"); 
}


/**
 * @desc removes the current Menu Region from the menu
*/
function deleteMenu(){
	var found = 0;
    var i = 0;
    var title = $(".regionSelected").attr("title");
    while(found == 0){
    	if(menu[0].regions[i].region == title) {
    		found = 1;
    	} else{
    		i++;
    	}
    }
	if($(".subRegionSelected")[0]){
		title = $(".subRegionSelected").attr("title")
		found = 0;
        var j = 0;
        while(found == 0){
        	if(menu[0].regions[i].subRegions[j].subRegion == title) {
        		found = 1;
        	} else{
        		j++;
        	}
        }
        var x = confirm("Are you sure you want to delete region **" + title + "** \n Make sure to remove all flashcards, quizzes and explore sections in this region before proceeding");
  		if(x){
       		menu[0].regions[i].subRegions.splice(j,1)
       		addMenu(title);
       	}
	} else{
        var x = confirm("Are you sure you want to delete region **" + title + "** \n Make sure to remove all flashcards, quizzes and explore sections in this region before proceeding");
  		if(x){
			menu[0].regions.splice(i,1);
			addMenu();
		}
	}
}
