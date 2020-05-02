const useStyles = theme => ({
    paper: {
        fontFamily: 'Montserrat',
        padding: '10px 10px 0px 10px;',
        position: 'relative',
    },
    blocks: {
        marginTop: theme.spacing(2),
    },
    lineBlock: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    menuDrop: {
        transform: 'translateY(44px)',
    },
    menuItem: {
        fontFamily: 'Montserrat',
    },
    buttonMore: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    showMore: {
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
});
export default useStyles;
