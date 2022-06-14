import axios from "axios";

export const OpportunitiesAPI = {
  getOpprtunityById: (id) => {
    return axios.post("/api/get_deal_info", {
      opportunity_id: id,
    });
  },
};
