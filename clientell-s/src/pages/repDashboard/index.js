import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faSearch,
    faCaretDown,
    faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";
import GaugeChart from "react-gauge-chart";
import Chart from "react-apexcharts";

import "./index.less";
import testData from "../../test data/dealTestData";
import repTestData from "../../test data/repDashboardData";
import {DropDownCustom} from "../../components/dropDownCustom";
import testDataDash from "../../test data/dashboardTest";
import {UserDetailsFixed} from "../../components/userDetailsFixed";
import {series} from "./series";
import {Stacked} from "../../components/d3charts/stacked/stacked";
import ReactTooltip from "react-tooltip";
import {PipelineStageAnalysis} from "../../components/d3charts/pipelineStageAnalysis";
import {GraphAPI} from "../../services/graphApi.service";
import {DealMovement} from "../../components/d3charts/dealMovement";

const testdatasetcompanies = [
    {
        dealname: "Slack",
        account: "Greg Riggori",
        engagementrisk: 10,
        forecastrisk: 88,
        dealstage: "Negotiation",
        closedate: Date(),
        amount: 40000,
    },
    {
        dealname: "JP Morgan & Co",
        account: "Greg Riggori",
        engagementrisk: 10,
        forecastrisk: 43,
        dealstage: "Negotiation",
        closedate: Date(),
        amount: 40000,
    },
    {
        dealname: "Blair Corp",
        account: "Greg Riggori",
        engagementrisk: 10,
        forecastrisk: 33,
        dealstage: "Negotiation",
        closedate: Date(),
        amount: 40000,
    },
    {
        dealname: "Spenzer & John",
        account: "Greg Riggori",
        engagementrisk: 10,
        forecastrisk: 88,
        dealstage: "Negotiation",
        closedate: Date(),
        amount: 40000,
    },
];

const pipelineriskdivisiondata = [
    {
        title: "AE Qualified",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
    {
        title: "Business Requirements Identified",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
    {
        title: "Proof of Concept(POC)",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
    {
        title: "Proposal/Price Presented",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
    {
        title: "Negotiation/Procurement/Legal",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
    {
        title: "Finalizing Closure",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
    {
        title: "Finance Review",
        className: "aequal",
        highRisk: 5,
        mediumRisk: 5,
        lowRisk: 5,
    },
];

export const RepDashboard = () => {
    const {userDetails} = testData;
    const {dashboardData} = testDataDash;
    const [data, setData] = useState(null);
    const generateDayWiseTimeSeries = function (baseval, count, yrange) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = baseval;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i++;
        }
        return series;
    };
    useEffect(() => {
        GraphAPI.getPipelineRiskAnalysis(4).then((res) => {
            console.log({res});
            setData(res.data);
        });
    }, []);
    // const pipelineData = [
    //   {
    //     title: 0,
    //     highRisk: 5,
    //     mediumRisk: 3,
    //     lowRisk: 4,
    //     name: "AE Qualified",
    //   },
    //   {
    //     title: 1,
    //     highRisk: 2,
    //     mediumRisk: 3,
    //     lowRisk: 2,
    //   },
    //   {
    //     title: 2,
    //     highRisk: 2,
    //     mediumRisk: 2,
    //     lowRisk: 2,
    //   },
    //   {
    //     title: 3,
    //     highRisk: 0,
    //     mediumRisk: 1,
    //     lowRisk: 2,
    //   },
    //   {
    //     title: 4,
    //     highRisk: 2,
    //     mediumRisk: 1,
    //     lowRisk: 2,
    //   },
    //   {
    //     title: 5,
    //     highRisk: 2,
    //     mediumRisk: 1,
    //     lowRisk: 3,
    //   },
    //   {
    //     title: 6,
    //     highRisk: 1,
    //     mediumRisk: 2,
    //     lowRisk: 2,
    //   },
    //   {
    //     title: 7,
    //     highRisk: 0,
    //     mediumRisk: 0,
    //     lowRisk: 0,
    //   },
    // ];
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
    return (
        <div className="repdashboard">
            <UserDetailsFixed/>
            <div className="searchdiv">
                <input type="text" className="searchbar" placeholder="Search..."/>
                <div>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
            </div>
            <div className="header">
                <p>Deal View view</p>
            </div>
            <div className="filters">
                <div className="profilecomp">
                    <img src={repTestData.profile} alt="" className="profilepicture"/>
                    &nbsp; &nbsp;
                    <div className="profilecompdiv">
                        <p className="repname">{repTestData.name}</p>
                        <p className="repdesignation">{repTestData.designation}</p>
                    </div>
                </div>
                <div className="selection">
                    <DropDownCustom
                        data={{
                            title: "Closing in",
                            options: [
                                "This week",
                                "This month",
                                "This quarter (Default)",
                                "Past week",
                                "Past quarter",
                            ],
                            date: true,
                        }}
                    />
                </div>
                <div className="selection">
                    <DropDownCustom
                        data={{
                            title: "Change Since",
                            options: [
                                "last 7 days",
                                "This month",
                                "This quarter (Default)",
                                "Past week",
                                "Past quarter",
                                "Custom",
                            ],
                        }}
                    />
                </div>
                <div className="selection">
                    <DropDownCustom
                        data={{
                            title: "Opportunity Types",
                            options: ["All", "option 1", "option 2", "option 3", "option 4"],
                        }}
                    />
                </div>
                <div className="resetselect">Reset to Default &nbsp;</div>
            </div>
            <div className="metricdisplay">
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Meetings Conducted</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.random}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">New Opportunities Created</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.random}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Total Meeting hours</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.random}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Unique People Engaged</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.random}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Total People Engaged</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.random}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Avg Sentiment</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.tworandom}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Total Accounts</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.tworandom}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Target</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">
                            ${repTestData.moneyrandom.toLocaleString()}
                        </p>
                        <p className="commonmetricprofitdata">{repTestData.tworandom}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Won</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">
                            ${repTestData.moneyrandom.toLocaleString()}
                        </p>
                        <p className="commonmetricprofitdata">{repTestData.tworandom}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">Deals Closed</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.tworandom}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
                <div className="commonmetricdisplay">
                    <p className="commonmetrictarget">In Pipeline</p>
                    <div className="commonmetricdatadiv">
                        <p className="commonmetricdata">{repTestData.tworandom}</p>
                        <p className="commonmetricprofitdata">{repTestData.random}</p>
                    </div>
                </div>
            </div>
            <DealMovement/>
            <div className="pipelineriskgraphdiv">
                <div className="pipelineriskgraph">
                    <div className="graphtitle">
                        <p>Pipeline Risk Analysis</p>
                    </div>
                    <div className="graphcontent" style={{paddingTop: 0.1}}>
                        <div className="chartoverlaycontent">
                            {data &&
                            data.pipeline_risk_analysis_data.map((t) => (
                                <div className={t.className}>
                                    <p>{t.name}</p>
                                    <div className="datafactors">
                                        <div className="hrisk">
                                            <FontAwesomeIcon icon={faCircle} className="hcircle"/>
                                            &nbsp;
                                            <p className="hrisklabel">High Risk</p>
                                            &nbsp;&nbsp;
                                            <p>{t.highRisk}</p>
                                        </div>
                                        <div className="mrisk">
                                            <FontAwesomeIcon icon={faCircle} className="mcircle"/>
                                            &nbsp;
                                            <p className="mrisklabel">Medium Risk</p>
                                            &nbsp;&nbsp;
                                            <p>{t.mediumRisk}</p>
                                        </div>
                                        <div className="lrisk">
                                            <FontAwesomeIcon icon={faCircle} className="lcircle"/>
                                            &nbsp;
                                            <p className="mrisklabel">Low Risk</p>
                                            &nbsp;&nbsp;
                                            <p>{t.lowRisk}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {data && (
                            <div style={{marginTop: 150}}>
                                <Stacked data={data.pipeline_risk_analysis_data}/>
                            </div>
                        )}
                        <div className="title1"></div>

                        {/* <Chart
              type="area"
              height={400}
              series={[
                {
                  name: "Low Risk",
                  data: generateDayWiseTimeSeries(
                    new Date("11 Feb 2017 GMT").getTime(),
                    20,
                    {
                      min: 10,
                      max: -60,
                    }
                  ),
                },
                {
                  name: "Medium Risk",
                  data: generateDayWiseTimeSeries(
                    new Date("11 Feb 2017 GMT").getTime(),
                    20,
                    {
                      min: -10,
                      max: 60,
                    }
                  ),
                },
                {
                  name: "High Risk",
                  data: generateDayWiseTimeSeries(
                    new Date("11 Feb 2017 GMT").getTime(),
                    20,
                    {
                      min: -10,
                      max: 75,
                    }
                  ),
                },
              ]}
              options={{
                states: {
                  hover: {
                    type: "darken",
                    value: 1,
                  },
                },
                chart: {
                  type: "area",
                  height: 350,
                  stacked: true,
                  zoom: {
                    enabled: false,
                  },
                  events: {
                    selection: function (chart, e) {
                      console.log(new Date(e.xaxis.min));
                    },
                  },
                },
                colors: ["#1EC86A", "#FE8127", "#f02222"],
                dataLabels: {
                  enabled: false,
                },
                stroke: {
                  curve: "smooth",
                },
                fill: {
                  // type: "region",
                  type: "gradient",
                  gradient: {
                    opacityFrom: 0.6,
                    opacityTo: 0.8,
                  },
                },
                legend: {
                  show: false,
                  position: "top",
                  horizontalAlign: "left",
                },
                xaxis: {
                  type: "datetime",
                  labels: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,
                  },
                  axisTicks: {
                    show: false,
                  },
                },
                yaxis: {
                  labels: {
                    show: false,
                  },
                },
                grid: {
                  show: false,
                },
              }}
            /> */}
                    </div>
                </div>
            </div>

            <div className="gaugemeters">
                <div className="forecastriskgauge">
                    <p>Engagement Risk</p>
                    <div className="gaugediv">
                        <GaugeChart
                            id="forecastgauge"
                            className="chart"
                            nrOfLevels={3}
                            acrsLength={[0.33, 0.33, 0.33]}
                            colors={["#DB4437", "#F4B400", " #0F9D58"]}
                            hideText={true}
                            needleColor="#65627A"
                            percent={dashboardData.forecastriskgauge}
                        />
                        <div className="labels">
                            <p>Low</p>
                            <p>High</p>
                        </div>
                    </div>
                </div>
                <div className="oppurtunitiesscoregauge">
                    <p>Pipeline Score</p>
                    <div className="gaugediv">
                        <GaugeChart
                            className="chart"
                            nrOfLevels={3}
                            acrsLength={[0.33, 0.33, 0.33]}
                            colors={["#DB4437", "#F4B400", " #0F9D58"]}
                            hideText={true}
                            needleColor="#65627A"
                            percent={dashboardData.opportunitiesgauge}
                        />
                        <div className="labels">
                            <p>Low</p>
                            <p>High</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="revenueunlockeddiv">
                <Chart
                    height={500}
                    series={[
                        {
                            name: "STOCK ABC",
                            data: series.monthDataSeries1.prices,
                        },
                    ]}
                    options={{
                        chart: {
                            type: "area",
                            // height: 350,
                            zoom: {
                                enabled: false,
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                shadeIntensity: 1,
                                opacityFrom: 0.7,
                                opacityTo: 0.9,
                                stops: [0, 90, 100],
                            },
                        },
                        grid: {
                            show: true,
                            strokeDashArray: 10,
                            xaxis: {
                                lines: {
                                    show: true,
                                },
                            },
                            yaxis: {
                                lines: {
                                    show: false,
                                },
                            },
                        },
                        markers: {
                            size: 5,
                            colors: ["#ffffff"],
                            strokeColor: "#1EC86A",
                            strokeWidth: 3,
                        },
                        stroke: {
                            curve: "straight",
                        },
                        theme: {
                            palette: "palette4",
                            mode: "light",
                            monochrome: {
                                enabled: true,
                                color: "#1EC86A",
                                shadeTo: "light",
                                shadeIntensity: 0.65,
                            },
                        },
                        // title: {
                        //     text: "Fundamental Analysis of Stocks",
                        //     align: "left",
                        // },
                        // subtitle: {
                        //     text: "Price Movements",
                        //     align: "left",
                        // },
                        labels: series.monthDataSeries1.dates,
                        xaxis: {
                            type: "datetime",
                        },
                        yaxis: {
                            opposite: false,
                            labels: {
                                show: false,
                            },
                        },
                        legend: {
                            horizontalAlign: "left",
                        },
                    }}
                />
            </div>
            <div className="dealstable">
                <div className="dealheaders">
                    <div className="dealname">
                        <p>Deal Name</p>
                    </div>
                    <div className="accountnames">
                        <p>Account</p>
                    </div>
                    <div className="engagementrisknumbers">
                        <p>Engagement Risk</p>
                    </div>
                    <div className="forecastrisknumber">
                        <p>Forecast Risk</p>
                    </div>
                    <div className="dealstagenumber">
                        <p>Close Date</p>
                    </div>
                    <div className="amountnumber">
                        <p>Amount</p>
                    </div>
                </div>
                <div className="dealdataelement">
                    {testdatasetcompanies.map((company, index) => {
                        return (
                            <div className="singletabelement">
                                <div
                                    className="dealnameelement"
                                    key={index}
                                    style={
                                        index === testdatasetcompanies.length - 1
                                            ? {
                                                borderBottom: "0.1px solid #bdbdbd",
                                            }
                                            : null
                                    }
                                >
                                    &nbsp; &nbsp;
                                    <p>{company.dealname}</p>
                                </div>
                                <div
                                    className="accountnameelement"
                                    style={
                                        index === testdatasetcompanies.length - 1
                                            ? {
                                                borderBottom: "0.1px solid #bdbdbd",
                                            }
                                            : null
                                    }
                                >
                                    <p>{company.account}</p>
                                </div>
                                <div
                                    className="engagementriskelement"
                                    style={
                                        index === testdatasetcompanies.length - 1
                                            ? {
                                                borderBottom: "0.1px solid #bdbdbd",
                                            }
                                            : null
                                    }
                                >
                                    <div
                                        className="factor"
                                        style={colorFunction(company.engagementrisk)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            style={{
                                                fontWeight: 800,
                                            }}
                                        />
                                        &nbsp;&nbsp;
                                        <p style={colorFunction(company.engagementrisk)}>
                                            {company.engagementrisk}
                                        </p>
                                    </div>
                                    <div className="textbox">
                                        <p>
                                            {company.engagementrisk > 33.3
                                                ? company.engagementrisk > 66.6
                                                    ? "High"
                                                    : "Medium"
                                                : "Low"}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="forecastriskelement"
                                    style={
                                        index === testdatasetcompanies.length - 1
                                            ? {
                                                borderBottom: "0.1px solid #bdbdbd",
                                            }
                                            : null
                                    }
                                >
                                    <div
                                        className="factor"
                                        style={colorFunction(company.forecastrisk)}
                                    >
                                        <FontAwesomeIcon
                                            icon={faCircle}
                                            style={{
                                                fontWeight: 800,
                                            }}
                                        />
                                        &nbsp;&nbsp;
                                        <p style={colorFunction(company.forecastrisk)}>
                                            {company.forecastrisk}
                                        </p>
                                    </div>
                                    <div className="textbox">
                                        <p>
                                            {company.forecastrisk > 33.3
                                                ? company.forecastrisk > 66.6
                                                    ? "High"
                                                    : "Medium"
                                                : "Low"}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="dealstageelement"
                                    style={
                                        index === testdatasetcompanies.length - 1
                                            ? {
                                                borderBottom: "0.1px solid #bdbdbd",
                                            }
                                            : null
                                    }
                                >
                                    <p>
                                        {new Intl.DateTimeFormat("en-US", {
                                            month: "long",
                                            day: "2-digit",
                                        }).format(new Date())}
                                    </p>
                                </div>
                                <div
                                    className="amountelement"
                                    style={
                                        index === testdatasetcompanies.length - 1
                                            ? {
                                                borderBottom: "0.1px solid #bdbdbd",
                                            }
                                            : null
                                    }
                                >
                                    <p>${company.amount.toLocaleString()}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="riskengagetables">
                <div className="dealsbyrisk">
                    <Chart
                        type="bar"
                        height={350}
                        series={[
                            {
                                data: [400, 430, 448, 470, 540],
                            },
                        ]}
                        options={{
                            chart: {
                                type: "bar",
                                height: 350,
                            },
                            plotOptions: {
                                bar: {
                                    borderRadius: 4,
                                    horizontal: true,
                                },
                            },
                            grid: {
                                show: true,
                                strokeDashArray: 10,
                                xaxis: {
                                    lines: {
                                        show: true,
                                    },
                                },
                                yaxis: {
                                    lines: {
                                        show: false,
                                    },
                                },
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            tooltip: {
                                enabled: false,
                            },
                            title: {
                                text: "Deals by Risk Factor",
                                style: {
                                    fontFamily: "Urbanist",
                                    fontWeight: 600,
                                },
                            },
                            colors: ["#FEBDB5"],
                            xaxis: {
                                categories: [
                                    "Prospect Unresponsive",
                                    "Next Meeting not Scheduled",
                                    "Few Contacts Engaged",
                                    "Negative Sentiments",
                                    "Rep Not Followed Up",
                                ],
                                title: {
                                    text: "# of deals",
                                    style: {
                                        fontFamily: "Urbanist",
                                        fontWeight: "600",
                                    },
                                },
                            },
                            yaxis: {
                                show: true,
                                labels: {
                                    show: true,
                                    align: "right",
                                    maxWidth: "max-content",
                                    style: {
                                        fontFamily: "Urbanist",
                                        fontWeight: 400,
                                        fontSize: "1rem",
                                        cssClass: "apexcharts-yaxis-label",
                                    },
                                },
                            },
                        }}
                    />
                </div>
                <div className="dealsbyengage">
                    <Chart
                        type="bar"
                        height={350}
                        series={[
                            {
                                data: [400, 430, 448, 470, 540, 320, 510],
                            },
                        ]}
                        options={{
                            chart: {
                                type: "bar",
                                height: 350,
                            },
                            plotOptions: {
                                bar: {
                                    borderRadius: 4,
                                    horizontal: true,
                                },
                            },
                            grid: {
                                show: true,
                                strokeDashArray: 10,
                                xaxis: {
                                    lines: {
                                        show: true,
                                    },
                                },
                                yaxis: {
                                    lines: {
                                        show: false,
                                    },
                                },
                            },
                            dataLabels: {
                                enabled: false,
                            },
                            tooltip: {
                                enabled: false,
                            },
                            title: {
                                text: "Deals by Risk Factor",
                                style: {
                                    fontFamily: "Urbanist",
                                    fontWeight: "600",
                                },
                            },
                            colors: ["#B5C9FF"],
                            xaxis: {
                                categories: [
                                    "Rep Followed up",
                                    "Prospect Responsive",
                                    "Many Contacts Engaged",
                                    "Recent meetings",
                                    "many Contacts Touched",
                                    "Next Meeting Scheduled",
                                    "Positive Sentiments",
                                ],
                                title: {
                                    text: "# of deals",
                                    style: {
                                        fontFamily: "Urbanist",
                                        fontWeight: "600",
                                    },
                                },
                            },
                            yaxis: {
                                show: true,
                                labels: {
                                    show: true,
                                    align: "right",
                                    maxWidth: "max-content",
                                    style: {
                                        fontFamily: "Urbanist",
                                        fontWeight: 400,
                                        fontSize: "1rem",
                                        cssClass: "apexcharts-yaxis-label",
                                    },
                                },
                            },
                        }}
                    />
                </div>
                <div className="dealsbyengagesub">
                    <div className="dealmultibar1">
                        <Chart
                            type="bar"
                            height={350}
                            series={[
                                {
                                    name: "High Risk",
                                    data: [44, 55, 41, 67, 22, 43],
                                },
                                {
                                    name: "Medium Risk",
                                    data: [13, 23, 20, 8, 13, 27],
                                },
                                {
                                    name: "Low Risk",
                                    data: [11, 17, 15, 15, 21, 14],
                                },
                            ]}
                            options={{
                                chart: {
                                    type: "bar",
                                    height: 350,
                                    stacked: true,
                                    toolbar: {
                                        show: false,
                                    },
                                    zoom: {
                                        enabled: false,
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                colors: ["#DB4437", "#F4B400", "#0F9D58"],
                                responsive: [
                                    {
                                        breakpoint: 480,
                                        options: {
                                            legend: {
                                                position: "bottom",
                                                offsetX: -10,
                                                offsetY: 0,
                                            },
                                        },
                                    },
                                ],
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        borderRadius: 3,
                                        dataLabels: {
                                            enabled: false,
                                        },
                                    },
                                },
                                tooltip: {
                                    enabled: false,
                                },
                                grid: {
                                    show: false,
                                    yaxis: {
                                        lines: {
                                            show: true,
                                        },
                                    },
                                },
                                xaxis: {
                                    type: "datetime",
                                    categories: [
                                        "01/01/2011 GMT",
                                        "01/02/2011 GMT",
                                        "01/03/2011 GMT",
                                        "01/04/2011 GMT",
                                        "01/05/2011 GMT",
                                        "01/06/2011 GMT",
                                    ],
                                },
                                yaxis: {
                                    show: true,
                                    title: {
                                        text: "# of Deals",
                                        style: {
                                            fontFamily: "Urbanist",
                                            fontWeight: "600",
                                        },
                                    },
                                },
                                legend: {
                                    position: "top",
                                    horizontalAlign: "right",
                                    fontFamily: "Urbanist",
                                    fontWeight: 600,
                                },
                                fill: {
                                    opacity: 1,
                                },
                            }}
                        />
                    </div>
                    <div className="dealmultibar2">
                        <Chart
                            type="bar"
                            height={350}
                            series={[
                                {
                                    name: "High Risk",
                                    data: [44, 55, 41],
                                },
                                {
                                    name: "Medium Risk",
                                    data: [13, 23, 20],
                                },
                                {
                                    name: "Low Risk",
                                    data: [11, 17, 15],
                                },
                            ]}
                            options={{
                                chart: {
                                    type: "bar",
                                    height: 350,
                                    stacked: true,
                                    toolbar: {
                                        show: false,
                                    },
                                    zoom: {
                                        enabled: false,
                                    },
                                },
                                dataLabels: {
                                    enabled: false,
                                },
                                colors: ["#DB4437", "#F4B400", "#0F9D58"],
                                responsive: [
                                    {
                                        breakpoint: 480,
                                        options: {
                                            legend: {
                                                position: "bottom",
                                                offsetX: -10,
                                                offsetY: 0,
                                            },
                                        },
                                    },
                                ],
                                plotOptions: {
                                    bar: {
                                        horizontal: false,
                                        borderRadius: 3,
                                        dataLabels: {
                                            enabled: false,
                                        },
                                    },
                                },
                                tooltip: {
                                    enabled: false,
                                },
                                grid: {
                                    show: false,
                                    yaxis: {
                                        lines: {
                                            show: true,
                                        },
                                    },
                                },
                                xaxis: {
                                    type: "datetime",
                                    categories: [
                                        "01/01/2011 GMT",
                                        "01/02/2011 GMT",
                                        "01/03/2011 GMT",
                                    ],
                                },
                                yaxis: {
                                    show: true,
                                    title: {
                                        text: "# of Deals",
                                        style: {
                                            fontFamily: "Urbanist",
                                            fontWeight: "600",
                                        },
                                    },
                                },
                                legend: {
                                    position: "top",
                                    horizontalAlign: "right",
                                    fontFamily: "Urbanist",
                                    fontWeight: 600,
                                },
                                fill: {
                                    opacity: 1,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};