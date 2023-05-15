const StartButton = ({ onClick, disabled }) => {
    const style = {
        button: {
            backgroundColor: "cornflowerblue",
            color: "white",
            height: "50px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            transition: "all 0.3s ease-in-out"
        },
        buttonHover: {
            backgroundColor: "blue",
            textDecoration: "underline"
        }
    }

    return (
        <button style={style.button} onMouseOver={() => { style.button = style.buttonHover }} onMouseOut={() => { style.button = style.button }} onClick={onClick} disabled={disabled}>
            Start
        </button>
    );
};

export default StartButton;