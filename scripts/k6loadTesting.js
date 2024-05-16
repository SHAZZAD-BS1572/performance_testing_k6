import http from "k6/http";
import { check, group, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  // Key configurations for avg load test in this section
  stages: [
    { duration: "5m", target: 5 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: "5m", target: 15 }, // stay at 100 users for 30 minutes
    { duration: "5m", target: 15 },
    { duration: "5m", target: 5 }, // ramp-down to 0 users
  ],
};

export default () => {
  const urlRes = http.get("https://test-api.k6.io");
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
  //new
};

export function handleSummary(data) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: "    ", enableColors: true }),
  };
}
