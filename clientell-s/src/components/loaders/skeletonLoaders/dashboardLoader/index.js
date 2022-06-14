import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "./index.less";
export const DashboardSkeleton = () => {
    return (
        <div className="dashboardskeleton">
            <Skeleton className="searchbar" />
            <Skeleton className="userprofile" />
            <Skeleton className="filtersection" />
            <div className="loader-div">
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
            </div>
            <div className="guage-div">
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
            </div>
            <Skeleton className="graph" />
        </div>
    );
};
