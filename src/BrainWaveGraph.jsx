import React from "react";
import { Line } from "react-chartjs-2";

const BrainwaveGraph = ({ data }) => {
    const generateDataset = () => {
        const datasets = [];
        for (let i = 0; i < 25; i++) {
            datasets.push({
                label: `cl_${i}`,
                data: data.map((arr) => arr[i]),
                fill: false,
                borderColor: `hsl(${(i * 360) / 25}, 100%, 50%)`,
            });
        }
        return datasets;
    };

    const chartData = {
        labels: data.map((_, index) => index),
        datasets: generateDataset(),
    };

    const options = {
        scales: {
            x: {
                display: false,
            },
            y: {
                min: -0.0065,
                max: 0.0002,
                ticks: {
                    callback: (value, index) => (index % 5 === 0 ? `cl_${index}` : ""),
                },
            },
        },
    };

    return (
        <div>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default BrainwaveGraph;
