/*!
 * SlashRTC Software Services Pvt Ltd v0.0.1
 * https://www.slashrtc.com/
 *
 * Includes SIP version 0.11.4
 * Copyright (c) 2014-2018 Junction Networks, Inc <http://www.onsip.com>
 * Homepage: https://sipjs.com
 * License: https://sipjs.com/license/
 *
 * Date: "Fri Oct 19 2018 13:11:31 GMT+0530 (India Standard Time)"
 */

(function( global, factory ) {

  if ( typeof module === "object" && typeof module.exports === "object" ) {

    module.exports = global.document ?
      factory( global, true ) :
      function( w ) {
        if ( !w.document ) {
          throw new Error( "exSip requires a window with a document" );
        }
        return factory( w );
      };
  } else {
    factory( global );
  }

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

  /* Polyfill indexOf. */
var indexOf;

  if (typeof Array.prototype.indexOf === 'function') {
      indexOf = function (haystack, needle) {
          return haystack.indexOf(needle);
      };
  } else {
      indexOf = function (haystack, needle) {
          var i = 0, length = haystack.length, idx = -1, found = false;

          while (i < length && !found) {
              if (haystack[i] === needle) {
                  idx = i;
                  found = true;
              }

              i++;
          }

          return idx;
      };
  };

  var version       = "0.0.1",
      configuration = {},
      media         = {},
      sipEvents     = {},
      _this         = null,
      sipSimple     = null,
      sipPhone      = null;

  var exSip = function Simple( options, media ) {

    _this = this;
    this.events = {};

    configuration = options;
    media         = media;

    sipSimple   = this.init( options, media );
    sipPhone    = sipSimple.ua;;
    sipSession  = null;

    this.attachEvent( sipSimple, sipPhone );

      // define jssip user agent
  }

  exSip.prototype.getConfig = function() {

    return this.options;
  };

  exSip.prototype.stop = function() {

    sipPhone.stop();
  };


  exSip.prototype.answer = function() {

    // sipSession.accept({sessionDescriptionHandlerOptions : { constraints : { audio : true, video : false } }});
  };

  exSip.prototype.terminate = function() {

    sipSession.bye();
  };

  exSip.prototype.dtmf = function( dtmfNo ) {

    sipSession.dtmf( dtmfNo );
  };

  exSip.prototype.init = function( options, media ) {

    return new SIP.Web.Simple({ media: media, ua: options });
  };

  exSip.prototype.getVersion = function() {

    return version;
  }

  exSip.prototype.on = function (event, listener) {
      if (typeof sipEvents[event] !== 'object') {
          sipEvents[event] = [];
      }

      sipEvents[event].push(listener);
  };

  exSip.prototype.removeListener = function (event, listener) {
      var idx;

      if (typeof sipEvents[event] === 'object') {
          idx = indexOf(sipEvents[event], listener);

          if (idx > -1) {
              sipEvents[event].splice(idx, 1);
          }
      }
  };

  exSip.prototype.emit = function (event) {
      var i, listeners, length, args = [].slice.call(arguments, 1);
      if (typeof sipEvents[event] === 'object') {
          listeners = sipEvents[event].slice();
          length = listeners.length;

          for (i = 0; i < length; i++) {
              listeners[i].apply(_this, args);
          }
      }
  };

  exSip.prototype.once = function (event, listener) {
      _this.on(event, function g () {
          _this.removeListener(event, g);
          listener.apply(_this, arguments);
      });
  };

  exSip.prototype.attachEvent = function ( sipSimple, sipPhone ) {  

    sipPhone.on('registered', function( response, cause ) {

      exSip.prototype.emit("registered", response, cause );
    });

    sipPhone.on('unregistered', function( response, cause ) {

      exSip.prototype.emit("unregistered", response, cause );
    });

    sipPhone.on('registrationFailed', function( response, cause ) {

      exSip.prototype.emit("registrationFailed", response, cause );
    });

    sipPhone.on('invite', function( session ) {

      sipSession = session;
      exSip.prototype.emit("invite", session );
      session.accept({sessionDescriptionHandlerOptions : { constraints : { audio : true, video : false } }});
    });

    sipPhone.on('outOfDialogReferRequested', function(referServerContext) {

      exSip.prototype.emit("outOfDialogReferRequested",referServerContext);
    });

    sipPhone.on('transportCreated', function(transport) {

      exSip.prototype.emit("transportCreated",transport);
    });;

    sipSimple.on('new', function() {

      exSip.prototype.emit("new");
    });

    sipSimple.on('ringing', function() {

      exSip.prototype.emit("ringing");
    });

    sipSimple.on('connecting', function() {

      exSip.prototype.emit("connecting");
    });

    sipSimple.on('connected', function() {

      exSip.prototype.emit("connected");
    });

    sipSimple.on('ended', function() {

      exSip.prototype.emit("ended");
    });

    sipSimple.on('hold', function() {

      exSip.prototype.emit("hold");
    });

    sipSimple.on('unhold', function() {

      exSip.prototype.emit("unhold");
    });

    sipSimple.on('mute', function() {

      exSip.prototype.emit("mute");
    });

    sipSimple.on('unmute', function() {

      exSip.prototype.emit("unmute");
    });

    sipSimple.on('dtmf', function() {

      exSip.prototype.emit("dtmf");
    });

    sipSimple.on('message', function() {

      exSip.prototype.emit("message");
    });

  };

  window.exSip =  exSip;
}));