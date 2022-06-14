import "./embed.less";
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "antd";
import axios from "axios";
import { Form, Input, Button, Checkbox } from "antd";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import qs from "query-string";
import _ from "lodash";
import { embedSession } from "amazon-quicksight-embedding-sdk";
import ReactLoading from "react-loading";

const Embed = (props) => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [embedURLData, setEmbedURLData] = useState(false);

    useEffect(() => {
        axios
            .get(
                "session/embed/url/",
                {
                    headers: {
                        Authorization: `Token ${userInfo.token}`,
                    },
                }
            )
            .then((response) => {
                setEmbedURLData(response.data.data);
                setLoading(false);
                window.location.hash = "#";
                console.log(response.data.data);

                var containerDiv = document.getElementById("embeddingContainer");
                var options = {
                    url: response.data.data?.EmbedUrl, // replace this dummy url with the one generated via embedding API
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
            })
            .catch((error) => {
                toast.error("Something went worng.");
            });
    }, []);

    if (loading) {
        return (
            <div className="embed-root">
                <div className="loader">
                    <ReactLoading
                        type="bars"
                        color="#3982f6"
                        height={667 / 4}
                        width={375 / 4}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="embed-root">
            <div
                id="embeddingContainer"
                style={{ width: "100%", height: "100%" }}
            ></div>
        </div>
    );
};

export default Embed;