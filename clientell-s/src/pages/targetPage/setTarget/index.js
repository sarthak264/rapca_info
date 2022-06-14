import React, {useEffect, useState} from "react";
import axios from "axios";
import numeral from "numeral";

import "./index.less";
import {TargetEditPopUp} from "./targetEditPopUp"
import {getTargetList} from "../../../services/targetAPI";

export const SetTarget = () => {
    const [tableData, setTableData] = useState(null);

    //new state for dynamic
    const [restData, setRestData] = useState(null)
    const tableDataExtract = async () => {
        let responseData = await getTargetList();
        console.log(responseData);
        setRestData(responseData)
        // setTableData(responseData.data.data);
    };
    const [targetEditPopUp, setTargetEditPopUp] = useState(false);
    const [popUpPassData, setPopUpPassData] = useState(null);
    const popUpControl = async (dataset) => {
        setPopUpPassData(dataset);
        setTargetEditPopUp(!targetEditPopUp);
        let responseData = await axios.get(
            "/api/getTargetList"
        );
        // console.log(responseData.data.data);
        // setTableData(responseData.data.data);

        console.log(dataset)
    }

    useEffect(() => {
        tableDataExtract();
    }, []);
    return restData === null ? (
        <p>Loading</p>
    ) : (
        <div className="settarget">
            {targetEditPopUp ?
                <TargetEditPopUp data={popUpPassData} popUpControl={popUpControl}/> : null
            }
            <div className="table">
                <div className={"headers"}>
                    {
                        restData.headers.map((item, index) => {
                            return <div className={index === restData.headers.length - 1 ? "targetlqheader" : null}>
                                <p>{item.header}</p>
                            </div>
                        })
                    }
                </div>
                {
                    restData.tableData.map((item, index) => {
                        return <div className={"tabledata"} key={index}>

                            {
                                restData.headers.map((subItem, subIndex) => {
                                    // console.log(item.user_id)
                                    // console.log(subItem.header)
                                    return <div
                                        className={subIndex === restData.headers.length - 1 ? "targetlqheader" : "designationdiv"}>
                                        <p className="name">{item[subItem.header] ?
                                            item[subItem.header] : "---"}</p>
                                        {/*<p>Here</p>*/}

                                        {
                                            subIndex === restData.headers.length - 1 ?
                                                <button
                                                    // onClick={() => {
                                                    //     popUpControl({
                                                    //         behaviour: item.target_CQ === null ? "set" : "edit",
                                                    //         ...item
                                                    //     })
                                                    // }}
                                                >{item.target_CQ === null ? "SET TARGET" : "EDIT TARGET"}</button> :
                                                null
                                        }
                                    </div>
                                })
                            }

                        </div>
                    })
                }
                {/*{tableData.map((item, index) => {*/}
                {/*    return (*/}
                {/*        <div className="tabledata" key={index}>*/}
                {/*            <div className="designationdiv">*/}
                {/*                <p className="name">{item.name}</p>*/}
                {/*                <p className="designation">*/}
                {/*                    {item.designation}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    {item.target_CQ !== null ? numeral(item.target_CQ)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    {item.target_CM !== null ? numeral(item.target_CM)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    {item.booked_CQ !== null ? numeral(item.booked_CQ)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    {item.booked_CM !== null ? numeral(item.booked_CM)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    {item.pipeling_CQ !== null ? numeral(item.pipeling_CQ)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div>*/}
                {/*                <p>*/}
                {/*                    {item.booked_LQ !== null ? numeral(item.booked_LQ)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*            </div>*/}
                {/*            <div className="targetlqheader">*/}
                {/*                <p>*/}
                {/*                    {item.target_LQ !== null ? numeral(item.target_LQ)*/}
                {/*                        .format("($ 0.00)")*/}
                {/*                        .toUpperCase() : "---"}*/}
                {/*                </p>*/}
                {/*<button*/}
                {/*    onClick={() => {*/}
                {/*        popUpControl({*/}
                {/*            behaviour: item.target_CQ === null ? "set" : "edit",*/}
                {/*            ...item*/}
                {/*        })*/}
                {/*    }}*/}
                {/*>{item.target_CQ === null ? "SET TARGET" : "EDIT TARGET"}</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    );*/}
                {/*})}*/}
            </div>
        </div>
    );
};
