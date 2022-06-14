import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink, faSearch} from "@fortawesome/free-solid-svg-icons";
import {faSalesforce, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faMailBulk, faCalendar} from "@fortawesome/free-solid-svg-icons";

import {UserDetailsFixed} from "../../../components/userDetailsFixed";
import "./index.less"

const sampleData = [
    {icon: faSalesforce, status: "exp"},
    {icon: faCalendar, status: "nc"},
    {icon: faMailBulk, status: "con"}
]

export const Linked = () => {
    return <div className={"linked"}>
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

        <div className={"linkedheader"}>
            <FontAwesomeIcon icon={faLink}/>
            <h1>Linked Accounts</h1>
        </div>


        <div className={"accountsstatus"}>
            <p>
                Accounts
            </p>
            <p>Status</p>
        </div>
        {
            sampleData.map((item, index) => {
                return <div className={"linkedcard"}>
                    <FontAwesomeIcon icon={item.icon} className={"logos"}/>
                    <div className={"linked-control"}>
                        <p className={"status"}>
                            {item.status === "exp" ? "Session Expired" : item.status === "nc" ? "Not Conneted" : "Connected"}
                        </p>

                        <button>
                            Link Now
                        </button>
                    </div>
                </div>
            })
        }
    </div>
}