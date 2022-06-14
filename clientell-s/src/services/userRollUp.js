import axios from 'axios'

export const rollUpAPi = async (data) => {
    let responseData = await axios.post('/api/getUserRollup', data)
    console.log(responseData)
    let headers = []
    for (let i = 0; i < responseData.data.main.headers.length; i++) {
        headers.push({
            header: responseData.data.main.headers[i].metric_display_name,
            datatype: responseData.data.main.headers[i].metric_datatype,
            value: responseData.data.main.rows[0][responseData.data.main.headers[i].metric_display_name]
        })
    }
    // console.log(headers)
    // return responseData

    //table processing
    let tableHeaders = [];
    for (let i = 0; i < responseData.data.table.headers.length; i++) {
        tableHeaders.push({
            header: responseData.data.table.headers[i].metric_display_name,
            datatype: responseData.data.table.headers[i].metric_datatype
        })
    }


    return {
        headers,
        table: {
            tableHeaders,
            data: responseData.data.table.rows
        }
    }
}