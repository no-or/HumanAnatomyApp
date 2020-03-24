var imageSelectedSource = 2;


function buildImageScroll(region) {

    ajaxGet(website + "/image?region=" + region, function(response) {
        $(".image-gallery").empty();
        console.log(response)
        column1Length = response.length/2;
        column2Length = response.length/2;
        if(response.length == 0){
             $(".image-gallery").append('<div id="column1" class="column"></div>')
             $("#column1").append('<h3> No images for this region </h3>')
        }
        if(response.length % 2 == 1){
            column1Length += 0.5;
            column2Length -= 0.5;
        }
        $(".image-gallery").append('<div id="column1" class="column"></div>')

        for(var i = 0; i < column1Length; i++){
            $("#column1").append('<img id="imageScroll' + i*2 + '" onclick="pictureSelected(' + i*2 + ')"  src="' + response[i*2].imageUrl + '" title="' + response[i*2]._id +'">')
        }
        $(".image-gallery").append('<div id="column2" class="column"></div>')
        for(var i = 0; i < column2Length; i++){
            var imagenumber = i*2+1
            $("#column2").append('<img id="imageScroll' + imagenumber + '" onclick="pictureSelected(' + imagenumber + ')"  src="' + response[imagenumber].imageUrl + '" title="' + response[imagenumber]._id +'">')
        }
    }, function(error){
        console.log(error);
    })
}

function pictureSelected(imageSelected) {
    var id = "imageScroll" + imageSelected; 
    console.log(id);
    var imageUrl = $("#imageScroll" + imageSelected).attr("src");
    var imageId = $("#imageScroll" + imageSelected).attr("title");
    $(".image-gallery").empty();
    $("#myform").remove();
    var img = '<img src="' + imageUrl + '" id="yourImage" title="' + imageId + '"/>'
    $(".image-gallery").append(img)
    $(".options-panel").append('<button id="imageChangeButton" onclick="changeImage()">Change Image</button>')
    imageSelectedSource = 0;
}

function handleFiles() {
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
     $("#imageChangeButton").remove();
     $(".options-panel").append('<button id="imageChangeButton" onclick="changeImage()">Change Image</button>')
     imageSelectedSource = 1;
}

function changeImage() {
    var region = getRegion();
    buildImageScroll(region);
    $("#imageChangeButton").remove();
    imageSelectedSource = 2;
    $("#myform").remove();
    $(".question-display").append('<form id="myform"><input id="fileUploader" type="file" name="filename"></form>')
    const inputElement = document.getElementById("fileUploader");
    inputElement.addEventListener("change", handleFiles, false);
}

function getRegion() {
    if($(".subSubRegionSelected")[0]){
        region = $(".subSubRegionSelected").attr('title');
    } else{
        region = $(".subRegionSelected").attr('title');
    }
    return region;
}

function addImage(data, link) {
    var data3 = {};
    data3.region = data.region;
    data3.imageUrl =  link.imageUrl;
    ajaxPost(website + "/image", data3, function(){
      alert("image added to scroll correctly");
    },
    function(){
      alert("iamge failed to be added to scroll")
    });
}
