const StopButton = ({ onClick, disabled }) => {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>
            Stop
        </button>
    );
};

export default StopButton;