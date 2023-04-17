import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Header from "./Header";
import Body from "./Body";
import Result from "./Result";
import Graph from "./Graph";

const Plot = () => {
    return (
        <div>
            <Header buttonType={'stop'} path={'download'} />
            <Body>
                <Result />
            </Body>
        </div>
    );
}

export default Plot;
