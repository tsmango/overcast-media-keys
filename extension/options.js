// Saves options to chrome.storage.sync.
function save() {
  var displayTimeRemaining = document.getElementById('display-time-remaining').checked;
  var openLinksInNewTabs   = document.getElementById('open-links-in-new-tabs').checked;

  chrome.storage.sync.set({
    displayTimeRemaining: displayTimeRemaining,
    openLinksInNewTabs: openLinksInNewTabs

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
    displayTimeRemaining: false,
    openLinksInNewTabs: false

  }, function(items) {
    document.getElementById('display-time-remaining').checked = items.displayTimeRemaining;
    document.getElementById('open-links-in-new-tabs').checked = items.openLinksInNewTabs;
  });
}

document.addEventListener('DOMContentLoaded', restore);

document.getElementById('save').addEventListener('click', save);
