import React from 'react'
import Skeleton from "react-loading-skeleton";

import "./index.less"
export const DealCommitSkeleton = () => {
    return (
        <div className="dealcommitskeleton">
            <Skeleton className="searchbar" />
            <Skeleton className="userprofile" />
            <Skeleton className="filtersection" />
            <div className="loader-div">
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
                <Skeleton className="tagets" />
            </div>
            <Skeleton className="graph" />
        </div>
    )
}
