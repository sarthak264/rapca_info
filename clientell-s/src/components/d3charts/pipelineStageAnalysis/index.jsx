import React, { useEffect, useState } from "react";
import rd3 from "react-d3-library";
import * as d3 from "d3v4";
import "./styles.less";
import { GraphAPI } from "../../../services/graphApi.service";
import { DoubleLevelDropDown } from "../../doubleLevelDropDown";
import { CheckedDropDown } from "../../checkedDropDown";
import { usersUpdate } from "../../../redux/userDropDownManagement";
import axios from "axios";
import { ErrorHandler } from "../../../utils";
import { useSelector, useDispatch } from "react-redux";
const RD3Component = rd3.Component;

export const PipelineStageAnalysis = () => {
  const [state, setState] = useState({ d3: "" });
  const [tooltipValue, setTooltipValue] = useState({
    x: 0,
    y: 0,
    show: false,
  });
  const [modal, setModal] = useState(false);
  const [dataC, setDataC] = useState([]);
  const [userDataList, setUsersDataList] = useState([]);
  const [users, setUsers] = useState([]);
  const [onClickData, setOnClickData] = useState(null);
  const usersProcessList = useSelector(
    (state) => state.userdropdownmanager.value
  );
  const [filterState, setFilterState] = useState({
    closing: "current-quarter",
    users: usersProcessList,
    changes: "month",
  });
  // const data = [
  //   ["May 14, 2021", 10],
  //   ["New", 5],
  //   ["Pulled", 7],
  //   ["+Value", 3],
  //   ["Pushed", -5],
  //   ["-Value", -3],
  //   ["Won", -1],
  //   ["Lost", -5],
  //   ["May 21, 2021", 11],
  // ];
  // const [filterState, setFilterState] = useState({
  //   closing: "current-quarter",
  //   users: usersProcessList,
  //   changes: "month",
  // });
  const dispatch = useDispatch();
  const getUsersOptions = async () => {
    try {
      let userResponseData = await axios.get("/api/getUsers");
      setUsersDataList(userResponseData.data);
    } catch (error) {
      if (error.response.status === 401) {
        ErrorHandler(error.response.status);
      } else {
        getUsersOptions();
      }
    }
  };
  const userCheckboxManage = (userIdList) => {
    console.log(userIdList);
  };
  useEffect(() => {
    getUsersOptions();
    // console.log(filterState)
  }, []);
  useEffect(() => {
    console.log(filterState);
  }, [filterState]);
  const returningFunction = (option) => {
    // if (option.name==="")
    if (option.name === "closingdate") {
      setFilterState((state) => ({
        ...state,
        closing: option.value,
      }));
    } else if (option.name === "users") {
      setFilterState((state) => ({
        ...state,
        users: option.value,
      }));
    }
  };
  useEffect(() => {
    GraphAPI.getPipelineStageAnalysis().then((res) => {
      console.log({ res });
      setDataC(res.data.trends.coordinates);
      const data = res.data.trends.coordinates;
      var nodeStreamGraph = document.createElement("div");
      var svg = d3
          .select(nodeStreamGraph)
          .append("svg")
          .attr("height", 500)
          .attr("width", 1260),
        width = 1180,
        height = 300;

      let tempValueOfGraph = 0;

      var xScale = d3.scaleBand().range([0, width]).padding(0.4),
        yScale = d3.scaleLinear().range([height, 0]);

      var g = svg
        .append("g")
        .attr("transform", "translate(" + 100 + "," + 100 + ")");

      xScale.domain(
        data.map(function (d) {
          return d[0];
        })
      );
      yScale.domain([
        0,
        d3.max(data, function (d) {
          tempValueOfGraph += d[1];
          return tempValueOfGraph;
        }),
      ]);

      g.append("g")
        .attr("class", "gridPSA")
        .call(make_y_gridlines().tickSize(-width).tickFormat(""));

      function make_y_gridlines() {
        return d3.axisLeft(yScale).ticks(5);
      }

      g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "axisPSA")
        .call(d3.axisBottom(xScale));

      g.append("g")
        .attr("class", "axisPSA")
        .call(
          d3
            .axisLeft(yScale)
            .tickFormat(function (d) {
              return d;
            })
            .ticks(10)
        );

      // g.selectAll(".line")
      //   .data(data)
      //   .enter()
      //   .append("path")
      //   .attr("class", "line")
      //   .style("stroke-dasharray", "3, 3") // <== This line here!!
      //   .attr("d", function (d, i) {
      //     if (i < data.length - 2) {
      //       return [
      //         [xScale(d[0]), yScale(d[1])],
      //         [xScale(data[i + 1][0]), yScale(data[i + 1][1])],
      //       ];
      //     }
      //   });

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", function (d, i) {
          if (i === 0 || i === data.length - 1) {
            return "bar-s";
          } else {
            if (d[1] > 0) return "bar-p";
            return "bar-n";
          }
        })
        .attr("x", function (d) {
          return xScale(d[0]);
        })
        .attr("y", function (d, i) {
          if (i === 0 || i === data.length - 1) {
            tempValueOfGraph = data[i][1];

            return yScale(tempValueOfGraph);
          } else {
            if (d[1] > 0) {
              tempValueOfGraph += data[i][1];

              return yScale(tempValueOfGraph);
            }

            const start = tempValueOfGraph;
            tempValueOfGraph += data[i][1];
            return yScale(start);
          }
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function (d, i) {
          if (data[i][1] > 0) {
            tempValueOfGraph = data[i][1];
            return height - yScale(tempValueOfGraph);
          } else {
            return height - yScale(-d[1]);
          }
        })
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut)
        .on("mouseover", tooltipmouseover);

      const bisectDate = d3.bisector((dataPoint) => dataPoint[0]).left;
      function handleMouseMove(data, i) {
        const [x, y] = d3.mouse(this);
        // const dataIndex = bisectDate(data, xValue, 1);

        setTooltipValue((prev) => ({
          ...prev,
          x: x,
          y: y + 130,
        }));
      }
      function tooltipmouseover(event, d) {
        // d3.select(".tooltip-area").style("opacity", 1);
        setTooltipValue((prev) => ({ ...prev, show: true }));
      }

      function handleMouseOut() {
        // d3.select(".tooltip-area").style("opacity", 0);
        setTooltipValue((prev) => ({ ...prev, show: false }));
      }

      setState({
        d3: nodeStreamGraph,
      });
    });
  }, []);
  console.log({ dataC });
  if (dataC.length)
    return (
      <div className="trends">
        <div className="filters">
          <DoubleLevelDropDown
            passedFunction={returningFunction}
            name="closingdate"
            data={{
              title: "Closing in",
              items: [
                "Current Week",
                "Current Month",
                "Current Quarter",
                "Past Week",
                "Pask Quarter",
                "Past Month",
              ],
              defaultSelected: 2,
            }}
            values={[
              "current-week",
              "current-month",
              "current-quarter",
              "past-week",
              "past-quarter",
              "past-month",
            ]}
          />
          <div className="user-wrapper">
            <CheckedDropDown
              name="users"
              data={{
                title: "Users",
                items: userDataList,
              }}
              checkboxFunction={userCheckboxManage}
              passedFunction={returningFunction}
            />
          </div>
          {/* <CheckedDropDown
            name="users"
            data={{
              title: "Users",
              items: userDataList,
            }}
            checkboxFunction={userCheckboxManage} 
          />*/}
        </div>
        <h4 style={{ marginLeft: 50, marginTop: 50 }}>
          All Changes for deals closing in Current Quarter
        </h4>
        {dataC.length && (
          <p style={{ marginLeft: 50, marginTop: 10 }}>
            {`${dataC[0][1] > dataC.at(-1)[1] ? "Reduced" : "Increased"} by $${
              dataC[0][1] > dataC.at(-1)[1]
                ? dataC.at(0)[1] - dataC.at(-1)[1]
                : dataC.at(-1)[1] - dataC.at(0)[1]
            } since Last 7 days`}
          </p>
        )}
        <div style={{ position: "relative" }} className="psagraphwrapper">
          <div
            style={{
              position: "absolute",
              width: "1135px",
              height: "300px",
              zIndex: 999,
              // backgroundColor: "#ff000090",
              display: "flex",
              justifyContent: "space-between",
              top: 100,
              left: 145,
            }}
          >
            {dataC.map((el, i) => (
              <div
                onClick={() => setModal(true)}
                onMouseOver={() => setTooltipValue((prev) => ({ show: true }))}
                onMouseOut={() =>
                  setTooltipValue((prev) => ({ ...prev, show: false }))
                }
                // onClick={() => setTooltipValue((prev) => ({ show: true }))}
                style={{ height: "300px", width: "100%", position: "relative" }}
              >
                {tooltipValue.show && (
                  <div
                    style={{
                      position: "absolute",
                      top: -50,
                      left: 10,
                      backgroundColor: "white",
                      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                      color:
                        i === 0 || i === dataC.length - 1
                          ? "#264653"
                          : el[1] > 0
                          ? "#2a9d8f"
                          : "#e76f51",
                      padding: 10,
                      borderRadius: 8,
                      zIndex: 999,
                    }}
                  >
                    ${el[1]}
                  </div>
                )}
              </div>
            ))}
          </div>
          {modal && (
            <div className="modal-wrapper" onClick={(e) => setModal(false)}>
              <div className="modal-main">
                <table style={{ width: "100%" }}>
                  <tr>
                    <th>Dealname</th>
                    <th>Account</th>
                    <th>Engagement Risk</th>
                    <th>Forcast Risk</th>
                    <th>Deal Stage</th>
                    <th>Close Date</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>Slack</td>
                    <td>Peter Pock</td>
                    <td>77</td>
                    <td>77</td>

                    <td>Negotiation</td>
                    <td>30th August</td>
                    <td>$ 40,000</td>
                  </tr>
                  <tr>
                    <td>Slack</td>
                    <td>Peter Pock</td>
                    <td>77</td>
                    <td>77</td>

                    <td>Negotiation</td>
                    <td>30th August</td>
                    <td>$ 40,000</td>
                  </tr>
                  <tr>
                    <td>Slack</td>
                    <td>Peter Pock</td>
                    <td>77</td>
                    <td>77</td>

                    <td>Negotiation</td>
                    <td>30th August</td>
                    <td>$ 40,000</td>
                  </tr>
                  <tr>
                    <td>Slack</td>
                    <td>Peter Pock</td>
                    <td>77</td>
                    <td>77</td>

                    <td>Negotiation</td>
                    <td>30th August</td>
                    <td>$ 40,000</td>
                  </tr>
                </table>
                {/* {tooltipValue.title} {tooltipValue.selectedRisk} */}
              </div>
            </div>
          )}
          <RD3Component data={state.d3} />
        </div>
      </div>
    );
  else return null;
};
