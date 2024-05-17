import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  //   thresholds: {
  //     http_req_duration: ["p(95)<200"],
  //   },
  scenarios: {
    contacts: {
      executor: "shared-iterations",
      vus: 10,
      iterations: 200,
      maxDuration: "30s",
    },
  },
};

export default function () {
  const url = "https://reqres.in/api/users";
  const payload = JSON.stringify({
    name: "morpheus",
    job: "leader",
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = http.post(url, payload, params);

  check(response, { "is status 201": (r) => r.status === 201 });

  sleep(1);
}
