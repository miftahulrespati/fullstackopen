import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  return await axios.get(baseUrl);
};

const create = async (person) => {
  return await axios.post(baseUrl, person);
};

const update = async (id, person) => {
  return await axios.put(`${baseUrl}/${id}`, person);
};

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`);
};

const personService = { getAll, create, update, remove };

export default personService;
