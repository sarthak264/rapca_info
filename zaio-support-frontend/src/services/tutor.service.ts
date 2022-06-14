import { AxiosClient } from "./baseApi";

export interface ITutorData {
  tutor: {
    _id: string;
    email: string;
    username: string;
  };
  token: string;
}

export const TutorService = {
  loginTutor: (data: { email: string; password: string }) => {
    return AxiosClient.post<ITutorData>("/tutor/login", data);
  },
  authenticateUser: () => {
    return AxiosClient.get<ITutorData>("/tutor/login");
  },
  getTutorById: (id: string) => {
    return AxiosClient.get("/tutor/" + id);
  },
};
