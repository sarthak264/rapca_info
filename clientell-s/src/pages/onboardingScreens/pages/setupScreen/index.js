import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

import "./index.less";
import step1img from "../../../../assets/designs/setup step 1.svg";
import step2img from "../../../../assets/designs/setup step 2.svg";
import step3img from "../../../../assets/designs/setup step 3.svg";
import step4img from "../../../../assets/designs/setup step 4.svg";
import step5img from "../../../../assets/designs/setup step 5.svg";
import step6img from "../../../../assets/designs/setup step 6.svg";
export const SetupScreen = () => {
    const history = useHistory();
    return (
        <div className="setupscreen">
            <div className="pageheader">
                <p>Setup Connected App</p>
                <button className="download-pdf">
                    <FontAwesomeIcon icon={faFile} /> Download PDF
                </button>
            </div>
            <div className="subheader">
                <p>
                    The connected app serves as an interface between your
                    Salesforce account and your Clientell Platform. This allows
                    Clientell to gain access to your Salesforce data and manage
                    it.
                </p>
            </div>

            <div className="step1-div">
                <div className="steptext-div">
                    <div className="steptext">
                        <div className="header">
                            1. Switch to Salesforce Classic
                        </div>
                        <div className="subheader">
                            Salesforce has two User Interfaces - the new
                            Lightning Experience and the older Classic. For the
                            purpose of this tutorial, we will be using the
                            latter since Lightning Experience does not have the
                            features that we require.
                        </div>
                    </div>
                </div>

                <div className="stepimg-div">
                    <img src={step1img} alt="" />
                </div>
            </div>

            <div className="step2-div">
                <div className="steptext-div">
                    <div className="steptext">
                        <div className="header">
                            2. Click Setup in Header menu
                        </div>
                        <div className="subheader">
                            Navigate to the setup menu to access the Connected
                            App settings.
                        </div>
                    </div>
                </div>

                <div className="stepimg-div">
                    <img src={step2img} alt="" />
                </div>
            </div>

            <div className="step3-div">
                <div className="steptext-div">
                    <div className="steptext">
                        <div className="header">
                            3. Click Apps in Build {">"} Create {">"} Apps in
                            the Sidebar Menu
                        </div>
                        <div className="subheader">
                            Navigate to the apps menu to access the Connected
                            App settings
                        </div>
                    </div>
                </div>

                <div className="stepimg-div">
                    <img src={step3img} alt="" />
                </div>
            </div>

            <div className="step4-div">
                <div className="steptext-div">
                    <div className="steptext">
                        <div className="header">
                            4. Click the New button in Connected Apps
                        </div>
                        <div className="subheader">
                            Create a new Connected App
                        </div>
                    </div>
                </div>

                <div className="stepimg-div">
                    <img src={step4img} alt="" />
                </div>
            </div>

            <div className="step5-div">
                <div className="steptext-div">
                    <div className="steptext">
                        <div className="header">
                            5. Fill the following values
                        </div>
                        <div className="subheader">
                            <p>1. Connected App name: Clientell</p>
                            <p>2. API Name: Clientell </p>
                            <p>3. Contact Email: neil@getclientell.com</p>
                            <p>4. Contact Phone: +917230908590</p>
                            <p>
                                5. Logo Image URL: [
                                <a href="https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/logo+125x125.png](https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/logo+125x125.png">
                                    https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/logo+125x125.png](https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/logo+125x125.png
                                </a>
                                ]
                            </p>
                            <p>
                                6. Icon URL:[
                                <a href="https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/icon+16x16.png](https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/icon+16x16.png">
                                    https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/icon+16x16.png](https://clientell-resources.s3.ap-south-1.amazonaws.com/logo/icon+16x16.png
                                </a>
                                ]
                            </p>
                            <p>7. Enable OAuth Settings - enable this</p>
                            <p>
                                8. Callback URL: [
                                <a href="https://login.salesforce.com/oauth2/callback](https://login.salesforce.com/oauth2/callback">
                                    https://login.salesforce.com/oauth2/callback](https://login.salesforce.com/oauth2/callback
                                </a>
                                ]
                            </p>
                            <p>
                                9. Use digital signatures: Upload the following
                                [
                                <a href="server.crt](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08ba39d0-4691-442c-85a9-8850cad1177a/server.crt">
                                    server.crt](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/08ba39d0-4691-442c-85a9-8850cad1177a/server.crt
                                </a>
                                ]
                            </p>
                            <p>10. Selected OAuth Scopes:</p>
                            <p className="pointdata">Full access(full)</p>
                            <p className="pointdata">
                                Perform ANSI SQL queries on Salesforce CDP data
                                (cdp_query_api)
                            </p>
                            <p className="pointdata">
                                Perform requests at any time (refresh_token,
                                offline_access)
                            </p>
                            <p className="additional-note">
                                {" "}
                                Leave the remaining of the settings with its
                                default values
                            </p>
                        </div>
                    </div>
                </div>

                <div className="stepimg-div">
                    <img src={step5img} alt="" />
                </div>
            </div>

            <div className="step6-div">
                <div className="steptext-div">
                    <div className="steptext">
                        <div className="header">
                            6. Press Continue for the following warning
                        </div>
                    </div>
                </div>

                <div className="stepimg-div">
                    <img src={step6img} alt="" />
                </div>
            </div>
            <div className="gotonext-div">
                <button
                    onClick={() => {
                        history.push("/onboarding/consumerkey");
                    }}
                >
                    Go to next <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    );
};
