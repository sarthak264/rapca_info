import React, {useEffect} from 'react'
// import {useParams} from "react-router-dom"
import {useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faLink, faInfoCircle, faLayerGroup, faAlignCenter} from "@fortawesome/free-solid-svg-icons";
import {faUser} from "@fortawesome/free-regular-svg-icons"
import {faUsers} from "@fortawesome/free-solid-svg-icons";
import {useHistory} from "react-router-dom"


import {sidebarUpdate} from "../../redux/optionMange";
import "./index.less"

//user settings items
const userSettings = [{
    icon: faLink,
    text: "Linked Accounts"
}, {
    icon: faInfoCircle,
    text: "Personal Info"
}]

const adminSettings = [{
    icon: faUser,
    text: "On Boarding Settings"
}, {
    icon: faUsers,
    text: "Manage Users"
}, {
    icon: faLayerGroup,
    text: "Manage Metrics",
}, {
    icon: faAlignCenter,
    text: "Manage Filters"
}]



export const SettingPages = () => {
    const dispatch = useDispatch()
    const history = useHistory();
    const adminNavigator = (index) => {
        if (index === 0) history.push('/onboarding')
    }
    useEffect(() => {
        dispatch(sidebarUpdate(4))
    }, [])
    //TODO: this page need to have the nav implementation
    return <div className={"settingspages"}>
        <div className={"settings-nav-bar"}>
            <div className={"settingsheader"}>
                <div>
                    <FontAwesomeIcon icon={faCog}/>
                    <h1>Settings</h1>
                </div>
            </div>
            <div className={"usersettings"}>
                <p className={"usersettingheader"}>User Settings</p>
                {
                    userSettings.map((item, index) => {
                        return <div key={index} className={'suboption ' + index.toString()}>
                            <FontAwesomeIcon icon={item.icon}/>
                            &nbsp;
                            <p>{item.text}</p>
                        </div>
                    })
                }
                <p className={"usersettingheaderadmin"}>Admin Settings</p>
                {
                    adminSettings.map((item, index) => {
                        return <div key={index} className={"suboption " + index.toString()} 
                        onClick={()=>{adminNavigator(index)}}>
                            <FontAwesomeIcon icon={item.icon}/>
                            &nbsp;
                            <p>{item.text}</p>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}
