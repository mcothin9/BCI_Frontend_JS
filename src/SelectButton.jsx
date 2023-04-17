
const SelectButton = ({ buttonType, onClickEvent }) => {

    const styles = {
        clickButton: {
            width: '100px',
            height: '20px',
            backgroundColor: 'cornflowerblue',
            display: 'block',
            // padding: '20px 30px',
            paddingTop: '5px',
            paddingBottom: '20px',
            border: '1px solid aliceblue',
            cursor: 'pointer',
            borderRadius: '5px',
            color: 'white',
        },
    }

    return (
        <button style={styles.clickButton}>
            {buttonType}
        </button>
    );
};

export default SelectButton;