import axios from "axios";

const URL = import.meta.env.VITE_API_URL || "localhost:8080";
axios.defaults.baseURL = `http${
  URL != "localhost:8080" ? "s" : ""
}://${URL}/api/`;
axios.defaults.withCredentials = true;

export default axios;
