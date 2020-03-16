import { Box, Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { compose } from 'redux';
import ListBlock from '../../components/ListBlock';
import { URL_BLOCK, URL_BOT } from '../../constants';
import ContentBlock from './ContentBlock';
import styles from './styles';

// example listBlock
const listBlock = [
    {
        id: 131325,
        groupName: 'Default message',
        listBlock: [
            {
                id: 99,
                title: 'Welcome message',
            },
            {
                id: 100,
                title: 'Default message',
            },
        ],
    },
    {
        id: 1,
        groupName: 'Smart phone',
        listBlock: [
            {
                id: 25,
                title: 'Samsung',
            },
            {
                id: 52,
                title: 'Iphone',
            },
            {
                id: 1313,
                title: 'Xiaomi',
            },
        ],
    },
    {
        id: 2,
        groupName: 'Blackberry',
        listBlock: [
            {
                id: 9900,
                title: 'BB 9900',
            },
            {
                id: 9930,
                title: 'BB 9930',
            },
            {
                id: 10,
                title: 'BB Q10',
            },
            {
                id: 20,
                title: 'BB Classic',
            },
        ],
    },
];

class DashBoardBot extends Component {
    renderBlockRoutes = () => {
        // TO DO
        // Render all Block
        // return router from listblock "/admin/dashboard/:id/BB-9900"
        return (
            <div>
                <Route
                    path={`/admin/dashboard/${URL_BOT}/:idBot/${URL_BLOCK}/:idBlock`}
                    component={props => (
                        <ContentBlock {...props} isAuthed={true} />
                    )}
                />
            </div>
        );
    };
    handleChange = () => {
        console.log('Changing');
    };

    handleRenderListBlock = () => {
        const { classes, ...props } = this.props;
        let xhtml = null;
        xhtml = listBlock.map((group, index) => {
            return (
                <ListBlock key={index} group={group} {...props}/>
            );
        });
        console.log(new Date());
        return xhtml;
    }

    render() {
        const { classes } = this.props;
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
                        {this.handleRenderListBlock()}
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
