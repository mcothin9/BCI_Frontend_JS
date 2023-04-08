import React from 'react';
import Header from './Header';
import Plot from "./Plot";
import {Route, Routes} from "react-router-dom";
import Login from "./Login";

function App() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Login />} />
                <Route path={'/start'} element={<Plot />} />
            </Routes>
        </div>
    );
}

export default App;
