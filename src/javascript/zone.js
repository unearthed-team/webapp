var zoneFeatureGroup = L.featureGroup();
map.addLayer(zoneFeatureGroup);

var latLngify = function(coords) {
  return coords.map(function(item) {
    return [parseFloat(item[1]), parseFloat(item[0])]
  })
}

function style(data) {
  if (data.severity > 1) {
    return {
      fillColor: 'red',
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.5
    };
  }
}
var setupFeatureGroup = function() {
  zoneFeatureGroup.clearLayers();
  async.each(JSON.parse(store.get('zone')), function(item, cb) {
    var polygon = L.polygon(
      latLngify(item.shape.coordinates), {
        model: JSON.stringify(item)
      }
      )
      .bindPopup('<p>Tag: ' + item.tag + '<br/>' + 'Description: ' + item.description + '<br/>' + 'Severity: ' + item.severity + '</p>')
      .setStyle(style(item))
    zoneFeatureGroup.addLayer(polygon);
    cb();
  }, function() {
  });
}

$(document).ready(function() {

  setupFeatureGroup();
  $.getJSON('http://192.168.5.99:1701/device', {}, function(data) {
    // console.log(data[0].location.coordinates);

    for (i = 0; i < data.length; i++) {
      var popup = L.marker()
        .setLatLng(data[0].location.coordinates)
        .bindPopup('<p>Tag: ' + data[0].tag + '</p>')
        .addTo(map);
    }
  });
});
