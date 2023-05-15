const StopButton = ({ onClick, disabled }) => {
    const style = {
        backgroundColor: "cornflowerblue",
        color: "white",
        height: "50px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
        transition: "all 0.3s ease-in-out",
        borderRadius: "10px",
        textDecoration: "underline"
    }

    return (
        <button style={style} onClick={onClick} disabled={disabled}>
            Stop
        </button>
    );
};

export default StopButton;