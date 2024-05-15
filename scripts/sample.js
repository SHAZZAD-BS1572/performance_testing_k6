import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const users = JSON.parse(open("data.json"));
export const options = {
  // thresholds: {
  //   http_req_duration: [
  //     { threshold: "p(90)<35" }, // 90% of requests should be below 35ms, abort test if this fails
  //   ],
  // },

  scenarios: {
    accountCreate: {
      executor: "per-vu-iterations",
      vus: 5,
      iterations: 500,
    },
    // accountCreate2: {
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
  },
  // vus: 10,
  // iterations: 10,
  // duration: "5m",
};
export default function () {
  // console.info(
  //   `Iterations id ==> ${exec.scenario.iterationInTest} VU id ${
  //     exec.vu.idInTest
  //   } Data id ${(exec.scenario.iterationInTest % users.length) + 1}`
  // );

  console.info(
    `Iterations id ==> ${exec.scenario.iterationInTest} VU id${exec.vu.idInTest}`
  );

  console.log(exec.vu.idInTest);

  const baseUrl = "https://reqres.in/";
  const endPoint = "api/users/2";
  const res = http.get(`${baseUrl}${endPoint}`);
  check(res, { "is status 200": (r) => r.status === 200 });
  res.body;
  console.log(res);
  sleep(1);
}

// export function handleSummary(data) {
//   return {
//     "result.html": htmlReport(data),
//     stdout: textSummary(data, { indent: "\t", enableColors: true }),
//   };
// }
