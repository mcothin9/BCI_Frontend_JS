import React from 'react';
import Button from "./Button";


const Header = ({ buttonType, path, ipAddress }) => {
    return (
        <div>
            <p>Current IP address: { ipAddress } </p>
            <Button buttonType={buttonType} path={path} />
        </div>
    );
}

export default Header;
