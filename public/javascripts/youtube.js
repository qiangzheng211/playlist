requirejs(['jquery'],
  function ($) {
    
    function clearPx(str){
      return Number(str.replace(/px$/, ''));
    }

    //YouTube player functions refer to "https://developers.google.com/youtube/iframe_api_reference"
    var player;
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
    //loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    //creates an <iframe> (and YouTube player) after the API code downloads.
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('player1', {
        height: '390',
        width: '640',
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });
    }
    // The API will call this function when the video player is ready.
    function onPlayerReady(event) {
      event.target.loadPlaylist({
        playlist: window.playlist
      });
      //remove temp info
      $('script#temp').remove();
    }

    //The API calls this function when the player's state changes
    function onPlayerStateChange(event) {
      var index = player.getPlaylistIndex();
      var selected = $('.playlist li')[index];

      if (window.selected && window.selected != selected) {
        switchPlayingStatus(0, window.selected);
      }

      switchPlayingStatus(event.data, selected);
      window.selected = selected;

      /*InfoList functions */
      adjustInfo();
      //adjust selected location
      $('.playlist')[0].style['margin-top'] =  -(window.selected.offsetTop - window.selected.parentElement.offsetTop)  + 'px';

    }

    function switchPlayingStatus(data, selection) {
      switch (data) {
        case YT.PlayerState.PLAYING:
          selection.setAttribute('class', 'playing');
          break;
        case YT.PlayerState.ENDED:
          selection.setAttribute('class', '');
          break;
        case YT.PlayerState.PAUSED:
          selection.setAttribute('class', 'paused');
          break;
        case YT.PlayerState.BUFFERING:
          selection.setAttribute('class', 'buffering');
          break;
        case YT.PlayerState.CUED:
          selection.setAttribute('class', 'cued');
          break;
        default:
          selection.setAttribute('class', '');
      }
    }

    function adjustInfo(){
      var comp_style = window.getComputedStyle ? getComputedStyle(window.selected) : document.body.currentStyle(window.selected);

      //adjust infolist window as it changes sizes
      $('.playlist_container')[0].style.height =
       (clearPx(comp_style['height'])
       + clearPx(comp_style['padding-top'])
       + clearPx(comp_style['padding-bottom'])
       + clearPx(comp_style['margin-top'])
       + clearPx(comp_style['margin-bottom'])
     ) + 'px';

    }

    function stopVideo() {
      player.stopVideo();
    }

    // Dropdown change functions 
    $('.select_list').on('change', function(){
      window.location.href = '/' + this.value;
    });

    // Window Resize 
    $(window).on('resize', adjustInfo);

});
