import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { embedSession } from "amazon-quicksight-embedding-sdk"
import axios from "axios"

import "./index.less"
export const AwsTest = () => {
    const [loading, setLoading] = useState(true)
    const [embedURLData, setEmbedURLData] = useState(null)
    const embedUrlCaller = async () => {
        let responseData = await axios.get('/api/session/embed/url/')
        console.log(responseData.data.data)
        window.location.hash = "#"
        var containerDiv = document.getElementById("embeddingContainer");
        var options = {
            url: responseData.data.data?.EmbedUrl, // replace this dummy url with the one generated via embedding API
            container: containerDiv,
            parameters: {
                country: "United States",
            },
            scrolling: "no",
            height: "100%",
            width: "100%",
            locale: "en-US",
            footerPaddingEnabled: true,
            defaultEmbeddingVisualType: "TABLE", // this option only applies to QuickSight console embedding and is not used for dashboard embedding
        };
        const sessionEmbed = embedSession(options);
        sessionEmbed.on("error", (e) => {
            console.log("Error ......", e);
        });
    }
    useEffect(() => {
        embedUrlCaller();
    }, [])
    return (
        <div className="embed-root"
            style={{ width: "100%", height: "100vh" }}
        >
            <div
                id="embeddingContainer"
                style={{ width: "100%", height: "100%" }}
            ></div>
        </div>
    )
}
