import React, {useState, useEffect, useRef} from "react";
import localforage from "localforage";
import BrainwaveGraph from "./BrainwaveGraph";

const RawPlot = ({ isPlotting }) => {

    const testIpAddress = "http://0.0.0.0:5777";
    // const testIpAddress = "http://172.19.114.185:5777";

    let fetchCount = 0;
    let readCount = 0;
    // let channelNumber = 1;
    const [channelNumber, setChannelNumber] = useState(1);
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    // Test time
    const [time, setTime] = useState(0);
    const [realTime, setRealTime] = useState(0);

    const fetchChannel = async () => {
        try {
            const response = await fetch(testIpAddress + "/channel");
            const jsonData = await response.json();
            const { channelCount, classCount } = jsonData;
            setChannelNumber(channelCount);
            // channelNumber = channelCount;
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch(testIpAddress + "/raw");
            const jsonData = await response.json();
            const { raw: rawData } = jsonData;
            // Save data to localForage
            localforage.setItem(`raw_${fetchCount}`, rawData).then(() => {
                fetchCount += 1;
                if (isPlotting) {
                    fetchData();
                }
            });
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

    // Detect channel number when page first render
    useEffect(() => {
        fetchChannel().then(r => null);
    }, []);

    // useEffect(() => {
    //     console.log("Channel in RawPlot: " + channelNumber);
    // }, [channelNumber]);


    useEffect(() => {
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
            }, 30000);
        }
    }, [isPlotting]);

    return (
        <div>
            {/*<p>Raw data process: {time} </p>*/}
            {/*<p>Real time: {realTime} </p>*/}
            <BrainwaveGraph data={data} channel={channelNumber} />
        </div>
    );
};

export default RawPlot;
