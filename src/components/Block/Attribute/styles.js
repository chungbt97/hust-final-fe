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
    line: {
        position: 'relative',
        boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        borderRadius: '4px',
        background: '#ffffff',
        padding: '5px'
    },
    // lineButtonAdd: {
    //     position: 'absolute',
    //     bottom: '-20px',
    //     left: '-24px',
    //     '& button': {
    //         opacity: 0,
    //     },
    //     '& button:hover': {
    //         color: '#208ef0',
    //         opacity: 1,
    //     },
    // },
    blockTitle: {
        '& input': {
            fontFamily: 'Montserrat',
        },
        '& textarea': {
            fontFamily: 'Montserrat',
        },
    },
});
export default useStyles;
