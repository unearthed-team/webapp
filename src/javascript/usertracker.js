var userIcon = L.icon({
  iconUrl: './images/leaf-green.png',
  shadowUrl: './images/leaf-shadow.png',
  iconSize:     [38, 95], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})

var userMarker = L.marker([0, 0], {icon: userIcon}).addTo(map);

var updateUserMarker = function(latLng) {
  userMarker.setLatLng(L.latLng(latLng));
}

var updateUserLocation = function(position) {
  var latLng = [position.coords.latitude, position.coords.longitude];
  updateUserMarker(latLng);
  checkFences(latLng, function(err) {
    if (err) {
      alert('Geofence breached.')
    }
  });
}

var geoError = function() {
  console.log('Sorry, no position available.');
}

var geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

if ('geolocation' in navigator) {
  setTimeout(function() {
    navigator.geolocation.watchPosition(updateUserLocation, geoError, geoOptions);
  }, 1000)
}
