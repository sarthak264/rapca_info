import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faSort,
    faSortAlphaDown,
    faSortUp,
    faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import DatePicker from "react-datepicker";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import ReactLoading from "react-loading";
import numeral from "numeral";
import {sidebarUpdate} from "../../redux/optionMange";

import "./index.less";
import {DealAmountEditComponent} from "../../components/dealAmountEditComp";
// import testData from "../../test data/dealTestData";
import {SimpleDropDown} from "../../components/simpleDropDown";
// import { DropDownCustom } from "../../components/dropDownCustom";
import {SingleDropCalender} from "../../components/singleDropCalender";
import {UserDetailsFixed} from "../../components/userDetailsFixed";
import {DoubleLevelDropDown} from "../../components/doubleLevelDropDown";
import {CheckedDropDown} from "../../components/checkedDropDown";
import {usersUpdate} from "../../redux/userDropDownManagement";
import {Link} from "react-router-dom";
import {DealCommitSkeleton} from "../../components/loaders/skeletonLoaders/dealCommitSkeleton";
import {ErrorHandler} from "../../utils";
import {SubmitForecast} from "./submitForecast";

//functions
import {getOppotunites} from "../../services/dealCommit";
import {headerProcessor} from "./modules";
import {tableProcessor} from "./modules";
import {filterProcessor} from "../../services/dashboardViewAPI";
import {DashboardCheckedDropDown} from "../../components/dashboardCheclBox";
import {toast} from "react-toastify";

export const DealCommit = () => {
    // const { userDetails, targetData, deals } = testData;
    const dispatch = useDispatch();
    const loginAuth = useSelector((state) => state.auth.token);
    const usersProcessList = useSelector(
        (state) => state.userdropdownmanager.value
    );
    const [dataset, setDataset] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [sortCondition, setSortCondition] = useState(null);
    const [userDataList, setUsersDataList] = useState([]);
    const [userFilterData, setUserFilterData] = useState([]);
    const [submitForecastState, setSubmitForecastState] = useState(false);
    const [reloadStateComplete, setReloadStateComplete] = useState(false);

    //here are the new states after dynamic tables
    const [headers, setHeaders] = useState(null);
    const [restTable, setRestTable] = useState(null)
    const [restFilterData, setRestFilterData] = useState(null)

    const [filterState, setFilterState] = useState({
        closing: "current-quarter",
        users: usersProcessList,
        changes: "month",
        Opportunity_stagename: "Prospecting"
    });
    const forecastPopUpControl = () => {
        setSubmitForecastState(!submitForecastState);
    };
    useEffect(() => {
        dispatch(sidebarUpdate(1));
        if (sortCondition !== null) {
            if (sortCondition.type === "string") {
                let proxytableData = [...tableData];
                let reIteratedTable = proxytableData.sort((a, b) =>
                    a[sortCondition.name].localeCompare(b[sortCondition.name])
                );
                if (sortCondition.sort === "forward") {
                    setTableData(reIteratedTable);
                } else {
                    setTableData(reIteratedTable.reverse());
                }
                console.log(reIteratedTable);
            } else if (sortCondition.type === "number") {
                let proxytableData = [...tableData];
                let reIteratedTable = proxytableData.sort(
                    (a, b) => a[sortCondition.name] - b[sortCondition.name]
                );
                if (sortCondition.sort === "forward") {
                    setTableData(reIteratedTable);
                } else {
                    setTableData(reIteratedTable.reverse());
                }
            } else if (sortCondition.type === "date") {
                let proxytableData = [...tableData];
                let reIteratedTable = proxytableData.sort(
                    (a, b) =>
                        new Date(a[sortCondition.name].split("T")[0]) -
                        new Date(b[sortCondition.name].split("T")[0])
                );
                if (sortCondition.sort === "forward") {
                    setTableData(reIteratedTable);
                } else {
                    setTableData(reIteratedTable.reverse());
                }
            }
        }
    }, [sortCondition]);

    const userCheckboxManage = (userIdList) => {
        console.log(userIdList);
    };

    const returningFunction = (option) => {
        // if (option.name==="")
        // if (option.name === "closingdate") {
        //     setFilterState((state) => ({
        //         ...state,
        //         closing: option.value,
        //     }));
        // } else if (option.name === "changessince") {
        //     setFilterState((state) => ({
        //         ...state,
        //         changes: option.value,
        //     }));
        // }
        setFilterState(state => ({
            ...state,
            [option.name]: option.value
        }))
        console.log(option)
    };
    let valCount = 0;
    const callDatasteFunction = async () => {
        try {
            //very important request
            // let responseData = await getOppotunites({
            //     ...filterState,
            //     users: usersProcessList,
            // })
            toast.warning("The procedss has startefd")
            let responseData = await getOppotunites({
                "base": {
                    "closing": {
                        "value": filterState.closing,
                        "start-date": null,
                        "end-date": null
                    },
                    "users": filterState.users,
                    "changes": filterState.changes
                },
                "additional": {
                    "Opportunity_stagename": filterState.Opportunity_stagename
                }
            })
            // setTableData(responseData.data.data);
            // setDataset(responseData.data);
            // console.log(responseData)
            // console.log(responseData)
            let headerresponse = await headerProcessor(responseData.data.main)
            console.log("Here is the main resooinse")
            console.log(headerresponse)

            let filterResponseData = await filterProcessor("Opportunity")

            console.log(filterResponseData)
            setRestFilterData(filterResponseData)
            setHeaders(headerresponse)

            let tableResponse = tableProcessor(responseData.data.table)
            console.log(tableResponse)
            setRestTable(tableResponse)
            toast.success("The process has enede")
            console.log(filterState)

        } catch (err) {
            ErrorHandler(err.response.status);
        }
    };
    const getUsersOptions = async () => {
        try {
            let allUserDataset = await axios.get("/api/getAllUsers");
            let userResponseData = await axios.get("/api/getUsers");
            setUsersDataList(userResponseData.data);

            let proxyDataSet = [];
            for (let i = 0; i < userResponseData.data.length; i++) {
                // console.log(res.data[i].id)
                proxyDataSet.push(userResponseData.data[i].id);
            }

            setTimeout(() => {
                dispatch(usersUpdate(allUserDataset.data.users));
            }, 0);

            callDatasteFunction();
            setReloadStateComplete(true);
        } catch (error) {
            if (error.response.status === 401) {
                ErrorHandler(error.response.status);
            } else {
                getUsersOptions();
            }
        }
    };
    useEffect(() => {
        getUsersOptions();
        // console.log(filterState)
    }, [filterState]);

    useEffect(() => {
        if (reloadStateComplete) {
            callDatasteFunction();
        }
    }, [usersProcessList]);
    const colorFunction = (value) => {
        let returnedData;
        if (value < 33.3)
            returnedData = {
                background: "#D7FCE4",
                color: "#1EC86A",
                text: "Low",
            };
        else if (value < 66.6 && value > 33.3)
            returnedData = {
                background: "#FBF6E7",
                color: "#FE8127",
                text: "Medium",
            };
        else {
            returnedData = {
                background: "#FCF3F3",
                color: "#F5483F",
                text: "High",
            };
        }
        return returnedData;
    };
    const engagementRiskColor = (value) => {
        let returnedData;
        if (value < 33.3)
            returnedData = {
                background: "#DCFAE8",
                borderLeft: "#1ec86a 6.70539px solid",
            };
        else if (value < 66.6 && value > 33.3)
            returnedData = {
                background: "#FBF6E7",
                borderLeft: "#FE8127 6.70539px solid",
            };
        else {
            returnedData = {
                background: "#FCF3F3",
                borderLeft: "#F5483F 6.70539px solid",
            };
        }
        return returnedData;
    };
    return headers === null ? (
        <DealCommitSkeleton/>
    ) : (
        <div className="dealcommit">
            <UserDetailsFixed/>
            {submitForecastState ? (
                <SubmitForecast forecastPopUpControl={forecastPopUpControl}/>
            ) : null}
            <div className="searchdiv">
                <input
                    type="text"
                    className="searchbar"
                    placeholder="Search..."
                />
                <div>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
            </div>
            <div className="header">
                <p>Deal View view</p>
                <p
                    className="forecastsubmit"
                    onClick={() => {
                        forecastPopUpControl();
                    }}
                >
                    Submit Forecast
                </p>
            </div>
            <div className="filters">
                {
                    restFilterData.base.map((item, index) => {
                        if (item.filter_name === "users") {
                            return <CheckedDropDown
                                name="users"
                                data={{
                                    title: item.filter_name,
                                    items: userDataList,
                                }}
                                checkboxFunction={userCheckboxManage}
                            />
                        } else {
                            return <DoubleLevelDropDown
                                name={item.filter_name}
                                passedFunction={returningFunction}
                                data={{
                                    title: item.filter_name,
                                    items: [
                                        ...item.values
                                    ],
                                    defaultSelected: 0,
                                }}
                                values={[...item.values]}
                            />
                        }
                    })
                }
                {
                    restFilterData.additional.map((item, index) => {
                        return <DoubleLevelDropDown
                            name={item.filter_name}
                            passedFunction={returningFunction}
                            data={{
                                title: item.filter_name,
                                items: [
                                    ...item.values
                                ],
                                defaultSelected: 0,
                            }}
                            values={[...item.values]}
                        />
                    })
                }
                {/*<DoubleLevelDropDown*/}
                {/*    passedFunction={returningFunction}*/}
                {/*    name="closingdate"*/}
                {/*    data={{*/}
                {/*        title: "Closing in",*/}
                {/*        items: [*/}
                {/*            "Current Week",*/}
                {/*            "Current Month",*/}
                {/*            "Current Quarter",*/}
                {/*            "Past Week",*/}
                {/*            "Pask Quarter",*/}
                {/*            "Past Month",*/}
                {/*        ],*/}
                {/*        defaultSelected: 2,*/}
                {/*    }}*/}
                {/*    values={[*/}
                {/*        "current-week",*/}
                {/*        "current-month",*/}
                {/*        "current-quarter",*/}
                {/*        "past-week",*/}
                {/*        "past-quarter",*/}
                {/*        "past-month",*/}
                {/*    ]}*/}
                {/*/>*/}

                {/*<DoubleLevelDropDown*/}
                {/*    passedFunction={returningFunction}*/}
                {/*    name="changessince"*/}
                {/*    data={{*/}
                {/*        title: "Changes Since",*/}
                {/*        items: [*/}
                {/*            "Last 7 days",*/}
                {/*            "Last Month",*/}
                {/*            "Since the start of the quarter",*/}
                {/*        ],*/}
                {/*        defaultSelected: 1,*/}
                {/*    }}*/}
                {/*    values={["week", "month", "quarter"]}*/}
                {/*/>*/}
                {/*<CheckedDropDown*/}
                {/*    name="users"*/}
                {/*    data={{*/}
                {/*        title: "Users",*/}
                {/*        items: userDataList,*/}
                {/*    }}*/}
                {/*    checkboxFunction={userCheckboxManage}*/}
                {/*/>*/}
            </div>
            <div className="tarperdisplay">
                {
                    headers.map((item, index) => {
                        return <div className={"targetdisplay"}>
                            <div className={"headertarget"}>{item.header}</div>
                            <div className="targetdata">
                                {numeral(item.value)
                                    .format("($0.00a)")
                                    .toUpperCase()}
                            </div>
                        </div>
                    })
                }
            </div>
            {/*<div className="commondisplay">*/}
            {/*    <p className="commontarget">Best Case</p>*/}
            {/*    <div className="commonDataDiv">*/}
            {/*        <p className="commondata">*/}
            {/*            {numeral(dataset.metrics["Best Case"])*/}
            {/*                .format("($0.00a)")*/}
            {/*                .toUpperCase()}*/}
            {/*        </p>*/}
            {/*        &nbsp; &nbsp; &nbsp; &nbsp;*/}
            {/*        <p*/}
            {/*            className="commonprofitdata"*/}
            {/*            style={{*/}
            {/*                color:*/}
            {/*                    dataset.changes["Best Case"] > 0*/}
            {/*                        ? "#00C156"*/}
            {/*                        : "#E5554D",*/}
            {/*                background:*/}
            {/*                    dataset.changes["Best Case"] > 0*/}
            {/*                        ? "#EAFBF0"*/}
            {/*                        : "#FCEAE9",*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            {dataset.changes["Best Case"] > 0 ? "+" : null}*/}
            {/*            {numeral(dataset.changes["Best Case"])*/}
            {/*                .format("(0.00a)")*/}
            {/*                .toUpperCase()}*/}
            {/*        </p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="tableinfo">
                <p>Deals</p>
            </div>
            <div className={"datatable"}>
                {restTable === null ? <p>Loading</p> : <div className={"tableheaders"}>
                    {
                        restTable.headers.map((item, index) => {
                            return <div
                                className="dealheader"
                            >
                                {item.header} &nbsp;{" "}
                                {item.datatype === "numeric" ?
                                    <FontAwesomeIcon
                                        icon={
                                            sortCondition !== null &&
                                            sortCondition.name === "deal_name"
                                                ? sortCondition.sort === "forward"
                                                ? faSortDown
                                                : faSortUp
                                                : faSort
                                        }
                                    /> : null
                                }
                            </div>
                        })
                    }
                </div>}

                {restTable === null ? <p>Loading</p> :
                    restTable.tableData.map((item, index) => {
                        return <div className={"individualdata"}>
                            {
                                restTable.headers.map((subItem, index) => {
                                    if (subItem.header === "include")
                                        return <div className="include">
                                            <input
                                                type="checkbox"
                                                name="includedata"
                                                id=""
                                                defaultChecked={item[subItem.header]}
                                            />
                                        </div>
                                    else return <div className={"dealname"}>
                                        {item[subItem.header]}
                                    </div>
                                })
                            }
                        </div>
                    })
                }

            </div>
            {/*<div className="datatable">*/}
            {/*    <div className="tableheaders">*/}
            {/*        <div*/}
            {/*            className="dealheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "string",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "deal_name",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            DEAL NAME &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "deal_name"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className="accountheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "string",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "account_name",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            ACCOUNT &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "account_name"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className="userheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "string",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "user_name",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            USER &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "user_name"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className="engagementheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "number",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "engagement_risk",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            ENGAGEMENT RISK &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "engagement_risk"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div*/}
            {/*            className="forecastheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "number",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "forecast_risk",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            FORECAST RISK &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "forecast_risk"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="categoryheader">CATEGORY</div>*/}
            {/*        <div className="stageheader">STAGE</div>*/}
            {/*        <div*/}
            {/*            className="dealheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "number",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "amount",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            DEAL AMOUNT &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "amount"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className="includeheader">INCLUDE</div>*/}
            {/*        <div*/}
            {/*            className="closedateheader"*/}
            {/*            onClick={() => {*/}
            {/*                setSortCondition({*/}
            {/*                    type: "date",*/}
            {/*                    sort:*/}
            {/*                        sortCondition !== null*/}
            {/*                            ? sortCondition.sort === "forward"*/}
            {/*                            ? "backward"*/}
            {/*                            : "forward"*/}
            {/*                            : "forward",*/}
            {/*                    name: "closedate",*/}
            {/*                });*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            CLOSE DATE &nbsp;{" "}*/}
            {/*            <FontAwesomeIcon*/}
            {/*                icon={*/}
            {/*                    sortCondition !== null &&*/}
            {/*                    sortCondition.name === "closedate"*/}
            {/*                        ? sortCondition.sort === "forward"*/}
            {/*                        ? faSortDown*/}
            {/*                        : faSortUp*/}
            {/*                        : faSort*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*{tableData.map((item, index) => {*/}
            {/*    let engagementRiskBackground = engagementRiskColor(*/}
            {/*        item.engagementRisk*/}
            {/*    );*/}
            {/*    // console.log({ item });*/}
            {/*    return (*/}
            {/*        <div className="individualdata" key={index}>*/}
            {/*            <div className="dealname">*/}
            {/*                <Link*/}
            {/*                    to={*/}
            {/*                        "/dealviewindi/" +*/}
            {/*                        item.opportunity_id +*/}
            {/*                        "?account_Id=" +*/}
            {/*                        item.account_id*/}
            {/*                    }*/}
            {/*                    className="innerlink"*/}
            {/*                >*/}
            {/*                    {item.deal_name}*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*            <div className="account">*/}
            {/*                <p>{item.account_name}</p>*/}
            {/*            </div>*/}
            {/*            <div className="user">*/}
            {/*                <p>{item.user_name}</p>*/}
            {/*            </div>*/}
            {/*            <div className="engagementrisk">*/}
            {/*                <div*/}
            {/*                    className="factor"*/}
            {/*                    style={colorFunction(item.engagement_risk)}*/}
            {/*                >*/}
            {/*                    <FontAwesomeIcon*/}
            {/*                        icon={faCircle}*/}
            {/*                        style={{*/}
            {/*                            fontWeight: 800,*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                    &nbsp;&nbsp;*/}
            {/*                    <p*/}
            {/*                        style={colorFunction(*/}
            {/*                            item.engagement_risk*/}
            {/*                        )}*/}
            {/*                    >*/}
            {/*                        {item.engagement_risk}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*                <div className="textbox">*/}
            {/*                    <p>*/}
            {/*                        {item.engagementRisk > 33.3*/}
            {/*                            ? item.engagementRisk > 66.6*/}
            {/*                                ? "High"*/}
            {/*                                : "Medium"*/}
            {/*                            : "Low"}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="forecastrisk">*/}
            {/*                <div*/}
            {/*                    className="factor"*/}
            {/*                    style={colorFunction(item.forecast_risk)}*/}
            {/*                >*/}
            {/*                    <FontAwesomeIcon*/}
            {/*                        icon={faCircle}*/}
            {/*                        style={{*/}
            {/*                            fontWeight: 800,*/}
            {/*                        }}*/}
            {/*                    />*/}
            {/*                    &nbsp;&nbsp;*/}
            {/*                    <p*/}
            {/*                        style={colorFunction(*/}
            {/*                            item.forecast_risk*/}
            {/*                        )}*/}
            {/*                    >*/}
            {/*                        {item.forecast_risk}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*                <div className="textbox">*/}
            {/*                    <p>*/}
            {/*                        {item.forecast_risk > 33.3*/}
            {/*                            ? item.forecast_risk > 66.6*/}
            {/*                                ? "High"*/}
            {/*                                : "Medium"*/}
            {/*                            : "Low"}*/}
            {/*                    </p>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="category">*/}
            {/*                <SimpleDropDown*/}
            {/*                    data={{*/}
            {/*                        defaultVal: item.category,*/}
            {/*                        dataset: [*/}
            {/*                            "Best Case",*/}
            {/*                            "Commit",*/}
            {/*                            "Closed Won",*/}
            {/*                            "Forecast",*/}
            {/*                            "Pipeline",*/}
            {/*                            "Ommited",*/}
            {/*                        ],*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="stage">*/}
            {/*                <SimpleDropDown*/}
            {/*                    data={{*/}
            {/*                        defaultVal: item.stage,*/}
            {/*                        dataset: [*/}
            {/*                            "Lead",*/}
            {/*                            "Qualified Lead",*/}
            {/*                            "Presentation",*/}
            {/*                            "Demo",*/}
            {/*                            "Negotiation",*/}
            {/*                            "Won",*/}
            {/*                            "Lost",*/}
            {/*                        ],*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="dealamount">*/}
            {/*                ${Number(item.amount).toLocaleString()}*/}
            {/*                /!**/}
            {/*  item.amount > 0 ?*/}
            {/*    <DealAmountEditComponent dealvalue={item.amount === item.amount ? item.amount : null} />*/}
            {/*    : null*/}
            {/**!/*/}
            {/*            </div>*/}
            {/*            <div className="include">*/}
            {/*                <input*/}
            {/*                    type="checkbox"*/}
            {/*                    name="includedata"*/}
            {/*                    id=""*/}
            {/*                    defaultChecked={item.include}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div className="closedate">*/}
            {/*                <SingleDropCalender*/}
            {/*                    defaultdate={item.closedate.split("T")[0]}*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    );*/}
            {/*})}*/}
            {/*</div>*/}
        </div>
    );
}
