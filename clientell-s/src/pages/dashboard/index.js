import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faSearch,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import GaugeChart from "react-gauge-chart";
import Chart from "react-apexcharts";
import axios from "axios"
import {useSelector, useDispatch} from "react-redux";
import ReactLoading from "react-loading"
import moment from "moment"
import numeral from "numeral"
import {useHistory} from "react-router-dom";

import "./index.less";
import testData from "../../test data/dashboardTest";
import {DropDownCustom} from "../../components/dropDownCustom";
import {UserDetailsFixed} from "../../components/userDetailsFixed"
import {DoubleLevelDropDown} from "../../components/doubleLevelDropDown"
import {DashboardCheckedDropDown} from "../../components/dashboardCheclBox"
import {usersUpdate} from "../../redux/dashboardDropDownManage"
import {ErrorHandler} from "../../utils"
import {DashboardSkeleton} from "../../components/loaders/skeletonLoaders/dashboardLoader";
import {sidebarUpdate} from "../../redux/optionMange";
import {dashboardViewAPI, filterProcessor} from "../../services/dashboardViewAPI";

export const MainPage = () => {
    const {userDetails, dashboardData} = testData;
    const loginAuth = useSelector(state => state.auth.token)
    const dispatch = useDispatch()
    const usersProcessList = useSelector(
        (state) => state.dashboarddropdownmanage.value
    );
    const [dashboardDataLoad, setDashboardDataLoad] = useState(null)
    const [usersDataList, setUsersDataList] = useState(null)
    const [reloadStateComplete, setReloadStateComplete] = useState(false)

    //newer states
    const [restData, setRestData] = useState(null)
    const [restFilterData, setRestFilterData] = useState(null)

    const [filterState, setFilterState] = useState({
        users: usersProcessList,
        changes: "week",
        Opportunity_stagename: "Prospecting"
    })
    const filterFunction = (option) => {
        setFilterState(state => ({
            ...state,
            [option.name]: option.value
        }))
        console.log(option)
    }
    const checkBoxReturn = (returnedData) => {
        console.log(returnedData)
    }
    const filtercallFunction = async () => {
        try {
            // let responseData = await axios.post("/api/getDashboardView", {
            //     ...filterState,
            //     users: usersProcessList
            // })
            console.log(filterState)
            let responseData = await dashboardViewAPI({
                "base": {
                    "users": usersProcessList,
                    "changes": filterState.changes
                },
                "additional": {
                    "Opportunity_stagename": filterState.Opportunity_stagename
                }
            })

            // let filterResponseData = await

            let filterResponseData = await filterProcessor('Dashboard')

            // console.log(responseData)
            // setFilterState(filterResponseData)
            console.log(filterResponseData)
            setRestFilterData(filterResponseData)
            setRestData(responseData)
            // setDashboardDataLoad({...responseData.data, data: proxyProcessedData})
        } catch (err) {
            // ErrorHandler(err.response.status);
            console.log(err)
        }
    }
    const dahsboardDataPull = async () => {
        try {
            let allUserDataset = await axios.get("/api/getAllUsers");
            let userResponseData = await axios.get("/api/getUsers");
            setUsersDataList(userResponseData.data)

            let proxyDataSet = [];
            for (let i = 0; i < userResponseData.data.length; i++) {
                // console.log(res.data[i].id)
                proxyDataSet.push(userResponseData.data[i].id);
            }

            setTimeout(() => {
                dispatch(usersUpdate(allUserDataset.data.users));
            }, 0);

            filtercallFunction()
            setReloadStateComplete(true)
        } catch (error) {
            if (error.response.status === 401) {
                ErrorHandler(error.response.status);
            } else {
                dahsboardDataPull()
            }
        }

    }
    useEffect(() => {
        dahsboardDataPull()
    }, [filterState])

    useEffect(() => {
        // console.log("The filter is changing")
        dispatch(sidebarUpdate(2))
        console.log(usersProcessList)
        if (reloadStateComplete) filtercallFunction();
    }, [usersProcessList])
    const history = useHistory();
    return restData === null ?
        <DashboardSkeleton/> : (
            <div className="mainpage">
                <UserDetailsFixed/>
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
                    <p className="selectedheader">Dashboard view</p>
                    <p
                        onClick={() => {
                            history.push('/rollupview')
                        }}
                    >Roll-Up View</p>
                    <p
                        onClick={() => {
                            history.push("/target/set");
                        }}
                    >Target</p>
                </div>
                <div className="filters">
                    {
                        restFilterData.base.map((item, index) => {
                            if (item.filter_name === "users") {
                                return <DashboardCheckedDropDown
                                    name="managers"
                                    data={{
                                        title: item.filter_name,
                                        items: usersDataList
                                    }}
                                    checkboxFunction={checkBoxReturn}
                                />
                            } else {
                                return <DoubleLevelDropDown
                                    name={item.filter_name}
                                    passedFunction={filterFunction}
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
                                passedFunction={filterFunction}
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
                    {/*<DashboardCheckedDropDown*/}
                    {/*    name="managers"*/}
                    {/*    data={{*/}
                    {/*        title: "Sales Manager",*/}
                    {/*        items: usersDataList*/}
                    {/*    }}*/}
                    {/*    checkboxFunction={checkBoxReturn}*/}
                    {/*/>*/}

                    {/*<DoubleLevelDropDown*/}
                    {/*    name="changessince"*/}
                    {/*    passedFunction={filterFunction}*/}
                    {/*    data={{*/}
                    {/*        title: "Changes Since",*/}
                    {/*        items: [*/}
                    {/*            "Last 7 days",*/}
                    {/*            "Last Month",*/}
                    {/*            "Since the start of the quarter",*/}
                    {/*        ],*/}
                    {/*        defaultSelected: 0,*/}
                    {/*    }}*/}
                    {/*    values={["week", "month", "quarter"]}*/}
                    {/*/>*/}
                </div>
                <div className="tarperdisplay">
                    {
                        restData.headers.map((item, index) => {
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

                <div className={"gaugemeters"}>
                    {
                        restData.gauges.map((item, index) => {
                            return <div className="forecastriskgauge">
                                <p>{item.name}</p>
                                <div className="gaugediv">
                                    <GaugeChart
                                        id="forecastgauge"
                                        className="chart"
                                        nrOfLevels={3}
                                        acrsLength={[0.33, 0.33, 0.33]}
                                        colors={["#DB4437", "#F4B400", " #0F9D58"]}
                                        hideText={true}
                                        needleColor="#65627A"
                                        percent={(item.value / 100)}
                                    />
                                    <div className="labels">
                                        <p>Low</p>
                                        <p>High</p>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className={"revenuevstimediv"}>
                    {
                        restData.candle_stick === null ? <p>Loading</p> :
                            <Chart
                                height={600}
                                width="100%"
                                type="candlestick"
                                options={{
                                    chart: {
                                        type: "candlestick",
                                        height: 400,
                                        toolbar: {
                                            show: false
                                        }
                                    },
                                    tooltip: {
                                        enabled: true,
                                        custom: ({seriesIndex, dataPointIndex, w}) => {
                                            const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                                            const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                                            const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                                            const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                                            return (
                                                '<div class="customtoolkit">' +
                                                '<div><p>in Pipeline:</p> <p class="value">$' +
                                                o +
                                                '</p></div>' +
                                                '<div><p>Forcast:</p> <p class="value">$' +
                                                h +
                                                '</p></div>' +
                                                '<div><p>Commit:</p> <p class="value">$' +
                                                l +
                                                '</p></div>' +
                                                '<div><p>Booked:</p> <p class="value">$' +
                                                c +
                                                '</p></div>' +
                                                '</div>'
                                            )
                                        }
                                    },
                                    plotOptions: {
                                        candlestick: {
                                            colors: {
                                                upward: "#181970",
                                                downward: "#181970",
                                            },
                                            wick: {
                                                useFillColor: true,
                                            },
                                        },
                                    },
                                    grid: {
                                        show: true,
                                        yaxis: {
                                            lines: {
                                                show: false
                                            }
                                        },
                                        xaxis: {
                                            lines: {
                                                show: true,
                                            }
                                        },
                                        strokeDashArray: 10
                                    },
                                    title: {
                                        text: "Revenue Vs Time",
                                        align: "left",
                                        offsetX: 0,
                                        offsetY: 0,
                                        floating: false,
                                        margin: 20,
                                        style: {
                                            fontWeight: 400,
                                            fontSize: "1rem",
                                            fontFamily: "Urbanist",
                                        }
                                    },
                                    xaxis: {
                                        type: "category",
                                        tooltip: {
                                            enabled: false,
                                        },
                                        labels: {
                                            formatter: function (value) {
                                                return moment(value).format("DD MMM")
                                            },
                                            style: {
                                                fontFamily: "Urbanist",
                                                fontSize: ".8rem",
                                                colors: "#1B1B1B"
                                            }
                                        },
                                        title: {
                                            text: "Time",
                                            style: {
                                                color: undefined,
                                                fontSize: "1rem",
                                                fontFamily: "Urbanist",
                                                fontWeight: 600,
                                                cssClass: "apexcharts-xaxis-title",
                                            },
                                        },
                                    },
                                    yaxis: {
                                        tooltip: {
                                            enabled: false,
                                        },
                                        labels: {
                                            formatter: function (value) {
                                                return numeral(value).format("$0.00a").toUpperCase()
                                            },
                                            style: {
                                                fontFamily: "Urbanist",
                                                fontSize: ".9rem",
                                                fontWeight: "600"
                                            }
                                        },
                                    },
                                }}
                                series={[{data: restData.candle_stick}]}
                            />
                    }
                </div>
            </div>
        );
};
