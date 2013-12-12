var game = (function() {

  var self = {};
 
  self.data = {};
  self.data.score = 0;

  self.onload = function() {
     
    // initialize the video
    var success = me.video.init('screen', 320, 320, true, 'auto');
    if (!success) {
      console.log('Your browser does not support HTML5 canvas.');
      return;
    }
     
    // add "#debug" to the URL to enable the debug Panel
    if (document.location.hash === "#debug") {
      window.onReady(function () {
        me.plugin.register.defer(debugPanel, "debug");
      });
    }

    // Initialize the audio.
    me.audio.init("mp3,ogg");

    // Set a callback to run when loading is complete.
    me.loader.onload = self.loaded.bind(self);
  
    // Load the resources.
    me.loader.preload(game.resources);

    // Initialize melonJS and display a loading screen.
    me.state.change(me.state.LOADING);

  };
 
  self.loaded = function() {
    me.state.set(me.state.PLAY, new game.PlayScreen());
    me.state.change(me.state.PLAY);
  };

  self.resources = [
    { name: "alpha-fg-tiles",
      type: "image",
      src: "alpha-fg-tiles.png" },
    { name: "alpha",
      type: "tmx",
      src: "alpha.tmx" }
  ];

  self.PlayScreen = me.ScreenObject.extend({

    onResetEvent: function() {  
        me.levelDirector.loadLevel("alpha");
        game.data.score = 0;
    },
     
    onDestroyEvent: function() {
    }

  });

  return self;

})();

window.onReady(function() {
  game.onload();
});
