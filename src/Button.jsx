import {useNavigate} from "react-router-dom";

const Button = ({ buttonType, path }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        navigate(`../${path}`, {
            replace: true,
        });
    }

    const styles = {
        navigateButton: {
            width: '60px',
            height: '15px',
            backgroundColor: 'lightyellow',
            display: 'inline-block',
            // padding: '20px 30px',
            paddingTop: '5px',
            paddingBottom: '20px',
            border: '1px solid aliceblue',
            cursor: 'pointer',
            borderRadius: '5px',
            color: 'gray',
        },
    }

    return (
        <button style={styles.navigateButton} onClick={routeChange}>
            {buttonType}
        </button>
    );
};

export default Button;