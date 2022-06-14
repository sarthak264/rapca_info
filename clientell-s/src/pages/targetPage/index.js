import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./index.less";
import { UserDetailsFixed } from "../../components/userDetailsFixed";
import { SetTarget } from "./setTarget";
import { YourProgress } from "./yourProgress";
import { sidebarUpdate } from "../../redux/optionMange";

export const TargetPage = () => {
    const { page } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const buttonRender = [
        {
            name: "Set Target",
            url: "/target/set",
        },
        {
            name: "Your Progress",
            url: "/target/progress",
        },
    ];
    const [buttonState, setButtonState] = useState(0);
    const styleSet = {
        background: "#f6f5fd",
    };
    useEffect(() => {
        dispatch(sidebarUpdate(2))
    }, [])
    return (
        <div className="targetpage">
            <UserDetailsFixed />
            <div className="searchdiv">
                <input
                    type="text"
                    className="searchbar"
                    placeholder="Search..."
                />
                <div>
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>
            <div className="header">
                <p
                    onClick={() => {
                        history.push("/dashboard");
                    }}
                >
                    Dashboard view
                </p>
                <p
                    onClick={() => {
                        history.push("/rollupview");
                    }}
                >
                    Roll-Up View
                </p>
                <p className="selectedheader">Target</p>
            </div>
            <div className="options">
                {buttonRender.map((item, index) => {
                    return (
                        <p
                            key={index}
                            onClick={() => {
                                setButtonState(index);
                                history.push(item.url);
                            }}
                            style={buttonState === index ? styleSet : null}
                        >
                            {item.name}
                        </p>
                    );
                })}
            </div>
            <ComponentControl page={page} />
        </div>
    );
};

export const ComponentControl = ({ page }) => {
    if (page === "set") {
        return <SetTarget />;
    } else if (page === "progress") {
        return <YourProgress />;
    } else {
        return <h1>This page doesnt exist</h1>;
    }
};
