"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.options = void 0;

var _index = _interopRequireDefault(require("https://jslib.k6.io/papaparse/5.1.1/index.js"));

var _data = require("k6/data");

var _execution = _interopRequireDefault(require("k6/execution"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var csvData = _index["default"].parse(open("/scripts/csvData.csv"), {
  header: true
}).data;

var options = {
  scenarios: {
    loginWithCSV: {
      executor: "shared-iterations",
      vus: 1,
      iterations: csvData.length
    }
  }
};
exports.options = options;

function _default(data) {
  // 3. VU code
  var user = csvData[_execution["default"].scenario.iterationInTest]; // console.info(exec.scenario.iterationInTest + "====>" + exec.vu.idInTest);

  console.log(user.email);
}