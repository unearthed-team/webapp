var fences = [];

var deHackify = function(coords) {
  return coords.map(function(item) {
    return [parseFloat(item[1]), parseFloat(item[0])]
  })
}

var buildFences = function() {
  var zones = JSON.parse(store.get('zone') || '[]');

  fences = [];
  async.each(zones, function(zone, cb) {
    fences.push(new InNOut.Geofence(deHackify(zone.shape.coordinates)))
    cb();
  })
}

var checkFences = function(coords, cb) {
  async.each(fences, function(fence, cb) {
    if (fence.inside(coords)) {
      return cb(fence);
    }
    cb()
  }, cb)
}
