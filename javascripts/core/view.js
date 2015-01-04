var View = function (eventMediator, model, target) {
  this.eventMediator = eventMediator;
  this.model = model;
  this.target = target;
  this.canvas = null;
  this.context = null;
  this.size = {width: 0, height: 0};
  this.renderers = {};

  this.initialize();
};

View.prototype.getContext = function () {
  return this.context;
};

View.prototype.initialize = function () {
  this.initializeCanvas();
  this.initializeContext();
  this.initializeEventHandlers();
  this.initializeRenderers();
  this.resize();
};

View.prototype.initializeCanvas = function () {
  this.canvas = document.createElement("canvas");

  if (!this.target.style.position || this.target.style.position == "static") {
    this.target.style.position = "relative";
  }

  this.target.innerHTML = "";
  this.target.appendChild(this.canvas);
};

View.prototype.initializeContext = function () {
  this.context = this.canvas.getContext("2d");
};

View.prototype.initializeEventHandlers = function () {
  var self = this;

  this.eventMediator.subscribe("model:change", function (event) { self.render(); });
  this.eventMediator.subscribe("viewPort:resize", function (event) { self.resize(); });
};

View.prototype.initializeRenderers = function () {
  this.renderers.grid = new GridRenderer(this);
  this.renderers.fovControls = new FovControlsRenderer(this);
};

View.prototype.render = function () {
  this.getContext().clearRect(0, 0, this.size.width, this.size.height);
  this.renderers.grid.render();
  this.renderers.fovControls.render();
};

View.prototype.resize = function () {
  this.size = {
    width: this.target.clientWidth,
    height: this.target.clientHeight
  };

  this.canvas.setAttribute("width", this.size.width + "px");
  this.canvas.setAttribute("height", this.size.height + "px");

  this.render();
};

/*
var View = function (canvas) {
  this.canvas = canvas;
  this.canvas.setAttribute("class", "view");

  this.context = this.canvas.getContext("2d");
};

View.prototype.renderParticles = function (particles) {
  var i,
      center = this.getCenter();

  this.clear();
  this.context.beginPath();

  for (i in particles) {
    this.drawCircle(
      particles[i].position.x + center.x,
      particles[i].position.y + center.y,
      particles[i].radius
    );
  }

  this.context.fill();
};

View.prototype.clear = function () {
  var size = this.getSize();

  this.context.clearRect(0, 0, size.x, size.y);
};

View.prototype.drawCircle = function (x, y, radius) {
  this.context.arc(x, y, radius, 0, Math.PI * 2, true);
  // this.context.closePath();
};

View.prototype.getSize = function () {
  return ViewPort.getSize();
};

View.prototype.getCenter = function () {
  return this.getSize().scale(0.5);
};
*/
