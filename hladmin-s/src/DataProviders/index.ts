import { DataProvider } from "ra-core";
import { DataProviderTypes } from "../types/DataProviderTypes";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { getData, getFormData, getParams } from "../Utils/DataProviderUtils";
export const CustomDataProvider = {
  getList: async (resourse: DataProviderTypes, params: any) => {
    console.log({ resourse, params });
    const tokenId = localStorage.getItem("firebaseToken");
    return AxiosInstance.post("", {
      jsonrpc: "2.0+hl",
      id: 1,
      method: `jdr1:${resourse}:${params.filter.q ? "search" : "list"}`,
      params: getParams(resourse, params),
      auth: {
        type: "gcloud_firebase",
        id_token: tokenId || "",
      },
    }).then((res) => {
      if (res.data.error) {
        throw new Error("Something went wrong...");
      }
      return getData(resourse, res.data);
    });
  },

  getOne: () => {
    return new Promise(() => null);
  },

  getMany: () => {
    return new Promise(() => null);
  },

  getManyReference: () => {
    return new Promise(() => null);
  },

  update: (resourse: DataProviderTypes, params: any) => {
    console.log({ resourse, params });
    const tokenId = localStorage.getItem("firebaseToken");
    return AxiosInstance.post("", {
      jsonrpc: "2.0+hl",
      id: 1,
      method: `jdr1:${resourse}:edit`,
      params: getFormData(resourse, params.data),
      auth: {
        type: "gcloud_firebase",
        id_token: tokenId || "",
      },
    }).then((res) => {
      if (res.data.result) {
        return { data: { ...params.data, id: res.data.result._id } };
      }

      throw new Error('Failed due to "' + res.data.error.message + '"');
    });
  },

  updateMany: () => {
    return new Promise(() => null);
  },

  create: (resourse: DataProviderTypes, params: any) => {
    console.log({ resourse, params });
    const tokenId = localStorage.getItem("firebaseToken");
    return AxiosInstance.post("", {
      jsonrpc: "2.0+hl",
      id: 1,
      method: `jdr1:${resourse}:add`,
      params: getFormData(resourse, params.data),
      auth: {
        type: "gcloud_firebase",
        id_token: tokenId || "",
      },
    }).then((res) => {
      if (res.data.result) {
        return { data: { ...params.data, id: res.data.result._id } };
      }

      return { data: res.data };
    });
  },

  delete: () => {
    return new Promise(() => null);
  },

  deleteMany: () => {
    return new Promise(() => null);
  },
} as DataProvider;
