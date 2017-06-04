$(".fileUpload").on("change", ".uploadBtn", function () {
        $(this).siblings(".fileName").text($(this).val().replace(/C:\\fakepath\\/i, ''));
});

function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results===null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function setGallery(){
  $('.square,.lb-prev,.lb-next').on('click',function(e){
    e.preventDefault();
    $('.lb-overlay').removeClass('show');
    $overlay = $(this).attr('href');
    $("#"+$overlay).addClass('show');
    $("#"+$overlay +"> div").find('.lb-prev').attr('href',parseInt($overlay)+1);
    $("#"+$overlay +"> div").find('.lb-next').attr('href',parseInt($overlay)-1);
  });
  $('.lb-close').on('click',function(e){
    e.preventDefault();
    $(this).parent().removeClass('show');
  });
}
$(document).ready(function(){
    $('.photo_assets').click(function(){
      setGallery();
    });
});


jQuery(function($) {

  $("form").on("change", ".uploadBtn", function(){
      $(this).parent(".fileUpload").find(".fileName").text($(this).val().replace(/.*(\/|\\)/, '') );
  });

  $('#bookmark-this').click(function(e) {
    var bookmarkURL = window.location.href;
    var bookmarkTitle = document.title;

    if ('addToHomescreen' in window && addToHomescreen.isCompatible) {
      // Mobile browsers
      addToHomescreen({ autostart: false, startDelay: 0 }).show(true);
    } else if (window.sidebar && window.sidebar.addPanel) {
      // Firefox <=22
      window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
      // Firefox 23+ and Opera <=14
      $(this).attr({
        href: bookmarkURL,
        title: bookmarkTitle,
        rel: 'sidebar'
      }).off(e);
      return true;
    } else if (window.external && ('AddFavorite' in window.external)) {
      // IE Favorites
      window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
      // Other browsers (mainly WebKit & Blink - Safari, Chrome, Opera 15+)
      alert('Press ' + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.');
    }

    return false;
  });
});
