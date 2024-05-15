import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
import { Counter } from "k6/metrics";

// const allRequests = new Counter("count_requests");
const allError = new Counter("error_count");

export const options = {
  // thresholds: {
  //   error_count: [{ threshold: "count>=5", abortOnFail: true }], // Abort if errors are 5 or more
  // },
  scenarios: {
    smoke: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "20s", target: 10 },
        { duration: "30s", target: 10 },
        { duration: "0s", target: 0 },
      ],
      gracefulRampDown: "30s",
    },
  },
};

export default function () {
  console.info(
    `Iterations id ==> ${exec.scenario.iterationInTest} VU id${exec.vu.idInTest}`
  );

  const baseUrl = "https://reqres.in/";
  const endPoint = "api/users/2";
  const res = http.get(`${baseUrl}${endPoint}`);
  if (res.status >= 400) allError.add(1);
  check(res, { "is status 200": (r) => r.status === 200 });

  // allRequests.add(1);

  const res2 = http.get(`https://reqres.in/api/unknown/23`);
  if (res2.status >= 400) allError.add(1);

  check(res, { "is status 200": (r) => r.status === 200 });

  sleep(1);
}
