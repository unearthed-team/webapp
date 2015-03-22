var featureGroup = {
  zone: L.featureGroup(),
  device: L.featureGroup(),
}

map.addLayer(featureGroup['zone']);
map.addLayer(featureGroup['device']);

var latLngify = function(coords) {
  return coords.map(function(item) {
    return [parseFloat(item[1]), parseFloat(item[0])]
  })
}

var createLayer = {
  zone: function(item) {
    var descriptionEdit = '<a class="x-editable-item" href="#" data-name="description" data-type="textarea" data-pk="' + item.id + '" data-url="' + enterprise + '/zone/' + item.id + '" data-title="Enter description", data-rows="3">' + item.description + '</a>';

    return L.polygon(latLngify(item.shape.coordinates), {
      model: JSON.stringify(item)
    })
      .bindPopup('<p>Tag: ' + item.tag + '<br/>' + 'Description: ' + descriptionEdit + '<br/>' + 'Severity: ' + item.severity + '</p>')
      .setStyle((function() {
        if (item.severity > 1) {
          return {
            fillColor: 'red',
            weight: 2,
            opacity: 1,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.5
          };
        }
      })()
    )
  },
  device: function(item) {
    return L.marker()
      .setLatLng(item.location.coordinates)
      .bindPopup('<p>Tag: ' + item.tag + '</p>')
  }
}

var setupFeatureGroup = function(model) {
  featureGroup[model].clearLayers();
  async.each(JSON.parse(store.get(model)), function(item, cb) {
    featureGroup[model].addLayer(createLayer[model](item));
    cb();
  });
}
