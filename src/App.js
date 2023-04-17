import React from 'react';
import Header from './Header';
import Plot from "./Plot";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";
import Prepare from "./Prepare";
import Download from "./Download";
import {PredictDataProvider} from "./DownloadDataContext";

function App() {
    return (
        <div>
            <PredictDataProvider>
                <Routes>
                    <Route path={'/'} element={<Login />} />
                    <Route path={'prepare'} element={<Prepare />} />
                    <Route path={'/plot'} element={<Plot />} />
                    <Route path={'/download'} element={<Download />} />
                </Routes>
            </PredictDataProvider>
        </div>
    );
}

export default App;
