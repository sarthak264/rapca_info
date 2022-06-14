import axios from "axios"

export const getOppotunites = async (data) => {
    let responseData = await axios.post("/api/getOpportunities", data)
    return responseData;
}

