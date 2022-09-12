import axios from "axios";

/* const types = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  delete: "DELETE",
}; */

const apiCaller = async (value) => {
  /* const type = types[value.type];
  console.log(type); */
  const headerValue = value.header.value.reduce(
    (a, v) => ({ ...a, [v.name]: v.value }),
    {}
  );
  const bodyValue = value.body.value.reduce(
    (a, v) => ({ ...a, [v.name]: v.value }),
    {}
  );
  const config = {
    method: value.type,
    url: value.url.value,
    headers: headerValue,
  };
  if (value.body.value.length > 0) {
    config.data = bodyValue;
  }

  let res;
  await axios(config)
    .then(function (response) {
      res = response;
    })
    .catch(function (error) {
      res = error.response;
    });
  /* const baseUrl = process.env.VUE_APP_API_URL;
  const response = await axios.get(`${baseUrl}/paths`);
  return response.data; */

  return { res, config };
};

export default apiCaller;
