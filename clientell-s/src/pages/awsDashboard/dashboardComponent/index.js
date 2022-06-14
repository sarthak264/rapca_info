import React, { useEffect } from 'react'
import { embedDashboard } from "amazon-quicksight-embedding-sdk";
import axios from "axios"
export const DashboardComponent = ({ id }) => {
    const getDashboard = async () => {
        const responseData = await axios.post("/api/getquicksightdashboardurl/", {
            dashboard: id
        })
        console.log(responseData.data.EmbedUrl)
        const containerDiv = document.getElementById("dashboardContainer");
        containerDiv.innerHTML = "";
        var options = {
            url: responseData.data.EmbedUrl,
            container: containerDiv,
            scrolling: "no",
        };
        const dashboard = embedDashboard(options);
    }
    useEffect(() => {
        getDashboard()
    }, [])
    return (
        <div id="dashboardContainer" style={{ width: "100%", height: "100vh" }}></div>
    )
}
