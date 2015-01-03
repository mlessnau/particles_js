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
