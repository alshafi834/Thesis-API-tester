import axios from "axios";

const saveTest = async (reqBody) => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const token = localStorage.getItem("accessToken");
  //const response = await axios.get(`${baseUrl}/tests`);

  const config = {
    method: "post",
    url: `${baseUrl}/tests`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: reqBody,
  };

  let res;
  await axios(config)
    .then(function (response) {
      res = response;
    })
    .catch(function (error) {
      res = error.response;
    });
  return res.data;
};

export default saveTest;
