import React, { useContext, useEffect, useState } from "react";
import localforage from "localforage";
import Graph from "./Graph";
import PredictDataContext from "./DownloadDataContext";

const Plot = ({ isPlotting, onReadData }) => {

    const testIpAddress = "http://0.0.0.0:5777";
    // const testIpAddress = "http://172.19.114.185:5777";

    let fetchCount = 0;
    let readCount = 0;
    const [data, setData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);
    const { setPredictData } = useContext(PredictDataContext);

    // Set unique id for this experiment for download from localstorage
    const makeId = (idLength) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const resultIdInLocalstorage = makeId(8);

    const saveDataToLocalStorage = (data) => {
        const savedData = JSON.parse(localStorage.getItem(resultIdInLocalstorage)) || [];
        const newResult = [...savedData, ...data];
        localStorage.setItem(resultIdInLocalstorage, JSON.stringify(newResult));
        // Send new result to userContext
        setPredictData(newResult);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(testIpAddress + "/probs");
            const jsonData = await response.json(); // Destruct to json
            const { probs: predictData } = jsonData; // Destruct to array

            // Save data to localForage
            localforage.setItem(`probs_${fetchCount}`, predictData).then(() => {
                fetchCount += 1;
                fetchData();
            });

            saveDataToLocalStorage(predictData);

            // Get existing data from localStorage, append new data and save back to localStorage
            // let existingData = JSON.parse(localStorage.getItem(`result_${fetchCount}`)) || [];
            // existingData.push(...predictData);
            // localStorage.setItem(`result_${fetchCount}`, JSON.stringify(existingData));
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };


    const readData = async () => {
        try {
            const readData = await localforage.getItem(`probs_${readCount}`);
            // loop through the readData array and send each sub-array to the Graph every second
            let subArrayIndex = 0;
            const sendSubArrayToGraph = setInterval(() => {
                if (subArrayIndex < readData.length) {
                    setData(readData[subArrayIndex]);
                    subArrayIndex++;
                } else {
                    clearInterval(sendSubArrayToGraph);
                    localforage.removeItem(`probs_${readCount}`)
                    readCount += 1;
                }
            }, 1000);
        } catch (e) {
            console.error("Error reading data from localForage: ", e);
        }
    };

    useEffect(() => {
        if (isPlotting) {
            if (!dataFetched) {
                fetchData().then(r => setDataFetched(true));
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
            }, 60000);
        }
    }, [isPlotting]);

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
