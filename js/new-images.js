$(document).ready(function() {
  image_gallery.init();
});

var image_gallery = {
  init: function() {

    // Upload Manager events
    // ------------
    var uploadItem = $('.upload-manager-content ul li');
    console.log('uploadItem is ... ', uploadItem);

    $(uploadItem).live('mouseenter', function() {
      $(this).addClass('upload-select');
      $(this).find('.cancel-upload').show();
    }).live('mouseleave', function() {
      $(this).removeClass('upload-select');
      $(this).find('.cancel-upload').hide();
    });

    $('.new-image-upload-btn').on("click", function(e) {
      $('#library-modal-container').show();
    });

    $('#toggle-grip').on("click", function() {
      $('.upload-manager-content').slideToggle('slow', function() {
        // Animation complete
        
      });
    });

    // End of Upload Manager
    // ------

    // Display the grid view by default.
    $('.image-gallery-container').html('');
    $('.image-gallery-container').append(_.template($('#image-grid-template').html()));

    // Event handlers for control buttons that display images in a grid format or list format.
    $('#list-option').on("click", function(e) {
      e.preventDefault();
      $('.image-gallery-container').html('');
      $('.image-gallery-container').append(_.template($('#image-list-template').html()));
      image_gallery.init_list();
    });

    // Toolbar button: This will display the images in a grid.
    $('#grid-option').on("click", function(e) {
      e.preventDefault();
      $('.image-gallery-container').html('');
      $('.image-gallery-container').append(_.template($('#image-grid-template').html()));
      image_gallery.init();
    });

    // Allow grid image display to become sortable.
    $('.image-grid').sortable({
      revert: true
    });

    // Display the 3 tool options on hover for grid view
    var imageItemSplash = $(".image-grid .thumbnail-item");
    $(imageItemSplash).live('mouseenter', function() {
      $(this).find('.tool-panel').show();
    }).live('mouseleave', function() {
      $(this).find('.tool-panel').hide();
    });

    // This on click event triggers the delete message overlay.
    var trashSelect = $(".image-grid .thumbnail-item .tool-panel .trash-thumb");
    $(trashSelect).on("click", function(e) {
      $(this).parent().parent().parent().parent().find('.grid-remove-message').show();
    });

    var gridRemoveCancel = $(".image-grid .thumbnail-item .grid-remove-message .grid-img-cancel");
    $(gridRemoveCancel).on("click", function(e) {
      $(this).parent().hide();
    });

    // Display single image modal view
    $('.expand-thumb').live("click", function(e) {
      e.preventDefault();
      //$('#modal-container').append(_.template($('#image-modal-template').html()));
      $('#modal-container').show();
    });

    // Cancel button located on image modal
    $('.cancel-image').live("click", function(e) {
      $('#modal-container').hide();
    });

    // Close button on image modal
    $('#close-image-modal').on("click", function(e) {
      e.preventDefault();
      $('#modal-container').hide();
    });

    // Display Link Panel
    var openLink = $('.tool-panel ul li img.link-thumb');
    $(openLink).on("click", function(e) {
      $(this).parent().parent().parent().parent().find('.link-panel-container').show();
    });

    // Close button for the Link Panel
    var closeLink = $('.link-panel-container .link-panel img.close-link');
    $(closeLink).on("click", function(e) {
      e.preventDefault();
      $(this).parent().parent().hide();
    });

    // CROPPER 
    // cropper variables
    image_gallery.ThumbnailHeight = 73;
    image_gallery.ThumbnailWidth = 110;
    image_gallery.minWidth = 450;
    image_gallery.minHeight = 100;

    $('#target').Jcrop({
      minSize: [ image_gallery.minWidth, image_gallery.minHeight ],
      boxWidth: 600,
      boxHeight: 400,
      onSelect: function(c) {
        // something here to calculate new w and h
      },
      allowResize: true,
      aspectRatio: 1 
    });

    // Select Image Library
    // -------------------------

    // By default menu highligh the "All Images" item
    $('#all-images').addClass('menu-select');
    $('#all-images').find('img').attr('src', 'images/tag-white-logo.png');

    
    // MENU Events
    $('.expand-my-images').on("click", function(e) {
      e.preventDefault();
      $('.image-tags').toggle('fast', function() {
        // animation is complete
        // replace triangle toggle icon
        $('div.expand-my-images').toggleClass('collapse-my-images');
      });
    });

    $('.expand-flickr').on("click", function(e) {
      e.preventDefault();
      $('.flickr-contents').toggle('fast', function() {
        $('div.expand-flickr').toggleClass('collapse-flickr');
      });
    });

    $('.expand-facebook').on("click", function(e) {
      e.preventDefault();
      $('.facebook-contents').toggle('fast', function() {
        $('div.expand-facebook').toggleClass('collapse-facebook');
      });
    });

    $('.expand-google').on("click", function(e) {
      e.preventDefault();
      $('.google-contents').toggle('fast', function() {
        $('div.expand-google').toggleClass('collapse-google');
      });
    });

    var tag_item = $('ul.image-tags li');
    var flickr_item = $('ul.flickr-contents li');
    var facebook_item = $('ul.facebook-contents li');
    var google_item = $('ul.google-contents li');

    $(tag_item).on("click", function(e) {
      e.preventDefault();
      image_gallery.remove_menu_item(tag_item, 'tag-logo.png');
      image_gallery.remove_menu_item(flickr_item, 'img-logo.png');
      image_gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      image_gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/tag-white-logo.png');
    });

    $(flickr_item).on("click", function(e) {
      e.preventDefault();
      image_gallery.remove_menu_item(flickr_item, 'img-logo.png');
      image_gallery.remove_menu_item(tag_item, 'tag-logo.png');
      image_gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      image_gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/img-white-logo.png');
    });

    $(facebook_item).on("click", function(e) {
      e.preventDefault();
      image_gallery.remove_menu_item(flickr_item, 'img-logo.png');
      image_gallery.remove_menu_item(tag_item, 'tag-logo.png');
      image_gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      image_gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/folder-white-logo.png');
    });

    $(google_item).on("click", function(e) {
      e.preventDefault();
      image_gallery.remove_menu_item(flickr_item, 'img-logo.png');
      image_gallery.remove_menu_item(tag_item, 'tag-logo.png');
      image_gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      image_gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/google-plus-white-logo.png');
    });

    $('#close-image-modal').live("click", function(e) {
      $('#modal-container').hide();
      $('#library-modal-container').hide();
    });

    // Events for select images dialog
    // ---------------------------------
      
    $('.library-select').on("click", function() {
      console.log('library-select is ... ', this);
      // find the image src and save it.
      var imageSrc = $(this).find('img').attr('src');
      // find the image id and assign it to a variable
      var imageID = $(this).find('img').data('id');
      if ($(this).find('.image-status').is(":visible")) {
        $(this).find('.image-status').hide();
        $('#selected-images').find('.#roll-item-' + imageID).remove();
      } else {
        $(this).find('.image-status').show();
        var photo_roll = { image: imageSrc, image_id:imageID };
        $('#selected-images').append(_.template($('#photo-roll-item-template').html(), { photo_roll: photo_roll }));
      }

    });

    $('.select-img-status').hover(function() {
      $(this).parent().find('.website-info').show();
    }, function() {
      $(this).parent().find('.website-info').hide();
    });

    $('#selected-images').sortable({
      revert: true
    });

    // Event handling for displaying hover tool tip for selected images.
    var selectedImageItem = $('.image-select');
    console.log('selectedImageItem ... ', selectedImageItem);
    $(selectedImageItem).live("mouseenter", function() {
      console.log('selectedImageItem ... ', this);
      $(this).find('.tooltip-image-container').show();
    }).live("mouseleave", function() {
      console.log('selectedImageItem ... ', this);
      $(this).find('.tooltip-image-container').hide();
    });

  },

  init_list: function() {
    // Allow the list image display to become sortable.
    $('#sortable').sortable({
      revert: true
    });

    //Event that will display the tools list panel
    var listThumbnail = $('ol.slats li h3');
    $(listThumbnail).live("mouseenter", function() {
      $(this).find('.tool-list-panel').show();
    }).live("mouseleave", function() {
      $(this).find('.tool-list-panel').hide();
    });

    // Event that will display the link panel
    var openListLink = $('ol.slats h3 .tool-list-panel img.link-thumb');
    $(openListLink).live("click", function(e) {
      e.preventDefault();
      $(this).parent().parent().find('.link-list-panel-container').show();
    });

    // Hookup the close button for the link panel
    var closeListLink = $('ol.slats h3 .link-list-panel-container .link-list-panel img.close-link');
    $(closeListLink).live("click", function(e) {
      e.preventDefault();
      $(this).parent().parent().hide();
    });

    // Event handler that displays the image modal
    $('.expand-thumb').live("click", function(e) {
      e.preventDefault();
      //$('#modal-container').append(_.template($('#image-modal-template').html()));
      $('#modal-container').show();
    });

    // Display the remove message for gallery list items
    var deleteListItem = $('ol.slats li .slat-controls ul.slat-actions img.delete-action');
    $(deleteListItem).live("click", function(e) {
      $(this).parent().parent().parent().parent().find('.remove-image-message').show();
    });

    var cancelRemoveMessage = $('ol.slats li .remove-image-message .image-delete-controls a.cancel-list-message');
    $(cancelRemoveMessage).live("click", function(e) {
      e.preventDefault();
      $(this).parent().parent().parent().hide();
    });
      
  },

  remove_menu_item: function(menu_item, icon) {
    $(menu_item).each(function() {
      $(this).removeClass('menu-select');
    });
    $(menu_item).find('img').attr('src', 'images/' + icon);
  }
}
