import React, {useState, useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faSearch,
    faCaretRight,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import {useSelector} from "react-redux";
import ReactLoading from "react-loading";
import numeral from "numeral";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import "./index.less";
import {DropDownCustom} from "../../components/dropDownCustom";
import testData from "../../test data/dashboardTest";
import tableData from "../../test data/tableTestData";
import levelOneData from "../../test data/levelOneTest";
import levelTwoData from "../../test data/levelTwoTest";
import {UserDetailsFixed} from "../../components/userDetailsFixed";
import {DoubleLevelDropDown} from "../../components/doubleLevelDropDown";
import {rollUpFilterUpdate} from "../../redux/rollUpFilterManage";
import {RollupSkeleton} from "../../components/loaders/skeletonLoaders/rollUpViewLoader";
import {SubmitForecast} from "./submitForecast";
import {sidebarUpdate} from "../../redux/optionMange";
import {rollUpAPi} from "../../services/userRollUp";
import {headerProcessor, tableProcessor} from "./modules";
import {filterProcessor} from "../../services/dashboardViewAPI";
import {DashboardCheckedDropDown} from "../../components/dashboardCheclBox";

export const ManagerRoleUp = () => {
    const {userDetails, dashboardData} = testData;
    const dispatch = useDispatch();
    const history = useHistory();
    const loginAuth = useSelector((state) => state.auth.token);
    // const [submitForecastState, setSubmitForecastState] = useState(true)
    const rollUpFilterValue = useSelector(
        (state) => state.rollupfiltermanage.value
    );
    const [rollUpDataMain, setRollUpDataMain] = useState(null);
    console.log(rollUpFilterValue);

    //new states after dynamic setup
    const [restData, setRestData] = useState(null)
    const [restFilterData, setRestFilterData] = useState(null)

    const [filterState, setFilterState] = useState({
        closing: "current-quarter",
        changes: "week",
        Opportunity_stagename: "Prospecting"
    })
    const rollUpApi = async () => {
        let apiData = await rollUpAPi({
            "base": {
                "closing": {
                    "value": filterState.closing,
                    "start-date": null,
                    "end-date": null
                },
                "changes": filterState.changes
            },
            "additional": {
                "Opportunity_stagename": filterState.Opportunity_stagename
            }
        });
        console.log(apiData);

        let filterResponseData = await filterProcessor("Rollup View")
        // console.log(filterResponseData)
        setRestFilterData(filterResponseData)
        setRestData(apiData)
        // headerProcessor(apiData.data.main)
        // tableProcessor(apiData.data.table)
        await setTimeout(() => {
            // setRollUpDataMain(apiData.data);
        }, 0);
        // console.log(apiData.data.data);
        // setLoaderState(false)
    };
    const returningFunction = (option) => {
        setFilterState(state => ({
            ...state,
            [option.name]: option.value
        }))
    };
    useEffect(() => {
        dispatch(sidebarUpdate(2))
        rollUpApi()
        console.log(rollUpFilterValue);
    }, [filterState]);
    return restData === null ? (
        <RollupSkeleton/>
    ) : (
        <div className="managerroleup">
            <UserDetailsFixed/>
            {/*
                submitForecastState ? <SubmitForecast forecastPopUpControl={forecastPopUpControl} /> : null
            */}
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
                <div className="">
                    <p
                        onClick={() => {
                            history.push("/dashboard");
                        }}
                    >
                        Dashboard view
                    </p>
                    <p className="selectedheader">Roll-Up View</p>
                    <p
                        onClick={() => {
                            history.push("/target/set");
                        }}
                    >
                        Target
                    </p>
                </div>
                {/*

                    <p className="forecastsubmit"
                        onClick={() => {
                            forecastPopUpControl()
                        }}
                    >Submit Forecast</p>
                    */}
            </div>
            <div className="filters">
                {
                    restFilterData.base.map((item, index) => {
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

                <div className="resetselect">Reset to Default &nbsp;</div>
            </div>
            <div className="taperdisplay">
                {" "}
                {
                    restData.headers.map((item, index) => {
                        return <div className="targetdisplay">
                            <p className="headertarget">{item.header}</p>{" "}
                            <p
                                className="targetdata"
                            >
                                {numeral(item.value)
                                    .format("($0.00a)")
                                    .toUpperCase()}
                            </p>{" "}
                        </div>
                    })
                }
                {/*<div className="commondisplay">*/}
                {/*    <p className="commontarget">Deals won</p>*/}
                {/*    <div className="commonDataDiv">*/}
                {/*        <p className="commondata">*/}
                {/*            {numeral(rollUpDataMain.metrics["Closed"])*/}
                {/*                .format("($0.00a)")*/}
                {/*                .toUpperCase()}*/}
                {/*        </p>*/}
                {/*        &nbsp; &nbsp; &nbsp; &nbsp;*/}
                {/*        <p*/}
                {/*            className="commonprofitdata"*/}
                {/*            style={{*/}
                {/*                color:*/}
                {/*                    rollUpDataMain.changes["Closed"] > 0*/}
                {/*                        ? "#00C156"*/}
                {/*                        : "#E5554D",*/}
                {/*                background:*/}
                {/*                    rollUpDataMain.changes["Closed"] > 0*/}
                {/*                        ? "#EAFBF0"*/}
                {/*                        : "#FCEAE9",*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            {rollUpDataMain.changes["Closed"] > 0 ? "+" : null}*/}
                {/*            {numeral(rollUpDataMain.changes["Closed"])*/}
                {/*                .format("(0.00a)")*/}
                {/*                .toUpperCase()}*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className={"datatable"}>
                <div className={"tableheaders"}>
                    {
                        restData.table.tableHeaders.map((item, index) => {
                            return <div className={"repheader"}>
                                <p>
                                    {item.header.toUpperCase()}
                                </p>
                            </div>
                        })
                    }
                </div>
                {restData.table.data.map((item, index) => {
                    return <TopLevelDropDown item={item} index={index} tableData={restData.table}/>;
                })}
            </div>
            {/*<div className="datatable">*/}
            {/*    <div className="tableheaders">*/}
            {/*        <div className="repheader">REPRESENTIVES</div>*/}
            {/*        <div className="targetheader">TARGET</div>*/}
            {/*        <div className="pergoalheader">% TO GOAL</div>*/}
            {/*        <div className="pipelineheader">PIPELINE</div>*/}
            {/*        <div className="pipelinegapheader">PIPELINE GAP</div>*/}
            {/*        <div className="accountsheader">ACCOUNTS</div>*/}
            {/*        <div className="forecastheader">FORECAST</div>*/}
            {/*        <div className="bestcaseheader">BEST CASE</div>*/}
            {/*        <div className="riskscoreheader">RISK SCORE</div>*/}
            {/*        <div className="opportunityscore">OPPORTUNITY SCORE</div>*/}
            {/*    </div>*/}
            {/*    {rollUpDataMain.data.map((item, index) => {*/}
            {/*        return <TopLevelDropDown item={item} index={index} />;*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    );
};

const TopLevelDropDown = ({item, index, tableData}) => {
    const [dropDownState, setDropDownState] = useState(false);
    console.log(item.id);
    let paddingIndex = 0;
    return (
        <details key={index}>
            <summary
                className="indivudualdataset"
                // onClick={() => {
                //     setDropDownState((state) => !state);
                // }}
            >
                {
                    tableData.tableHeaders.map((values, index) => {
                        return <div className="targetheader">
                            {/*<p>{numeral(item[values.header]).format("($0.00a)")}</p>*/}
                            {item[values.header]}
                        </div>
                    })
                }
                {/*{*/}
                {/*    */}
                {/*}*/}
                {/*<div className="targetheader">*/}
                {/*    <p>{numeral(item.).format("($0.00a)")}</p>*/}
                {/*</div>*/}

                {/*<div className="repheader">*/}
                {/*    <FontAwesomeIcon*/}
                {/*        icon={dropDownState ? faCaretDown : faCaretRight}*/}
                {/*        style={{*/}
                {/*            color: item.has_subordinates*/}
                {/*                ? "#000000"*/}
                {/*                : "#ffffff",*/}
                {/*        }}*/}
                {/*        className="arrowhead"*/}
                {/*    />*/}
                {/*    <div className="nameheader">*/}
                {/*        <p className="name">{item.name}</p>*/}
                {/*        <div className="designation">{item.designation}</div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="targetheader">*/}
                {/*    <p>{numeral(item.metrics["Target"]).format("($0.00a)")}</p>*/}
                {/*</div>*/}
                {/*<div className="pergoalheader">*/}
                {/*    <div className="percentload">*/}
                {/*        <div className="percentmeter">*/}
                {/*            <div*/}
                {/*                className="percentcolor"*/}
                {/*                style={{*/}
                {/*                    width: isNaN(*/}
                {/*                        (item.metrics["Closed"] /*/}
                {/*                            item.metrics["Target"]) **/}
                {/*                        100*/}
                {/*                    )*/}
                {/*                        ? 0*/}
                {/*                        : (item.metrics["Closed"] /*/}
                {/*                        item.metrics["Target"]) **/}
                {/*                        100,*/}
                {/*                }}*/}
                {/*            ></div>*/}
                {/*        </div>*/}
                {/*        <p className="percentage">*/}
                {/*            {isNaN(*/}
                {/*                (item.metrics["Closed"] /*/}
                {/*                    item.metrics["Target"]) **/}
                {/*                100*/}
                {/*            )*/}
                {/*                ? 0*/}
                {/*                : (*/}
                {/*                    (item.metrics["Closed"] /*/}
                {/*                        item.metrics["Target"]) **/}
                {/*                    100*/}
                {/*                ).toFixed(2)}*/}
                {/*            %*/}
                {/*        </p>*/}
                {/*    </div>*/}
                {/*    <p className="bookeddata">*/}
                {/*        ${item.metrics["Closed"]} Booked*/}
                {/*    </p>*/}
                {/*</div>*/}
                {/*<div className="pipelineheader">*/}
                {/*    <p className="maindata">*/}
                {/*        {numeral(item.metrics["Pipeline"]).format("($0.00a)")}*/}
                {/*    </p>*/}

                {/*    <p className="profitdata">*/}
                {/*        {" "}*/}
                {/*        {numeral(item.changes["Pipeline"]).format("($0.00a)")}*/}
                {/*    </p>*/}
                {/*</div>*/}
                {/*<div className="pipelinegapheader">*/}
                {/*    <p>{item["pipeline-gap"].toFixed(2)}%</p>*/}
                {/*</div>*/}
                {/*<div className="accountsheader">*/}
                {/*    <p>{item.accounts}</p>*/}
                {/*</div>*/}
                {/*<div className="forecastheader">*/}
                {/*    <p>${item.forecast}</p>*/}
                {/*</div>*/}
                {/*<div className="bestcaseheader">*/}
                {/*    <p>*/}
                {/*        {numeral(item.metrics["Best Case"]).format("($0.00a)")}*/}
                {/*    </p>*/}
                {/*</div>*/}
                {/*<div className="riskscoreheader">*/}
                {/*    <p>{item.risk_score.toFixed(2)}</p>*/}
                {/*</div>*/}
                {/*<div className="opportunityscore">*/}
                {/*    <p>{item.opportunity_risk.toFixed(2)}</p>*/}
                {/*</div>*/}
            </summary>
            {/*{dropDownState ? (*/}
            {/*    <SubDataDisplay*/}
            {/*        data={levelOneData}*/}
            {/*        upperId={item.id}*/}
            {/*        paddingIndex={paddingIndex + 20}*/}
            {/*    />*/}
            {/*) : null}*/}
        </details>
    );
};

export const SubDataDisplay = ({data, upperId, paddingIndex}) => {
    const [subLevelDataa, setSubLevelData] = useState([]);
    const [subRollUpData, setSubRollUpData] = useState(null);
    const loginAuth = useSelector((state) => state.auth.token);
    const rollUpFilterValue = useSelector(
        (state) => state.rollupfiltermanage.value
    );
    console.log("This is the user login");
    console.log(upperId);

    const loadUserData = async () => {
        let responseData = await axios.post(
            "/api/getUserRollup?manager=" + upperId,
            rollUpFilterValue
        );
        console.log(responseData.data);
        setSubRollUpData(responseData.data);
    };
    useEffect(() => {
        for (let i = 0; i < 2; i++) loadUserData();
    }, [rollUpFilterValue]);
    // console.log(data);
    return subRollUpData !== null ? (
        <>
            {subRollUpData.data.map((item, index) => {
                return (
                    <SubLevelData
                        item={item}
                        index={index}
                        paddingIndex={paddingIndex}
                    />
                );
            })}
        </>
    ) : null;
};

export const SubLevelData = ({item, index, paddingIndex}) => {
    console.log(item, index);
    const [dropDownState, setDropDownState] = useState(false);

    return (
        <details key={index}>
            <summary
                className="indivudualdataset"
                onClick={() => {
                    setDropDownState((state) => !state);
                }}
            >
                <div className="repheader">
                    <FontAwesomeIcon
                        icon={dropDownState ? faCaretDown : faCaretRight}
                        className="arrowhead"
                        style={{
                            marginLeft: paddingIndex + "px",
                            color: item.has_subordinates
                                ? "#000000"
                                : "#ffffff",
                        }}
                    />
                    &nbsp;
                    <div className="nameheader">
                        <p className="name">{item.name}</p>
                        <div className="designation">{item.designation}</div>
                    </div>
                </div>
                <div className="targetheader">
                    <p>{numeral(item.metrics["Target"]).format("($0.00a)")}</p>
                </div>
                <div className="pergoalheader">
                    <div className="percentload">
                        <div className="percentmeter">
                            <div
                                className="percentcolor"
                                style={{
                                    width: isNaN(
                                        (item.metrics["Closed"] /
                                            item.metrics["Target"]) *
                                        100
                                    )
                                        ? 0
                                        : (item.metrics["Closed"] /
                                        item.metrics["Target"]) *
                                        100,
                                }}
                            ></div>
                        </div>
                        <p className="percentage">
                            {isNaN(
                                (item.metrics["Closed"] /
                                    item.metrics["Target"]) *
                                100
                            )
                                ? 0
                                : (
                                    (item.metrics["Closed"] /
                                        item.metrics["Target"]) *
                                    100
                                ).toFixed(2)}
                            %
                        </p>
                    </div>
                    <p className="bookeddata">
                        ${item.metrics["Closed"]} Booked
                    </p>
                </div>
                <div className="pipelineheader">
                    <p className="maindata">
                        {numeral(item.metrics["Pipeline"]).format("($0.00a)")}
                    </p>

                    <p className="profitdata">
                        {" "}
                        {numeral(item.changes["Pipeline"]).format("($0.00a)")}
                    </p>
                </div>
                <div className="pipelinegapheader">
                    <p>{item["pipeline-gap"].toFixed(2)}%</p>
                </div>
                <div className="accountsheader">
                    <p>{item.accounts}</p>
                </div>
                <div className="forecastheader">
                    <p>${item.forecast}</p>
                </div>
                <div className="bestcaseheader">
                    <p>
                        {" "}
                        {numeral(item.metrics["Best Case"]).format("($0.00a)")}
                    </p>
                </div>
                <div className="riskscoreheader">
                    <p>{item.risk_score}</p>
                </div>
                <div className="opportunityscore">
                    <p>{item.opportunity_risk}</p>
                </div>
            </summary>
            {dropDownState ? (
                <SubDataDisplay
                    data={levelOneData}
                    upperId={item.id}
                    paddingIndex={paddingIndex + 20}
                />
            ) : null}
        </details>
    );
};
