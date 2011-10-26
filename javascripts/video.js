/** IFAD Video Player jQuery Plugin **
 *
 * Requires the following markup:
 *
  <div class="video"
    data-player="swf/flowplayer-3.2.7.swf"
    data-controls="swf/flowplayer.controls-3.2.5.swf"
    data-rtmp="swf/flowplayer.rtmp-3.2.3.swf">

    <div class="loading player"
      data-source="rtmp://origin01.westream.com/ws-ifad/"
      data-stream="ws-ifad/GC34">
    </div>
  </div>
 *
 * Moreover, you could have custom markup to show when
 * errors occur, such as an iOS device or missing flash.
 * This markup must be inside the "video" container:
 *
   <div style="display:none" class="errors">
     <div class="error noflash">
       <h3>You need Flash Player to view the video stream</h3>
       <p>You can <%= link_to 'download it here', 'http://get.adobe.com/flashplayer/' %>.</p>
     </div>

     <div class="error iosdevice">
       <h3>The video stream may not display on all devices.</h3>
       <p>We're sorry about that, but your device is not supported.</p>
     </div>
    </div>
 *
 * -- m.barnaba@ifad.org  Wed Oct 26 12:21:42 CEST 2011
 **/
$.fn.IFADvideoPlayer = function () {
  return this.each (function () {

    var video  = $(this),
        player = video.find ('.player'),
        errors = video.find ('.errors');

    var noFlash   = errors.find ('.noflash').detach (),
        iOSDevice = errors.find ('.iosdevice').detach ();

    errors.remove ();

    if (player.data ('autoplay') === undefined)
      player.data ('autoplay', true);

    player.flowplayer ({
      /* Flash configuration */
      src:     video.data ('player'),
      version: [10, 0],
      onFail:  function () {
        var err;

        if (/iP(ad|od|hone)/.test (navigator.userAgent))
          err = iOSDevice;
        else
          err = noFlash;

        video.removeClass ('loading').html (err);
      }
    },
    {
      /* Player configuration */
      clip: {
        url      : player.data ('stream'),
        live     : true,
        provider : 'westream',
        autoPlay : player.data ('autoplay')
      },

      plugins: {
        westream: {
          url              : video.data ('rtmp'),
          netConnectionUrl : player.data ('source'),
        },
        controls: {
          url              : video.data ('controls'),
          height           : 30,
          fullscreen       : true,
          autoHide         : true
        }
      },

      onLoad: function () {
        video.removeClass ('loading');
      },
      onError: function (code, message) {
        switch (code) {
        case 200:
          this.pause ();
          this.stop ();

          $.IFADnotify ("The stream has not yet started. Please retry later!");
          return true;

        default:
          $.IFADnotify ("Aw, snap! Something went wrong. Please try again.");
          return true;
        }
      }
    });

  });
};


/** IFAD Notification plugin **
 *
 * Requires the following markup:
 *
  <div id="notification">
    <span class="text"></span>
    <a href="#" class="close">close</a>
  </div>
 *
 * -- m.barnaba@ifad.org  Wed Oct 26 12:25:45 CEST 2011
 */
$.IFADnotify = (function () {
  var note  = $('#notification'),
      text  = note.find ('.text'),
      close = note.find ('.close');

  close.click (function (event) {
    event.preventDefault ();

    note.stop (true, true);
    note.fadeOut ('slow', function () { text.empty () });
  });

  return function (str) {
    text.text (str);

    note.stop (true, true);
    note.slideDown ('slow');
    note.effect ('highlight', 4000);
  };
}) ();

$(function () {

  // Enable the video player on all class="video" elements
  //
  $('.video').IFADvideoPlayer ();

});
