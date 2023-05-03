const StartButton = ({ onClick, disabled }) => {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>
            Start
        </button>
    );
};

export default StartButton;
