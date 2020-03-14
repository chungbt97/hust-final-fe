import { Grid, Link, Menu, MenuItem } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import avatarDefault from '../../assets/images/avatar_bot_default.jpg';
import * as actionsCommon from '../../commons/Method';
import { MAX_LENGTH_BOT_NAME } from '../../constants';
import styles from './styles';

const menuId = 'primary-search-account-menu';
class Bot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
        };
    }

    handleMenuOpen = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    handleDeleteBot = () => {
        const { handleDelete, data } = this.props;
        handleDelete(data);
        this.handleMenuClose();
    };

    handleUpdateBot = () => {
        const { handleUpdate, data } = this.props;
        handleUpdate(data);
        this.handleMenuClose();
    };

    renderMenuCard = () => {
        const { anchorEl } = this.state;
        const { classes } = this.props;
        const isMenuOpen = Boolean(anchorEl);
        // const { id } = data;
        let xhtml = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleUpdateBot}>
                    <Typography className={classes.menuItem}>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={this.handleDeleteBot}>
                    <Typography className={classes.menuItem}>Delete</Typography>
                </MenuItem>
            </Menu>
        );
        return xhtml;
    };
    render() {
        const { classes, data } = this.props;
        const { id, title, description, avatar, timestampCreate } = data;
        let charAvatar = title.charAt(0);
        let bgColor = actionsCommon.getColorWithAlphaber(charAvatar);
        let timeCreated = actionsCommon.convertTimestampToDate(timestampCreate);
        let miniTitle =
            title.length > MAX_LENGTH_BOT_NAME
                ? actionsCommon.splitName(title, MAX_LENGTH_BOT_NAME)
                : title;
        return (
            <div>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                style={{ backgroundColor: bgColor }}
                                className={classes.charAvatar}
                            >
                                {charAvatar}
                            </Avatar>
                        }
                        action={
                            <IconButton
                                aria-label="settings"
                                onClick={this.handleMenuOpen}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={miniTitle}
                        subheader={timeCreated}
                    />
                    <CardMedia
                        className={classes.media}
                        image={avatar == null ? avatarDefault : avatar}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.descriptionBot}
                        >
                            {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            {/* <NavLink
                                to={`/admin/${id}`}
                                className={classes.linkDashboard}
                                activeClassName={classes.activedBlockLink}
                            >
                                Connect
                            </NavLink> */}
                            <Link
                                href={`/admin/${id}`}
                                className={classes.linkDashboard}
                            >
                                Connect
                            </Link>
                        </Grid>
                    </CardActions>
                </Card>
                {this.renderMenuCard()}
            </div>
        );
    }
}

Bot.propTypes = {
    classes: PropTypes.object,
    data: PropTypes.object,
    handleDelete: PropTypes.func,
    handleUpdate: PropTypes.func,
};

export default withStyles(styles)(Bot);
