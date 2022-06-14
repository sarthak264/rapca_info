import React, {useEffect} from "react";
import {PipelineStageAnalysis} from "../../components/d3charts/pipelineStageAnalysis";

import {useDispatch} from "react-redux";
import {sidebarUpdate} from "../../redux/optionMange";

export const TrendsPage = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(sidebarUpdate(3))
    }, [])
    return (
        <>
            <PipelineStageAnalysis/>
        </>
    );
};