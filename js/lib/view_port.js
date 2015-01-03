var ViewPort = {
  getSize: function () {
    return new Vector(
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    );
  }
};
