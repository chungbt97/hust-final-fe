import { Button, Grid, Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Field } from 'redux-form';
import renderTextField from '../../InputField/TextField';
import styles from './style';

class BotModal extends Component {
    render() {
        const {
            open,
            classes,
            title,
            hideModal,
            handleSubmitBot,
            handleSubmit,
            updateBot,
        } = this.props;
        return (
            <Modal open={open}>
                <div className={classes.modal}>
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    <form
                        className={classes.form}
                        onSubmit={handleSubmit(handleSubmitBot)}
                    >
                        <Field
                            id="form-name"
                            label="Tên"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Tên của chatbot. VD: Lucian Bot"
                            fullWidth
                            name="name"
                            variant="outlined"
                            required
                            autoFocus
                            component={renderTextField}
                        />
                        <Field
                            id="form-name"
                            label="Token"
                            style={{ margin: 8 }}
                            placeholder="Token"
                            helperText="Access token từ zalo"
                            fullWidth
                            name="tokenApp"
                            variant="outlined"
                            required
                            disabled
                            component={renderTextField}
                        />
                        <Field
                            variant="outlined"
                            id="form-desc"
                            label="Mô tả"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Mô tả về chatbot"
                            fullWidth
                            name="description"
                            multiline
                            rows="4"
                            component={renderTextField}
                        />

                        <Grid item xs={12}>
                            <Grid container justify="flex-end" spacing={2}>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        {updateBot ? 'Cập nhật' : 'Tạo mới'}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={hideModal}
                                    >
                                        Hủy bỏ
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>
        );
    }
}

BotModal.propTypes = {
    open: PropTypes.bool,
    classes: PropTypes.object,
    title: PropTypes.string,
    taskEdit: PropTypes.object,
    handleSubmit: PropTypes.func,
    handleSubmitBot: PropTypes.func,
};

export default withStyles(styles)(BotModal);
