import axios from "axios";

const signUpUser = async (value, sign) => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const apiUrl =
    sign === "up" ? baseUrl + "/auth/signup" : baseUrl + "/auth/signin";
  const payload = {
    username: value.email,
    password: value.password,
  };
  console.log(payload);
  const response = await axios.post(apiUrl, payload);
  return response.data;
};

export default signUpUser;
