
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
});
export default useStyles;
