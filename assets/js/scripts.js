window.onresize = doLayout;

onload = function() {
  var webview = document.querySelector('webview');
  doLayout();

  // Test for the presence of the experimental <webview> zoom and find APIs.
  if (typeof(webview.setZoom) == "function" &&
      typeof(webview.find) == "function") {
  }
};

function doLayout() {
  var webview = document.querySelector('webview');
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;

  /* Topbar */
  var controls = document.querySelector('#controls');
  var controlsHeight = controls.offsetHeight;
  /* End topbar */

  /* No topbar */
  // var controlsHeight = 0;
  /* End no topbar */

  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';

  /* Topbar */
  document.querySelector('#home').onclick = function() {
    var attribute = document.getElementById('webview');
    var home = attribute.getAttribute("data-home");
    navigateTo(home);
  };
  /* End topbar */
}

/* Topbar */
  function navigateTo(url) {
  document.querySelector('webview').src = url;
}
/* End topbar */