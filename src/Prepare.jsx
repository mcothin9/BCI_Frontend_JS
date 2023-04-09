import Header from "./Header";
import ipAddress from "./api/ip";

const Prepare = () => {
    return (
        <div>
            <Header buttonType={'start'} ipAddress={ipAddress} />
            <div>Prepare Page</div>
        </div>
    );
};

export default Prepare;