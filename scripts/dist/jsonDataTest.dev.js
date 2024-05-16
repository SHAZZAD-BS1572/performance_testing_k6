"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.options = void 0;

var _execution = _interopRequireDefault(require("k6/execution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var jsonData = JSON.parse(open("/scripts/data.json"));
var options = {
  scenarios: {
    loginWithjson: {
      executor: "shared-iterations",
      vus: 1,
      iterations: jsonData.length
    }
  }
};
exports.options = options;

function _default(data) {
  var user = jsonData[_execution["default"].scenario.iterationInTest];
  console.log(user.email);
}