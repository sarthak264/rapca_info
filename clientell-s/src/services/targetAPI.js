import axios from "axios";

export const getTargetList = async () => {
    let responseData = await axios.get("/api/getTargetList")

    if (responseData.data) {
        let headers = [];
        for (let i = 0; i < responseData.data.table.headers.length; i++) {
            headers.push({
                header: responseData.data.table.headers[i].metric_display_name,
                datatype: responseData.data.table.headers[i].metric_datatype,
            })
        }

        return {
            headers,
            tableData: responseData.data.table.rows
        }

    }

    // return responseData

}