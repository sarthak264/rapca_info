import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom"

import "./index.less";
export const WelcomeScreen = () => {
    const history = useHistory();
    return (
        <div className="welcomescreen">
            <div className="welcome-div">
                <div className="message-component">
                    <div className="sent-by">
                        <img
                            src="https://randomuser.me/api/portraits/men/77.jpg"
                            alt="Marcus Dave"
                        />
                        <p>Sent by {"Ray Boccino "}</p>
                    </div>
                    <div className="welcome-message">
                        <p className="message-header">
                            Welcome to your first day on the team! &#x1F60E;
                        </p>
                        <div className="message-footer">
                            Get started with a step-by-step guide on the
                            fundamentals of Clientell
                        </div>
                    </div>
                    <div className="letsgo-div">
                        <button className="letsgo"
                            onClick={() => {
                                history.push("/onboarding/setup");
                            }}
                        >
                            Let's go{" "}
                            <FontAwesomeIcon
                                className="icon"
                                icon={faAngleRight}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
