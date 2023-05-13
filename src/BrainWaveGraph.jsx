import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const BrainwaveGraph = ({ data }) => {
    const channelsCount = 1;

    const processedData = data.map((value, index) => {
        const entry = { time: index * 0.1 };
        entry[`channel0`] = value[0]; // Use the first integer of the 25-element data array
        return entry;
    });

    return (
        <div style={{ overflowX: "auto", width: "100%" }}>
            <LineChart width={Math.max(processedData.length * 40, 800)} height={400}>
                <XAxis dataKey="time" />
                <YAxis yAxisId={`channel0`} orientation="left" domain={[-0.0065, 0.0002]} />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Line
                    dataKey={`channel0`}
                    yAxisId={`channel0`}
                    dot={false}
                    isAnimationActive={false}
                />
            </LineChart>
        </div>
    );
};

export default BrainwaveGraph;
