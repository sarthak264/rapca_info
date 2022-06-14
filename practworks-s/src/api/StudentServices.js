import axios from "axios";
import { Url } from "helper/constants";
import Header from "./Header";

export default class StudentServices {
  static dashboard() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/dashboard`);
  }

  static unsubscribe() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/unsubscribe`);
  }

  static subscribe() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/subscribe`);
  }

  static awards() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/award-list`);
  }

  static getDropdowns() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/tag-dropdown`);
  }

  static postDropdown(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/list-completed-mission`, params);
  }

  static getCurrentMissions(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/current-mission-list`, params);
  }

  static getAwards() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/award`);
  }

  static getSubjects() {
    Header.setHeaders();
    return axios.post(`${Url}app-api/user/view`);
  }

  static getTopicsBySubject(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/topic/list`, params);
  }

  static getShowDown(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/shown-mission`, params);
  }

  static getMissionsDropdown(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/common/mission-dropdowns`, params);
  }

  static createMission(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/create-mission`, params);
  }

  static pickMission(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/pick-mission`, params);
  }

  static postFeedback(id, params) {
    Header.setHeaders();
    return axios.put(`${Url}app-api/student/review/${id}`, params);
  }

  static getVideos(id) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/mission-help-list/${id}`);
  }

  static checkEligibility(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/check-shown-eligibility`, params);
  }

  static revise(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/revise-question`, params);
  }

  static submitAnswer(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/student/submit-answer`, params);
  }
}
