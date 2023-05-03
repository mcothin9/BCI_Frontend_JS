const DownloadButton = () => {
    const [dropdownValue, setDropdownValue] = useState("");

    const handleChange = (event) => {
        setDropdownValue(event.target.value);
    };

    const handleDownload = () => {
        // Implement your download logic here
    };

    return (
        <div>
            <button
                className="button"
                onClick={handleDownload}
                disabled={dropdownValue === ""}
            >
                Download
            </button>
            <select value={dropdownValue} onChange={handleChange}>
                <option value="">--Select data--</option>
                {/* Add your history data options here */}
            </select>
        </div>
    );
};

export default DownloadButton;