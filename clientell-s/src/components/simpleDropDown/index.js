import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import "./index.less";
export const SimpleDropDown = ({ data }) => {
    const { defaultVal, dataset } = data;
    const [optionState, setOptionState] = useState(false);
    const [currentDefault, setCurrentDefault] = useState(0);
    useEffect(() => {
        for (let i = 0; i < dataset.length; i++) {
            if (dataset[i] === defaultVal) {
                setCurrentDefault(i);
            }
        }
    }, [])
    return (
        <div className="simpledropdown">
            <div
                className="defaultvalue"
                onClick={() => setOptionState((state) => !state)}
            >
                <p>{dataset[currentDefault]}</p>
                <FontAwesomeIcon icon={optionState ? faCaretUp : faCaretDown} />
            </div>
            {optionState ? (
                <div className="optiondivsimple">
                    <div className="suboption">
                        {dataset.map((item, index) => {
                            return (
                                <div
                                    className="inditem"
                                    key={index}
                                    onClick={() => {
                                        setCurrentDefault(index);
                                        setOptionState((state) => !state);
                                    }}
                                >
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </div>
    );
};
