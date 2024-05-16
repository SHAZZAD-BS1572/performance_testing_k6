import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { SharedArray } from "k6/data";
import exec from "k6/execution";
import http from "k6/http";
import { check, sleep } from "k6";

const csvData = papaparse.parse(open("/scripts/csvData.csv"), {
  header: true,
}).data;

export const options = {
  stages: [
    { duration: "2m", target: 2000 }, // fast ramp-up to a high point
    // No plateau
    { duration: "1m", target: 0 }, // quick ramp-down to 0 users
  ],
  //   scenarios: {
  //     loginWithCSV: {
  //       executor: "shared-iterations",
  //       vus: 1,
  //       iterations: csvData.length,
  //     },
  //   },
};

export default function (data) {
  // 3. VU code
  //   const user = csvData[exec.scenario.iterationInTest];
  const res = http.get(
    `https://reqres.in/api/users/${exec.scenario.iterationInTest}`
  );
  check(res, { "is status 200": (r) => r.status === 200 });

  // console.info(exec.scenario.iterationInTest + "====>" + exec.vu.idInTest);
  //   const resData = res.json("data");
  //   console.log(resData.email);
  //   console.log(user.email);
  //   check(res, {
  //     "is user email correct": () => resData.email === user.email,
  //   });
}
