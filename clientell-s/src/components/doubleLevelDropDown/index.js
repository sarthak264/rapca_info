import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./index.less";
export const DoubleLevelDropDown = ({ data, passedFunction, name, values }) => {
    const { title, items, defaultSelected } = data;
    const [currentOption, setCurrentOption] = useState(defaultSelected);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="doubleleveldropdown">
            <div
                className="doubleheader"
                onClick={() => {
                    setIsOpen((state) => !state);
                }}
            >
                <div className="dropdownelement">
                    <p className="droptitle">
                        <span className="title">{title}:</span>{" "}
                        {items[currentOption]}
                    </p>
                </div>
                &nbsp;&nbsp;&nbsp;
                <FontAwesomeIcon icon={isOpen ? faCaretUp : faCaretDown} />
            </div>
            {isOpen ? (
                <div
                    className="dropdownclosearea"
                    onClick={() => {
                        setIsOpen((state) => !state);
                    }}
                ></div>
            ) : null}
            <div className="dropdownareadiv">
                {isOpen ? (
                    <div className="dropdownarea">
                        <div
                            className="optioncloserdiv"
                            onClick={() => {
                                setIsOpen((state) => !state);
                            }}
                        ></div>
                        {items.map((item, index) => {
                            return (
                                <div
                                    className="optiondiv"
                                    key={index}
                                    onClick={() => {
                                        setCurrentOption(index);
                                        setIsOpen((state) => !state);
                                        passedFunction({
                                            name,
                                            value: values[index],
                                        });
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
};
