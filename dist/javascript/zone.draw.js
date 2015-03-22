// draw zone

var drawControl = new L.Control.Draw({
	draw: {
		position: 'topleft',
    polyline: false,
    polygon: {
			title: 'Draw a hazard zone.',
			allowIntersection: true,
			drawError: {
				color: '#b00b00',
				timeout: 1000
			},
			shapeOptions: {
				color: '#bada55'
			},
			showArea: true
		},
		rectangle: false,
    circle: false,
    marker: false
	},
	edit: {
		featureGroup: featureGroup['zone']
	}
});

map.addControl(drawControl);

var deLatLngLeafify = function(coords) {
  return coords.map(function(item) {
    return [item.lng.toString(), item.lat.toString()]
  })
}

map.on('draw:created', function(e) {
  var type = e.layerType;
  var	layer = e.layer;
  $('#form-coords').val(JSON.stringify(deLatLngLeafify(layer._latlngs)));
  $('#createZone').modal('show');
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
