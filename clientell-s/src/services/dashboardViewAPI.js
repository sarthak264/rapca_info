import axios from 'axios'
import moment from "moment";

export const dashboardViewAPI = async (data) => {
    let responseData = await axios.post('/api/getDashboardView', data)
    // console.log(responseData)
    //candle stick data processing
    let proxyProcessedData = [];
    for (let i = 0; i < responseData.data.main.rows[0]['Candle Stick Data'].length; i++) {
        let currentDate = moment(responseData.data.main.rows[0]['Candle Stick Data'][i].x, 'DD/MM/YYYY')
        let formattedDate = moment(currentDate).format("MM/DD/YYYY")
        proxyProcessedData.push({
            x: new Date(formattedDate),
            y: responseData.data.main.rows[0]['Candle Stick Data'][i].y
        })
    }
    // console.log(proxyProcessedData)

    let index = 0;
    let gauges = [];
    let headers = []
    for (let property in responseData.data.main.rows[0]) {
        if (property === "Opportunity Risk" || property === "Forecast Risk") {
            gauges.push({
                name: property,
                value: responseData.data.main.rows[0][property]
            })
        } else if (property !== "Candle Stick Data") {
            headers.push({
                header: property,
                value: responseData.data.main.rows[0][property]
            })
        }
    }

    return {
        candle_stick: proxyProcessedData,
        gauges,
        headers
    }
}

export const filterProcessor = async (data) => {
    let responseData = await axios.get('/api/get_selected_filters?page_name=' + data.toString());

    return responseData.data
}