import axios from "axios";

export const GraphAPI = {
    getPipelineRiskAnalysis: (id) => {
        return axios.post("/api/getUserView/4", {});
    },
    getPipelineRiskAnalysisTable: (id) => {
        return axios.post("api/getPipelineRiskAnalysisTable/4", {
            closing: "current-quarter",
            risk: "highRisk",
            stage: "Negotiation/Review",
        });
    },
    getPipelineStageAnalysis: () => {
        return axios.post("api/get_trends", {
            closing_in: "Current Week",
            changes_since: "Last 7 days",
            user_ids: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            ],
        });
    },
};