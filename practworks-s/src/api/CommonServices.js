import axios from "axios";
import { Url } from "helper/constants";
import Header from "./Header";

export default class CommonServices {
  static dropdown(params) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/common/dropdown-data`, params);
  }
  static contactUs(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/common/web-contact-us`, params);
  }
}
