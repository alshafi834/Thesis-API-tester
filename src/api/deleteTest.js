import axios from "axios";

const deleteTest = async (id) => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const token = localStorage.getItem("accessToken");

  const config = {
    method: "delete",
    url: `${baseUrl}/tests/${id}`,
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

export default deleteTest;
