var GridRenderer = function (view) {
  this.view = view;
  this.fov = this.view.model.fov;
};

GridRenderer.prototype.render = function () {
  var context = this.view.getContext(),
      center = {
        x: this.view.size.width / 2,
        y: this.view.size.height / 2
      },
      translate = {
        x: this.fov.translate.x * this.fov.scale,
        y: this.fov.translate.y * this.fov.scale
      };

  context.beginPath();
  context.moveTo(center.x + translate.x, 0);
  context.lineTo(center.x + translate.x, this.view.size.height);
  context.moveTo(0, center.y + translate.y);
  context.lineTo(this.view.size.width, center.y + translate.y);
  context.stroke();
};
