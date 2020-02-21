const styles = theme => ({
    input: {
        width: '100%',
        margin: '15px 0px',
    },
    modal: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        position: 'absolute',
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        padding: '15px',
        backgroundColor: 'white',
    },
    txtArea: {
        width: '100%',
        font: 'inherit',
        color: 'currentColor',
        height: '1.1875em',
        margin: '20px 0px',
        display: 'block',
        padding: '6px 0 7px',
        minWidth: '0',
        background: 'none',
        boxSizing: 'content-box',
    },
});

export default styles;
