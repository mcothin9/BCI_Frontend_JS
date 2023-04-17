import Header from "./Header";
import ipAddress from "./api/ip";
import SelectButton from "./SelectButton";
import Body from "./Body";
import Button from "./Button";

const Prepare = () => {
    return (
        <div>
            <Header buttonType={'start'} path={'plot'} />
            <Body>
                <SelectButton buttonType={'Simulator'} />
                <SelectButton buttonType={'Sensor'} />
            </Body>
        </div>
    );
};

export default Prepare;