import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

import "./index.less";
export const YourProgress = () => {
    const [dataset, setDataset] = useState(null);
    const [popUpState, setPopUpState] = useState(false);
    const [popUpType, setPopUpType] = useState(null);
    const fetchData = async () => {
        let repsonseData = await axios.get(
            "/api/getYourProgress"
        );
        setDataset(repsonseData.data.data);
    };
    const popUpControlFunc = (popUpCat) => {
        setPopUpState(!popUpState);
        console.log(popUpCat)
        setPopUpType(popUpCat);
    };
    useEffect(() => {
        fetchData();
    }, []);

    return dataset === null ? (
        <p>Loading</p>
    ) : (
        <div className="yourprogress">
            {popUpState ? (
                <PopUpTable popUpControlFunc={popUpControlFunc} popUpType={popUpType} />
            ) : null}
            <div className="testtile">
                <div className="headerdiv">
                    <p className="headertiletext">
                        Your Current Quarter Target
                    </p>
                </div>
                <p className="amount">$ {dataset.target_CQ !== null ? dataset.target_CQ.toLocaleString() : "---"}</p>
                {
                    dataset.target_CQ !== null ?
                        <p className="footer">
                            Set by {dataset.target_CQ_manager} on {new Intl.DateTimeFormat("en-US", {
                                day: "2-digit",
                                month: "long",
                            }).format(new Date(dataset.target_CQ_updated_at.split('T')[0]))} at 8:20PM
                        </p> : null
                }
            </div>

            <div className="testtile" onClick={() => popUpControlFunc('bookedcq')}>
                <div className="headerdiv">
                    <p className="headertiletext">Booked CQ</p>
                    <p>{dataset.booked_CQ_count} Deals</p>
                </div>
                <p className="amount">$ {dataset.booked_CQ !== null ? dataset.booked_CQ.toLocaleString() : null}</p>
                {
                    dataset.booked_CQ !== null && dataset.target_CQ !== null ?
                        <p className="footer">
                            {((dataset.booked_CQ / dataset.target_CQ) * 100).toFixed(2)}%
                            of target reached
                        </p> : null
                }
            </div>

            <div className="testtile" onClick={() => popUpControlFunc("pipelinecq")}>
                <div className="headerdiv">
                    <p className="headertiletext">CQ Pipeline</p>
                    <p>{dataset.pipeline_CQ_count !== null ? dataset.pipeline_CQ_count : "---"} Deals</p>
                </div>
                <p className="amount">
                    $ {dataset.pipeline_CQ !== null ? dataset.pipeline_CQ.toLocaleString() : "---"}
                </p>
                {
                    dataset.pipeline_CQ !== null && dataset.target_CQ !== null ?
                        <p className="footer">
                            {(dataset.pipeline_CQ / dataset.target_CQ).toFixed(2)}x
                            coverage of current quarter target
                        </p> : null
                }
            </div>

            <div className="testtile">
                <div className="headerdiv">
                    <p className="headertiletext">Your Monthly Goal</p>
                </div>
                <p className="amount">
                    $ {((dataset.target_CQ / 3) !== null ? (dataset.target_CQ / 3).toLocaleString() : "---")}
                </p>
            </div>

            <div className="testtile" onClick={() => popUpControlFunc('bookedmonth')}>
                <div className="headerdiv">
                    <p className="headertiletext">Booked This Month</p>
                    <p>{dataset.booked_CM_count !== null ? dataset.booked_CM_count : "---"} Deals</p>
                </div>
                <p className="amount">
                    $ {dataset.booked_CM !== null ? dataset.booked_CM.toLocaleString() : "---"}
                </p>
                {
                    dataset.booked_CM !== null && dataset.target_CM !== null ?
                        <p className="footer">
                            {(
                                (dataset.booked_CM / dataset.target_CM) *
                                100
                            ).toFixed(2)}
                            % Monthly target reached
                        </p> : null
                }
            </div>
        </div>
    );
};

export const PopUpTable = ({ popUpControlFunc, popUpType }) => {
    console.log(popUpType)
    let [tableData, setTableData] = useState(null)
    const popDataCall = async () => {
        let responseData;
        if (popUpType === "bookedcq")
            responseData = await axios.get('/api/getYourProgressTable/booked/cq');
        else if (popUpType === "pipelinecq")
            responseData = await axios.get('/api/getYourProgressTable/pipeline/cq');
        else if (popUpType === "bookedmonth")
            responseData = await axios.get("/api/getYourProgressTable/booked/cm")

        console.log(responseData.data.data)
        setTableData(responseData.data.data)
    }
    useEffect(() => {
        popDataCall();
    }, [])
    const colorFunction = (value) => {
        let returnedData;
        if (value < 33.3)
            returnedData = {
                background: "#D7FCE4",
                color: "#1EC86A",
            };
        else if (value < 66.6 && value > 33.3)
            returnedData = {
                background: "#FBF6E7",
                color: "#FE8127",
            };
        else {
            returnedData = {
                background: "#FCF3F3",
                color: "#F5483F",
            };
        }
        return returnedData;
    };

    return (
        <div className="popuptable" onClick={popUpControlFunc}>
            {tableData === null ? <p>Loading</p> : <div className="tablediv">
                <div className="tableheaders">
                    <div className="dealnamediv">
                        <p>Deal Name</p>
                    </div>
                    <div>
                        <p>Account</p>
                    </div>
                    <div className="engaementriskdiv">
                        <p>Engagement Risk</p>
                    </div>
                    <div className="forecastriskdiv">
                        <p>Forecast Risk</p>
                    </div>
                    <div>
                        <p>Deal Stage</p>
                    </div>
                    <div>
                        <p>Close Date</p>
                    </div>
                    <div>
                        <p>Amount</p>
                    </div>
                </div>
                {
                    tableData.map((item, index) => {
                        return <div key={index} className="tabledata">
                            <div className="dealnamediv">
                                <p>{item.name}</p>
                            </div>
                            <div className="accountnamediv">
                                <p>{item.account}</p>
                            </div>
                            <div className="engaementriskdiv">
                                <div
                                    className="factor"
                                    style={colorFunction(item.engagement_risk)}
                                // style={colorFunction(item.forecast_risk)}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        style={{
                                            fontWeight: 800,
                                        }}
                                    />
                                    &nbsp;&nbsp;
                                    <p>{item.engagement_risk}</p>
                                </div>
                                <p>{item.engagement_risk < 33 ? "Low" : item.engagement_risk > 33 && item.engagement_risk < 66 ? "Medium" : "High"}</p>
                            </div>
                            <div className="forecastriskdiv">
                                <div
                                    className="factor"
                                    // style={colorFunction(item.forecast_risk)}
                                    style={colorFunction(item.forecast_risk)}
                                >
                                    <FontAwesomeIcon
                                        icon={faCircle}
                                        style={{
                                            fontWeight: 800,
                                        }}
                                    />
                                    &nbsp;&nbsp;
                                    <p
                                        style={colorFunction(item.forecast_risk)}

                                    >{item.forecast_risk}</p>
                                </div>
                                <p>{item.forecast_risk < 33 ? "Low" : (item.forecast_risk > 33 && item.forecast_risk < 66 ? "Medium" : "High")}</p>
                            </div>
                            <div>
                                <p>{item.stagename}</p>
                            </div>
                            <div>
                                <p>{new Intl.DateTimeFormat("en-US", {
                                    day: "2-digit",
                                    month: "long"
                                }).format(new Date(item.closedate.split('T')[0]))}</p>
                            </div>
                            <div>
                                <p>${(item.amount).toLocaleString()}</p>
                            </div>
                        </div>
                    })
                }
            </div>
            }        </div>
    );
};
