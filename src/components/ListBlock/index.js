import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
    withStyles,
    Paper,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { URL_BLOCK, URL_GROUP } from '../../constants';
import Block from '../Block';
import styles from './styles';
import { removeLastSlashUrl } from '../../commons/Method';
import { toastMsgError } from '../../commons/Toastify';

const menuId = 'button-more-group';
class ListBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            openModal: false,
            actionType: '',
            nameGroup: '',
            newNameGroup: '',
        };
    }
    renderAllBlock = group => {
        const { classes, match } = this.props;
        let { url } = match;
        let newUrl = removeLastSlashUrl(url);
        let xhtml = null;
        const { defaultGroup, blocks, _id } = group;
        xhtml = blocks.map((block, index) => {
            return (
                <Grid
                    item
                    xs={defaultGroup ? 12 : 4}
                    className={classes.Block}
                    key={index}
                >
                    <NavLink
                        to={`${newUrl}/${URL_GROUP}/${_id}/${URL_BLOCK}/${block._id}`}
                        className={classes.blockLink}
                        activeClassName={classes.activedBlockLink}
                    >
                        <Block title={block.name} defaultBlock={defaultGroup} />
                    </NavLink>
                </Grid>
            );
        });
        return xhtml;
    };
    renderButtonAddBlock = (id, defaultGroup) => {
        let { classes } = this.props;
        let xhtml = null;
        xhtml = defaultGroup ? null : (
            <Grid item xs={4} className={classes.Block}>
                <Paper elevation={3}>
                    <Button
                        className={classes.btnAddBlock}
                        onClick={this.addNewBlock}
                    >
                        +
                    </Button>
                </Paper>
            </Grid>
        );
        return xhtml;
    };

    addNewBlock = () => {
        this.setState({ openModal: true, actionType: 'block' });
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
                    className={classes.menuItem}
                    onClick={this.handleRenameGroup}
                >
                    Đổi tên
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={this.handleDeleteGroup}
                >
                    Xóa
                </MenuItem>
            </Menu>
        );
        return xhtml;
    };

    handleChange = event => {
        let { value } = event.target;
        this.setState({
            nameGroup: value,
        });
    };

    handleDeleteGroup = () => {
        this.setState({ openModal: true, actionType: 'delete' });
    };

    handleRenameGroup = () => {
        this.setState({ openModal: true, actionType: 'rename' });
    };

    handleCloseModal = () => {
        this.setState({
            openModal: false,
            open: false,
            actionType: '',
            name: '',
            anchorEl: null,
        });
    };
    handleOpenModal = () => {
        this.setState({ openModal: true });
    };
    handleSubmitModal = event => {
        event.preventDefault();
        const { actionType, nameGroup } = this.state;
        const {
            group,
            handleRenameGroup,
            handleDeleteGroup,
            addBlock,
        } = this.props;
        let { _id } = group;
        if (actionType === 'rename') {
            this.setState({ newNameGroup: nameGroup });
            handleRenameGroup({ _id, name: nameGroup });
        } else if (actionType === 'delete') {
            if (nameGroup === 'DELETE') handleDeleteGroup(_id);
            else toastMsgError('Bạn cần nhập đúng DELETE')
        } else {
            addBlock({ name: nameGroup, groupId: group._id });
        }
        this.handleCloseModal();
    };

    renderModalGroup = () => {
        let xhtml = null;
        const { openModal, actionType } = this.state;
        const { classes } = this.props;
        let title = '';
        let intro = '';
        if (actionType === 'rename') {
            title = 'Đổi tên';
            intro =
                ' Nhập TÊN mới của nhóm bên dưới để xác nhận rằng bạn muốn thay đổi.';
        } else if (actionType === 'delete') {
            title = 'Xóa nhóm';
            intro =
                'Hành động này không thể được hoàn tác. Nhập DELETE dưới đây để xác nhận rằng bạn muốn xóa vĩnh viễn NHÓM với tất cả người dùng.';
        } else {
            title = 'Thêm mới 1 hành động';
            intro =
                'Một hành động mới sẽ được tạo. Nhập tên cho hành động để tạo!';
        }
        xhtml = (
            <Dialog
                open={openModal}
                onClose={this.handleCloseModal}
                aria-labelledby="form-dialog-title"
            >
                <form
                    className={classes.form}
                    onSubmit={this.handleSubmitModal}
                >
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{intro}</DialogContentText>
                        <TextField
                            id="group-name"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Tên mới"
                            fullWidth
                            name="groupName"
                            variant="outlined"
                            required={true}
                            autoFocus
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" type="submit">
                            Xác nhận
                        </Button>
                        <Button onClick={this.handleCloseModal}>Hủy bỏ</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
        return xhtml;
    };

    componentDidMount() {
        const { group } = this.props;
        this.setState({ newNameGroup: group.name });
    }

    render() {
        const { group, classes } = this.props;
        const { newNameGroup } = this.state;
        return (
            <div>
                {!group.defaultGroup ? (
                    <Typography component="div">
                        <Box
                            fontWeight="fontWeightMedium"
                            fontFamily="Montserrat"
                            fontSize={14}
                            mt={1}
                            mb={1}
                            display="flex"
                        >
                            <Box width="100%">{newNameGroup}</Box>
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
                ) : (
                    <Typography component="div">
                        <Box
                            fontWeight="fontWeightMedium"
                            fontFamily="Montserrat"
                            fontSize={14}
                            mt={1}
                            mb={1}
                            display="flex"
                        >
                            {' '}
                        </Box>
                    </Typography>
                )}

                <Grid container spacing={1} className={classes.group}>
                    {this.renderAllBlock(group)}
                    {this.renderButtonAddBlock(group._id, group.defaultGroup)}
                </Grid>

                <Divider />
                {this.renderMenuCard()}
                {this.renderModalGroup()}
            </div>
        );
    }
}

ListBlock.propTypes = {
    list: PropTypes.array,
    classes: PropTypes.object,
    match: PropTypes.object,
    addBlock: PropTypes.func,
};

export default withStyles(styles)(ListBlock);
