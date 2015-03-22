function updateData() {
  server = enterprise;
  if (navigator.onLine) {
    syncData();
  }
}
window.addEventListener('load', function() {
  function updateOnlineStatus(event) {
    var condition = navigator.onLine ? 'online' : 'offline';
    store.set('status', condition);
    updateData();
  }
  window.addEventListener('online',  updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateData();
});
