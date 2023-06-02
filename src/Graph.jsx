import React, {useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import localforage from "localforage";

const Graph = ({ data, classNamesState }) => {
    const [classNames, setClassNames] = useState([]);

    useEffect(() => {
        // Fetch class names from localForage when component mounts
        const fetchClassNames = async () => {
            let classNamesDB = await localforage.getItem('classNames');
            console.log(classNamesDB);
            if (classNamesDB) {
                setClassNames(classNamesDB);
            }
        }

        // Use setTimeout to delay the execution of fetchClassNames
        const timer = setTimeout(() => {
            fetchClassNames().then(r => null);
        }, 10); // delay is 100ms

        // Cleanup function
        return () => {
            clearTimeout(timer);
        };
    }, [classNamesState]);


    const prepareChartData = () => {
        if (!data || !classNames) return [];

        // const classNames = localforage.getItem('classNames');

        return classNames.map((className, index) => ({
            name: className,
            value: data[index],
        }));
    };

    return (
        <ResponsiveContainer width={850} height={200}>
            <BarChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>

    );
};

export default Graph;
