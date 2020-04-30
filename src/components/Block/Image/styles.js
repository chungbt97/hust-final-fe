const useStyles = theme => ({
    inputFile: {
        fontsize: '12px',
        fontFamily: 'Montserrat',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    blockTitle: {
        boder: 'none',
        witdh: 'auto',
        '& fieldset': {
            border: 'none',
        },
        '& input': {
            fontFamily: 'Montserrat',
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
});
export default useStyles;
