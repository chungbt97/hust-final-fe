import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as accountActions from '../../actions/account';
import styles from './styles';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userEmail: '',
            password: '',
        };
    }

    handleChangeInput = e => {
        let nameField = e.target.name;
        let valueInput = e.target.value;
        this.setState({
            [nameField]: valueInput,
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        //toastNotify.toastSuccess(messageConstants.NOT_CHECKED);
        let { firstName, lastName, userEmail, password } = this.state;
        const { accountActionCreators } = this.props;
        const { signUpAccount } = accountActionCreators;
        signUpAccount({ firstName, lastName, userEmail, password });
    };

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={this.handleSubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={this.handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={this.handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="userEmail"
                                    autoComplete="email"
                                    onChange={this.handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={this.handleChangeInput}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onSubmit={this.handleSubmit}
                        >
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/sign-in" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}
const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = dispatch => {
    return {
        accountActionCreators: bindActionCreators(accountActions, dispatch),
    };
};
SignUp.propTypes = {
    claases: PropTypes.object,
    accountActionCreators: PropTypes.shape({
        signUpAccount: PropTypes.func,
    }),
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(SignUp);
