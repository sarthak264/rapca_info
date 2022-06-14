export const headerProcessor = (data) => {
    // console.log(data)
    if (data.headers && data.rows) {
        // console.log(data.headers)
        // console.log(data.rows)
        let responseData = [];
        for (let i = 0; i < data.headers.length; i++) {
            responseData.push({
                header: data.headers[i].metric_display_name,
                value: data.rows[0][data.headers[i].metric_display_name],
                datatype: data.headers[i].metric_datatype
            })
        }
        return responseData
    }
}


export const tableProcessor = (data) => {
    console.log(data)
    let responseData = {}
    let headers = []
    for (let i = 0; i < data.headers.length; i++) {
        headers.push({
            header: data.headers[i].metric_display_name,
            datatype: data.headers[i].metric_datatype
        })
    }
    let proxyResponseData = {
        ...responseData,
        headers,
        tableData: [...data.rows]
    }
    responseData = proxyResponseData

    return responseData;
}