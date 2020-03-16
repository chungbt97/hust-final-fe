import { Box, Divider, Grid, IconButton, Menu, MenuItem, Typography, withStyles } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { BLOCK_DEFAUT_ID, URL_BLOCK } from '../../constants';
import Block from '../Block';
import styles from './styles';

const menuId = 'button-more-group';
class ListBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
        };
    }

    handleClick = () => {
        console.log('CLick');
    };

    handleDelete = () => {
        console.log('Delete');
    };
    renderAllBlock = (idBot, list) => {
        const { classes, match } = this.props;
        let { url } = match;
        let xhtml = null;
        xhtml = list.map((block, index) => {
            return (
                <Grid
                    item
                    xs={idBot === BLOCK_DEFAUT_ID ? 12 : 4}
                    className={classes.Block}
                    key={index}
                >
                    <NavLink
                        to={`${url}/${URL_BLOCK}/${block.id}`}
                        className={classes.blockLink}
                        activeClassName={classes.activedBlockLink}
                    >
                        <Block title={block.title} />
                    </NavLink>
                </Grid>
            );
        });
        return xhtml;
    };
    renderButtonAddBlock = id => {
        // TO DO
        // Gắn link group cho block
        let { classes, match } = this.props;
        let { url } = match;
        let xhtml = null;
        xhtml =
            id === BLOCK_DEFAUT_ID ? null : (
                <Grid item xs={4} className={classes.Block}>
                    <NavLink
                        to={`${url}/${URL_BLOCK}/${id}/newBlock`}
                        className={classes.blockLink}
                        activeClassName={classes.activedBlockLink}
                    >
                        <Block title={null} />
                    </NavLink>
                </Grid>
            );
        return xhtml;
    };

    handleMenuOpen = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
            open: false,
        });
    };

    renderMenuCard = () => {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const open = Boolean(anchorEl);
        // const { id } = data;
        let xhtml = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={this.handleMenuClose}
                className={classes.menuDrop}
            >
                <MenuItem
                    onClick={this.handleUpdateBot}
                    className={classes.menuItem}
                >
                    Rename
                </MenuItem>
                <MenuItem onClick={this.handleDeleteBot}>Delete</MenuItem>
            </Menu>
        );
        return xhtml;
    };

    render() {
        const { group, classes } = this.props;
        return (
            <div>
                <Typography component="div">
                    <Box
                        fontWeight="fontWeightMedium"
                        fontFamily="Montserrat"
                        fontSize={14}
                        mt={1}
                        mb={1}
                        display="flex"
                    >
                        <Box width="100%">{group.groupName}</Box>
                        <Box flexShrink={0} className={classes.buttonMore}>
                            <IconButton
                                aria-label="display more actions"
                                color="inherit"
                                className={classes.iconMore}
                                onClick={this.handleMenuOpen}
                            >
                                <MoreIcon
                                    fontSize="small"
                                />
                            </IconButton>
                        </Box>
                    </Box>
                </Typography>

                <Grid container spacing={1} className={classes.group}>
                    {this.renderAllBlock(group.id, group.listBlock)}
                    {this.renderButtonAddBlock(group.id)}
                </Grid>

                <Divider />
                {this.renderMenuCard()}
            </div>
        );
    }
}

ListBlock.propTypes = {
    list: PropTypes.array,
    classes: PropTypes.object,
    match: PropTypes.object,
};

export default withStyles(styles)(ListBlock);
