$(document).ready(function() {
  alt.init();
});

var alt = {

  init: function() {

    $('.alt-image-preview-container').html('');
    $('.alt-image-preview-container').append(_.template($('#alt-image-grid-template').html()));
    
    // Toolbar button: This will display the images in list view.
    $('#alt-list-option').on("click", function(e) {
      e.preventDefault();
      $('.alt-image-preview-container').html('');
      $('.alt-image-preview-container').append(_.template($('#alt-image-list-template').html()));
      $('#sortable').sortable();
      alt.init_list();
    });

    // Toolbar button: This will display the images in a grid.
    $('#alt-grid-option').on("click", function(e) {
      e.preventDefault();
      $('.alt-image-preview-container').html('');
      $('.alt-image-preview-container').append(_.template($('#alt-image-grid-template').html()));
      alt.init();
    });

    $('.alt-image-grid').sortable({ revert: true });
  },

  init_list: function() {
    $('.alt-image-list').sortable({ revert: true });
  }




}
