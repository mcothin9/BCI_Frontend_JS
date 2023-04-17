import React from 'react';
import Button from "./Button";
import getIpAddressFromURL from "./api/ip";


const Header = ({ buttonType, path }) => {
    const {type, address} = getIpAddressFromURL;

    const styles = {
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px',
            backgroundColor: 'cornflowerblue',
            height: '4rem'
        },
        ipAddress: {
            color: 'white',
        },
    };

    if (type === 'global') {
        return (
            <div style={styles.header}>
                <p style={styles.ipAddress}>Global Connection from { address } to {address} </p>
                <Button buttonType={buttonType} path={path} />
            </div>
        );
    } else if (type === 'local') {
        return (
            <div style={styles.header}>
                <p style={styles.ipAddress}>Local Connection from { address } </p>
                <Button buttonType={buttonType} path={path} />
            </div>
        );
    } else {
        return (
            <div>
                Cannot catch current ip address from url
            </div>
        );
    }
}

export default Header;
