// Saves options to chrome.storage.sync.
function save() {
  var openLinksInNewTabs = document.getElementById('open-links-in-new-tabs').checked;
  var sortEpisodesByDate = document.getElementById('sort-episodes-by-date').checked;

  chrome.storage.sync.set({
    openLinksInNewTabs: openLinksInNewTabs,
    sortEpisodesByDate: sortEpisodesByDate

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
    openLinksInNewTabs: false,
    sortEpisodesByDate: false

  }, function(items) {
    document.getElementById('open-links-in-new-tabs').checked = items.openLinksInNewTabs;
    document.getElementById('sort-episodes-by-date').checked  = items.sortEpisodesByDate;
  });
}

document.addEventListener('DOMContentLoaded', restore);

document.getElementById('save').addEventListener('click', save);
