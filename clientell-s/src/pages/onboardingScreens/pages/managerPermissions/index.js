import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import "./index.less";
import step1 from "../../../../assets/designs/manage step 1.svg";
import step2 from "../../../../assets/designs/manage step 2.svg";
import step3 from "../../../../assets/designs/manage step 3.svg";
export const ManagePermissions = () => {
    const history = useHistory();
    return (
        <div className="managepermissions">
            <div className="backbutton-div">
                <button
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} /> back
                </button>
            </div>
            <div className="header-div">
                <p className="header">Manage Permissions</p>
                <button>
                    <FontAwesomeIcon icon={faFile} />
                    Donwload PDF
                </button>
            </div>
            <div className="subheader">
                <p>
                    Certain permissions will have to be provided to Clientell.
                    Follow the below steps to set it up.
                </p>
            </div>
            <div className="step1-div">
                <div className="header">1. Setup Permissions</div>
                <div className="step1">
                    <p>i. Setup Permission</p>
                    <div>
                        <img src={step1} alt="" />
                    </div>
                </div>
                <div className="step2">
                    <p>ii. click Edit Policies</p>
                    <div>
                        <img src={step2} alt="" />
                    </div>
                </div>
            </div>
            <div className="step2-div">
                <div className="header">2. Setup Profiles</div>
                <div className="step1">
                    <p>
                        Click Manage Profiles button in the same Connected App
                        screen &nbsp;&nbsp;
                        <p>Select System Administrator and press save</p>
                    </p>
                    <div>
                        <img src={step3} alt="" />
                    </div>
                </div>
            </div>
            <div className="completed-message">
                <p>
                    &#x1F490; You have successfully integrated your Salesforce
                    with Clientell! Thanks for sticking around and reaching the
                    end of the tutorial. Have a great day!
                </p>
            </div>
            '
            <div className="gotonext-div">
                <button
                    onClick={() => {
                        history.push("/onboarding/tables");
                    }}
                >
                    Finish &nbsp;
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
};
