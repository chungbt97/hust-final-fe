import {
    Box,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography,
    withStyles,
    Chip,
    Avatar,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { splitName } from '../../commons/Method';
import { MAX_LENGTH_RULE } from '../../constants';
import styles from './styles';
class LineRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            showMore: false,
        };
    }

    handleMenuClose = () => {
        this.setState({
            anchorEl: null,
            open: false,
        });
    };

    handleMenuOpen = e => {
        this.setState({
            anchorEl: e.currentTarget,
        });
    };

    renderMenuCard = () => {
        const { anchorEl } = this.state;
        const {
            classes,
            idRule,
            onEdit,
            onDelete,
            blocks,
            keyword,
        } = this.props;
        const open = Boolean(anchorEl);
        // const { id } = data;
        let xhtml = (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={`menu-${idRule}`}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={open}
                onClose={this.handleMenuClose}
                className={classes.menuDrop}
            >
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                        onEdit(idRule, blocks, keyword);
                        this.handleMenuClose();
                    }}
                >
                    Edit
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                        onDelete(idRule);
                        this.handleMenuClose();
                    }}
                >
                    Delete
                </MenuItem>
            </Menu>
        );
        return xhtml;
    };

    renderAllBlocks = () => {
        const { blocks } = this.props;
        let xhtml = null;
        xhtml = blocks.map(block => {
            return (
                <Chip
                    key={block._id}
                    id={`block-${block._id}`}
                    variant="outlined"
                    color="primary"
                    avatar={<Avatar>{block.name.charAt(0)}</Avatar>}
                    label={block.name}
                    size="small"
                />
            );
        });
        return xhtml;
    };

    componentWillMount() {
        const { keyword } = this.props;
        let keyWordShow =
            keyword.length > MAX_LENGTH_RULE
                ? splitName(keyword, MAX_LENGTH_RULE)
                : keyword;
        let showMore = keyword.length > MAX_LENGTH_RULE;
        this.setState({
            keyWordShow,
            showMore,
        });
    }

    handleShowMore = () => {
        const { keyword } = this.props;
        this.setState({
            keyWordShow: keyword,
            showMore: false,
        });
    };

    render() {
        const { classes, idRule } = this.props;
        const { keyWordShow, showMore } = this.state;
        return (
            <Grid item sm={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component="div">
                        <Box
                            fontWeight="fontWeightMedium"
                            fontFamily="Montserrat"
                            fontSize={12}
                            mb={1}
                            display="flex"
                        >
                            <Box width="100%" fontSize={12}>{idRule}</Box>
                            <Box flexShrink={0} className={classes.buttonMore}>
                                <IconButton
                                    aria-label="display more actions"
                                    color="inherit"
                                    className={classes.iconMore}
                                    onClick={this.handleMenuOpen}
                                >
                                    <MoreIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        </Box>
                    </Typography>

                    <Typography component="div">
                        <Box
                            fontWeight="fontWeightMedium"
                            fontFamily="Montserrat"
                            fontSize={14}
                            mt={1}
                            mb={1}
                            display="flex"
                        >
                            {keyWordShow}
                        </Box>
                        {showMore ? (
                            <Box
                                fontWeight="fontWeightMedium"
                                fontFamily="Montserrat"
                                fontSize={12}
                                className={classes.showMore}
                                onClick={this.handleShowMore}
                            >
                                Show more...
                            </Box>
                        ) : null}
                    </Typography>
                    <Typography component="div" className={classes.blocks}>
                        <Box
                            fontWeight="fontWeightMedium"
                            fontFamily="Montserrat"
                            fontSize={14}
                            mt={1}
                            mb={1}
                            className={classes.lineBlock}
                        >
                            {this.renderAllBlocks()}
                        </Box>
                    </Typography>
                </Paper>
                {this.renderMenuCard()}
            </Grid>
        );
    }
}

LineRule.propTypes = {
    classes: PropTypes.object,
    id: PropTypes.number,
};

export default withStyles(styles)(LineRule);
