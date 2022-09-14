import axios from "axios";

const testCaller = async (value) => {
  /* const config = {
    method: value.type,
    url: value.url.value,
    headers: headerValue,
  };
  if (value.body.value.length > 0) {
    config.data = bodyValue;
  } */

  let res;
  await axios(value)
    .then(function (response) {
      res = response;
    })
    .catch(function (error) {
      res = error.response;
    });

  return { res };
};

export default testCaller;
