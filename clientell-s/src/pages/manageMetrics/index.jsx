import React, { useState, useEffect } from "react";
import "./index.less";
import SalesforceLogo from "../../assets/element logos/salesforce.svg";
import MetricsLogo from "../../assets/element logos/clientell metrics.svg";
import Triangle from "../../assets/element logos/triangle.svg";
import { SettingsAPI } from "../../services/settingsAPI";
import { SettingsPageTabs } from "../../components/settingsPageTabs";

export const ManageMetrics = () => {
  const [metricData, setMetricData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const tabs = [
    "Opportunity",
    "Dashboard",
    "Rollup View",
    "Target",
    "Trends",
    "Deal View",
    "Rep View",
  ];
  const [selectedPage, setSelectedPage] = useState(tabs[0]);
  const [selectedSetOrder, setSelectedSetOrder] = useState([0, 0]);
  const [update, setUpdate] = useState([false, false]);

  useEffect(() => {
    Promise.all([
      SettingsAPI.getMetricColumn({
        page: selectedPage,
        metric_type: "main",
      })
        .then((res) => ({ ...res.data, type: "main" }))
        .catch(() => null),
      SettingsAPI.getMetricColumn({
        page: selectedPage,
        metric_type: "table",
      })
        .then((res) => ({ ...res.data, type: "table" }))
        .catch(() => null),
    ]).then((values) => {
      Promise.all(
        values
          .filter((n) => n)
          .map((p_metrics) =>
            p_metrics
              ? SettingsAPI.getMetricColumnCompanyMapper(
                  p_metrics.page_metric
                ).then((res) => res.data.data[0].metric_column_sort_id)
              : null
          )
      ).then((selV) => {
        setMetricData(values.filter((n) => n));
        setSelectedValues(selV);
      });
    });
  }, [selectedPage]);

  const onCheckBoxClick = (event, iV, item) => {
    event.stopPropagation();
    if (event.target.checked && !selectedValues[iV].includes(item.id)) {
      let art = selectedValues[iV];
      art.push(item.id);
      let temp = [...selectedValues];
      temp[iV] = art;
      setSelectedValues(temp);
    } else {
      let art = selectedValues[iV];
      art = art.filter((el) => el !== item.id);
      let temp = [...selectedValues];
      temp[iV] = art;
      setSelectedValues(temp);
    }
    let newArr = [...update];
    newArr[iV] = true;
    setUpdate(newArr);
  };
  function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
  }
  return (
    <div className="manage-metrics">
      <h1>Manage Metrics</h1>
      <SettingsPageTabs
        list={tabs}
        setPage={(page) => {
          setSelectedPage(page);
        }}
        selectedPage={selectedPage}
      />

      {metricData.length &&
      selectedValues.length &&
      metricData.length === selectedValues.length
        ? metricData.map((mData, iV) => {
            if (!mData) {
              return null;
            }
            let array1 = [];
            let array2 = [];

            for (let i = 0; i < mData.metric_columns.length; i++) {
              if (mData.metric_columns[i].metric_class === "clientell") {
                array2.push(mData.metric_columns[i]);
              } else if (
                mData.metric_columns[i].metric_class === "salesforce"
              ) {
                array1.push(mData.metric_columns[i]);
              }
            }

            return (
              <div key={mData.page_metric}>
                <div className="head-row">
                  <h2>{mData.type === "main" ? "Main" : "Table"} Metrics</h2>
                  <button
                    className={`button`}
                    disabled={!update[iV]}
                    onClick={() => {
                      SettingsAPI.postMetricColumnCompanyMapper(
                        mData.page_metric,
                        selectedValues[iV]
                      ).then((res) => {
                        setUpdate([false, false]);
                      });
                    }}
                  >
                    Save metrics
                  </button>
                </div>
                <div className="grid">
                  <div className="first">
                    <img
                      src={SalesforceLogo}
                      alt="salesforce logo"
                      className="logo"
                    />
                    <h2 className="subHeading">Salesforce Metrics</h2>
                    <div className="list-card">
                      <div className="list-wrapper">
                        {array1.map((item, index) => {
                          return (
                            <div className="list-item" key={index}>
                              <label>{item.metric_display_name}</label>
                              <input
                                type="checkbox"
                                name={item.metric_name}
                                id={item.id}
                                defaultChecked={selectedValues[iV].includes(
                                  item.id
                                )}
                                onClick={(e) => onCheckBoxClick(e, iV, item)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="second">
                    <img
                      src={MetricsLogo}
                      alt="salesforce logo"
                      className="logo"
                    />
                    <h2 className="subHeading">Clientell Metrics</h2>
                    <div className="list-card">
                      <div className="list-wrapper">
                        {array2.map((item, index) => {
                          return (
                            <div className="list-item" key={index}>
                              <label>{item.metric_display_name}</label>
                              <input
                                type="checkbox"
                                name={item.metric_name}
                                id={item.id}
                                defaultChecked={selectedValues[iV].includes(
                                  item.id
                                )}
                                onClick={(e) => onCheckBoxClick(e, iV, item)}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="third">
                    {/* Deleting this empty p tag will break layout since grid-template-row is being used */}
                    <p>&nbsp;</p>
                    <h2 className="subHeading">Set Order</h2>
                    <div className="list-card">
                      <div className="list-wrapper">
                        {selectedValues[iV].map((itemId, index) => {
                          let item = mData.metric_columns.find(
                            (x) => x.id === itemId
                          );
                          if (item)
                            return (
                              <div
                                className={`list-item ${
                                  index === selectedSetOrder[iV] ? "active" : ""
                                }`}
                                key={index}
                                onClick={() => {
                                  let art = [...selectedSetOrder];
                                  art[iV] = index;
                                  setSelectedSetOrder(art);
                                }}
                              >
                                <label>
                                  {item.metric_name.split("_")[0]}{" "}
                                  {item.metric_name.split("_")[1]}
                                </label>
                                <input
                                  type="checkbox"
                                  name={item.metric_name}
                                  id={item.id}
                                  defaultChecked={true}
                                  disabled
                                />
                              </div>
                            );
                          return null;
                        })}
                      </div>
                    </div>
                    <div className="triangle-wrapper">
                      <img
                        src={Triangle}
                        className="triangle"
                        alt="up"
                        onClick={() => {
                          if (selectedSetOrder[iV] > 0) {
                            let arrT = selectedValues[iV];
                            arraymove(
                              arrT,
                              selectedSetOrder[iV],
                              selectedSetOrder[iV] - 1
                            );
                            let tempT = [...selectedValues];
                            tempT[iV] = arrT;
                            setSelectedValues(tempT);
                            tempT = [...selectedSetOrder];
                            tempT[iV] = selectedSetOrder[iV] - 1;
                            setSelectedSetOrder(tempT);
                            let newArr = [...update];
                            newArr[iV] = true;
                            setUpdate(newArr);
                          }
                        }}
                      />
                      <img
                        src={Triangle}
                        className="triangle reversed"
                        alt="down"
                        onClick={() => {
                          if (
                            selectedSetOrder[iV] <
                            selectedValues[iV].length - 1
                          ) {
                            let arrT = selectedValues[iV];
                            arraymove(
                              arrT,
                              selectedSetOrder[iV],
                              selectedSetOrder[iV] + 1
                            );
                            let tempT = [...selectedValues];
                            tempT[iV] = arrT;
                            setSelectedValues(tempT);
                            tempT = [...selectedSetOrder];
                            tempT[iV] = selectedSetOrder[iV] + 1;
                            setSelectedSetOrder(tempT);
                            let newArr = [...update];
                            newArr[iV] = true;
                            setUpdate(newArr);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};
