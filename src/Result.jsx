import { useEffect, useState } from "react";
import Graph from "./Graph";

const Result = ({ dynamicResult }) => {
    let [data, setData] = useState();
    let processTime = 0;

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/data");
            const jsonData = await response.json();
            setData(jsonData);
        } catch (e) {
            console.error("Error fetching data from plot: ", e);
        }
    };

    const updateTime = () => {
        processTime += 1;
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData().then((r) => updateTime());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <p>Time: {processTime}</p>
            <div>===============================================================</div>
            <Graph data={data} />
        </div>
    );
};

export default Result;
