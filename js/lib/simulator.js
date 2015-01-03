var Simulator = function () {
  var canvas = this.createCanvas();

  this.view = new View(canvas);

  this.particles = [
    new Particle(new Vector(-100, 0), new Vector(0, 0), 10, 5),
    new Particle(new Vector(100, 0), new Vector(0, 0), 10, 5)
  ];

  this.resizeCanvas(this.view.canvas);
};

Simulator.prototype.createCanvas = function () {
  var body = document.getElementsByTagName("body")[0],
      canvas = document.createElement('canvas'),
      self = this;

  body.appendChild(canvas);

  if (window.attachEvent) {
    window.attachEvent('onresize', function () { self.resizeCanvas(canvas); });
  } else if (window.addEventListener) {
    window.addEventListener('resize', function () { self.resizeCanvas(canvas); }, true);
  }

  return canvas;
};

Simulator.prototype.resizeCanvas = function (canvas) {
  var size = ViewPort.getSize();

  canvas.setAttribute("width", size.x + "px");
  canvas.setAttribute("height", size.y + "px");
};

Simulator.prototype.step = function () {
  this.view.renderParticles(this.particles);
};
