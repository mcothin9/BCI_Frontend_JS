import React, { useEffect } from 'react';
import Plotly from 'plotly.js-dist';

const BrainwaveGraph = ({ data }) => {
    // Initialize timeProcess array
    const timeProcess = Array.from({length: 251}, (_, i) => i);

    useEffect(() => {
        // Loop through each channel
        for (let i = 0; i < 22; i++) {
            // Create data for the channel
            let channelData = [{
                x: timeProcess,
                y: data[i],
                type: 'scatter'
            }];

            // Plot the data on the channel div
            Plotly.newPlot('Channel_' + i, channelData);
        }
    }, [data]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
            {Array.from({ length: 22 }, (_, i) => (
                <div
                    id={'Channel_' + i}
                    key={'Channel_' + i}
                    style={{height: '4.5%', width: '100%', border: 'solid'}}
                >
                    {'Channel_' + i}
                </div>
            ))}
        </div>
    );
};

export default BrainwaveGraph;
