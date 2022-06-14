import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

import {UserDetailsFixed} from "../../../components/userDetailsFixed";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import "./index.less"

export const Onboarding = () => {
    return <div className={"onboarding"}>
        <UserDetailsFixed/>
        <div className="searchdiv">
            <input
                type="text"
                className="searchbar"
                placeholder="Search..."
            />
            <div>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
        <div className={"header-div"}>
            <div className={"enable-div"}>

                <p>Enable Clientell Forecasting</p>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round">
                        </span>
                </label>
            </div>

            <div className={"integration-div"}>
                <a className={"inte-link"}>View Clientell Integration Details</a>
                <p className={"inte-download"}><FontAwesomeIcon icon={faDownload}/> Download Integration Instruction</p>
            </div>
        </div>
    </div>
}