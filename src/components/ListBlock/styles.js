const useStyles = theme => ({
    root: {
        paddingTop: '20px',
        flexGrow: 1,
        fontFamily: 'Montserrat',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
});
export default useStyles;
