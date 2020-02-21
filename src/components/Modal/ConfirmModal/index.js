import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, withStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field } from 'redux-form';
import renderTextField from '../../InputField/TextField';
import styles from './styles';

class ConfirmModal extends Component {
    render() {
        const {
            open,
            handleClose,
            handleSubmit,
            handleDelete,
            classes,
        } = this.props;
        return (
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <form
                    className={classes.form}
                    onSubmit={handleSubmit(handleDelete)}
                >
                    <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            This action cannot be undone. Enter the NAME of the
                            bot below to confirm that you want to permanently
                            delete it for all user.
                        </DialogContentText>
                        <Field
                            id="form-name"
                            label="Name of bot"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Enter correctly name of bot"
                            fullWidth
                            name="confirmName"
                            variant="outlined"
                            required
                            autoFocus
                            component={renderTextField}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" type="submit">
                            Delete
                        </Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
}

ConfirmModal.propTypes = {
    bot: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleDelete: PropTypes.func,
};

export default withStyles(styles)(ConfirmModal);
