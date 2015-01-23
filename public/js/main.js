define(["exports", "hello"], function (exports, _hello) {
  "use strict";

  var _interopRequire = function (obj) {
    return obj && (obj["default"] || obj);
  };

  var Hello = _interopRequire(_hello);

  Hello.show();
});