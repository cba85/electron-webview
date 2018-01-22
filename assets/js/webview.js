window.onresize = doLayout;

onload = function() {
  var webview = document.querySelector('webview');
  doLayout();

  // Topbar functions
  homeButton();
  printButton();

  // Test for the presence of the experimental <webview> zoom and find APIs.
  if (typeof(webview.setZoom) == "function" &&
      typeof(webview.find) == "function") {
  }
};

function doLayout() {
  var webview = document.querySelector('webview');
  var windowWidth = document.documentElement.clientWidth;
  var windowHeight = document.documentElement.clientHeight;

  var controlsHeight = getControlsHeight();

  var webviewWidth = windowWidth;
  var webviewHeight = windowHeight - controlsHeight;

  webview.style.width = webviewWidth + 'px';
  webview.style.height = webviewHeight + 'px';
}
