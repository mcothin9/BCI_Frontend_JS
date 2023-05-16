import React, { useState, useEffect } from "react";
import localforage from "localforage";
import BrainwaveGraph from "./BrainwaveGraph";

const RawPlot = ({ isPlotting }) => {

    const testIpAddress = "http://0.0.0.0:5777";
    let fetchCount = 0;
    let readCount = 0;
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const [time, setTime] = useState(0);
    let shouldFetch = isPlotting;

    const fetchData = async () => {
        try {
            if (shouldFetch) {
                const response = await fetch(testIpAddress + "/raw");
                const jsonData = await response.json();
                const { raw: rawData } = jsonData;
                // Save data to localForage
                localforage.setItem(`raw_${fetchCount}`, rawData).then(() => {
                    fetchCount += 1;
                    if (shouldFetch) {
                        fetchData();
                    }
                });
            }
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };

    const readData = async () => {
        if (!isPlotting) {
            return;
        }
        try {
            const readData = await localforage.getItem(`raw_${readCount}`);
            let subArrayIndex = 0;
            const sendSubArrayToGraph = setInterval(() => {
                if (!isPlotting) {
                    clearInterval(sendSubArrayToGraph);
                    return;
                }
                if (subArrayIndex < readData.length) {
                    setData(readData[subArrayIndex]);
                    setTime((prevState) => prevState + 1);
                    subArrayIndex++;
                } else {
                    clearInterval(sendSubArrayToGraph);
                    localforage.removeItem(`raw_${readCount}`);
                    readCount += 1;
                }
            }, 1000);
        } catch (e) {
            console.error("Error reading data from localForage: ", e);
        }
    };

    useEffect(() => {
        shouldFetch = isPlotting;
        if (isPlotting) {
            if (!dataFetched) {
                fetchData().then(r => setDataFetched(true));
            }

            // Delay the readData function by 60 seconds after first fetch success
            setTimeout(() => {
                if (isPlotting) {
                    const readDataInterval = setInterval(() => {
                        readData().then(r => null);
                    }, 10000); // Read data every 10 seconds

                    return () => {
                        clearInterval(readDataInterval);
                    };
                }
            }, 60000);
        }
    }, [isPlotting]);

    return (
        <div>
            {/*<p>Raw data process: {time} </p>*/}
            {/*<p>Real time: {realTime} </p>*/}
            <BrainwaveGraph data={data} />
        </div>
    );
};

export default RawPlot;
