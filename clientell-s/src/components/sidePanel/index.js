import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux";


import "./index.less";
import clientelllogo from "../../assets/clientell logo/cliellsidebar.svg";
import {sidebarUpdate} from "../../redux/optionMange"
//updates
import display from "../../assets/element logos/updated/display.svg";
import dollar from "../../assets/element logos/updated/dollar.svg";
import settings from "../../assets/element logos/updated/settings.svg";
import stacks from "../../assets/element logos/updated/stacks.svg";
import trends from "../../assets/element logos/updated/trends.svg"
import {SettingPages} from "../../pages/settingPages";

const iconList = [
    display,
    dollar,
    stacks,
    trends,
    settings,
];

const optionTitles = [
    "Dashboard", "Opportunities", "Forecasting", "Trends", "Settings"
]

const SideBar = () => {
    const history = useHistory();
    // const dispatch = useDispatch();
    const sideBarOption = useSelector(state => state.optionstatemange.value.sidebar);
    const [settingsSidebar, setSettingsSidebar] = useState(false)
    // const [currentOption, setCurrentOptions] = useState(0);
    const optionStyle = {
        background: "#2a1e80",
        filter: "invert(0%)",
    }
    const pageNavigator = (index) => {
        if (index === 0) history.push('/dashboardview/main')
        else if (index === 1) history.push('/dealcommit');
        // else if (index === 2) history.push('/dealcommit');
        else if (index === 2) history.push('/dashboard');
            // else if (index === 3) history.push('/repdashboard/12');
            // else if (index === 4) history.push('/dealviewindi');
            // else if (index === 5) history.push('/onboarding/welcome');
        // else if (index === 6) history.push('/quicksite');
        else if (index === 3) history.push('/trends');
        else if (index === 4) {
            setSettingsSidebar(state => state === true ? false : true)
        }
    }
    // useEffect(() => {
    //     dispatch(sidebarUpdate(currentOption))
    // }, [currentOption])
    return (
        <div className="sidebar">
            <div className="clientelllogo">
                <img src={clientelllogo} alt=""/>
            </div>
            <div className="iconpanel">
                {iconList.map((icon, index) => {
                    return (
                        <div className="sidebar-item" key={index}
                             title={optionTitles[index]}
                             style={sideBarOption === index ? optionStyle : null}
                             onClick={() => {
                                 pageNavigator(index)
                                 // setCurrentOptions(index)
                             }}>
                            <img src={icon} alt="" className="logoitem"
                                 style={sideBarOption === index ? {
                                     filter: "invert(0%)"
                                 } : null}
                            />
                        </div>
                    );
                })}
            </div>

            {
                settingsSidebar ? <SettingPages/> : null
            }
        </div>
    );
};


export default SideBar;
