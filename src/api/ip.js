function getIpAddressFromURL() {
    const url = window.location.href;
    const ipAddressPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    const ipLocalPattern = /\b\d{2,4}\b/;
    const ipGlobalMatch = url.match(ipAddressPattern);
    const ipLocalMatch = url.match(ipLocalPattern);

    if (ipGlobalMatch) {
        return ({
            type: 'global',
            address: ipGlobalMatch[0],
        });
    } else if (ipLocalMatch) {
        return ({
            type: 'local',
            address: ipLocalMatch[0],
        });
    }
    else {
        return null;
    }
}

export default getIpAddressFromURL();