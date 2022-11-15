/* Reload app when tab becomes active again */
document.addEventListener('visibilitychange', () => {
  if (document.hidden) return;
  window.location.reload();
});
