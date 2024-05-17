import http from "k6/http";
import { check, group, sleep } from "k6";
import exec from "k6/execution";
import { Counter } from "k6/metrics";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

// const allRequests = new Counter("count_requests");
const allError = new Counter("error_count");

export const options = {
  scenarios: {
    smoke: {
      executor: "ramping-vus",
      startVUs: 10,
      stages: [
        { duration: "8s", target: 10 },
        { duration: "8s", target: 10 },
        { duration: "8s", target: 10 },
      ],
      gracefulRampDown: "30s",
    },
  },
};

export default function () {
  console.info(
    `Iterations id ==> ${exec.scenario.iterationInTest} VU id${exec.vu.idInTest}`
  );

  group("pass_request", () => {
    const res = http.get(`https://reqres.in/api/users/2`);
    check(res, { "is status 200": (r) => r.status === 200 });
  });

  // group("fail_request", () => {
  //   const res2 = http.get(`https://reqres.in/api/unknown/23`);
  //   check(res2, { "is status 404": (r) => r.status === 204 });
  // });

  sleep(1);
}
// export function handleSummary(data) {
//   return {
//     "result.html": htmlReport(data),
//     stdout: textSummary(data, { indent: "\t", enableColors: true }),
//   };
// }
