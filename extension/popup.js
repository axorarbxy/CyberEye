chrome.storage.local.get(['flaggedEvents'], (result) => {
  const events = result.flaggedEvents || [];
  const countElement = document.getElementById('flagCount');

  if (countElement) {
    countElement.textContent = `Flagged events today: ${events.length}`;
  }
});
