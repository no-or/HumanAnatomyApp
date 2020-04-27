

/**
 * @desc sets up the Admin Manager interface
 * @param section - name of the current section (Admin Manager)
*/
function buildAdminMenu(section){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".category-area").append('<div class="anatomy-section"></div>');
    $(".anatomy-section").append('<div class="management-area"/>');
    $(".management-area").append('<div class="video-area1"/>');
    $(".management-area").append('<div class="video-area2"/>');
    var url = website + '/admin';
    ajaxGetAuth(url, function(result) {
    	var regionNumber = 0;
    	for(item in result){
            if(regionNumber % 2 == 0){
                $(".video-area1").append('<div class="videoMenu" id="videoRegion' + regionNumber + '" />')
            } else{
                $(".video-area2").append('<div class="videoMenu" id="videoRegion' + regionNumber + '" />')
            }
			$("#videoRegion" + regionNumber).append('<h3>' + result[item].name + '</h3>');
			$("#videoRegion" + regionNumber).append('<div class="video" id="video' + item + '" name="'+ result[item].name +'" title="' + result[item]._id + '"/>');
			$("#video" + item).append('<button onclick="deleteAdmin(' + item + ')">Delete Admin</button>');
			regionNumber++;
    	}
    	$(".management-area").append('<div class="options-panel"></div>')   

    }, function (error){
    	alert("unable to get all current admins. \nerror: " + error)
    });    
};


/**
 * @desc deletes the corresponding admins
 * @param index - index of the Admin in the list of all contributors
*/
function deleteAdmin(index){
	var id = document.getElementById("video" + index).getAttribute('title');
    var name = document.getElementById("video" + index).getAttribute('name')
	var url = website + "/admin/" + id;
    var x = confirm("Are you sure you want to delete Admin= " + name);
    if(x){
    	ajaxDelete(url, function(result){
    		alert("Admin deleted")
    		$("#adminManager").trigger("click")
    	}, function(error){
    		alert("Admin failed to be deleted\n error: " + error)
    	}, 1)
    }
}
