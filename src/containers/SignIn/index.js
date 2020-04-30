import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
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

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        let { userEmail, password } = this.state;
        const { accountActionCreators } = this.props;
        const { signInAccount } = accountActionCreators;
        signInAccount({ userEmail, password });
    };

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                component="main"
                className={classes.root}
                method="POST"
                autoComplete="off"
            >
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form
                            className={classes.form}
                            noValidate
                            onSubmit={this.handleSubmit}
                        >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userEmail"
                                label="Email Address"
                                name="userEmail"
                                autoComplete="email"
                                autoFocus
                                onChange={this.handleChangeInput}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.handleChangeInput}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="sign-up" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>
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
SignIn.propTypes = {
    claases: PropTypes.object,
    accountActionCreators: PropTypes.shape({
        signInAccount: PropTypes.func,
    }),
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(SignIn);
