import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";

import "./index.less";
export const SelectTables = () => {
    const [tableData, setTableData] = useState(null);
    const [selectedTable, setSelectedTable] = useState(null);
    const loginAuth = useSelector(state => state.auth.token)
    console.log(loginAuth)
    const getTables = async () => {
        // let responseData = await fetch(
        //     "https://61e0f0c063f8fc001761894e.mockapi.io/api/tables/name"
        // );
        // let jsonResponse = await responseData.json();
        // console.log(jsonResponse);
        // setTableData(jsonResponse);
        // let responseDataCompul = await fetch(
        //     "https://61e0f0c063f8fc001761894e.mockapi.io/api/tables/checkedname"
        // );
        // let jsonResponseCompul = await responseDataCompul.json();
        // console.log(jsonResponseCompul);
        // setSelectedTable(jsonResponseCompul);

        let responseData = await axios.get('/api/salesforce/getSObjects');
        console.log(responseData.data.sobjects)
        setTableData(responseData.data.sobjects)

        let selectResponseData = await axios.get('/api/salesforce/getSelectedTables');
        console.log(selectResponseData.data.sobjects)
        setSelectedTable(selectResponseData.data.sobjects)
    };
    const getCompulsoryTables = async () => { };
    useEffect(() => {
        // getCompulsoryTables();
        getTables();
    }, []);
    const history = useHistory();
    return tableData === null ? (
        <p>Loading..</p>
    ) : selectedTable === null ? null : (
        <div className="selecttables">
            <div className="backbutton-div">
                <button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> back
                </button>
            </div>
            <div className="header-div">
                <p className="header">Select tables</p>
            </div>
            <div className="notselected-header">
                <p>Not Selected</p>
            </div>
            <div className="selectiontables">
                {tableData.map((item, index) => {
                    return (
                        <div className="checker-div" key={index}>
                            <input type="checkbox" id={"checker" + index} />
                            &nbsp;&nbsp;
                            <label htmlFor={"checker" + index}>
                                {item}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div className="selected-header">
                <p>Compulsory tables</p>
            </div>
            <div className="compultables">
                {selectedTable.map((item, index) => {
                    return (
                        <div className="checker-div" key={index}>
                            <input
                                type="checkbox"
                                id={"checker" + index}
                                checked={true}
                            />
                            &nbsp;&nbsp;
                            <label htmlFor={"checker" + index}>
                                {item}
                            </label>
                        </div>
                    );
                })}
            </div>
            <div className="gotonext-div">
                <button
                    onClick={() => {
                        history.push("/onboarding/tables");
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};
