import axios from "axios";

const getTests = async (apiNm) => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  const config = {
    method: "get",
    url: `${baseUrl}/tests?api_name=${apiNm}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
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

export default getTests;
