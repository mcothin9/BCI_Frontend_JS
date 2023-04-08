import React from 'react';
import Button from "./Button";


const Header = ({ buttonType, ipAddress }) => {
    return (
        <div>
            <p>Current IP address: { ipAddress } </p>
            <Button buttonType={buttonType} />
        </div>
    );
}

export default Header;
