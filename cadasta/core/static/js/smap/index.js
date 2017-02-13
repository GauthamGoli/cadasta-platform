$(window).load(function () {
  var js_files = [
    'lazytiles.js',
    'L.TileLayer.GeoJSON.js',
    'map.js',
    'routes.js',
    'router.js'
  ];
  var body = $('body');
  for (var i in js_files) {
    body.append($('<script src="/static/js/smap/' + js_files[i] + '"></script>'));
  }
  var sr = new SimpleRouter();
  sr.router();
});
