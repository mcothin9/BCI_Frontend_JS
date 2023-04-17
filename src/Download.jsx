import Header from "./Header";
import SelectButton from "./SelectButton";
import Body from "./Body";

const Download = () => {
    return (
        <div>
            <Header buttonType={'menu'} path={'/'} />
            <Body>
                <SelectButton buttonType={'Download'} />
            </Body>
        </div>
    );
};

export default Download;