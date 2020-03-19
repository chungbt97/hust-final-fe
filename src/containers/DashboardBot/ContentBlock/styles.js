const useStyles = () => ({
    root: {
        flexGrow: 1,
        fontFamily: 'Montserrat',
        height: '100%',
    },
    blockTitle:{
        boder: 'none',
        witdh: 'auto',
        '& fieldset':{
            border: 'none',
        },
        '& input':{
            fontFamily: 'Montserrat',
            fontSize: '1.5rem',
            border: '1px solid rgb(249, 248, 248)',
        },
        '& input:focus':{
            boxShadow: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.07)',
            outline: 'none',
            border: 'solid 1px rgba(0, 0, 0, 0.33)',
            borderRadius: '7px',
            cursor: 'text',

        }
    },
    spaceLine:{
        margin: '1rem 0'
    },
    formContentBlock:{
        transform: 'translateY(-25px)',
    }
});
export default useStyles;
