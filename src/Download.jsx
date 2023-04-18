import Header from "./Header";
import SelectButton from "./SelectButton";
import Body from "./Body";
import {useContext} from "react";
import PredictDataContext from "./DownloadDataContext";

const Download = () => {
    const { predictData } = useContext(PredictDataContext);

    const downloadCSV = () => {
        const arrayToCSV = (arr) => {
            return arr.map(row => row.join(",")).join("\n");
        };

        const csvContent = arrayToCSV(predictData);
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "predictData.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Header buttonType={'menu'} path={'/'} />
            <Body>
                <button style={{
                    width: '100px',
                    height: '20px',
                    backgroundColor: 'cornflowerblue',
                    display: 'block',
                    // padding: '20px 30px',
                    paddingTop: '5px',
                    paddingBottom: '20px',
                    border: '1px solid aliceblue',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    color: 'white',
                }} onClick={downloadCSV}>Download</button>
            </Body>
        </div>
    );
};

export default Download;