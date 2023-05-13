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
            <div className="main-container" style={{
                display: "flex",
                flexDirection: "row",
            }}>
                <div className="button-container" style={{
                    width: "15%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                }}>
                    <StartButton onClick={handleStart} disabled={isPlotting || isFinished} />
                    <StopButton onClick={handleStop} disabled={!isPlotting} />
                    <DownloadButton />
                </div>
                <div className="plot-container" style={{
                    border: "solid",
                    width: "75%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}>
                    {/*<RawPlot isPlotting={isPlotting} />*/}
                    <Plot isPlotting={isPlotting} />
                </div>
            </div>
        </div>
    );
};

export default Main;
