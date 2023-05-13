
// import React from "react";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
//
// const SingleLineChart = ({ data, index }) => {
//     return (
//         <LineChart width={Math.max(data.length * 40, 800)} height={16}>
//             <XAxis dataKey="time" />
//             <YAxis
//                 yAxisId={`channel${index}`}
//                 orientation="left"
//                 domain={[-0.0065, 0.0002]}
//                 hide={true}
//             />
//             <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//             <Line
//                 dataKey={`channel${index}`}
//                 yAxisId={`channel${index}`}
//                 dot={false}
//                 isAnimationActive={false}
//             />
//         </LineChart>
//     );
// };
//
// const BrainwaveGraph = ({ data }) => {
//     const channelsCount = 25;
//
//     const processedData = data.map((value, index) => {
//         const entry = { time: index * 0.1 };
//         for (let i = 0; i < channelsCount; i++) {
//             entry[`channel${i}`] = value;
//         }
//         return entry;
//     });
//
//     return (
//         <div
//             style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 overflowX: "auto",
//                 width: "100%",
//                 height: "100%",
//             }}
//         >
//             <div>Test text</div>
//             {Array.from({ length: channelsCount }, (_, index) => (
//                 <SingleLineChart key={index} data={processedData} index={index} />
//             ))}
//         </div>
//     );
// };
//
// export default BrainwaveGraph;


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
