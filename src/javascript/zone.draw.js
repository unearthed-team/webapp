// draw zone

var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
    polyline: false,
    polygon: false,
    circle: false,
    marker: false,
	},
	edit: {
		featureGroup: zoneFeatureGroup
	}
});

map.addControl(drawControl);

map.on('draw:created', function(e) {
  var type = e.layerType;
  var	layer = e.layer;

  drawnItems.addLayer(layer);
});

map.on('draw:edited', function (e) {
  var layers = e.layers;
  var model;
  layers.eachLayer(function(layer) {
    model = JSON.parse(layer.options.model);
    model.shape.coordinates = layer.toGeoJSON().geometry.coordinates[0];
  });
  var zones = JSON.parse(store.get('zone'));
  var position;
  zones.some(function(item, index) {
    if (item.id == model.id) {
      position = index;
      return true;
    }
  });
  zones[position].shape = model.shape;
  zones[position].updated = new Date();
  store.set('zone', JSON.stringify(zones));
  updateData();
});
