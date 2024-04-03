import axios from "axios";
import logger from "./logService";
import helpers from "./crypto";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
    console.log("set jwt", (jwt));
  axios.defaults.headers.common["Authorization"] = jwt;
  axios.defaults.headers.common["Content-type"] = "application/json";

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
