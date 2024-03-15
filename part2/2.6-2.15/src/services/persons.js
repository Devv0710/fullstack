import axios from "axios";
const BASEURL = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(BASEURL);
  return request.then((response) => response.data);
};
const create = (newObject) => {
  const request = axios.post(BASEURL, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${BASEURL}/${id}`, newObject);
  return request.then((response) => response.data);
};
const deletePerson = (id) => {
  const request = axios.delete(`${BASEURL}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, deletePerson };
