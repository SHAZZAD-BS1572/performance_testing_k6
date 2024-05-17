"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.options = void 0;

var _http = _interopRequireDefault(require("k6/http"));

var _k = require("k6");

var _execution = _interopRequireDefault(require("k6/execution"));

var _metrics = require("k6/metrics");

var _bundle = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");

var _index = require("https://jslib.k6.io/k6-summary/0.0.1/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const allRequests = new Counter("count_requests");
var allError = new _metrics.Counter("error_count");
var options = {
  scenarios: {
    smoke: {
      executor: "ramping-vus",
      startVUs: 10,
      stages: [{
        duration: "8s",
        target: 10
      }, {
        duration: "8s",
        target: 10
      }, {
        duration: "8s",
        target: 10
      }],
      gracefulRampDown: "30s"
    }
  }
};
exports.options = options;

function _default() {
  console.info("Iterations id ==> ".concat(_execution["default"].scenario.iterationInTest, " VU id").concat(_execution["default"].vu.idInTest));
  (0, _k.group)("pass_request", function () {
    var res = _http["default"].get("https://reqres.in/api/users/2");

    (0, _k.check)(res, {
      "is status 200": function isStatus200(r) {
        return r.status === 200;
      }
    });
  }); // group("fail_request", () => {
  //   const res2 = http.get(`https://reqres.in/api/unknown/23`);
  //   check(res2, { "is status 404": (r) => r.status === 204 });
  // });

  (0, _k.sleep)(1);
} // export function handleSummary(data) {
//   return {
//     "result.html": htmlReport(data),
//     stdout: textSummary(data, { indent: "\t", enableColors: true }),
//   };
// }