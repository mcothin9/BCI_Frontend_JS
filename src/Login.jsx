import Header from "./Header";
import ipAddress from "./api/ip";
import SelectButton from "./SelectButton";
import Body from "./Body";

const Login = () => {
    return (
        <div>
            <Header buttonType={'login'} path={'prepare'} />
            <Body>
                <SelectButton buttonType={'guest'} />
            </Body>
        </div>
    );
};

export default Login;