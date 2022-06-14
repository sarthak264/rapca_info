import axios from "axios";
import { Url } from "helper/constants";
import Header from "./Header";

export default class StaticPageServices {
  static staticpage(params) {
    return axios.post(`${Url}app-api/common/static-page`, params);
  }

  static faq() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/common/faq`);
  }
}
