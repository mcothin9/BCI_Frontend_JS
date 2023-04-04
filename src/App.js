import React from 'react';
import Header from './Header';
import Plot from "./Plot";

function App() {
    return (
        <div>
            <Header buttonType={"stop"} />
            <Plot />
        </div>
    );
}

export default App;
