// Open links in a new window.
function openLinksInNewTabs() {
  $('#audiotimestamplink').parent().find('a').attr('target', '_blank');
}

// Update episode page based on options.
chrome.storage.sync.get({
  openLinksInNewTabs: false

}, function(items) {
  if(items.openLinksInNewTabs) {
    openLinksInNewTabs();
  }
});

// Handle play/pause, next, and previous media keys.
chrome.runtime.onMessage.addListener(
  function(request) {
    var player = document.getElementById('audioplayer');

    if(request.command === 'next') {
      player.currentTime = (parseInt(player.currentTime) + parseInt($('#seekforwardbutton').attr('data-seek-forward-interval')));

    } else if(request.command === 'play-pause') {
      if(player.paused) {
        player.play();

      } else {
        player.pause();
      }

    } else if(request.command === 'prev') {
      player.currentTime = (parseInt(player.currentTime) - parseInt($('#seekbackbutton').attr('data-seek-back-interval')));
    }
  }
);

chrome.runtime.sendMessage({command: "activateTab"});
