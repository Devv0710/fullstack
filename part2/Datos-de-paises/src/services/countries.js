import axios from "axios";
const BASEURL = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const request = axios.get(`${BASEURL}/all`);
  return request.then((response) => response.data);
};

export default { getAll };
