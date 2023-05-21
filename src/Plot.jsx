import React, { useContext, useEffect, useState } from "react";
import localforage from "localforage";
import Graph from "./Graph";
import PredictDataContext from "./DownloadDataContext";

const Plot = ({ isPlotting, onReadData }) => {
    // Set IP address of backend
    const testIpAddress = "http://0.0.0.0:5777";
    // const testIpAddress = "http://172.19.114.185:5777";

    // Set out of boundary guard
    let fetchCount = 0;
    let readCount = 0;

    // Set required hook & util
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const { setPredictData } = useContext(PredictDataContext);

    // Set abort controller
    const [readCatchFetch, setReadCatchFetch] = useState(false);

    // Set unique id for this experiment for download from localstorage
    const makeId = (idLength) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < idLength) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const [resultIdInLocalstorage] = useState(makeId(8));
    // console.log(resultIdInLocalstorage); // Debugging line

    // Save data in this process into same address (key) in localstorage
    const saveDataToLocalStorage = (data) => {
        const savedData = JSON.parse(localStorage.getItem(resultIdInLocalstorage)) || [];
        const newResult = [...savedData, ...data];
        localStorage.setItem(resultIdInLocalstorage, JSON.stringify(newResult));
        // Send new result to userContext
        setPredictData(newResult);
    };

    // Update the reference (key) list of saved result in localstorage
    const updateResultKeys = (key) => {
        let resultKeys = JSON.parse(localStorage.getItem("resultKeys")) || [];
        if (resultKeys.length >= 5) {
            // remove the last key and its associated data
            const lastKey = resultKeys.pop();
            localStorage.removeItem(lastKey);
        }
        // add the new key at the beginning
        resultKeys.unshift(key);
        localStorage.setItem("resultKeys", JSON.stringify(resultKeys));
    };


    const fetchData = async () => {
        try {
            if (isPlotting) {
                const response = await fetch(testIpAddress + "/probs");
                const jsonData = await response.json();
                const { probs: predictData } = jsonData;

                localforage.setItem(`probs_${fetchCount}`, predictData).then(() => {
                    fetchCount += 1;
                    if (isPlotting) {
                        fetchData();
                    }
                });

                saveDataToLocalStorage(predictData);
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
            const readData = await localforage.getItem(`probs_${readCount}`);
            let subArrayIndex = 0;
            const sendSubArrayToGraph = setInterval(() => {
                if (!isPlotting) {
                    clearInterval(sendSubArrayToGraph);
                    return;
                }
                if (subArrayIndex < readData.length) {
                    setData(readData[subArrayIndex]);
                    subArrayIndex++;
                } else {
                    clearInterval(sendSubArrayToGraph);
                    localforage.removeItem(`probs_${readCount}`)
                    readCount += 1;
                    if (readCount === fetchCount) {
                        console.log("Fetch: ", fetchCount);
                        console.log("Read: ", readCount);
                        setReadCatchFetch(true);
                    }
                }
            }, 1000);
        } catch (e) {
            console.error("Error reading data from localForage: ", e);
        }
    };

    useEffect(() => {
        console.log('isPlotting:  ', isPlotting);
        if (isPlotting) {
            if (!dataFetched) {
                fetchData().then(r => setDataFetched(true));
                updateResultKeys(resultIdInLocalstorage);
            }

            // Delay the readData function by 10 seconds after first fetch success
            setTimeout(() => {
                if (isPlotting) {
                    const readDataInterval = setInterval(() => {
                        onReadData();
                        readData().then(r => null);
                    }, 10000); // Read data every 10 seconds

                    return () => {
                        clearInterval(readDataInterval);
                    };
                }
            }, 30000);
        }
    }, [isPlotting]);

    useEffect(() => {
        if (isPlotting && readCatchFetch) {
            alert("Current experiment reach time limit.")
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }
    }, [readCatchFetch, isPlotting]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "75%",
                height: "100%",
            }}
        >
            <Graph data={data} />
        </div>
    );
};

export default Plot;
