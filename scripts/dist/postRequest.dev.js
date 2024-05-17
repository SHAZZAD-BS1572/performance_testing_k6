"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
exports.options = void 0;

var _http = _interopRequireDefault(require("k6/http"));

var _k = require("k6");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var options = {
  //   thresholds: {
  //     http_req_duration: ["p(95)<200"],
  //   },
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 200,
      maxDuration: "30s"
    }
  }
};
exports.options = options;

function _default() {
  var url = "https://reqres.in/api/users";
  var payload = JSON.stringify({
    name: "morpheus",
    job: "leader"
  });
  var params = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  var response = _http["default"].post(url, payload, params);

  (0, _k.check)(response, {
    "is status 201": function isStatus201(r) {
      return r.status === 201;
    }
  });
  (0, _k.sleep)(1);
}