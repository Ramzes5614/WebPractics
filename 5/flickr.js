var timer = undefined;

function slideShow(photos) {    
  var index = 0;
  function displayPhoto() {      
    $("#photos").hide();
    $("#photos").empty();
    $("#photos").append(photos[index]);
    $("#photos").fadeIn();
  }  
  displayPhoto();
  timer = setInterval(function () {
      console.log(photos[0]);      
      if(index+1 === photos.length){
        clearInterval(timer);
        console.log("stopped");
      }
    index++;
    displayPhoto();
  }, 3000);
}

var main = function () {
  $("form").submit(function (evt) {
    if(timer !== undefined) clearInterval(timer);
    $("#photos").hide();
    $("#photos").empty();
    evt.preventDefault();

    var $searchField = $("#search");
    var $submitButton = $("#submit");

    $searchField.prop("disabled", true);
    $submitButton.attr("disabled", true).val("Идет поиск...");

    var flickerAPI =
      "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";    
    var flickrOptions = {      
      format: "json",
    };
    function displayPhotos(data) {
        var photos = [];            
      $.each(data.items, function (i, photo) {        
        var photoHTML="";
        photoHTML += '<div class="grid-25 tablet-grid-50">';
        photoHTML += '<a href="' + photo.link + '" class="image">';
        photoHTML += '<img src="' + photo.media.m + '"></a></div>';
        photos.push(photoHTML);           
      });                  
      
//      $("#photos").html(photoHTML);

      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");

      slideShow(photos);      
    }

    $.getJSON(flickerAPI, flickrOptions, displayPhotos);
  });
};

$(document).ready(main);
