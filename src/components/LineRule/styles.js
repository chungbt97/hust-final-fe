const useStyles = theme => ({
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
    message: {
        padding: '1em',
        position: 'relative',
    },
    textContent: {
        borderRadius: 4,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        backgroundColor: '#ffffff',
        '&:hover': {
            backgroundColor: '#ffffff',
        },
        '& > div > textarea': {
            width: '84%',
            fontFamily: 'Montserrat',
        },
    },
    root: {
        flexGrow: 1,
        fontFamily: 'Montserrat',
        height: '100%',
    },
    blockTitle: {
        boder: 'none',
        witdh: 'auto',
        '& fieldset': {
            border: 'none',
        },
        '& input': {
            fontFamily: 'Montserrat',
            fontSize: '1.5rem',
            border: '1px solid rgb(249, 248, 248)',
        },
        '& input:focus': {
            boxShadow: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.07)',
            outline: 'none',
            border: 'solid 1px rgba(0, 0, 0, 0.33)',
            borderRadius: '7px',
            cursor: 'text',
        },
    },
    formContentBlock: {
        transform: 'translateY(-25px)',
    },
    btnControlPanel: {
        padding: '1rem 0.5rem',
        '& > span': {
            display: 'inline',
            textTransform: 'capitalize',
            fontDamily: 'Montserrat',
        },
        '&  > span > svg': {
            display: 'block',
            fontSize: '1rem',
            margin: 'auto',
        },
    },
    borderRight: {
        display: 'block',
        margin: '1px 0',
        width: '1px',
        height: '72px',
        background: '#f3f2f2',
    },
    controlPanel: {
        display: 'flex',
    },
    btnSaveRule: {
        padding: '0 16px',
        fontSize: '15px',
        fontWeight: '500',
        lineHeight: '1.1',
        whiteSpace: 'nowrap',
        borderRadius: '4px',
        border: '1px solid #ffffff',
        outline: 'none',
        appearance: 'none',
        verticalAlign: 'middle',
        backgroundColor: '#208ef0',
        color: 'white',
        boxShadow: ' 0 0 0 1px #10101000, 0 1px 0 0 #1010100a',
        textTransform: 'capitalize',
        margin: '0px 15px',
        '&:hover':{
            backgroundColor: 'white',
            color: '#208ef0',
            border: '1px solid #208ef0',
        }
    },
});
export default useStyles;
