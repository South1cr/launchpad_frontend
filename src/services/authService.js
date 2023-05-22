import axios from "axios";
import { baseUrl } from "./baseUrl";
import { handle401 } from "./handle401";

export const get = (route) => {
  let token = localStorage.getItem("authToken");

  const promise= axios.get(baseUrl + route, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .catch((err) => {
    handle401(err)
    console.log(route, err);
  })
  return promise;
};

export const post = (route, body) => {
  let token = localStorage.getItem("authToken");

  const promise = axios.post(baseUrl + route, body, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .catch((err) => {
    handle401(err)
    console.log(route, err);
  })
  return promise;
};