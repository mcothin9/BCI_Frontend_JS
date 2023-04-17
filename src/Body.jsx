const Body = ({ children }) => {
    const styles = {
        body: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // border: '1px solid',
            height: '30rem',
            marginTop: '10px',
        },
    };

    return (
        <div style={styles.body}>
            {children}
        </div>
    );
};

export default Body;