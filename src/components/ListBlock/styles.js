const useStyles = theme => ({
    root: {
        fontFamily: 'Montserrat',
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
    expand: {
        padding: 0,
        float: 'right',
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        padding: 0,
        float: 'right',
        transform: 'rotate(180deg)',
    },
    collapse: {
        paddingTop: '10px',
        paddingBottom: '10px',
    },
    group: {
        paddingBottom: theme.spacing(1.5),
    },
    iconMore: {
        marginTop: '-12px',
    },
    menuDrop: {
        transform: 'translateY(44px)',
    },
    menuItem:{
        fontFamily: 'Montserrat',
    }
});
export default useStyles;
