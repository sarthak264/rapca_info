import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faSearch,
    faCaretDown,
    faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux"

import "./index.less"
import { login } from "../../redux/authLogin"

export const UserDetailsFixed = () => {
    const dispatch = useDispatch();
    return (
        <div className="userdeatialsfixed">
            <div className="imagediv"
                onClick={() => {
                    dispatch(login(null))
                }}
            >
                <img src="https://randomuser.me/api/portraits/men/77.jpg" alt="" />
            </div>
            <div className="username">
                <p className="name">
                    Ray Boccino &nbsp;
                    <span>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                </p>
                <p className="designation">Frontend Intern</p>
            </div>
        </div>
    )
}
