import { useState, useEffect } from "react";
import Header from "./Header";
import Body from "./Body";

const Download = () => {
    const [savedData, setSavedData] = useState([]);

    const loadDataFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem("predictData")) || [];
    };

    useEffect(() => {
        const data = loadDataFromLocalStorage();
        console.log("Loaded data from localStorage:", data);
        setSavedData(data);
    }, []);


    const downloadCSVByIndex = (index) => {
        if (index >= 0 && index < savedData.length) {
            const dataToDownload = savedData[index];
            const arrayToCSV = (arr) => {
                return arr.map(row => row.join(",")).join("\n");
            };

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

    return (
        <div>
            <Header buttonType={'menu'} path={'/'} />
            <Body>
                {savedData.map((_, index) => (
                    <button
                        key={index}
                        style={{
                            width: "100px",
                            height: "20px",
                            backgroundColor: "cornflowerblue",
                            display: "block",
                            paddingTop: "5px",
                            paddingBottom: "20px",
                            border: "1px solid aliceblue",
                            cursor: "pointer",
                            borderRadius: "5px",
                            color: "white",
                            marginBottom: "10px",
                        }}
                        onClick={() => downloadCSVByIndex(index)}
                    >
                        Download {index + 1}
                    </button>
                ))}
            </Body>
        </div>
    );
};

export default Download;
