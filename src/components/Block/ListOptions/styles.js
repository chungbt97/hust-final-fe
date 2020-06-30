const useStyles = theme => ({
    inputFile: {
        fontsize: '12px',
        fontFamily: 'Montserrat',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    blockTitle: {
        fontFamily: 'Montserrat',
        '& textarea': {
            fontFamily: 'Montserrat',
        },
    },
});
export default useStyles;
