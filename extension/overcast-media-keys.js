// Append time remaining to player.
function displayTimeRemaining() {
  var player = $('#audioplayer');

  // Move player into a container and style a new
  // section to the right of the player that can
  // hold the time remaining counter.
  $('<div id="audioplayer-container"></div>').css({
    'clear': 'both',
    'height': '76px',
    'position': 'relative'
  }).insertBefore($(player));

  $(player).css({
    'left': '0',
    'margin': '18px 0 27px 0',
    'width': '84%'
  }).appendTo('#audioplayer-container');

  var remaining = $('<span id="remaining"></span>');

  $(remaining).css({
    'background-color': '#424242',
    'border-bottom-right-radius': '5px',
    'border-top-right-radius': '5px',
    'color': '#ffffff',
    'display': 'inline-block',
    'font-size': '13px',
    'height': '30px',
    'line-height': '30px',
    'margin': '18px 0 27px 0',
    'padding': '0px',
    'position': 'absolute',
    'right': '0',
    'text-align': 'center',
    'width': '18%',
    'z-index': '100'
  }).insertBefore($(player));

  // On each timeupdate event (each second), calculate and
  // update the time remaining counter.
  player = document.getElementById('audioplayer');

  player.addEventListener('timeupdate', function() {
    try {
      var player      = document.getElementById('audioplayer');
      var duration    = parseInt(player.duration);
      var currentTime = parseInt(player.currentTime);
      var timeLeft    = (duration - currentTime);

      var s = timeLeft % 60;
      var m = Math.floor(timeLeft / 60) % 60;
      var h = Math.floor(timeLeft / 60 / 60);

      s = s < 10 ? '0' + s : s;
      m = m < 10 ? '0' + m : m;

      if(h > 0) {
        h = h < 10 ? '0' + h : h;

        remaining.html('-' + h + ':' + m + ':' + s);

      } else {
        remaining.html('-' + m + ':' + s);
      }

    } catch (error) {}
  }, false);
}

// Open links in a new window.
function openLinksInNewTabs() {
  $('#audiotimestamplink').parent().find('a').attr('target', '_blank');
}

// Update episode page based on options.
chrome.storage.sync.get({
  displayTimeRemaining: true,
  openLinksInNewTabs: false

}, function(items) {
  if(items.displayTimeRemaining) {
    displayTimeRemaining();
  }

  if(items.openLinksInNewTabs) {
    openLinksInNewTabs();
  }
});

// Handle play/pause, next, and previous media keys.
chrome.runtime.onMessage.addListener(
  function(request) {
    var player = document.getElementById('audioplayer');

    if(request.command === 'next') {
      player.currentTime = (parseInt(player.currentTime) + 30);

    } else if(request.command === 'play-pause') {
      if(player.paused) {
        player.play();

      } else {
        player.pause();
      }

    } else if(request.command === 'prev') {
      player.currentTime = (parseInt(player.currentTime) - 15);
    }
  }
);

chrome.runtime.sendMessage({command: "activateTab"});
