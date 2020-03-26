import { Chip, Grid, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaRoute } from 'react-icons/fa';
import AutoCompleteInput from '../AutoComplete';
import styles from './styles';

class RedirectBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            options: [],
            idWillRedirect: null,
            statusNew: true,
            blockRedirect: null,
        };
    }

    handleToogleSuggetion = value => {
        this.setState({
            open: value,
        });
    };

    componentDidUpdate() {
        const { options, open } = this.state;
        let loading = open && options.length === 0;
        if (!loading) {
            return undefined;
        }
        (async () => {
            const response = await fetch(' http://localhost:8080/bots');
            await setTimeout(() => console.log('Đợi 2s'), 2000); // For demo purposes.
            if (response.status === 200) {
                let listResp = [];
                const blocks = await response.json();
                blocks.forEach((element, index) => {
                    listResp = [...listResp, element];
                });
                this.setState({
                    options: listResp,
                });
            }
        })();
    }

    // khi thay đổi block redirect đến
    handleOnChange = value => {
        this.setState({
            idWillRedirect: value.id,
            blockRedirect: value,
            statusNew: false,
        });
    };

    handleDelete = () => {
        this.setState({
            statusNew: true,
        })
    };

    renderBlockRedirect = () => {
        let xhtml = null;
        const { statusNew } = this.state;
        if (!statusNew) {
            let { blockRedirect } = this.state;
            xhtml = (
                <Chip
                    label={blockRedirect.title}
                    onDelete={this.handleDelete}
                    color="primary"
                    variant="outlined"
                />
            );
        } else {
            const { options, open } = this.state;
            let loading = open && options.length === 0;
            xhtml = (
                <AutoCompleteInput
                    label="Block"
                    helperText="ExampleBlock"
                    open={open}
                    options={options}
                    loading={loading}
                    toogle={this.handleToogleSuggetion}
                    style={{ width: '100%' }}
                    onChange={this.handleOnChange}
                    variant="outlined"
                />
            );
        }

        return xhtml;
    };

    componentWillMount() {
        const { block } = this.props;
        if (block !== null || block !== undefined) {
            this.setState({
                statusNew: false,
                blockRedirect: block
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item sm={8}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <IconContext.Provider
                                value={{
                                    color: '#208ef0',
                                    className: 'audio-class-name',
                                }}
                            >
                                <div>
                                    <FaRoute />
                                </div>
                            </IconContext.Provider>
                        }
                        title="Redirect to Block"
                        className={classes.cardHeader}
                    />
                    <CardContent>
                        <Typography
                            component="p"
                            className={classes.infoCard}
                            paragraph
                            variant="body2"
                        >
                            Redirect users to another block. Once redirected,
                            the user will not receive any further content from
                            the current block. The flow will continue in the
                            destination block. Learn more Optional: redirect
                            only
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        {this.renderBlockRedirect()}
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

RedirectBlock.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(RedirectBlock);
