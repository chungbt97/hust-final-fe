const useStyles = theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    iconButton: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        lineHeight: 1.5,
    },
    menuItem: {
        marginLeft: theme.spacing(2),
        fontFamily: 'Montserrat',
    },
    bgWhite: {
        background: '#f9f8f8',
        color: 'black',
        boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.04)',
    },
});
export default useStyles;
