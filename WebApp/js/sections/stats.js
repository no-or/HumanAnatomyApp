

function buildStatsMenu(section, onClick){
    $(".content").children().remove()
    $(".content").append('<div class="topbar"><h2 class="topbar-title">' + section + '</h2></div>')  
    $(".content").append('<div class="category-area"></div>');
    $(".category-area").append('<div class="area-selection"></div>');
    $(".category-area").append('<div class="anatomy-section"></div>');
    $(".anatomy-section").append('<div class="management-area"/>');
    var url = website + '/stat';
    ajaxGetAuth(url, function(result) {

    	var universities = [];
    	var universityNum = [];
    	var degree = [];
    	var degreeNum = [];
    	var educationLevel = [];
    	var educationNum = [];
    	var year = [];
    	var yearNum = [];

    	for(item in result){
    		if(result[item].university){
	    		var uniIndex = universities.indexOf(result[item].university.toLowerCase())
	    		if(uniIndex == -1){
	    			universities.push(result[item].university.toLowerCase())
	    			universityNum.push(1)
	    		}else{
	    			universityNum[uniIndex]++;
	    		}
	    	}

	    	if(result[item].degree){
	    		var degreeIndex = degree.indexOf(result[item].degree.toLowerCase())
	    		if(degreeIndex == -1){
					degree.push(result[item].degree.toLowerCase())
	    			degreeNum.push(1)
	    		}else{
	    			degreeNum[degreeIndex]++;
	    		}
			}

			if(result[item].educationLevel){
	    		var educationIndex = educationLevel.indexOf(result[item].educationLevel.toLowerCase())
	    		if(educationIndex == -1){
					educationLevel.push(result[item].educationLevel.toLowerCase())
	    			educationNum.push(1)
	    		}else{
	    			educationNum[educationIndex]++;
	    		}
	    	}

	    	if(result[item].year){
	    		var yearIndex = year.indexOf(result[item].year)
	    		if(yearIndex == -1){
	    			year.push(result[item].year)
	    			yearNum.push(1)
	    		}else{
	    			yearNum[yearIndex]++;
	    		}
	    	}
    	}
    	$(".management-area").append('<table id=uniTable />')
    	$(".management-area").append('<table id=degreeTable />')
    	$(".management-area").append('<table id=educationTable />')
    	$(".management-area").append('<table id=yearTable >')

    	$("#uniTable").append('<tr><th> University </th>' + '<th> Number of users </th></tr>')
    	$("#degreeTable").append('<tr><th> Degree </th>' + '<th> Number of users </th></tr>')
    	$("#educationTable").append('<tr><th> Education Level </th>' + '<th> Number of users </th></tr>')
    	$("#yearTable").append('<tr><th> Education Year </th>' + '<th> Number of users </th></tr>')
    	for(item in universities){
    		$("#uniTable").append('<tr><th>' + universities[item] + "</th>" + '<th>' + universityNum[item] + "</th></tr>")
    	}    
    	for(item in degree){
    		$("#degreeTable").append('<tr><th>' + degree[item] + "</th>" + '<th>' + degreeNum[item] + "</th></tr>")
    	}    
    	for(item in educationLevel){
    		$("#educationTable").append('<tr><th>' + educationLevel[item] + "</th>" + '<th>' + educationNum[item] + "</th></tr>")
    	}    
    	for(item in year){
    		$("#yearTable").append('<tr><th>' + year[item] + "</th>" + '<th>' + yearNum[item] + "</th></tr>")
    	}    

    }, function (error){
    	console.log(error)
    }, 1);    
};