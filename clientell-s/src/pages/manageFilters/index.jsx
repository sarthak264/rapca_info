import React, { useEffect, useState } from "react";
import { SettingsPageTabs } from "../../components/settingsPageTabs";
import { SettingsAPI } from "../../services/settingsAPI";
import "./index.less";
export const ManageFilters = () => {
  const tabs = ["Opportunity", "Dashboard", "Rollup View", "Target", "Trends"];
  const [selectedPage, setSelectedPage] = useState(tabs[0]);
  const [filterData, setFilterData] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [update, setUpdate] = useState([false, false]);
  useEffect(() => {
    Promise.all([
      SettingsAPI.getPageFilter({
        page: selectedPage,
        filter_type: "base",
      })
        .then((res) => ({ ...res.data, type: "base" }))
        .catch(() => null),
      SettingsAPI.getPageFilter({
        page: selectedPage,
        filter_type: "additional",
      })
        .then((res) => ({ ...res.data, type: "additional" }))
        .catch(() => null),
    ]).then((values) => {
      Promise.all(
        values
          .filter((n) => n)
          .map((p_filters) =>
            p_filters
              ? SettingsAPI.getFilterCompanyMapper(p_filters.page_filter).then(
                  (res) => res.data.data[0].filter_id
                )
              : null
          )
      ).then((selV) => {
        setFilterData(values.filter((n) => n));
        setSelectedValues(selV);
      });
    });
  }, [selectedPage]);
  const onCheckBoxClick = (event, iV, item) => {
    event.stopPropagation();
    console.log(selectedValues[iV].includes(item.id));
    if (event.target.checked && !selectedValues[iV].includes(item.id)) {
      let art = selectedValues[iV];
      console.log({ art });
      art.push(item.id);
      let temp = [...selectedValues];
      temp[iV] = art;
      console.log({ art });
      setSelectedValues(temp);
    } else {
      let art = selectedValues[iV];
      console.log({ art });
      art = art.filter((el) => el !== item.id);
      let temp = [...selectedValues];
      temp[iV] = art;
      console.log({ art });
      setSelectedValues(temp);
    }
    let newArr = [...update];
    newArr[iV] = true;
    setUpdate(newArr);
  };
  console.log({ filterData, selectedValues });
  return (
    <div className="manage-filters">
      <h1>Manage Filters</h1>
      <SettingsPageTabs
        list={tabs}
        setPage={(page) => {
          setSelectedPage(page);
        }}
        selectedPage={selectedPage}
      />
      {filterData.length &&
      selectedValues.length &&
      filterData.length === selectedValues.length
        ? filterData.map((fData, iV) => {
            return (
              <div key={fData.page_filter}>
                <div className="head-row">
                  <h2>
                    {fData.type === "base" ? "Base" : "Additional"} Filters
                  </h2>
                  {fData.type === "additional" && (
                    <button
                      className={`button`}
                      disabled={!update[iV]}
                      onClick={() => {
                        SettingsAPI.postFilterCompanyMapper(
                          fData.page_filter,
                          selectedValues[iV]
                        ).then((res) => {
                          console.log({ data: res.data });
                          setUpdate([false, false]);
                        });
                      }}
                    >
                      Save metrics
                    </button>
                  )}
                </div>

                <div className="checkboxes">
                  {fData.filters.map((el, i) => (
                    <div className="checkbox" key={el.id}>
                      <input
                        type="checkbox"
                        name=""
                        disabled={fData.type === "base" ? true : false}
                        defaultChecked={selectedValues[iV].includes(el.id)}
                        onClick={(e) => {
                          onCheckBoxClick(e, iV, el);
                        }}
                      />
                      <p>{el.filter_name}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        : null}

      {/* <h2>Additional Filters</h2>
      <div className="checkboxes">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
          (x, i) => (
            <div className="checkbox">
              <input type="checkbox" name="" defaultChecked={i % 2} />
              <p>Account</p>
            </div>
          )
        )}
      </div> */}
    </div>
  );
};
