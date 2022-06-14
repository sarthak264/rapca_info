import axios from "axios";
import { Url } from "helper/constants";
import Header from "./Header";

export default class EvaluatorServices {
  static dashboard() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/evaluator/dashboard`);
  }
  static acceptEvaluation() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/evaluator/accept-evaluation`);
  }

  static missionPending() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/evaluator/mission-pending`);
  }

  static memoList() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/student/memo-list`);
  }

  static myEarning(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/evaluator/my-earnings`, params);
  }

  static submitEvaluation(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/evaluator/submit-evaluation`, params);
  }
}
