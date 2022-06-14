import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import numeral from "numeral";
import { toast } from "react-toastify";
import moment from "moment";
import axios from "axios";

import "./index.less";
import closeIcon from "../../../../assets/element logos/close button.svg";
export const TargetEditPopUp = ({ data, popUpControl }) => {
    const [target, setTarget] = useState(data.target_CQ);
    const submitTarget = async () => {
        if (!target || target === null) toast.warning("Please enter a target");
        else {
            if (data.behaviour === "set") {
                var now = new Date();
                var quarter = Math.floor((now.getMonth() / 3));
                var startDate = new Date(now.getFullYear(), quarter * 3, 1);
                var endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 3, 0);

                let start_date = moment(startDate).format("YYYY-MM-DD");
                let end_date = moment(endDate).format("YYYY-MM-DD");
                // console.log(startDate)

                let sentData = {
                    target: parseInt(target),
                    start_date,
                    end_date,
                    type: "quarter"
                }
                console.log(data.id, sentData)
                let responseData = await axios.post(`/api/target/create/${data.id}`, sentData);
                console.log(responseData)
                toast.success("Target created");
            } else if (data.behaviour === 'edit') {
                //this here is the update function
                let sentData = {
                    target: parseInt(target),
                }
                console.log(data.id, sentData)
                let responseData = await axios.put('/api/target/update/' + data.target_CQ_id, sentData);
                console.log(responseData)
                toast.success("Target updated");
            }
        }
        // console.log(target);
    }
    console.log(data)
    return (
        <div className="targeteditpopup">
            <div className="edittargetdiv">
                <div className="headerdiv">
                    <p>{data.target_CQ === null ? "Set" : "Edit"} Target</p>
                    <img
                        src={closeIcon}
                        alt=""
                        srcset=""
                        className="closeicon"
                        onClick={popUpControl}
                    />
                </div>
                <div className="profilediv">
                    <div className="profileinfo">
                        <img
                            src="https://randomuser.me/api/portraits/men/77.jpg"
                            alt="profile image"
                            srcset=""
                            width={70}
                        />
                        <div className="profiletextdata">
                            <p className="name">{data.name}</p>
                            <p className="designation">{data.designation}</p>
                        </div>
                    </div>
                    <p className="gotoprof">
                        <span>Go To Profile</span> &nbsp;{" "}
                        <FontAwesomeIcon icon={faAngleRight} />{" "}
                    </p>
                </div>
                <div className="editvaluediv">
                    <div className="cqtargetdiv">
                        <p>Enter Current Quarter Target</p>
                        <div className="editarea">
                            <p className="dollar">$</p>
                            <input
                                type="number"
                                className="cqquarteredit"
                                defaultValue={data.target_CQ}
                                onChange={(e) => {
                                    setTarget(e.target.value);
                                }}
                                placeholder="Enter a target"
                            />
                        </div>
                        <div className="monthlytargetdiv">
                            <p>
                                <span>$ {(Number(target) / 3).toFixed(2)}</span> Monthly
                                Target
                            </p>
                        </div>
                    </div>
                    <div className="bookedcqdiv">
                        <p>Booked CQ</p>
                        <div className="editarea">
                            <p>{data.booked_CQ !== null ? numeral(data.booked_CQ)
                                .format("($ 0.00)")
                                .toUpperCase() : "---"}</p>
                        </div>
                    </div>
                    <div className="bookedmonthdiv">
                        <p>Booked This Month</p>
                        <div className="editarea">
                            <p>{data.booked_CM !== null ? numeral(data.booked_CM)
                                .format("($ 0.00)")
                                .toUpperCase() : "---"}</p>
                        </div>
                    </div>
                    <div className="cqpipelinediv">
                        <p>CQ Pipeline</p>
                        <div className="editarea">
                            <p> {data.pipeling_CQ !== null ? numeral(data.pipeling_CQ)
                                .format("($ 0.00)")
                                .toUpperCase() : "---"}</p>
                        </div>
                    </div>
                    <div className="bookedlqdiv">
                        <p>Booked LQ</p>
                        <div className="editarea">
                            <p>{data.booked_LQ !== null ? numeral(data.booked_LQ)
                                .format("($ 0.00)")
                                .toUpperCase() : "---"}</p>
                        </div>
                    </div>
                    <div className="targetlqdiv">
                        <p>Target LQ</p>
                        <div className="editarea">
                            <p>{data.target_LQ !== null ? numeral(data.target_LQ)
                                .format("($ 0.00)")
                                .toUpperCase() : "---"}</p>
                        </div>
                    </div>
                </div>
                <div className="submitdiv">
                    <button
                        onClick={submitTarget}
                    >Submit Target</button>
                </div>
            </div>
        </div>
    );
};
