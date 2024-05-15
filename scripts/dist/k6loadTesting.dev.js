"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleSummary = handleSummary;
exports["default"] = exports.options = void 0;

var _http = _interopRequireDefault(require("k6/http"));

var _k = require("k6");

var _bundle = require("https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js");

var _index = require("https://jslib.k6.io/k6-summary/0.0.1/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  // Key configurations for avg load test in this section
  stages: [{
    duration: "5s",
    target: 15
  }, // traffic ramp-up from 1 to 100 users over 5 minutes.
  {
    duration: "5s",
    target: 15
  }, // stay at 100 users for 30 minutes
  {
    duration: "5s",
    target: 5
  } // ramp-down to 0 users
  ]
};
exports.options = options;

var _default = function _default() {
  var urlRes = _http["default"].get("https://test-api.k6.io");

  (0, _k.sleep)(1); // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};

exports["default"] = _default;

function handleSummary(data) {
  return {
    "result.html": (0, _bundle.htmlReport)(data),
    stdout: (0, _index.textSummary)(data, {
      indent: "    ",
      enableColors: true
    })
  };
}