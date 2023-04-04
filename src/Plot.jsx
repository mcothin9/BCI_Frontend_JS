import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:3000');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const Plot = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const newData = await fetchData();
            setData((prevData) => [
                ...prevData.slice(Math.max(prevData.length - 60, 0)),
                { second: prevData.length + 1, value: newData.value },
            ]);
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="second" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Plot;
