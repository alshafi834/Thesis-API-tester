import axios from "axios";

const getApis = async () => {
  const baseUrl = process.env.VUE_APP_API_URL;
  const response = await axios.get(`${baseUrl}/paths`);
  return response.data;
};

export default getApis;
