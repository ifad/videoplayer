IFAD Video Player
=================

This player was created for the [2011 ShareFair](http://www.sharefair.net) in
Rome, and has then been extracted for global consumption.

It uses [Flowplayer](http://flowplayer.org) and provides a simple HTML5 API
for configuration, by leveraging the `data` attributes.

It is configured to use an RTMP server, such as Apple Straming Server or Adobe
Flash Media Server, and to display video and audio.

The only needed configuration are the `data-source` and `data-stream`
attributes on the `.player` container, that must point to your RTMP media
server.

Everything else, it is just basic HTML and CSS. The flowplayer JS integration
is self-contained into a `IFADvideoPlayer` jQuery plugin.

Have fun!

 -- m.barnaba@ifad.org  Wed Oct 26 13:02:11 CEST 2011

