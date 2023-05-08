import React, {useEffect, useState} from 'react';
import { Chart, LinearScale, CategoryScale } from "react-chartjs-2";

const BrainwaveGraph = ({ data }) => {

    Chart.register(LinearScale, CategoryScale);

    const [chartInstance, setChartInstance] = useState(null);

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
                type: 'linear',
                min: -0.0065,
                max: 0.0002,
                ticks: {
                    callback: (value, index) => (index % 5 === 0 ? `cl_${index}` : ""),
                },
            },
        },
    };

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }
    }, [data]);

    const handleRef = (node) => {
        if (node) {
            setChartInstance(
                new Chart(node.getContext('2d'), {
                    type: 'line',
                    data: chartData,
                    options: options,
                })
            );
        }
    };

    return (
        <div>
            <canvas ref={handleRef}></canvas>
        </div>
    );
};

export default BrainwaveGraph;
