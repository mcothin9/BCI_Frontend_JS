function getIpAddressFromURL() {
    const url = window.location.href;
    const ipAddressPattern = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
    const ipAddressMatch = url.match(ipAddressPattern);

    if (ipAddressMatch) {
        return ipAddressMatch[0];
    } else {
        return null;
    }
}

const ipAddress = getIpAddressFromURL();

export default ipAddress;