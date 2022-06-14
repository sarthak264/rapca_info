import React from "react";
import { useParams } from "react-router-dom";

import "./index.less";
import { WelcomeScreen } from "./pages/welcomeScreen";
import { SetupScreen } from "./pages/setupScreen";
import { ConsumerKeyPage } from "./pages/consumerKeyPage"
import { ManagePermissions } from "./pages/managerPermissions";
import { SelectTables } from "./pages/selectTables";
export const OnboardingScreens = () => {
    const { page } = useParams();
    if (page === "welcome") {
        return <WelcomeScreen />;
    } else if (page === "setup") {
        return <SetupScreen />;
    } else if (page === "consumerkey") {
        return <ConsumerKeyPage />
    } else if (page === "manage") {
        return <ManagePermissions />
    } else if (page === "tables") {
        return <SelectTables />
    }
    else {
        return <WelcomeScreen />;
    }
}; 
