import React, { useState } from "react";
import Header from "./Header";
import RawPlot from "./RawPlot";
import Plot from "./Plot";
import StartButton from "./StartButton";
import StopButton from "./StopButton";
import DownloadButton from "./DownloadButton";

const Main = () => {
    const [isPlotting, setIsPlotting] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    const handleStart = () => {
        setIsPlotting(true);
    };

    const handleStop = () => {
        setIsPlotting(false);
    };

    const handleFinish = () => {
        setIsFinished(true);
    };

    return (
        <div>
            <Header />
            <div className="main-container">
                <div className="button-container">
                    <StartButton onClick={handleStart} disabled={isPlotting || isFinished} />
                    <StopButton onClick={handleStop} disabled={!isPlotting} />
                    <DownloadButton />
                </div>
                <div className="plot-container">
                    <RawPlot isPlotting={isPlotting} onFinish={handleFinish} />
                    <Plot isPlotting={isPlotting} />
                </div>
            </div>
        </div>
    );
};

export default Main;
