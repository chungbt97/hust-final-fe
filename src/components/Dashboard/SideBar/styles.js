const useStyles = () => ({
    drawerPaper: {
        width: '240px',
        position: 'relative',
        height: '100%',
        backgroundColor: '#f3f2f2',
    },
    menuLink: {
        textDecoration: 'none',
        color: 'black',
        // '&:hover':{
        //     color: 'red',
        // }
    },
    activedMenuLink: {
        '&>div': {
            backgroundColor: '#ffffff',
        },
    },
    menuText: {
        letterSpacing: 0,
        fontFamily: 'Montserrat',
        fontSize: '14px',
    },
    menuIcon: {
        minWidth: '40px',
    },
});
export default useStyles;
