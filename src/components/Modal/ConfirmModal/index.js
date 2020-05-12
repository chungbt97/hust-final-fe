import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withStyles,
} from '@material-ui/core';
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
                    <DialogTitle id="form-dialog-title">Xác nhận</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Bạn cần nhập đúng TÊN của chat chatbot để xác nhận
                            bạn thực sự muốn xóa chatbot đó!
                        </DialogContentText>
                        <Field
                            id="form-name"
                            label="Name of bot"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Nhập chính xác tên của chatbot"
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
                            Xác nhận xóa
                        </Button>
                        <Button onClick={handleClose}>Hủy bỏ</Button>
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
