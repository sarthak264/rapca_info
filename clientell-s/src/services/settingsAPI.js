import axios from "axios";

export const SettingsAPI = {
  getMetricColumn: ({ page, metric_type }) => {
    return axios.get(
      "api/page_metric_column?page_name=" + page + "&metric_type=" + metric_type
    );
  },
  getMetricColumnCompanyMapper: (metricId) => {
    return axios.get(
      "api/metric_column_company_mapper?page_metric=" + metricId
    );
  },
  postMetricColumnCompanyMapper: (metricId, array) => {
    return axios.post("api/metric_column_company_mapper", {
      page_metric: metricId,
      metric_column_sort_id: array,
    });
  },
  getPageFilter: ({ page, filter_type }) => {
    return axios.get(
      "api/page_filter?page_name=" + page + "&filter_type=" + filter_type
    );
  },
  getFilterCompanyMapper: (filterId) => {
    return axios.get("api/filter_company_mapper?page_filter=" + filterId);
  },
  postFilterCompanyMapper: (filterId, array) => {
    return axios.post("api/filter_company_mapper", {
      page_filter: filterId,
      filter_id: array,
    });
  },
};
