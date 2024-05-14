import http from "k6/http";
import { check, sleep } from "k6";
import exec from "k6/execution";
export const users = JSON.parse(open("data.json"));
export const options = {
  scenarios: {
    // accountCreate: {
    //   executor: "per-vu-iterations",
    //   vus: 5,
    //   iterations: 10,
    // },
    accountCreate2: {
      executor: "shared-iterations",
      vus: 3,
      iterations: 500,
    },

    // accountCreate3: {
    //   executor: "constant-vus",
    //   vus: 10,
    //   duration: "120s",
    //iterations: 10,
    //},

    // accountCreate4: {
    //   executor: "ramping-vus",
    //   startVUs: 0,
    //   stages: [
    //     { duration: "20s", target: 10 },
    //     { duration: "50s", target: 100 },
    //     { duration: "20s", target: 5 },
    //   ],
    //   gracefulRampDown: "30s",
    // },
  },

  // vus: 10,
  // iterations: 5,
  // duration: "5m",
};
export default function () {
  console.info(
    `Iterations id ==> ${exec.scenario.iterationInTest} VU id ${
      exec.vu.idInTest
    } Data id ${(exec.scenario.iterationInTest % users.length) + 1}`
  );

  // console.info(
  //   `Iterations id ==> ${exec.scenario.iterationInTest} VU id${exec.vu.idInTest}`
  // );

  // console.log(exec.vu.idInTest);

  const baseUrl = "https://reqres.in/";
  const endPoint = "api/users/2";
  const res = http.get(`${baseUrl}${endPoint}`);
  check(res, { "is status 200": (r) => r.status === 200 });
  res.body;
  //   console.log(res);
  sleep(1);
}
