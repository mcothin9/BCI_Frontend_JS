import React from 'react';
import Button from "./Button";


const Header = ({ buttonType }) => {
    return (
        <div>
            <p>Current IP address: </p>
            <Button buttonType={buttonType} />
        </div>
    );
}

export default Header;
