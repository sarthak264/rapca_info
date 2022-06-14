import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: "https://api.hungerlink.dev/jsonrpc",
});
