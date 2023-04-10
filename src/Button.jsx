import {useNavigate} from "react-router-dom";

const Button = ({ buttonType, path }) => {
    let navigate = useNavigate();
    const routeChange = () => {
        navigate(`../${path}`, {
            replace: true,
        });
    }

    return (
        <button className={buttonType} onClick={routeChange}>
            {buttonType}
        </button>
    );
};

export default Button;