// Sort episodes by date.
function sortEpisodesByDate() {
  if($('.episodecell').length > 0) {
    var container = $('<div></div>').attr('class', 'episodes');
    var episodes  = $('.episodecell');
    var months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $('.episodecell:first').before(container);

    $.each(episodes, function(index, el) {
      var date = $(el).find('.cellcontent .titlestack div:last').text().trim().split(' ');

      var month = $.inArray(date[0], months) + 1;
          month = (month < 10) ? '0' + month : '' + month;

      var year = (new Date()).getFullYear();

      if(date[1].match(/,$/)) {
        year = date[2];
      }

      var day = parseInt(date[1]);
          day = (day < 10) ? '0' + day : '' + day;

      $(el).attr('data-date', (year + month + day))
           .detach().appendTo(container);
    });

    episodes = container.find('.episodecell');

    episodes.sort(function(x, y){
      return x.getAttribute('data-date').localeCompare(y.getAttribute('data-date'));
    });

    episodes.detach().appendTo($('.episodes'));
  }
}

// Open links in a new window.
function openLinksInNewTabs() {
  $('#audiotimestamplink').parent().find('a').attr('target', '_blank');
}

// Update episode page based on options.
chrome.storage.sync.get({
  openLinksInNewTabs: false,
  sortEpisodesByDate: false

}, function(items) {
  if(items.openLinksInNewTabs) {
    openLinksInNewTabs();
  }

  if(items.sortEpisodesByDate) {
    sortEpisodesByDate();
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
