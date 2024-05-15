import http from "k6/http";
import { check, group, sleep } from "k6";
import exec from "k6/execution";

export default function () {
  // Log iteration and VU information
  console.info(
    `Iteration ID: ${exec.scenario.iterationInTest}, VU ID: ${exec.vu.idInTest}`
  );

  // Define the URL using the environment variable
  //const url = __ENV.HOST_URL;

  // Perform the GET request
  const res = http.get(__ENV.HOST_URL);

  // Check the response status and log a message if it is not 200
  check(res, { "is status 200": (r) => r.status === 200 });

  // Sleep for 1 second between requests
  sleep(1);
}
