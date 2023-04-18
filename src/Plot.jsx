import React from 'react';
import Header from "./Header";
import Body from "./Body";
import Result from "./Result";

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
