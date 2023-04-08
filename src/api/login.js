const resultAPI = async (time, result) => {
    const url = 'https://localhost:';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time, result }),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
};

export { resultAPI };