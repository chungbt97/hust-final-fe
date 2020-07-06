const useStyles = theme => ({
    card: {
        fontFamily: 'Montserrat',
    },
    cardHeader: {
        fontSize: '2em',
        '& > .MuiCardHeader-avatar': {
            marginTop: '5px',
            fontFamily: 'Montserrat',
        },
        '& > .MuiCardHeader-content > span': {
            fontSize: '1em',
            fontFamily: 'Montserrat',
        },
    },
    infoCard: {
        color: '#767676',
        fontFamily: 'Montserrat',
    },
    urlInput: {
        '& input': {
            fontFamily: 'Montserrat',
            fontSize: '12px',
            color: 'blue',
        },
    },
});
export default useStyles;
