import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React from 'react';
import { FormControl } from '@material-ui/core';
import renderFromHelper from '../FormHelper';

const renderSelectField = ({
    input,
    label,
    meta: { touched, error },
    children,
    classNameParent,
    ...custom
}) => (
    <FormControl error={touched && error} className={classNameParent}>
        <Select {...custom} {...input}>{children}</Select>
        {renderFromHelper({ touched, error })}
    </FormControl>
);

renderSelectField.propTypes = {
    label: PropTypes.string,
    input: PropTypes.object,
    meta: PropTypes.object,
    children: PropTypes.array,
};

export default renderSelectField;
