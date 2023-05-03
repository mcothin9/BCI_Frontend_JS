import React from 'react';
import {Route, Routes} from "react-router-dom";
import {PredictDataProvider} from "./DownloadDataContext";
import Main from "./Main";

function App() {
    return (
        <div>
            <PredictDataProvider>
                <Routes>
                    <Route path={'/'} element={<Main />} />
                </Routes>
            </PredictDataProvider>
        </div>
    );
}

export default App;
