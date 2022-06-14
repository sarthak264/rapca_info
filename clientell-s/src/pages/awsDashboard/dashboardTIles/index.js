import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sidebarUpdate } from "../../../redux/optionMange";
import "./index.less";
export const DashboardTiles = () => {
    const [tilesData, setTilesData] = useState(null)
    const dispatch = useDispatch()
    const history = useHistory();
    const getDashboardList = async () => {
        let responseData = await axios.get('/api/dashboard/list');
        console.log(responseData);
        setTilesData(responseData.data)
    }
    useEffect(() => {
        dispatch(sidebarUpdate(0))
        getDashboardList();
    }, [])
    return (
        <div className="dashboardtiles">
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
            <div className="dashboardtilesdiv">
                {
                    tilesData === null ? null : tilesData.map((item, index) => {
                        return <div
                            key={index}
                            className="elementdiv"
                            onClick={() => {
                                history.push(
                                    "/dashboardview/" + item.dashboard_id
                                );
                            }}
                        >
                            <div className="element">
                                <p className="title">{item.name}</p>
                            </div>
                            <div className="blankdiv"></div>
                        </div>
                    })
                }
            </div>
        </div>
    );
};
