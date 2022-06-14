import { AxiosClient } from "./baseApi";

export interface UserValuesI {
  userId: string;
  token: string;
}

export const UserService = {
  getToken: async (email: string, username: string) => {
    return AxiosClient.post<UserValuesI>(
      "/user/token",
      {
        email,
        username,
      },
      {
        headers: {
          clientId: "617674424d072f3080db574e",
          clientSecret: "4a5d4dd6b5e9ca73b11c950239416dbb4000235b",
          redirectUrl: "http://localhost:7000",
        },
      }
    );
  },
};
