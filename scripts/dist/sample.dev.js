"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.options = exports.users = void 0;

var _http = _interopRequireDefault(require("k6/http"));

var _k = require("k6");

var _execution = _interopRequireDefault(require("k6/execution"));

var _bundle = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");

var _index = require("https://jslib.k6.io/k6-summary/0.0.1/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var users = JSON.parse(open("data.json"));
exports.users = users;
var options = {
  // thresholds: {
  //   http_req_duration: [
  //     { threshold: "p(90)<35" }, // 90% of requests should be below 35ms, abort test if this fails
  //   ],
  // },
  scenarios: {
    accountCreate: {
      executor: "per-vu-iterations",
      vus: 5,
      iterations: 500
    } // accountCreate2: {
    //   executor: "shared-iterations",
    //   vus: 5,
    //   iterations: 500,
    // },
    // accountCreate3: {
    //   executor: "constant-vus",
    //   vus: 10,
    //   duration: "120s",
    //   iterations: 10,
    // },
    // accountCreate4: {
    //   executor: "ramping-vus",
    //   startVUs: 0,
    //   stages: [
    //     { duration: "20s", target: 100 },
    //     { duration: "30s", target: 100 },
    //     { duration: "20s", target: 0 },
    //   ],
    //   gracefulRampDown: "30s",
    // },

  } // vus: 10,
  // iterations: 10,
  // duration: "5m",

};
exports.options = options;

function _default() {
  // console.info(
  //   `Iterations id ==> ${exec.scenario.iterationInTest} VU id ${
  //     exec.vu.idInTest
  //   } Data id ${(exec.scenario.iterationInTest % users.length) + 1}`
  // );
  console.info("Iterations id ==> ".concat(_execution["default"].scenario.iterationInTest, " VU id").concat(_execution["default"].vu.idInTest));
  console.log(_execution["default"].vu.idInTest);
  var baseUrl = "https://reqres.in/";
  var endPoint = "api/users/2";

  var res = _http["default"].get("".concat(baseUrl).concat(endPoint));

  (0, _k.check)(res, {
    "is status 200": function isStatus200(r) {
      return r.status === 200;
    }
  });
  res.body;
  console.log(res);
  (0, _k.sleep)(1);
} // export function handleSummary(data) {
//   return {
//     "result.html": htmlReport(data),
//     stdout: textSummary(data, { indent: "\t", enableColors: true }),
//   };
// }