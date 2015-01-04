var EventMediator = function (target) {
  this.target = target;
};

EventMediator.prototype.publish = function (eventName, source) {
  var event = new CustomEvent(eventName, {source: source});

  this.target.dispatchEvent(event);
};

EventMediator.prototype.subscribe = function (eventName, callback) {
  this.target.addEventListener(eventName, callback, false);
};
