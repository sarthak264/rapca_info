import { AxiosClient } from "./baseApi";

export interface IClientData {
  client: {
    clientId: string;
    clientSecret: string;
    createdAt: string;
    email: string;
    username: string;
    meetings: Array<Object>;
    redirectUrl: string;
    updatedAt: string;
    websiteUrl: string;
    cards: {
      cardId: string;
      cardNumber: string;
      cardSno: string;
      _id: string;
    }[];
  };
  token: string;
}

export const ClientService = {
  loginClient: (data: { email: string; password: string }) => {
    return AxiosClient.post<IClientData>("/client/login", data);
  },
  authenticateUser: () => {
    return AxiosClient.get<IClientData>("/client/login");
  },
  getClientById: (id: string) => {
    return AxiosClient.get(`/client/${id}`);
  },
  createClient: (data: {
    email: string,
    password: string,
    websiteUrl: string,
    userName: string,
    redirectUrl: string,
  }) => {
    return AxiosClient.post("/client", data);
  }
};
