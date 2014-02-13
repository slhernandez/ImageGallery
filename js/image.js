$(document).ready(function() {
  image.init();
});

var image = {
  init: function() {
    $('#image-list-item').html('');
    $('#image-list-item').append(_.template($('#image-list-template').html()));

    // Image with text block demo
    // -----------------------------
    /*$('#image-drag-container').on("click", function(e) {
      e.preventDefault();
      $('#image-list-item').html('');
      $('#image-list-item').append(_.template($('#image-list-template').html()));
    });*/

  }
}

