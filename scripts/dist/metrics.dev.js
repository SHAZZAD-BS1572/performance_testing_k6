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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const allRequests = new Counter("count_requests");
var allError = new _metrics.Counter("error_count");
var options = {
  // thresholds: {
  //   error_count: [{ threshold: "count>=5", abortOnFail: true }], // Abort if errors are 5 or more
  // },
  scenarios: {
    smoke: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [{
        duration: "20s",
        target: 10
      }, {
        duration: "30s",
        target: 10
      }, {
        duration: "0s",
        target: 0
      }],
      gracefulRampDown: "30s"
    }
  }
};
exports.options = options;

function _default() {
  console.info("Iterations id ==> ".concat(_execution["default"].scenario.iterationInTest, " VU id").concat(_execution["default"].vu.idInTest));
  var baseUrl = "https://reqres.in/";
  var endPoint = "api/users/2";

  var res = _http["default"].get("".concat(baseUrl).concat(endPoint));

  if (res.status >= 400) allError.add(1);
  (0, _k.check)(res, {
    "is status 200": function isStatus200(r) {
      return r.status === 200;
    }
  }); // allRequests.add(1);

  var res2 = _http["default"].get("https://reqres.in/api/unknown/23");

  if (res2.status >= 400) allError.add(1);
  (0, _k.check)(res, {
    "is status 200": function isStatus200(r) {
      return r.status === 200;
    }
  });
  (0, _k.sleep)(1);
}