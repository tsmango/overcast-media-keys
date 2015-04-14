// Sort episodes by date.
function sortEpisodesByDate(highlightEpisodes, prependDayOfWeek) {
  if($('.episodecell').length > 0) {
    var container = $('<div></div>').attr('class', 'episodes');
    var episodes  = $('.episodecell');
    var days      = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var months    = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    $('.episodecell:first').before(container);

    $.each(episodes, function(index, el) {
      var metadata = $(el).find('.cellcontent .titlestack div:last');

      var date = metadata.text().trim().split(' ');

      var month = $.inArray(date[0], months) + 1;
          month = (month < 10) ? '0' + month : '' + month;

      var year = (new Date()).getFullYear();

      if(date[1].match(/,$/)) {
        year = date[2];
      }

      var day = parseInt(date[1]);
          day = (day < 10) ? '0' + day : '' + day;

      if(prependDayOfWeek) {
        metadata.prepend(days[(new Date(parseInt(year), (parseInt(month) - 1), parseInt(day))).getDay()] + ', ');
      }

      if(highlightEpisodes) {
        if((date[3] == 'at') || (date[4] == 'remaining')) {
          $(el).css({'background-color': 'rgba(252, 126, 15, 0.05)'});
        }
      }

      $(el).attr('data-date', (year + month + day)).detach().appendTo(container);
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

// Update Overcast pages based on options.
chrome.storage.sync.get({
  sortEpisodesByDate: false,
  highlightEpisodes:  false,
  prependDayOfWeek:   false,
  openLinksInNewTabs: false

}, function(items) {
  if(items.openLinksInNewTabs) {
    openLinksInNewTabs();
  }

  if(items.sortEpisodesByDate) {
    sortEpisodesByDate(items.highlightEpisodes, items.prependDayOfWeek);
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

chrome.runtime.sendMessage({command: 'activateTab'});
