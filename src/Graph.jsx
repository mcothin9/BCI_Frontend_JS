import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Graph = ({ data }) => {
    const prepareChartData = () => {
        if (!data) return [];

        return [
            { name: "rt1", value: data.rt1 },
            { name: "rt2", value: data.rt2 },
            { name: "rt3", value: data.rt3 },
            { name: "rt4", value: data.rt4 },
        ];
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
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
