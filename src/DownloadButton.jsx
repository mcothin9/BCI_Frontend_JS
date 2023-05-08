import React, { useState } from 'react';

const DownloadButton = () => {
    const [dropdownValue, setDropdownValue] = useState("");

    const handleChange = (event) => {
        setDropdownValue(event.target.value);
    };

    const arrayToCSV = (arr) => {
        return arr.map(row => row.join(",")).join("\n");
    };

    const downloadCSVByIndex = (index) => {
        const savedData = getSavedData();
        if (index >= 0 && index < savedData.length) {
            const dataToDownload = savedData[index];
            const csvContent = arrayToCSV(dataToDownload);
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", `predictData-${index + 1}.csv`);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error("Invalid index");
        }
    };

    const handleDownload = () => {
        const selectedIndex = parseInt(dropdownValue.split("_")[1]) - 1;
        downloadCSVByIndex(selectedIndex);
    };

    const getSavedData = () => {
        return JSON.parse(localStorage.getItem("predictData")) || [];
    };

    const generateOptions = () => {
        const savedData = getSavedData();
        return savedData.map((_, index) => (
            <option key={`result_${index + 1}`} value={`result_${index + 1}`}>
                {`result_${index + 1}`}
            </option>
        ));
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
                {generateOptions()}
            </select>
        </div>
    );
};

export default DownloadButton;
