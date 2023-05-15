import React, { useState, useEffect } from "react";

const Popup = ({ isOpen, message }) => {
    const [dots, setDots] = useState(".");

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                setDots((prevDots) => {
                    return prevDots.length < 3 ? prevDots + "." : ".";
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isOpen]);

    return isOpen ? (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "20px",
        }}>
            {message}{dots}
        </div>
    ) : null;
};

export default Popup;
