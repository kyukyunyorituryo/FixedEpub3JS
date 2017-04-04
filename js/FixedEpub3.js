var imgfile= [];
  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
          imgfile.push( e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('files').addEventListener('change', handleFileSelect, false);});
  

(function () {
  if (!window.FileReader || !window.ArrayBuffer) {
    $("#error_block").removeClass("hidden").addClass("show");
    return;
  }


  var $result = $("#result");
  $("#file").on("change", function(evt) {
    // remove content
    $result.html("");
    // be sure to show the results
    $("#result_block").removeClass("hidden").addClass("show");

    // Closure to capture the file information.
    function handleFile(f) {
      var $title = $("<h4>", {
        text : f.name
      });
      var $fileContent = $("<ul>");
      $result.append($title);
      $result.append($fileContent);
    
      var dateBefore = new Date();
      JSZip.loadAsync(f)
      .then(function(zip) {
        var dateAfter = new Date();
        $title.append($("<span>", {
          text:" (loaded in " + (dateAfter - dateBefore) + "ms)"
        }));


        zip.forEach(function (relativePath, zipEntry) {
          $fileContent.append($("<li>", {
            text : zipEntry.name
          }));
        });
      }, function (e) {
        $fileContent = $("<div>", {
          "class" : "alert alert-danger",
          text : "Error reading " + f.name + " : " + e.message
        });
      });
    }

    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        handleFile(f);
    }
  });
})();


      // FIXME find how to do that cleanly
      (function(){
        var tables = document.getElementsByTagName("table");
        for(var i = 0; i < tables.length; i++) {
          tables[i].className += " table table-condensed table-striped table-bordered ";
        }
      })();


imgData = "R0lGODdhBQAFAIACAAAAAP/eACwAAAAABQAFAAACCIwPkWerClIBADs=";

jQuery(function($) {
  if(!JSZip.support.blob) {
      $("#demo-not-supported").removeClass("hidden");
      $("#demo").hide();
      return;
  }
  $("#demo").click(function () {
var zip = new JSZip();
zip.file("mimetype", "application/epub+zip");
var meta = zip.folder("META-INF");
var container = zip.folder("OPS");
var img = zip.folder("OPS/images");
for (j = 0; j < imgfile.length; j++){
img.file("smile"+ j+".png", imgfile[j].split('base64,')[1], {base64: true});
}
zip.generateAsync({type:"blob"})
.then(function(content) {
// see FileSaver.js
saveAs(content, "example.epub");
});
  });
});
