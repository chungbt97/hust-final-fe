const useStyles = theme => ({
    root: {
        paddingTop: '20px',
        flexGrow: 1,
        fontFamily: 'Montserrat',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    blockLink: {
        textDecoration: 'none',
        '& > div': {
            color: 'black',
            background: 'white',
        },
    },
    activedBlockLink: {
        '& > div': {
            color: '#ffffff',
            backgroundColor: '#208ef0',
        },
    },
});
export default useStyles;
