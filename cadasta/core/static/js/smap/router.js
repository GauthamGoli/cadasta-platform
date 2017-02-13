// Based on http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
var SimpleRouter = function(){
  routes = new CreateRoutes();

  var el = null;
  function router() {
    var hash_path = location.hash.slice(1) || '/';
    var view_url = '/async' + location.pathname;

    if (hash_path !== '/') {
      view_url = view_url + hash_path.substr(1) + '/';
    }

    var route = routes[hash_path] ? routes[hash_path] : null;

    // Removes record id from hash_path to match key in routes.
    if (!route) {
      var records = ['/records/location', '/records/relationship']
      var actions = ['/edit', '/delete', '/resources/add', '/resources/new', '/relationships/new']
      var new_hash_path;

      for (var i in records) {
        if (hash_path.includes(records[i])) {
          new_hash_path = records[i];
        }
      }

      for (var i in actions) {
        if (hash_path.includes(actions[i])) {
          new_hash_path = new_hash_path + actions[i]
        }
      }
      route = routes[new_hash_path];
    }


    el = route.controller() || document.getElementById('project-detail');

    $.get(view_url, function(response){
      el.innerHTML = response;
      if (route.eventHook) {
        route.eventHook(view_url);
      }
    });
  }

  return {
    router: router,
  };
};


var sr = new SimpleRouter();

window.addEventListener('hashchange', sr.router);
window.addEventListener('load', sr.router);
