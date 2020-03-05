const useStyles = () => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Montserrat',
        height: '100%',
    },
    container: {
        height: '100%',
        margin: 0,
    },
    listBlock: {
        padding: '10px',
        boxShadow: '"1px 0px 18px 0px rgba(0,0,0,0.75)"',
        borderRight: '1px solid #cac8c8',
        overflowY: 'scroll',
        height: '513px',
    },
    blockContent: {
        backgroundColor: '#f9f8f8',
        width: '100%',
        padding: '10px 0px 0px 10px',
    },
});
export default useStyles;
