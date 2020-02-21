import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
const renderTextField = ({
    input,
    label,
    meta: { touched, invalid, error },
    ...custom
}) => {
    return (
        <TextField
            label={label}
            placeholder={label}
            error={touched && invalid}
            helperText={touched && error}
            type="text"
            {...custom}
            {...input}
        />
    )
};

renderTextField.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object
};

export default renderTextField;
