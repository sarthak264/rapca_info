import axios from "axios";
import { Url } from "helper/constants";
import Header from "./Header";

export default class TeacherServices {
  static dashboard() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/dashboard`);
  }

  static getClasses() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/list_classes`);
  }

  static getClassesById(id) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/class_practice/${id}`);
  }

  static getStudentPracticeById(id) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/student_practice/${id}`);
  }

  static messageStudents(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/teacher/message`, params);
  }

  static getSyllabus() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/syllabus_supported`);
  }

  static createClass(params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/teacher/create_class`, params);
  }

  static getAnswerKeys() {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/answer_keys`);
  }

  static manageClasses(id) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/class_details/${id}`);
  }

  static getSummary(id) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/class_summary/${id}`);
  }

  static moveTopics(id, params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/teacher/move_topics/${id}`, params);
  }

  static inviteStudents(id, params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/teacher/invite_students/${id}`, params);
  }

  static acceptStudents(id, params) {
    Header.setHeaders();
    return axios.post(`${Url}app-api/teacher/accept_students/${id}`, params);
  }

  static getInvites(id) {
    Header.setHeaders();
    return axios.get(`${Url}app-api/teacher/pending_students/${id}`);
  }
}
