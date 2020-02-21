const useStyles = theme => ({
    root: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    descriptionBot: {
        minHeight: '60px',
    },
    linkDashboard: {
        border: '1px solid #3498db',
        padding: '7.5px 20px',
        borderRadius: '10px',
        textDecoration: 'none',
        fontFamily: 'Montserrat',
        transition: '0.2s',
        color: '#3498db',
        '&:hover': {
            color: 'white',
            backgroundColor: '#3498db',
            textDecoration: 'none',
            transition: '0.5s',
        },
    },
});
export default useStyles;
