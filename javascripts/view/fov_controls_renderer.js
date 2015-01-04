var FovControlsRenderer = function (view) {
  this.view = view;
  this.eventMediator = view.eventMediator;
  this.target = null;

  this.initialize();
};

FovControlsRenderer.prototype.initialize = function () {
  this.initializeDom();
  this.initializeEventHandlers();
};

FovControlsRenderer.prototype.initializeDom = function () {
  var element = document.createElement("div"),
      html = document.getElementById("fovControlsTemplate").innerHTML;

  element.innerHTML = html;

  this.target = element.children[0];
  this.view.target.appendChild(this.target);
};

FovControlsRenderer.prototype.initializeEventHandlers = function () {
  var em = this.eventMediator,
      buttons = this.target.getElementsByTagName("input");

  buttons[0].addEventListener("click", function () { em.publish("fov:translate:decrement-y"); });
  buttons[1].addEventListener("click", function () { em.publish("fov:translate:decrement-x"); });
  buttons[2].addEventListener("click", function () { em.publish("fov:translate:reset"); });
  buttons[3].addEventListener("click", function () { em.publish("fov:translate:increment-x"); });
  buttons[4].addEventListener("click", function () { em.publish("fov:translate:increment-y"); });
  buttons[5].addEventListener("click", function () { em.publish("fov:scale:decrement"); });
  buttons[6].addEventListener("click", function () { em.publish("fov:scale:reset"); });
  buttons[7].addEventListener("click", function () { em.publish("fov:scale:increment"); });
};

FovControlsRenderer.prototype.render = function () {
};
