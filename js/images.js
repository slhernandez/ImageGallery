$(document).ready(function() {
  images.init();
});

var images = {
  init: function() {


/*  var template = '<div class="preview">'+
						'<span class="imageHolder">'+
							'<img />'+
							'<span class="uploaded"></span>'+
						'</span>'+
						'<div class="progressHolder">'+
							'<div class="progress"></div>'+
						'</div>'+
					'</div>'; 

    dropbox.filedrop({
      // The name of the files entry
      paraname: 'pic',
      maxfiles: 5,
      url: 'post_file.php',

      uploadFinished: function(i, file, response) {
        console.log(response);
      },

      error: function(err, file) {
        switch(err) {
          case 'BrowserNotSupported':
            showMessage('Your browser does not support HTML5 file uploads!');
            break;
          case 'TooManyFiles':
            alert('Too many files! Please select 5 at most! (configurable)');
            break;
          case 'FileTooLarge':
            alert(file.name+' is too large! Please upload files up to 2mb (configurable)');
            break;
          default:
            break;
        }
      },

      beforeEach: function(file) {
      },

      uploadStarted: function(i, file, len) {
      },

      progressUpdated: function(i, file, progress) {
      }

    });
*/

    // By default menu highligh the "All Images" item
    $('#all-images').addClass('menu-select');
    $('#all-images').find('img').attr('src', 'images/tag-white-logo.png');


    $('#selected-images').sortable({
      revert: true
    });

    $('#sortable').sortable({
      revert: true
    });

    $('ol li').disableSelection();

    $('.upload-btn').on("click", function(e) {
      e.preventDefault();
      $('#library-modal-container').show();
    });

    $('.expand-thumb').live("click", function(e) {
      e.preventDefault();
      $('#modal-container').show();
    });

    var imageSelectHover = $('.image-select');
    $(imageSelectHover).live('mouseenter', function() {
      $(this).find('.tooltip-image-container').show();
    }).live('mouseleave', function() {
      $(this).find('.tooltip-image-container').hide();
    });

    // CROPPER 
    // cropper variables
    images.ThumbnailHeight = 73;
    images.ThumbnailWidth = 110;
    images.minWidth = 450;
    images.minHeight = 100;

    $('#target').Jcrop({
      minSize: [ images.minWidth, images.minHeight ],
      boxWidth: 600,
      boxHeight: 400,
      onSelect: function(c) {
        // something here to calculate new w and h
      },
      allowResize: true,
      aspectRatio: 1 
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
        //$(this).removeClass('selected-image');
      } else {
        $(this).find('.image-status').show();
        var photo_roll = { image: imageSrc, image_id:imageID };
        $('#selected-images').append(_.template($('#photo-roll-item-template').html(), { photo_roll: photo_roll }));
        //$(this).addClass('selected-image');
      }
    });

    $('.select-img-status').hover(function() {
      $(this).parent().find('.website-info').show();
    }, function() {
      $(this).parent().find('.website-info').hide();
    });
          
    // ---------------------------------

    $('#cancel-edit').live("click", function(e) {
      e.preventDefault();
      $('.edit-meta-container').hide();
    });

    $('.image-preview-container').html('');
    $('.image-preview-container').append(_.template($('#image-grid-template').html()));

    // Events for Image Gallery Block
    var gridEditThumb = $('.image-grid .thumbnail-item .white-splash img.edit-thumb');
    $(gridEditThumb).live("click", function(e) {
      e.preventDefault();
      console.log('gridEditThumb ... ', gridEditThumb);
      //$(this).show('.edit-meta-container').show();
      //$(this).parent().parent().parent().find('.edit-meta-container').show()
      $(this).parent().parent().find('.edit-meta-container').show();
    });

    // Make the grid sortable
    $('.image-grid').sortable({
      revert: true
    });

    // Image grid selection
    // ------------------------
    var imageItemSplash = $(".image-grid .thumbnail-item");
    /*console.log($(imageItemSplash));
    $(imageItemSplash).on("click", function(e) {
      console.log('this is ... ', this);
    });*/

    var trashSelect = $(".image-grid .thumbnail-item .white-splash .trash-thumb");
    $(trashSelect).on("click", function(e) {
      $(this).parent().parent().parent().find('.grid-remove-message').show();
    });

    var gridRemoveCancel = $(".image-grid .thumbnail-item .grid-remove-message .grid-img-cancel");
    $(gridRemoveCancel).on("click", function(e) {
      $(this).parent().hide();
    });

    $(imageItemSplash).live('mouseenter', function() {
      $(this).find('.white-splash').show();
    }).live('mouseleave', function() {
      $(this).find('.white-splash').hide();
    });

    $('#close-image-modal').live("click", function(e) {
      $('#modal-container').hide();
      $('#library-modal-container').hide();
    });

    // Cancel button located on image modal
    $('.cancel-image').live("click", function(e) {
      $('#modal-container').hide();
    });

    // Toolbar button: This will display the images in list view.
    $('#list-option').on("click", function(e) {
      e.preventDefault();
      $('.image-preview-container').html('');
      $('.image-preview-container').append(_.template($('#image-list-template').html()));
      $('#sortable').sortable();
      images.initListView();
    });

    // Toolbar button: This will display the images in a grid.
    $('#grid-option').on("click", function(e) {
      e.preventDefault();
      $('.image-preview-container').html('');
      $('.image-preview-container').append(_.template($('#image-grid-template').html()));
      images.init();
    });

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
      images.remove_menu_item(tag_item, 'tag-logo.png');
      images.remove_menu_item(flickr_item, 'img-logo.png');
      images.remove_menu_item(facebook_item, 'folder-logo.png');
      images.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/tag-white-logo.png');
    });

    $(flickr_item).on("click", function(e) {
      e.preventDefault();
      images.remove_menu_item(flickr_item, 'img-logo.png');
      images.remove_menu_item(tag_item, 'tag-logo.png');
      images.remove_menu_item(facebook_item, 'folder-logo.png');
      images.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/img-white-logo.png');
    });

    $(facebook_item).on("click", function(e) {
      e.preventDefault();
      images.remove_menu_item(flickr_item, 'img-logo.png');
      images.remove_menu_item(tag_item, 'tag-logo.png');
      images.remove_menu_item(facebook_item, 'folder-logo.png');
      images.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/folder-white-logo.png');
    });

    $(google_item).on("click", function(e) {
      e.preventDefault();
      images.remove_menu_item(flickr_item, 'img-logo.png');
      images.remove_menu_item(tag_item, 'tag-logo.png');
      images.remove_menu_item(facebook_item, 'folder-logo.png');
      images.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/google-plus-white-logo.png');
    });

  },

  initListView: function() {
    var imageListItem = $('.image-list ol.slats li');
    /*$(imageListItem).live('mouseenter', function() {
      $(this).find('.slat-controls').show();
    }).live('mouseleave', function() {
      $(this).find('.slat-controls').hide();
    });*/

    var listTrashIcon = $('ol.slats li .slat-controls li.remove-img-item');
    console.log('listTrashIcon ... ', listTrashIcon);
    $(listTrashIcon).on("click", function(e) {
      console.log('listTrashIcon ... ', this);
      $('.remove-image-message').show();
    });

    $('.black-img-cancel-delete').on("click", function(e) {
      e.preventDefault();
      $('.remove-image-message').hide();
    });

    // List item thumbnail
    imageListThumbnailItem = $('.image-list ol.slats li');
    $(imageListThumbnailItem).live('mouseenter', function() {
      $(this).find('h3 .image-list-controls').show();
    }).live('mouseleave', function() {
      $(this).find('h3 .image-list-controls').hide();
    });


    // click event edits
    $('#edit-thumb-1').on("click", function(e) {
      e.preventDefault();
      $('.edit-list-meta-container').show();
    });
    $('#edit-thumb-2').on("click", function(e) {
      e.preventDefault();
      $('.edit-list-meta-container').show();
    });
    $('#cancel-edit').live("click", function(e) {
      e.preventDefault();
      $('.edit-list-meta-container').hide();
    });

    /*var slatActionRemove = $('.slat-actions li.remove-img-item');
    $(slatActionRemove).on("click", function(e) {
      e.preventDefault();
      $('.remove-image-message').show(); 
    });*/

  },

   remove_menu_item: function(menu_item, icon) {
    $(menu_item).each(function() {
      $(this).removeClass('menu-select');
    });
    $(menu_item).find('img').attr('src', 'images/' + icon);
  },

  /*createImage: function(file) {

    var preview = $(template),
        image = $('img', preview);

    var reader = new FileReader();

    image.width = 100;
    image.height = 100;

    reader.onload = function(e) {
      image.attr('src', e.target.result);
    }

    reader.readAsDataURL(file);

    message.hide();
    preview.appendTo(dropbox);

    $.data(file, review);

  }*/

}

