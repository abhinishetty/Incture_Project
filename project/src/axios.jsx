// axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/users", // not localhost!
});

export default api;
