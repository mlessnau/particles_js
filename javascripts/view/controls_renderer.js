var ControlsRenderer = function (view) {
  this.view = view;
  this.fov = this.view.model.fov;
  this.eventMediator = view.eventMediator;
  this.target = null;
  this.textFovTranslateX = null;
  this.textFovTranslateY = null;
  this.textFovScale = null;

  this.initialize();
};

ControlsRenderer.prototype.initialize = function () {
  this.initializeDom();
  this.initializeEventHandlers();
};

ControlsRenderer.prototype.initializeDom = function () {
  var element = document.createElement("div"),
      html = document.getElementById("controlsTemplate").innerHTML;

  element.innerHTML = html;

  this.target = element.children[0];
  this.view.target.appendChild(this.target);

  this.textFovTranslateX = document.getElementById("fovTranslateX");
  this.textFovTranslateY = document.getElementById("fovTranslateY");
  this.textFovScale = document.getElementById("fovScale");
};

ControlsRenderer.prototype.initializeEventHandlers = function () {
  var em = this.eventMediator,
      buttons = this.target.getElementsByTagName("input");

  buttons[0].addEventListener("click", function () { em.publish("controls:fov:translate:decrement-y"); });
  buttons[1].addEventListener("click", function () { em.publish("controls:fov:translate:decrement-x"); });
  buttons[2].addEventListener("click", function () { em.publish("controls:fov:translate:reset"); });
  buttons[3].addEventListener("click", function () { em.publish("controls:fov:translate:increment-x"); });
  buttons[4].addEventListener("click", function () { em.publish("controls:fov:translate:increment-y"); });
  buttons[5].addEventListener("click", function () { em.publish("controls:fov:scale:decrement"); });
  buttons[6].addEventListener("click", function () { em.publish("controls:fov:scale:reset"); });
  buttons[7].addEventListener("click", function () { em.publish("controls:fov:scale:increment"); });
};

ControlsRenderer.prototype.render = function () {
  this.textFovTranslateX.innerHTML = this.fov.translate.x;
  this.textFovTranslateY.innerHTML = this.fov.translate.y;
  this.textFovScale.innerHTML = (this.fov.scale * 100) + "%";
};
