$(document).ready(function() {
  gallery.init();
});

var gallery = {
  init: function() {

    $(".meter > span").each(function() {
      $(this).data("origWidth", $(this).width()).width(0).animate({width:$(this).data("origWidth")},1200);
    });

    // By default menu highligh the "All Images" item
    $('#all-images').addClass('menu-select');
    $('#all-images').find('img').attr('src', 'images/tag-white-logo.png');


    // Gallery Demo Page
    $('#single-image-modal').on("click", function(e) {
      e.preventDefault();
      $('#modal-container').html('');
      $('#modal-container').append(_.template($('#single-image-modal-template').html()));
      $('#modal-container').show();
    });

    $('#image-lib-single-modal').on("click", function(e) {
      e.preventDefault();
      $('#modal-container').html('');
      $('#modal-container').append(_.template($('#image-lib-single-modal-template').html()));
      $('#modal-container').show();
    });

    // Hover event for displaying a list of sites a photo is currently displayed on.
    var siteStatusNum = $('p.on-site-status');
    $(siteStatusNum).hover(function() {
      $(this).parent().find('.site-list-container').show()
    }, function() {
      $(this).parent().find('.site-list-container').hide()
    });

    // CROPPER 
    // cropper variables
    gallery.ThumbnailHeight = 73;
    gallery.ThumbnailWidth = 110;
    gallery.minWidth = 450;
    gallery.minHeight = 100;

    $('#target').Jcrop({
      minSize: [ gallery.minWidth, gallery.minHeight ],
      boxWidth: 700,
      boxHeight: 400,
      onSelect: function(c) {
        // something here to calculate new w and h
      },
      allowResize: true,
      aspectRatio: 1 
    });

    // VARIOUS EVENTS FOR DEMO PAGE
    // ----------------------------
   
    var imageItemHover = $('.image-item');
    $(imageItemHover).hover(function() {
      if ($(this).find('.img-delete-msg').is(":visible")) {
        return;
      } else {
        $(this).find('.img-meta').fadeIn().show();
      }
    }, function() {
      $(this).find('.img-meta').hide();
    });

    /*$(imageItemHover).on("click", function(e) {
      e.preventDefault();
      $(this).find('#modal-container').show();
    }); */

    $('#close-image-modal').live("click", function(e) {
      $('#modal-container').hide();
    });

    // Cancel button located on image modal
    $('.cancel-image').live("click", function(e) {
      $('#modal-container').hide();
    });

    /*var imageMeta = $('.img-meta');
    $(imageMeta).on("click", function(e) {
      $('#modal-container').show();
    });*/

    var imageControlEdit = $('.image-item .image-controls .edit-img');
    $(imageControlEdit).on("click", function(e) {
      e.preventDefault();
      //$(this).parent().parent().parent().find('.edit-meta-container').show();
      $('#modal-container').show();
    });

    $('#cancel-edit').live("click", function(e) {
      e.preventDefault();
      $('.edit-meta-container').hide();
    });

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
      console.log('tag_item ... ', this);
      if ($(this).hasClass('add-tag')) {
        return; 
      }
      gallery.remove_menu_item(tag_item, 'tag-logo.png');
      gallery.remove_menu_item(flickr_item, 'img-logo.png');
      gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/tag-white-logo.png');
    });

    $(flickr_item).on("click", function(e) {
      e.preventDefault();
      gallery.remove_menu_item(flickr_item, 'img-logo.png');
      gallery.remove_menu_item(tag_item, 'tag-logo.png');
      gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/img-white-logo.png');
    });

    $(facebook_item).on("click", function(e) {
      e.preventDefault();
      gallery.remove_menu_item(flickr_item, 'img-logo.png');
      gallery.remove_menu_item(tag_item, 'tag-logo.png');
      gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/folder-white-logo.png');
    });

    $(google_item).on("click", function(e) {
      e.preventDefault();
      gallery.remove_menu_item(flickr_item, 'img-logo.png');
      gallery.remove_menu_item(tag_item, 'tag-logo.png');
      gallery.remove_menu_item(facebook_item, 'folder-logo.png');
      gallery.remove_menu_item(google_item, 'google-plus-logo.png');
      $(this).addClass('menu-select');
      $(this).find('img').attr('src', 'images/google-plus-white-logo.png');
    });

    $('#square-ratio').hover(function() {
      $('.square-container').show();
    }, function() {
      $('.square-container').hide();
    });

    $('#sixteen-nine-ratio').hover(function() {
      $('.sixteen-nine-container').show();
    }, function() {
      $('.sixteen-nine-container').hide();
    });

    $('#four-three-ratio').hover(function() {
      $('.four-three-container').show();
    }, function() {
      $('.four-three-container').hide();
    });

    var closeImgBtn = $('.close-img');
    $(closeImgBtn).on("click", function(e) {
      e.preventDefault();
      $(this).parent().parent().find('.img-meta').hide();
      $(this).parent().parent().find('.img-delete-msg').show();
    });

    $('.img-cancel-delete a').on("click", function(e) {
      e.preventDefault();
      $('.img-delete-msg').hide();
    });

    var imageSelectHover = $('.image-select');
    $(imageSelectHover).hover(function() {
      $(this).find('.tooltip-image-container').show();
    }, function() {
      $(this).find('.tooltip-image-container').hide();
    });

  },

  remove_menu_item: function(menu_item, icon) {
    $(menu_item).each(function() {
      $(this).removeClass('menu-select');
    });
    $(menu_item).find('img').attr('src', 'images/' + icon);
  }

};
