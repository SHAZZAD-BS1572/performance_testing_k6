import papaparse from "https://jslib.k6.io/papaparse/5.1.1/index.js";
import { SharedArray } from "k6/data";
import exec from "k6/execution";

const csvData = papaparse.parse(open("/scripts/csvData.csv"), {
  header: true,
}).data;

export const options = {
  scenarios: {
    loginWithCSV: {
      executor: "shared-iterations",
      vus: 1,
      iterations: csvData.length,
    },
  },
};

export default function (data) {
  // 3. VU code
  const user = csvData[exec.scenario.iterationInTest];
  // console.info(exec.scenario.iterationInTest + "====>" + exec.vu.idInTest);
  console.log(user.email);
}
