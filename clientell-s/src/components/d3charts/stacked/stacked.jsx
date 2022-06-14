import React, { useEffect, useState } from "react";
import * as d3 from "d3v4";
import "./styles.less";
import rd3 from "react-d3-library";
import { text } from "@fortawesome/fontawesome-svg-core";
import { GraphAPI } from "../../../services/graphApi.service";

const RD3Component = rd3.Component;

export const Stacked = ({ data }) => {
  data.push({
    highRisk: 0,
    lowRisk: 0,
    mediumRisk: 0,
    name: "Needs Analysisji",
    title: 10,
  });
  const [state, setState] = useState({ d3: "" });
  const [tooltipValue, setTooltipValue] = useState({
    x: 0,
    y: 0,
    title: 0,
    selectedRisk: 0,
    show: false,
  });
  const [modal, setModal] = useState(false);
  const riskEnum = [
    { title: "Low Risk", color: "#0F9D58", key: "lowRisk" },
    { title: "Medium Risk", color: "#F4B400", key: "mediumRisk" },
    { title: "High Risk", color: "#DB4437", key: "highRisk" },
  ];
  useEffect(() => {
    if (modal)
      GraphAPI.getPipelineRiskAnalysisTable(4).then((res) => {
        console.log({ res });
      });
  }, [modal]);

  useEffect(() => {
    var nodeStreamGraph = document.createElement("div");

    let curve = d3.curveCatmullRom.alpha(0.5);

    var svg = d3
      .select(nodeStreamGraph)
      .append("svg")
      .attr("height", 200)
      .attr("width", 1260);
    const strokeWidth = 1.5;
    const margin = { top: 0, bottom: 40, left: 0, right: 0 };
    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`);

    const width = +svg.attr("width");
    const height = +svg.attr("height") - margin.top - margin.bottom;
    const grp = chart
      .append("g")
      .attr(
        "transform",
        `translate(-${margin.left - strokeWidth},-${margin.top})`
      );

    // const tooltip = svg
    //   .append("g")
    //   .attr("class", "tooltip-area")
    //   .style("opacity", 0);

    // const tooltipText = tooltip
    //   .append("text")
    //   .attr("class", "tooltip-area__text event-text");

    // Create stack
    const stack = d3.stack().keys(["lowRisk", "mediumRisk", "highRisk"]);
    const stackedValues = stack(data);
    const stackedData = [];
    // Copy the stack offsets back into the data.
    stackedValues.forEach((layer, index) => {
      const currentStack = [];
      layer.forEach((d, i) => {
        currentStack.push({
          values: [d[0], d[1]],
          title: data[i].title,
        });
      });
      stackedData.push(currentStack);
    });

    // Create scales
    const yScale = d3
      .scaleLinear()
      .range([height, 0])
      .domain([
        d3.min(stackedValues[0], (dp) => dp[0]),
        d3.max(stackedValues[stackedValues.length - 1], (dp) => dp[1]),
      ]);

    const xScale = d3
      .scaleLinear()
      .range([0, width])
      .domain(d3.extent(data, (dataPoint) => dataPoint.title));

    // var xScale = d3
    //   .scaleBand()
    //   .range([0, width])
    //   .padding(0.1)
    //   .domain(
    //     stackedData[0].map(function (d) {
    //       console.log(d.title);
    //       return d.title;
    //     })
    //   );

    const area = d3
      .area()
      .x((dataPoint) => {
        return xScale(dataPoint.title);
      })
      .y0((dataPoint) => yScale(dataPoint.values[0]))
      .y1((dataPoint) => yScale(dataPoint.values[1]))
      .curve(curve);

    const series = grp
      .selectAll(".series")
      .data(stackedData)
      .enter()
      .append("g")
      .attr("class", "series")
      .on("mousemove", handleMouseMove)
      .on("mouseout", handleMouseOut)
      .on("click", () => {
        setModal(true);
      })
      .on("mouseover", tooltipmouseover);

    series
      .append("path")
      .attr("transform", `translate(${margin.left},0)`)
      .style("fill", (d, i) => riskEnum[i].color)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", strokeWidth)
      .attr("d", (d) => {
        return area(d);
      });

    // Add the X Axis
    // chart
    //   .append("g")
    //   .attr("transform", `translate(0,${height})`)
    //   .call(d3.axisBottom(xScale).ticks(data.length));

    // // Add the Y Axis
    // chart
    //   .append("g")
    //   .attr("transform", `translate(0, 0)`)
    //   .call(d3.axisLeft(yScale));

    // Add gradient defs to svg
    const defs = svg.append("defs");

    const gradient = defs.append("linearGradient").attr("id", "svgGradient");
    const gradientResetPercentage = "50%";

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", gradientResetPercentage)
      .attr("stop-color", "lightblue");

    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", gradientResetPercentage)
      .attr("stop-color", "darkblue");

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", gradientResetPercentage)
      .attr("stop-color", "darkblue")
      .attr("stop-opacity", 1);

    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", gradientResetPercentage)
      .attr("stop-color", "lightblue");

    const bisectDate = d3.bisector((dataPoint) => dataPoint.title).left;

    function handleMouseMove(dataT, i) {
      const [x, y] = d3.mouse(this);
      d3.selectAll(".series").style("opacity", 0.2);
      d3.select(this).style("opacity", 1);
      const currentXPosition = x;
      // Get the x value of the current X position

      const xValue = xScale.invert(currentXPosition);
      // Get the index of the xValue relative to the dataSet
      const dataIndex = bisectDate(dataT, xValue, 1);
      // const leftData = data[dataIndex - 1];
      // const rightData = data[dataIndex];
      // d3.select(".tooltip-area__text").text(
      //   `${i === 0 ? "lowRisk" : i === 1 ? "mediumRisk" : "highRisk"} : ${
      //     leftData[i === 0 ? "lowRisk" : i === 1 ? "mediumRisk" : "highRisk"]
      //   }`
      // );
      setTooltipValue((prev) => ({
        ...prev,
        title:
          dataIndex - 1 < data.length - 1 ? dataIndex - 1 : data.length - 2,
        selectedRisk: i,
        x: x + 10,
        y: y + 10,
      }));

      // d3.select(".tooltip-area").attr(
      //   "transform",
      //   `translate(${x + 10}, ${y + 5})`
      // );
      // Update gradient
      // const x1Percentage = (xScale(leftData.title) / width) * 100;
      // const x2Percentage = (xScale(rightData.title) / width) * 100;
      // d3.selectAll(".start").attr("offset", `${x1Percentage}%`);
      // d3.selectAll(".end").attr("offset", `${x2Percentage}%`);
    }
    function tooltipmouseover(event, d) {
      // d3.select(".tooltip-area").style("opacity", 1);
      setTooltipValue((prev) => ({ ...prev, show: true }));
    }

    function handleMouseOut() {
      // d3.select(".tooltip-area").style("opacity", 0);
      setTooltipValue((prev) => ({ ...prev, show: false }));
      d3.select(this).style("stroke", "none").style("opacity", 0.8);
      d3.selectAll(".series").style("opacity", 1).style("stroke", "none");
      d3.selectAll(".start").attr("offset", gradientResetPercentage);
      d3.selectAll(".end").attr("offset", gradientResetPercentage);
      d3.select(".title1").text("");
      d3.select(".title2").text("");
    }
    setState({
      d3: nodeStreamGraph,
    });
  }, []);
  console.log(tooltipValue.show ? tooltipValue.y : null);

  return (
    <div style={{ position: "relative" }} className="pipelineriskgraphwrapper">
      <RD3Component data={state.d3} />
      {tooltipValue.show && !modal && tooltipValue.y < 200 && (
        <div
          style={{
            position: "absolute",
            top: tooltipValue.y,
            left: tooltipValue.x,
            backgroundColor: riskEnum[tooltipValue.selectedRisk].color,
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            color: "white",
            padding: 10,
            borderRadius: 8,
          }}
        >
          {riskEnum[tooltipValue.selectedRisk].title}
          {" : "}
          {data[tooltipValue.title][riskEnum[tooltipValue.selectedRisk].key]}
        </div>
      )}
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
    </div>
  );
};
