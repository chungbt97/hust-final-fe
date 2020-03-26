import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField, CircularProgress } from '@material-ui/core';

class AutoCompleteInput extends Component {
    render() {
        const {
            open,
            loading,
            options,
            toogle,
            style,
            onChange,
            idWillRedirect,
            ...remainProps
        } = this.props;
        return (
            <Autocomplete
                id="redirect-loading-block"
                open={open}
                onOpen={() => {
                    toogle(true);
                }}
                onClose={() => {
                    toogle(false);
                }}
                getOptionSelected={(option, value) =>
                    option.title === value.title
                }
                getOptionLabel={option => option.title}
                options={options}
                loading={loading}
                style={style}
                onChange={(option, value) => {
                    onChange(value);
                }}
                openOnFocus={true}
                renderInput={params => (
                    <TextField
                        {...params}
                        {...remainProps}
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {loading ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={20}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
            />
        );
    }
}

AutoCompleteInput.propTypes = {
    open: PropTypes.bool,
    loading: PropTypes.bool,
    options: PropTypes.array,
    toogle: PropTypes.func,
    defaultValue: PropTypes.number,
    style: PropTypes.object,
    onChange: PropTypes.func,
};

export default AutoCompleteInput;
