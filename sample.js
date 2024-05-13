import http from "k6/http";
import { check, sleep } from "k6";
export const options = {
  vus: 10,
  iterations: 10,

  // duration: "1m",
};
export default function () {
  const baseUrl = "https://reqres.in/";
  const endPoint = "api/users/2";
  const res = http.get(`${baseUrl}${endPoint}`);
  check(res, { "is status 200": (r) => r.status === 200 });
  res.body;
  //   console.log(res);
  sleep(1);
}
