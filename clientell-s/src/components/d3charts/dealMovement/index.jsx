import React, { useEffect, useState } from "react";
import * as d3 from "d3v4";
import "./styles.less";
import rd3 from "react-d3-library";
import dealMovementsData from "../../../test data/dealMovementsData";

const RD3Component = rd3.Component;

export const DealMovement = ({ data }) => {
  const [state, setState] = useState({ d3: "" });
  const [points, setPoints] = useState({
    coord: null,
    width: 10,
  });

  // const [tooltipValue, setTooltipValue] = useState({
  //   x: 0,
  //   y: 0,
  //   title: 0,
  //   selectedRisk: 0,
  //   show: false,
  // });
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState({ type: "", lengend: "" });
  let coord = { left: [], right: [] };

  const legends = {
    "AE Qualified": { title: "AE Qualified", color: "#81D2BA" },
    "Business Requirement Identified": {
      title: "Business Requirement Identified",
      color: "#CA7F83",
    },
    "Proof of Concept (POC)": {
      title: "Proof of Concept (POC)",
      color: "#F5D762",
    },
    "Proposal/Price Presented": {
      title: "Proposal/Price Presented",
      color: "#88ADF5",
    },
    "Negotiation/Procurement/Legal": {
      title: "Negotiation/Procurement/Legal",
      color: "#F4A762",
    },
    "Finalizing Closure": { title: "Finalizing Closure", color: "#75CEE0" },
    "Finance Review": { title: "Finance Review", color: "#D8D2B6" },
    "Closed Won": { title: "Closed Won", color: "#89E9A3" },
    "Closed Lost": { title: "Closed Lost", color: "#EB5E65" },
  };
  // const rightLegends = [
  //   { title: "AE Qualified", color: "#81D2BA", deals: 48 },
  //   { title: "Business Requirement Identified", color: "#CA7F83", deals: 308 },
  //   { title: "Proof of Concept (POC)", color: "#F5D762", deals: 435 },
  //   { title: "Proposal/Price Presented", color: "#88ADF5", deals: 146 },
  //   { title: "Negotiation/Procurement/Legal", color: "#F4A762", deals: 91 },
  //   { title: "Finalizing Closure", color: "#75CEE0", deals: 102 },
  //   { title: "Finance Review", color: "#D8D2B6", deals: 100 },
  //   { title: "Closed Won", color: "#89E9A3", deals: 102 },
  //   { title: "Closed Lost", color: "#EB5E65", deals: 140 },
  // ];

  let leftTotalSum = 0;
  {
    let temp = 0;
    dealMovementsData.left.forEach((p) => (temp += p.deals));
    leftTotalSum = temp;
  }
  let rightTotalSum = 0;
  {
    let temp = 0;
    dealMovementsData.right.forEach((p) => (temp += p.deals));
    rightTotalSum = temp;
  }
  const svgWidth = 1020,
    svgHeight = 500;

  useEffect(() => {
    var nodeStreamGraph = document.createElement("div");
    if (points.coord) {
      var svg = d3
        .select(nodeStreamGraph)
        .append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);

      var Gen = d3
        .line()
        .x((p) => p.xpoint)
        .y((p) => p.ypoint)
        .curve(d3.curveBasis);

      points.coord.forEach((x, i) => {
        const defs = svg.append("defs");
        const lg = defs
          .append("linearGradient")
          .attr("x1", "0%")
          .attr("x2", "100%")
          .attr("y1", "0%")
          .attr("y2", "0%")
          .attr("id", "lg" + i);

        lg.append("stop").attr("offset", "30%").attr("stop-color", x[2]);
        lg.append("stop").attr("offset", "70%").attr("stop-color", x[3]);

        svg
          .append("path")
          .attr(
            "d",
            Gen([
              { xpoint: 0, ypoint: coord.left[x[0]] },
              { xpoint: 0.3 * svgWidth, ypoint: coord.left[x[0]] },
              { xpoint: 0.6 * svgWidth, ypoint: coord.right[x[1]] },
              { xpoint: svgWidth, ypoint: coord.right[x[1]] },
            ])
          )
          .attr("fill", "transparent")
          .attr("stroke", `url(#lg${i})`)
          .attr("stroke-width", x[4] + "px")
          .attr("class", "deal-path")
          .on("click", () => setModal(true));

        svg
          .append("rect")
          .attr("x", (selected.type === "left" ? 0.9 : 0.1) * svgWidth - 10)
          .attr(
            "y",
            (selected.type === "left" ? coord.right[x[1]] : coord.left[x[0]]) -
              15
          )
          .attr("width", "50px")
          .attr("height", "20px")
          .attr("fill", "#3B3C9B");
        svg
          .append("text")
          .attr("x", (selected.type === "left" ? 0.9 : 0.1) * svgWidth)
          .attr(
            "y",
            selected.type === "left" ? coord.right[x[1]] : coord.left[x[0]]
          )
          .attr("width", "50px")
          .attr("height", "20px")
          .attr("fill", "white")
          .text(x[5]);
      });

      function handleMouseMove(dataT, i) {
        const [x, y] = d3.mouse(this);
        d3.selectAll(".series").style("opacity", 0.2);
        d3.select(this).style("opacity", 1);
        const currentXPosition = x;
        // Get the x value of the current X position

        // const xValue = xScale.invert(currentXPosition);
        // Get the index of the xValue relative to the dataSet      // const leftData = data[dataIndex - 1];
        // const rightData = data[dataIndex];
        // d3.select(".tooltip-area__text").text(
        //   `${i === 0 ? "lowRisk" : i === 1 ? "mediumRisk" : "highRisk"} : ${
        //     leftData[i === 0 ? "lowRisk" : i === 1 ? "mediumRisk" : "highRisk"]
        //   }`
        // );
        // setTooltipValue((prev) => ({
        //   ...prev,
        //   title:
        //     dataIndex - 1 < data.length - 1 ? dataIndex - 1 : data.length - 2,
        //   selectedRisk: i,
        //   x: x + 10,
        //   y: y + 10,
        // }));

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
        // setTooltipValue((prev) => ({ ...prev, show: true }));
      }

      function handleMouseOut() {
        // d3.select(".tooltip-area").style("opacity", 0);
        // setTooltipValue((prev) => ({ ...prev, show: false }));
        d3.select(this).style("stroke", "none").style("opacity", 0.8);
        d3.selectAll(".series").style("opacity", 1).style("stroke", "none");
        // d3.selectAll(".start").attr("offset", gradientResetPercentage);
        // d3.selectAll(".end").attr("offset", gradientResetPercentage);
        d3.select(".title1").text("");
        d3.select(".title2").text("");
      }
    }
    setState({
      d3: nodeStreamGraph,
    });
  }, [points]);
  let tempLeftPointSum = 0;
  let tempRightPointSum = 0;
  return (
    <div
      style={{ position: "relative", marginLeft: 50, marginTop: 50 }}
      className="dealmovement"
    >
      <div
        style={{
          width: "1400px",
          display: "flex",
          justifyContent: "space-between",
          zIndex: 999,
        }}
      >
        <div
          style={{
            width: 200,
          }}
        >
          {dealMovementsData.left.map((data, i) => {
            console.log({ coord });
            let pointTemp = tempLeftPointSum;
            // console.log({ pointTemp });
            tempLeftPointSum =
              pointTemp + (data.deals * svgHeight) / leftTotalSum;
            coord.left.push(
              pointTemp + (data.deals * svgHeight) / (2 * leftTotalSum)
            );

            return (
              <div
                style={{
                  width: 200,
                  display: "flex",
                  justifyContent: "space-between",
                  height: (data.deals * svgHeight) / leftTotalSum,
                }}
                onClick={() => {
                  setSelected({ type: "left", lengend: data.title });
                  setPoints((prev) => {
                    return {
                      coord: data.end.map((el) => [
                        i,
                        dealMovementsData.right.findIndex(
                          (x) => x.title === el.title
                        ),

                        legends[data.title].color,
                        legends[el.title].color,
                        (el.deals * data.deals * svgHeight) /
                          (leftTotalSum * data.deals),
                        el.deals,
                      ]),
                    };
                  });
                }}
              >
                {(data.deals * svgHeight) / leftTotalSum > 10 && (
                  <span style={{ width: 100 }}>
                    {data.title} {data.deals}
                  </span>
                )}
                <span
                  style={{
                    backgroundColor: legends[data.title].color,
                    margin: "0 10px",
                    width: "30px",
                  }}
                ></span>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: 200,
          }}
        >
          {dealMovementsData.right.map((data, i) => {
            let pointTemp = tempRightPointSum;
            console.log({ coord });
            tempRightPointSum =
              pointTemp + (data.deals * svgHeight) / rightTotalSum;
            coord.right.push(
              pointTemp + (data.deals * svgHeight) / (2 * rightTotalSum)
            );

            return (
              <div
                style={{
                  width: 200,
                  display: "flex",
                  justifyContent: "space-between",
                  height: (data.deals * svgHeight) / rightTotalSum,
                }}
                onClick={() => {
                  setSelected({ type: "right", lengend: data.title });
                  setPoints((prev) => {
                    return {
                      coord: data.end.map((el) => [
                        dealMovementsData.right.findIndex(
                          (x) => x.title === el.title
                        ),
                        i,
                        legends[el.title].color,
                        legends[data.title].color,

                        (el.deals * data.deals * svgHeight) /
                          (rightTotalSum * data.deals),
                        el.deals,
                      ]),
                    };
                  });
                }}
              >
                <span
                  style={{
                    backgroundColor: legends[data.title].color,
                    margin: "0 10px",
                    width: "30px",
                  }}
                ></span>
                {(data.deals * svgHeight) / rightTotalSum > 10 && (
                  <span style={{ width: 200 }}>
                    {data.title} {data.deals}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "absolute", top: 0, zIndex: 0, left: 190 }}>
        <RD3Component data={state.d3} />
      </div>
      {/* {tooltipValue.show && !modal && tooltipValue.y < 200 && (
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
      )} */}
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
