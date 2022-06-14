import axios from "axios";
import { Url } from "helper/constants";
import Header from "./Header";

export default class AuthServices {
  static login(params) {
    return axios.post(`${Url}app-api/user/login`, params);
  }

  static signup(params) {
    return axios.post(`${Url}app-api/user/signup`, params);
  }

  static phoneVerify(id) {
    return axios.get(`${Url}app-api/user/verify-phone/${id}`);
  }

  static updateProfile(id, params) {
    return axios.put(`${Url}app-api/user/update-profile/${id}`, params);
  }

  static forgotPassword(params) {
    return axios.post(`${Url}app-api/user/forgot-password`, params);
  }

  static resetpassword(params) {
    return axios.post(`${Url}app-api/user/reset-password`, params);
  }

  static changepassword(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/user/change-password`, params);
  }
  static view() {
    Header.setHeaders();
    return axios.post(`${Url}app-api/user/view`);
  }

  static contactus(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/common/contact-us`, params);
  }
}
