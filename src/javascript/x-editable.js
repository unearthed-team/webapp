$.fn.editable.defaults.ajaxOptions = {type: 'put'};

map.on('popupopen', function(e) {
  $('.x-editable-item').editable({
    params: function(params) {
      var postData = {
        updated: new Date(),
        id: params.pk 
      }
      postData[params.name] = params.value;
      return postData;
    },
    success: function(response) {
      hackUpdateWatch = response.description;
      syncData();
    }
  });
});
