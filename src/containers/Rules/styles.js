const useStyles = theme => ({
    root: {
        top: ' 0',
        bottom: '0',
        padding: '10px',
        position: 'absolute',
        overflowY: 'scroll',
        backgroundColor: '#f3f3f3'
    },
    paper: {
        fontFamily: 'Montserrat',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    emojiIcon: {
        position: 'absolute',
        top: '50%',
        right: '1rem',
        transform: 'translateY(-50%)',
    },
    buttonText: {
        width: '100%',
    },
    buttonSearch: {
        height: '46px',
        padding: '12px 16px',
        border: '1px solid black',
        borderRadius: '6px',
        cursor: 'pointer',
        boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        borderColor: theme.palette.text.secondary,
        transition: '0.2s',
        '&:hover': {
            borderColor: '#208ef0',
            color: '#208ef0',
            transform: 'scale(1.1)',
            transition: '0.2s',
        },
    },
    item: {
        borderRadius: '6px',
        border: '1px solid black',
        padding: '10px',
        marginTop: '10px',
        borderColor: theme.palette.text.secondary,
    },
    lineRule: {
        marginTop: '24px',
    },
    inputRule: {
        '& input': {
            fontFamily: 'Montserrat',
        },
        '& textarea': {
            fontFamily: 'Montserrat',
        },
    },
    dialog: {
        fontFamily: 'Montserrat',
        '& *': {
            fontFamily: 'Montserrat',
        },
    },
    lineBlock: {
        width: '100%',
        margin: '15px 0px',
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
});
export default useStyles;
