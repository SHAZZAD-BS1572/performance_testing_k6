import exec from "k6/execution";

const jsonData = JSON.parse(open("/scripts/data.json"));

export const options = {
  scenarios: {
    loginWithjson: {
      executor: "shared-iterations",
      vus: 1,
      iterations: jsonData.length,
    },
  },
};

export default function (data) {
  const user = jsonData[exec.scenario.iterationInTest];
  console.log(user.email);
}
