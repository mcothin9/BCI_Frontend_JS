import {useContext, useEffect, useState} from "react";
import Graph from "./Graph";
import PredictDataContext from "./DownloadDataContext";

const Result = () => {
    let [data, setData] = useState([]);
    let [processTime,setProcessTime] = useState(0);
    let [loading, setLoading] = useState(false);

    const { setPredictData } = useContext(PredictDataContext);

    const fetchData = async () => {
        try {
            // const response = await fetch("http://localhost:3001/data"); // Get from js server
            const response = await fetch("http://127.0.0.1:5000/probs"); // Get from py
            const jsonData = await response.json(); // Destruct to json
            const { probs: predictData } = jsonData; // Destruct to array

            setData(predictData);
            setPredictData(predictData); // Send to useContext
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };

    const updateTime = () => {
        setProcessTime(prevState => prevState + 1);
    };

    const getCurrentData = () => {
        return data.length > 0 && processTime < data.length ? data[processTime] : null;
    };

    useEffect(() => {
        fetchData().then(r => setLoading(true));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            updateTime();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [loading]);

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "75%",
            height: "100%"
        }}>
            <p><b>Processing Time:</b> {processTime}</p>
            <div>=======================================================================</div>
            <Graph data={getCurrentData()} />
        </div>
    );
};

export default Result;
