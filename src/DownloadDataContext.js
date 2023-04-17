import { createContext, useState } from "react";

const PredictDataContext = createContext();

export const PredictDataProvider = ({ children }) => {
    const [predictData, setPredictData] = useState([]);

    return (
        <PredictDataContext.Provider value={{ predictData, setPredictData }}>
            {children}
        </PredictDataContext.Provider>
    );
};

export default PredictDataContext;
