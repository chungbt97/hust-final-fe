import { FormHelperText } from '@material-ui/core';
import React from 'react';

const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return <FormHelperText>{touched && error}</FormHelperText>;
    }
};

export default renderFromHelper;
