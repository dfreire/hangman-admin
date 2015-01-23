define(["exports"], function (exports) {
  "use strict";

  exports.show = show;
  function show() {
    var time = "today";
    React.render(React.createElement(
      "h1",
      null,
      "Hello there, how are you " + time + "?"
    ), document.getElementById("example"));
  }
});