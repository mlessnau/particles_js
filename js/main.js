function bootstrap() {
  var simulator = new Simulator();

  window.setInterval(function () { simulator.step(); }, 100);
}
