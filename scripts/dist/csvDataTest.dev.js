"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.options = void 0;

var _index = _interopRequireDefault(require("https://jslib.k6.io/papaparse/5.1.1/index.js"));

var _data = require("k6/data");

var _execution = _interopRequireDefault(require("k6/execution"));

var _http = _interopRequireDefault(require("k6/http"));

var _k = require("k6");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var csvData = _index["default"].parse(open("/scripts/csvData.csv"), {
  header: true
}).data;

var options = {
  stages: [{
    duration: "2m",
    target: 2000
  }, // fast ramp-up to a high point
  // No plateau
  {
    duration: "1m",
    target: 0
  } // quick ramp-down to 0 users
  ] //   scenarios: {
  //     loginWithCSV: {
  //       executor: "shared-iterations",
  //       vus: 1,
  //       iterations: csvData.length,
  //     },
  //   },

};
exports.options = options;

function _default(data) {
  // 3. VU code
  //   const user = csvData[exec.scenario.iterationInTest];
  var res = _http["default"].get("https://reqres.in/api/users/".concat(_execution["default"].scenario.iterationInTest));

  (0, _k.check)(res, {
    "is status 200": function isStatus200(r) {
      return r.status === 200;
    }
  }); // console.info(exec.scenario.iterationInTest + "====>" + exec.vu.idInTest);
  //   const resData = res.json("data");
  //   console.log(resData.email);
  //   console.log(user.email);
  //   check(res, {
  //     "is user email correct": () => resData.email === user.email,
  //   });
}