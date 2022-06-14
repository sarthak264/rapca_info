import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "./index.less";
export const SingleDropCalender = ({ defaultdate }) => {
    const [currentDefaultDate, setCurrentDefaultDate] = useState(defaultdate);
    const [inlineCalenderState, setInlineCalenderState] = useState(false);
    return (
        <div className="singledropcalender">
            <p
                className="dropcalenderisplay"
                onClick={() => {
                    setInlineCalenderState((state) => !state);
                }}
            >
                {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                }).format(new Date(defaultdate))}
            </p>
            {inlineCalenderState ? (
                <div className="datepickerdiv">
                    <DatePicker
                        className="inlinecalender"
                        selected={currentDefaultDate}
                        onChange={(e) => {
                            setCurrentDefaultDate(e);
                            setInlineCalenderState((state) => !state);
                        }}
                        inline
                    />
                </div>
            ) : null}
        </div>
    );
};
