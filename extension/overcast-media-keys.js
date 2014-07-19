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
