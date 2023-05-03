// import {useContext, useEffect, useState} from "react";
// import Graph from "./Graph";
// import PredictDataContext from "./DownloadDataContext";
//
// const Result = () => {
//     let [data, setData] = useState([]);
//     let [processTime,setProcessTime] = useState(0);
//     let [loading, setLoading] = useState(false);
//
//     const { setPredictData } = useContext(PredictDataContext);
//
//     const saveDataToLocalStorage = (data) => {
//         const maxSavedData = 5;
//         let savedData = JSON.parse(localStorage.getItem("predictData")) || [];
//
//         savedData.push(data);
//         if (savedData.length > maxSavedData) {
//             savedData.shift();
//         }
//
//         localStorage.setItem("predictData", JSON.stringify(savedData));
//     };
//
//     const fetchData = async () => {
//         try {
//             // Raspberry Pi version
//             // const response = await fetch("http://192.168.0.88:5777/probs");
//
//             // Local test version
//             const response = await fetch("http://172.19.114.185:5777/probs");
//
//             const jsonData = await response.json(); // Destruct to json
//             const { probs: predictData } = jsonData; // Destruct to array
//
//             setData(predictData);
//             setPredictData(predictData); // Send to useContext
//
//             saveDataToLocalStorage(predictData);
//         } catch (e) {
//             console.error("Error fetching data from plot: ", e);
//         }
//     };
//
//     const updateTime = () => {
//         setProcessTime(prevState => prevState + 1);
//     };
//
//     const getCurrentData = () => {
//         return data.length > 0 && processTime < data.length ? data[processTime] : null;
//     };
//
//     useEffect(() => {
//         fetchData().then(r => setLoading(true));
//     }, []);
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             updateTime();
//         }, 1000);
//
//         return () => {
//             clearInterval(interval);
//         };
//     }, [loading]);
//
//     return (
//         <div style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//             width: "75%",
//             height: "100%"
//         }}>
//             <p><b>Processing Time:</b> {processTime}</p>
//             <Graph data={getCurrentData()} />
//         </div>
//     );
// };
//
// export default Result;
