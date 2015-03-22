var models = ['device', 'zone', 'event'];

var hackNewWatch;
var hackUpdateWatch;

var submitZone = function() {
  var item = {
    description: $('#form-description').val(),
    severity: $('#form-severity').val(),
    tag: $('#form-tag').val(),
    shape: {
      type: 'Polygon',
      coordinates: JSON.parse($('#form-coords').val())
    }
  }
  addItem('zone', item, function() {
    hackNewWatch = item.shape;
    $('#createZone').modal('hide');
    syncData()
  })
};

var addItem = function(model, item, cb) {
  $.ajax({
      url: server + '/' + model,
      type: 'POST',
      data: item
    })
    .done(function(data) {
      return cb();
    })
    .fail(function(data) {
      return cb();
    });
}

var updateItem = function(model, item, cb) {
  $.ajax({
      url: server + '/' + model + '/' + item.id,
      type: 'POST',
      data: item
    })
    .done(function(data) {
      return cb();
    })
    .fail(function(data) {
      if (data.status == 404) {
        addItem(model, item, cb)
      }
      else {
        cb()
      }
    });
}

var syncData = function() {
  async.each(models, function(model, cb) {
    async.series([
      function(cb) {
        push(enterprise, model, cb)
      },
      function(cb) {
        pull(enterprise, model, cb)
      }
    ], function() {
      if (model == 'zone' || model == 'device') {
        setupFeatureGroup(model);
        buildFences();
      }
      cb()
    })
  }, function(err) {
    if (err) {
      return console.log(err);
    }
  })
  // pull(enterprise, 'device')
}

var pull = function(server, model, cb) {
  return $.get(server + '/' + model)
    .done(function(data) {
      var oldData = JSON.parse(store.get(model)|| '[]');
      async.each(data, function(newItem, cb) {
        var exists = false;
        var updated = false;
        oldData.forEach(function(item) {
          if (item.shape == hackNewWatch) {
            exists = true;
          }
          if (item.id == newItem.id) {
            if (model == 'zone') {
              exists = true;
              if (JSON.stringify(item.updated) !== JSON.stringify(newItem.updated)) {
                updated = true;
                if (newItem.description == hackUpdateWatch) {
                  updated = false;
                }
              }
            }
          }
        })
        if (model == 'zone' && !exists) {
          alert("New Hazard received.")
        }
        if (updated) {
          alert("Hazard updated.")
        }
        cb();
      }, function() {
        store.set(model, JSON.stringify(data))
        cb();
      })
    })
    .fail(function(error) {
      cb();
    });
}

var push = function(server, model, cb) {
  var list = JSON.parse(store.get(model) || "[]");
  if (!list || !list.length) {
    return cb();
  }
  async.each(list, function(item, cb) {
    updateItem(model, item, cb)
  }, function(err) {
    cb(err);
  })
}
