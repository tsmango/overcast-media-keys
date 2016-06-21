// Saves options to chrome.storage.sync.
function save() {
  var sortEpisodesByDate          = document.getElementById('sort-episodes-by-date').checked;
  var sortEpisodesByDateAscending = document.getElementById('sort-episodes-by-date-ascending').checked;
  var highlightEpisodes           = document.getElementById('highlight-episodes').checked;
  var prependDayOfWeek            = document.getElementById('prepend-day-of-week').checked;
  var openLinksInNewTabs          = document.getElementById('open-links-in-new-tabs').checked;

  chrome.storage.sync.set({
    sortEpisodesByDate:          sortEpisodesByDate,
    sortEpisodesByDateAscending: sortEpisodesByDateAscending,
    highlightEpisodes:           highlightEpisodes,
    prependDayOfWeek:            prependDayOfWeek,
    openLinksInNewTabs:          openLinksInNewTabs

  }, function() {
    // Update status to let user know options were saved.
    document.getElementById('save').setAttribute('disabled', 'disabled');
    document.getElementById('save').textContent = 'Saved';

    setTimeout(function() {
      document.getElementById('save').removeAttribute('disabled');
      document.getElementById('save').textContent = 'Save';
    }, 1500);
  });
}

// Restores checkbox state using the preferences stored in chrome.storage.
function restore() {
  chrome.storage.sync.get({
    sortEpisodesByDate:          false,
    sortEpisodesByDateAscending: true,
    highlightEpisodes:           false,
    prependDayOfWeek:            false,
    openLinksInNewTabs:          false

  }, function(items) {
    document.getElementById('sort-episodes-by-date').checked  = items.sortEpisodesByDate;
    document.getElementById('highlight-episodes').checked     = items.highlightEpisodes;
    document.getElementById('prepend-day-of-week').checked    = items.prependDayOfWeek;
    document.getElementById('open-links-in-new-tabs').checked = items.openLinksInNewTabs;

    document.getElementById('sort-episodes-by-date-' + (items.sortEpisodesByDateAscending ? 'a' : 'de') + 'scending').checked  = true;
  });
}

document.addEventListener('DOMContentLoaded', restore);

document.getElementById('save').addEventListener('click', save);
