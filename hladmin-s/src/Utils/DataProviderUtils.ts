import { DataProviderTypes } from "../types/DataProviderTypes";

export const getData = (resource: DataProviderTypes, data: any) => {
  switch (resource) {
    case DataProviderTypes.REGION:
      return {
        total: data.result.length,
        data: data.result.map((el: any) => {
          const id = el._id;
          delete el._id;
          return { ...el, id };
        }),
      };

    case DataProviderTypes.BME:
      if (data.result.length !== undefined) {
        return {
          total: data.result.length,
          data: data.result.map((el: any) => {
            const id = el._id;
            delete el._id;
            return { ...el, id };
          }),
        };
      } else {
        return {
          total: data.result.total_items,
          data: data.result.items.map((el: any) => {
            const id = el._id;
            delete el._id;
            return { ...el, id };
          }),
        };
      }

    case DataProviderTypes.TRIP:
      return {
        total: data.result.total_items,
        data: data.result.items.map((el: any) => {
          const id = el._id;
          delete el._id;
          return { ...el, id };
        }),
      };
    default:
      break;
  }
};

export const getParams = (resource: DataProviderTypes, params: any) => {
  switch (resource) {
    case DataProviderTypes.REGION:
      return {};

    case DataProviderTypes.BME:
      if (params.filter.q) {
        return {
          searchText: params.filter.q,
        };
      }
      return {
        page: params.pagination.page,
      };

    case DataProviderTypes.TRIP:
      return params.filter;

    default:
      break;
  }
};

export const getFormData = (resource: DataProviderTypes, params: any) => {
  switch (resource) {
    case DataProviderTypes.REGION:
      return params;

    case DataProviderTypes.BME:
      const geoloc = { longitude: params.longitude, latitude: params.latitude };
      delete params.longitude;
      delete params.latitude;
      return {
        ...params,
        geoloc,
      };

    case DataProviderTypes.TRIP:
      return params;

    default:
      break;
  }
};
