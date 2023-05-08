import React, { useState, useEffect } from "react";
import BrainwaveGraph from "./BrainwaveGraph";

const RawPlot = ({ isPlotting, onFinish }) => {
    const [data, setData] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);

    const fetchData = async () => {
        try {
            // Replace this URL with your backend server URL
            const response = await fetch("http://127.0.0.1:5000/brainwave-data");
            const jsonData = await response.json();
            setData((prevData) => [...prevData, ...jsonData]);
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };

    const startPlotting = () => {
        if (!fetchingData) {
            setFetchingData(true);
            if (data.length === 0) {
                fetchData().then(r => null);
            }
        }
    };

    const stopPlotting = () => {
        setFetchingData(false);
    };

    useEffect(() => {
        if (fetchingData) {
            const interval = setInterval(() => {
                fetchData();
            }, 100);

            return () => {
                clearInterval(interval);
            };
        }
    }, [fetchingData]);

    useEffect(() => {
        if (isPlotting && !fetchingData) {
            setFetchingData(true);
        } else if (!isPlotting && fetchingData) {
            setFetchingData(false);
        }
    }, [isPlotting, fetchingData]);

    return (
        <div>
            {/*<BrainwaveGraph data={data} />*/}
            <div>BrainWaveGraph</div>
        </div>
    );
};

export default RawPlot;
