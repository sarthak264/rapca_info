import React, { useState } from "react";
import "./index.less";
export const SettingsPageTabs = ({ list, setPage, selectedPage }) => {
  return (
    <div className="settings-page-tabs">
      <div className="tabs">
        {list.map((opt) => (
          <div
            key={opt}
            className={`tab ${selectedPage === opt ? "active" : ""}`}
            onClick={() => {
              setPage(opt);
            }}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};
