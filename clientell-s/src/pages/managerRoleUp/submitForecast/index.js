import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { opporUpdate } from "../../../redux/forcastCheckManage";

import "./index.less";
import closeSvg from "../../../assets/element logos/close button.svg";
import { DoubleLevelDropDown } from "../../../components/doubleLevelDropDown";
import axios from "axios";
import { toast } from "react-toastify";
export const SubmitForecast = ({ forecastPopUpControl }) => {
    const [opporState, setOpporState] = useState(false);
    const [selectedTypeState, setSelectedTypeState] = useState(null);
    const [pastResponseData, setPastResponseData] = useState(null);
    const defaultTypeStyle = {
        color: "#ffffff",
        backgroundColor: "#3b3c9b",
    };
    const opporPopUpControl = () => {
        setOpporState(!opporState);
    };
    const selectedValues = useSelector((state) => state.forcastmanage.value);
    const [formDataState, setFormDataState] = useState({
        value: null,
        type: null,
        oppotunites: null,
        note: null,
    });
    let buttonList = ["Best Case", "Commit", "In  Pipeline"];
    const typeSelectManage = (index) => {
        setFormDataState({
            ...formDataState,
            type:
                index === 0
                    ? "best_case"
                    : index === 1
                        ? "commit"
                        : "in_pipeline",
        });
        setSelectedTypeState(index);
    };

    const submitControl = async () => {
        const finalSubmitData = {
            ...formDataState,
            opportunities: [...selectedValues.opportunity_ids],
        };
        console.log(finalSubmitData);
        try {
            const responseData = await axios.post(
                "/api/forecast/create",
                finalSubmitData
            );
            console.log(responseData);
            fetchPastResponse();
            toast.success("Forecast Created Successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    const fetchPastResponse = async () => {
        let responseData = await axios.get("/api/forecast/list");
        console.log(responseData.data);
        setPastResponseData(responseData.data);
    };
    useEffect(() => {
        fetchPastResponse();
    }, []);
    return (
        <div className="submitforecast">
            {opporState ? (
                <OpportunitesiPopUp opporPopUpControl={opporPopUpControl} />
            ) : null}
            <div className="headerdiv">
                <p>Submit Forecast</p>
                <img
                    src={closeSvg}
                    alt="close"
                    className="closeicon"
                    onClick={forecastPopUpControl}
                />
            </div>
            <div className="forecasrformdiv">
                <p className="forecastheader">
                    Forecast for Current Quarter(Q2-2022)
                </p>
                <p className="forecasttypeheader">Select Forecast type</p>
                <div className="typesselect">
                    {buttonList.map((item, index) => {
                        return (
                            <p
                                onClick={() => typeSelectManage(index)}
                                style={
                                    selectedTypeState === index
                                        ? defaultTypeStyle
                                        : null
                                }
                            >
                                {item}
                            </p>
                        );
                    })}
                </div>
                <p className="editareadiv">Enter Forecast Value</p>
                <div className="editarea">
                    <p className="dollar">$</p>
                    <input
                        type="number"
                        className="cqquarteredit"
                        // defaultValue={data.target_CQ}
                        // onChange={(e) => {
                        //     setTarget(e.target.value);
                        // }}
                        placeholder="Enter a Forecast Value"
                        onChange={(e) => {
                            setFormDataState({
                                ...formDataState,
                                value: Number(e.target.value),
                            });
                        }}
                    />
                </div>
                <p className="totaldealheader">Total Deal Value</p>
                <div className="totaldeal">
                    <p>
                        $ {Number(selectedValues.totalvalue).toLocaleString()}
                    </p>
                    <p
                        className="dealsinclded-link"
                        onClick={opporPopUpControl}
                    >
                        {selectedValues.opportunity_ids.length} Deals Included{" "}
                        <FontAwesomeIcon icon={faAngleRight} />
                    </p>
                </div>
                <div className="notesdiv">
                    <p>Notes</p>
                    <textarea
                        maxLength={1000}
                        placeholder="Enter the note here"
                        onChange={(e) => {
                            setFormDataState({
                                ...formDataState,
                                note: e.target.value,
                            });
                        }}
                    />
                </div>
                <button className="forecastsubmit" onClick={submitControl}>
                    Submit Forecast
                </button>

                <p className="pastforecastheader">Past Forecasts</p>
                <div className="pastforecastdiv">
                    {pastResponseData === null ? (
                        <p>Loading</p>
                    ) : (
                        pastResponseData
                            .map((item, index) => {
                                return (
                                    <div className="pastforecast">
                                        <div className="pricepanel">
                                            <p className="price">
                                                ${" "}
                                                {Number(
                                                    item.value
                                                ).toLocaleString()}
                                            </p>
                                            <p className="date">
                                                {item.created_at.split("T")[0]}
                                            </p>
                                        </div>
                                        <div className="bestcasedeals">
                                            <p className="type">{item.type}</p>
                                            <p className="deals">
                                                {item.opportunities === null
                                                    ? 0
                                                    : item.opportunities
                                                        .length}{" "}
                                                Deals Included{" "}
                                                <FontAwesomeIcon
                                                    icon={faAngleRight}
                                                />
                                            </p>
                                        </div>
                                        <p className="notedata">{item.note}</p>
                                    </div>
                                );
                            })
                            .reverse()
                    )}
                </div>
            </div>
        </div>
    );
};

export const OpportunitesiPopUp = ({ opporPopUpControl }) => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState(null);
    const [checkdealState, setCheckdealState] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [dropdownOption, setDropdownOption] = useState("all");
    const getTableData = async () => {
        let responseData = await axios.get("/api/getDealsForecastList/" + dropdownOption);
        console.log(responseData);
        setTableData(responseData.data.data);
        console.log(responseData.data.data);
    };
    const submitControl = async () => {
        if (checkdealState.length > 0) {
            let id_list = [];
            for (let i = 0; i < checkdealState.length; i++) {
                id_list.push(checkdealState[i].id);
            }
            let responseData = await axios.post("/api/getTotalDealValue", {
                opportunity_ids: id_list,
            });
            dispatch(
                opporUpdate({
                    opportunity_ids: id_list,
                    totalvalue: responseData.data.data,
                })
            );
            opporPopUpControl();
        } else {
            toast.error("Select atleast one deal");
        }
    };
    const returningFunction = (option) => {
        if (option.name === "dealtype") {
            // console.log(option.value);
            setDropdownOption(option.value);
        }
    }
    useEffect(() => {
        getTableData();
    }, [dropdownOption]);
    return (
        <div className="opporheader">
            <div className="opportunitiespopup">
                <div className="headerdivpop">
                    <h3>Opportunities for Best Case Forecast Q2-2002</h3>
                    <button onClick={submitControl}>Done</button>
                </div>
                <div className="totalamountdiv">
                    <div className="dealdisptype">
                        <DoubleLevelDropDown
                            passedFunction={returningFunction}
                            name="dealtype"
                            data={{
                                title: "Show deals in",
                                items: ["Pipeline", "Commit", "Best Case", "All"],
                                defaultSelected: 3,
                            }}
                            values={["pipeline", "commit", "best_case", "all"]}
                        />
                    </div>
                    <div className="dealselection">
                        <p>{checkdealState.length} Deals selected</p>
                        <p>
                            Total Value:{" "}
                            {checkdealState.length !== 0
                                ? "$ " + Number(totalAmount).toLocaleString()
                                : "---"}
                        </p>
                    </div>
                </div>
                {tableData === null ? (
                    <p>LOADING</p>
                ) : (
                    <div className="tablediv">
                        <div className="tableheaders">
                            <div>
                                <p>To include</p>
                            </div>
                            <div>
                                <p>Deal Name</p>
                            </div>
                            <div>
                                <p>Deal Amount</p>
                            </div>
                            <div>
                                <p>Account</p>
                            </div>
                            <div>
                                <p>Stage</p>
                            </div>
                            <div>
                                <p>Engagement Risk</p>
                            </div>
                            <div>
                                <p>Close Date</p>
                            </div>
                        </div>
                        {tableData.map((item, index) => {
                            return (
                                <div className="tableindi" key={index}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name=""
                                            id=""
                                            onChange={(e) => {
                                                if (e.target.checked === true) {
                                                    setTotalAmount(
                                                        Number(totalAmount) +
                                                        Number(item.amount)
                                                    );
                                                    setCheckdealState([
                                                        ...checkdealState,
                                                        {
                                                            id: item.id,
                                                            amount: item.amount,
                                                        },
                                                    ]);
                                                } else {
                                                    setTotalAmount(
                                                        Number(totalAmount) -
                                                        Number(item.amount)
                                                    );
                                                    let newArray =
                                                        checkdealState.filter(
                                                            (deal) =>
                                                                deal.id !==
                                                                item.id
                                                        );
                                                    setCheckdealState(newArray);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="dealnames">
                                        <p>{item.name}</p>
                                    </div>
                                    <div className="dealamount">
                                        <p>
                                            ${" "}
                                            {Number(
                                                item.amount
                                            ).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="dealaccount">
                                        <p>{item.account}</p>
                                    </div>
                                    <div className="dealstage">
                                        <p>{item.stagename}</p>
                                    </div>
                                    <div>
                                        <p>{item.engagement_risk}</p>
                                    </div>
                                    <div>
                                        <p>{item.closedate.split("T")[0]}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
