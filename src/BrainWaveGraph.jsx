import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';
import localforage from 'localforage';

// Mock data from bsl streamer
// Need update for other data source
const yAxisMax = 0.04520372170984341;
const yAxisMin = -0.048360452973841644;
// const yIncrementPerChannel = yAxisMax - yAxisMin / 2;
const yIncrementPerChannel = yAxisMax;

// const initRawPlotData = async () => {
//     let rawPlotData = Array.from({length: 22}, (_, i) =>
//         Array.from({length: 1004}, () => i * yIncrementPerChannel)
//     );
//     await localforage.setItem('rawPlotData', rawPlotData);
//     console.log("Initialized rawPlotData:", rawPlotData);  // Debugging line
// };

// Function to adjust the data based on yIncrementPerChannel
const changeDataRange = (data) => {
    return data.map((subArray, index) =>
        subArray.map(num => num + index * yIncrementPerChannel)
    );
};

// Initiate the localforage when render the page
// initRawPlotData().then(r => null);

const BrainwaveGraph = ({ data, channel }) => {
    console.log("Channel in BWG: " + channel);
    // Initialize timeProcess array
    const timeProcess = Array.from({length: 1004}, (_, i) => i);

    useEffect(() => {
        // Update rawPlotData in localForage with new data
        localforage.getItem('rawPlotData').then(rawPlotData => {
            if (data && data.length > 0) {  // Check if data is non-empty
                let newData = changeDataRange(data);
                // console.log("Adjusted data:", newData);  // Debugging line
                for(let i = 0; i < channel; i++) {
                    rawPlotData[i] = [...rawPlotData[i].slice(251), ...newData[i]];
                }
                localforage.setItem('rawPlotData', rawPlotData).then(rawPlotData => {
                    // Prepare traces for plot
                    let traces = rawPlotData.map((channelData, index) => ({
                        x: timeProcess,
                        y: channelData,
                        type: 'scatter',
                        name: `Channel_${index+1}`,
                        line: {color: `hsl(${360 * index / channel}, 50%, 50%)`} // HSL color with equal increments for each channel
                    }));

                    // Define the layout
                    let layout = {
                        autosize: false,
                        width: 850,
                        height: 2000,
                        margin: {
                            l: 50,
                            r: 50,
                            b: 100,
                            t: 100,
                            pad: 4
                        },
                        yaxis: {
                            showticklabels: false
                        },
                    };

                    // Plot the data on the div
                    Plotly.newPlot('myDiv', traces, layout);
                });
            }
        });
    }, [data]);


    return (
        <div id='myDiv'></div>
    );
};

export default BrainwaveGraph;
