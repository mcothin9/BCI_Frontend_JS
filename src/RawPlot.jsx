import React, { useState, useEffect } from "react";
import BrainwaveGraph from "./BrainwaveGraph";

const RawPlot = ({ isPlotting }) => {

    const testIpAddress = "http://0.0.0.0:5777";
    // const testIpAddress = "http://172.19.114.185:5777";

    const [data, setData] = useState([]);
    const [processTime, setProcessTime] = useState(0);
    const [dataFetched, setDataFetched] = useState(false);
    let fetchCount = 0;

    const fetchData = async () => {
        try {
            // fetchCount += 1;
            // console.log(fetchCount);
            const response = await fetch(testIpAddress + "/raw");
            const jsonData = await response.json();
            const { raw: rawData } = jsonData;
            // console.log(rawData);
            setData(rawData);
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };

    const getCurrentData = () => {
        if (!isPlotting) {
            return Array(25).fill(0);
        }
        const dataIndex = processTime * 10;
        return data.length > 0 && dataIndex < data.length ? data.slice(0, dataIndex + 1) : Array(25).fill(0);
    };

    fetchData().then(r => setDataFetched(true));

    const updateTime = () => {
        setProcessTime((prevState) => prevState + 0.1);
    };

    // useEffect(() => {
    //     if (isPlotting && !dataFetched) {
    //         fetchData().then(r => setDataFetched(true));
    //     }
    // }, [isPlotting, dataFetched]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlotting) {
                updateTime();
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [isPlotting]);

    // useEffect(() => {
    //     if (isPlotting && processTime % 10 === 0) {
    //         fetchData().then(r => null);
    //     }
    // }, [processTime]);

    // TODO: Test data
    // fetchData().then(r => console.log("Finish once ===================="));
    // console.log("Type of data: " + typeof data);

    return (
        <div>
            <p>Raw data process: {processTime} </p>
            <BrainwaveGraph data={getCurrentData()} />
        </div>
    );
};

export default RawPlot;
