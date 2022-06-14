import React from "react";
import { useParams } from "react-router-dom";

import { DashboardTiles } from "./dashboardTIles";
import { DashboardComponent } from "./dashboardComponent";
export const AwsDashboard = () => {
    const { page } = useParams();
    if (page === "main") {
        return <DashboardTiles />;
    } else {
        return <DashboardComponent id={page} />;
    }
};
