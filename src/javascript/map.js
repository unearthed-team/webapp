var map = L.map('map').setView([-31.956117, 115.858871], 20);

L.Icon.Default.imagePath = './images';

L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
    maxZoom: 25,
    // maxNativeZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'examples.map-i875mjb7'
}).addTo(map);

var imageUrl = 'data:image/png;base64,' + spacecubedOverlay;
var imageBounds = [
  [-31.95589, 115.85867],
  [-31.95624, 115.85906]
];

L.imageOverlay(imageUrl, imageBounds).addTo(map);
