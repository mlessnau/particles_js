var Vector = function (x, y) {
  this.x = x;
  this.y = y;
};

Vector.prototype.scale = function (a) {
  return new Vector(this.x * a, this.y * a);
};
