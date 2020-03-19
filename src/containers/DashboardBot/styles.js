const useStyles = () => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Montserrat',
        height: '100%',
    },
    container: {
        height: '100%',
        margin: 0,
        position: 'relative',
    },
    listBlock: {
        padding: '10px',
        boxShadow: '"1px 0px 18px 0px rgba(0,0,0,0.75)"',
        borderRight: '1px solid #cac8c8',
        overflowY: 'scroll',
        position: 'absolute',
        top: 0,
        bottom: 0,
    },
    blockContent: {
        right: 0,
        position: 'absolute',
        backgroundColor: '#f9f8f8',
        width: '100%',
        padding: '10px 0px 0px 32px',
        overflowY: 'scroll',
        top: 0,
        bottom: 0,
    },
});
export default useStyles;
