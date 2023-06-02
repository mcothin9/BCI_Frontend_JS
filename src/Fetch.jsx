// import React, { useEffect, useState } from 'react';
// import Plot from './Plot';
// import RawPlot from './RawPlot';
// import localforage from "localforage";
//
// const Fetch = ({ isPlotting }) => {
//     const testIpAddress = "http://0.0.0.0:5777";
//     const [probsData, setProbsData] = useState([]);
//     const [rawData, setRawData] = useState([]);
//
//     // Set abort controller
//     const [readCatchFetch, setReadCatchFetch] = useState(false);
//
//     let fetchCount = 0;
//     let readCount = 0;
//
//     // Set unique id for this experiment for download from localstorage
//     const makeId = (idLength) => {
//         let result = '';
//         const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//         const charactersLength = characters.length;
//         let counter = 0;
//         while (counter < idLength) {
//             result += characters.charAt(Math.floor(Math.random() * charactersLength));
//             counter += 1;
//         }
//         return result;
//     }
//     const [resultIdInLocalstorage] = useState(makeId(8));
//
//     // Save data in this process into same address (key) in localstorage
//     const saveDataToLocalStorage = (data) => {
//         const savedData = JSON.parse(localStorage.getItem(resultIdInLocalstorage)) || [];
//         const newResult = [...savedData, ...data];
//         localStorage.setItem(resultIdInLocalstorage, JSON.stringify(newResult));
//     };
//
//     // Update the reference (key) list of saved result in localstorage
//     const updateResultKeys = (key) => {
//         let resultKeys = JSON.parse(localStorage.getItem("resultKeys")) || [];
//         if (resultKeys.length >= 5) {
//             // remove the last key and its associated data
//             const lastKey = resultKeys.pop();
//             localStorage.removeItem(lastKey);
//         }
//         // add the new key at the beginning
//         resultKeys.unshift(key);
//         localStorage.setItem("resultKeys", JSON.stringify(resultKeys));
//     };
//
//     const fetchData = async () => {
//         try {
//             if (isPlotting) {
//                 const response = await fetch(testIpAddress + "/probs");
//                 const jsonData = await response.json();
//                 const { probs: predictData } = jsonData;
//
//                 localforage.setItem(`probs_${fetchCount}`, predictData).then(() => {
//                     fetchCount += 1;
//                     if (isPlotting) {
//                         fetchData();
//                     }
//                 });
//
//                 saveDataToLocalStorage(predictData);
//             }
//         } catch (e) {
//             console.error("Error fetching data from plot: ", e);
//         }
//     };
//
//     const readData = async () => {
//         if (!isPlotting) {
//             return;
//         }
//         try {
//             const readData = await localforage.getItem(`probs_${readCount}`);
//             let subArrayIndex = 0;
//             const sendSubArrayToGraph = setInterval(() => {
//                 if (!isPlotting) {
//                     clearInterval(sendSubArrayToGraph);
//                     return;
//                 }
//                 if (subArrayIndex < readData.length) {
//                     setData(readData[subArrayIndex]);
//                     subArrayIndex++;
//                 } else {
//                     clearInterval(sendSubArrayToGraph);
//                     localforage.removeItem(`probs_${readCount}`)
//                     readCount += 1;
//                     if (readCount === fetchCount) {
//                         console.log("Fetch: ", fetchCount);
//                         console.log("Read: ", readCount);
//                         setReadCatchFetch(true);
//                     }
//                 }
//             }, 1000);
//         } catch (e) {
//             console.error("Error reading data from localForage: ", e);
//         }
//     };
//
//     useEffect(() => {
//         if (isPlotting) {
//             fetch(testIpAddress + "/data")
//                 .then(response => response.json())
//                 .then(data => {
//                     setProbsData(data.probs);
//                     setRawData(data.raw);
//                 })
//                 .catch(error => console.error("Error fetching data: ", error));
//         }
//     }, [isPlotting]);
//
//     return (
//         <>
//             <Plot isPlotting={isPlotting} data={probsData} />
//             <RawPlot isPlotting={isPlotting} data={rawData} />
//         </>
//     );
// };
//
// export default Fetch;
