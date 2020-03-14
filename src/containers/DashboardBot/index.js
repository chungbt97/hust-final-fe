import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ListBlock from '../../components/ListBlock';
import styles from './styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import ImageExam from '../../components/Block/ImageBlock/Image';
import { Route } from 'react-router-dom';

// example listBlock
const listBlock = [
    {
        id: 0,
        groupName: 'Default message',
        listBlock: [
            {
                title: 'Welcome message',
            },
            {
                title: 'Default message',
            },
        ],
    },
    {
        id: 1,
        groupName: 'Smart phone',
        listBlock: [
            {
                title: 'Samsung',
            },
            {
                title: 'Iphone',
            },
            {
                title: 'Xiaomi',
            },
        ],
    },
    {
        id: 2,
        groupName: 'Blackberry',
        listBlock: [
            {
                title: 'BB 9900',
            },
            {
                title: 'BB 9930',
            },
            {
                title: 'BB Q10',
            },
            {
                title: 'BB Classic',
            },
        ],
    },
];

class DashBoardBot extends Component {
    renderBlockRoutes = () => {
        // TO DO
        // Render all Block
        // return router from listblock
        return (
            <div>
                <Route
                    path="/admin/dashboard/:id/BB-9900"
                    component={props => (
                        <ImageExam {...props} isAuthed={true} />
                    )}
                />
                <Route
                    path="/admin/dashboard/:id/BB-9930"
                    component={props => (
                        <ImageExam {...props} isAuthed={true} />
                    )}
                />
                <Route
                    path="/admin/dashboard/BB-Q10"
                    component={props => (
                        <ImageExam {...props} isAuthed={true} />
                    )}
                />
                <Route
                    path="/admin/dashboard/BB-Classic"
                    component={props => (
                        <ImageExam {...props} isAuthed={true} />
                    )}
                />
            </div>
        );
    };
    handleChange = () => {
        console.log('Changing');
    };
    render() {
        const { classes, ...props } = this.props;
        return (
            <div className={classes.root}>
                <Grid container className={classes.container}>
                    <Grid item xs={4} className={classes.listBlock}>
                        <TextField
                            id="outlined-search"
                            label="Search field"
                            type="search"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightMedium"
                                fontFamily="Montserrat"
                                fontSize={14}
                                mt={1}
                            >
                                BLOCKS OF YOURS BOT
                            </Box>
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                mt={1}
                            >
                                Your bot consists of content ‘blocks’. Blocks
                                are like individual pages on a website.
                            </Box>
                        </Typography>
                        <ListBlock list={listBlock} {...props}/>
                    </Grid>
                    <Grid item xs={8} className={classes.blockContent}>
                        {this.renderBlockRoutes()}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

DashBoardBot.propTypes = {
    classes: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        state,
    };
};
const mapDispatchToProps = dispatch => {
    return {};
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(DashBoardBot);
