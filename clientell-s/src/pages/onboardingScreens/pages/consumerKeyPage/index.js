import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import "./index.less";
import consumerimage from "../../../../assets/designs/consumer key image.svg";
export const ConsumerKeyPage = () => {
    const history = useHistory();
    const targetForm = useRef(null);
    return (
        <div className="consumerkeypage">
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
                <p className="header">Consumer key & Consumer secret</p>
                <button>
                    <FontAwesomeIcon icon={faFile} />
                    Donwload PDF
                </button>
            </div>
            <div className="subheader">
                <p>
                    Once the connected app is setup, you will receive a consumer
                    key and consumer secret. Kindly share this with your
                    Clientell representative inorder to complete the integration
                    process.
                </p>
            </div>
            <div className="image-div">
                <img src={consumerimage} alt="" />
            </div>
            <form
                ref={targetForm}
                onSubmit={async (e) => {
                    e.preventDefault();
                    let targetData = e.target;
                    // console.log(typeof e.target.name.value);
                    if (
                        targetData.secret.value !== "" &&
                        targetData.key.value !== "" &&
                        targetData.host.value !== ""
                    ) {
                        let autocompleteState = false;
                        let lastChar = targetData.host.value.charAt(targetData.host.value.length - 1)
                        if (lastChar !== '/') {
                            autocompleteState = true;
                        }
                        let responseData = await axios.post(
                            "/api/user/update/company",
                            {
                                salesforce_consumer_key:
                                    targetData.key.value,

                                salesforce_consumer_secret:
                                    targetData.secret.value,
                                salesforce_host: targetData.host.value + (autocompleteState ? "/" : '').toString(),
                            }
                        );

                        if (responseData.status === 200) {
                            toast.success("Updated!");
                            history.push("/onboarding/manage");
                        } else {
                            toast.error("Something went wrong! Try again.");
                            console.log(responseData);
                        }
                    } else {
                        toast.warning("Please fill all the fields");
                    }
                }}
                id="consumerData"
            >
                <div className="consumer-detail-div">
                    <div className="consumerkey">
                        <p>Consumer Key:</p>
                        <input
                            type="text"
                            name="key"
                            id=""
                            placeholder="Type here..."
                        />
                    </div>
                    <div className="consumerkey">
                        <p>Consumer Secret:</p>
                        <input
                            type="text"
                            name="secret"
                            id=""
                            placeholder="Type here..."
                        />
                    </div>
                    <div className="consumerkey">
                        <p>Host name:</p>
                        <input
                            type="text"
                            name="host"
                            id=""
                            placeholder="Type here..."
                        />
                    </div>
                </div>
            </form>
            <div className="gotonext-div">
                <button
                    type="submit"
                    // onClick={() => {
                    //     history.push("/onboarding/manage");
                    // }}
                    form="consumerData"
                >
                    Go to next <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
};
