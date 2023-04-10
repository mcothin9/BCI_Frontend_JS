import {useNavigate} from "react-router-dom";

const navigate = (pathPara) => {
    const navigate = useNavigate();

    navigate(`/${pathPara}`);

    return null;
}

export default navigate;