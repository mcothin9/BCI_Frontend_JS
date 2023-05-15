import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const BrainwaveGraph = ({ data }) => {
    // Y interval min-max
    //[-0.048360452973841644, 0.04520372170984341]

    // Initialize timeProcess array
    const timeProcess = Array.from({length: 251}, (_, i) => i);
    const checkPoint = [];
    // Mock data from bsl streamer
    // Need update for other data source
    const yAxisMax = 0.04520372170984341;
    const yAxisMin = -0.048360452973841644;
    const yAxisInterval = yAxisMax - yAxisMin;

    useEffect(() => {
        // Loop through each channel
        for (let i = 0; i < 22; i++) {
            // Create data for the channel
            let channelData = [{
                x: timeProcess,
                y: data[i],
                type: 'scatter'
            }];

            // Define the layout
            let layout = {
                autosize: false,
                width: 500,
                height: 250,
                margin: {
                    l: 50,
                    r: 50,
                    b: 100,
                    t: 100,
                    pad: 4
                },
            };

            // Plot the data on the channel div
            Plotly.newPlot('Channel_' + i, channelData, layout);
        }
    }, [data]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            {Array.from({ length: 22 }, (_, i) => (
                <div
                    id={'Channel_' + i}
                    key={'Channel_' + i}
                    // style={{height: '50%', width: '100%', border: 'solid'}}
                >
                    {'Channel_' + i}
                </div>
            ))}
        </div>
    );
};

export default BrainwaveGraph;
