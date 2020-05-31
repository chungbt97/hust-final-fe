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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Button,
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { splitName } from '../../commons/Method';
import { MAX_LENGTH_RULE } from '../../constants';
import styles from './styles';
import { toastMsgError } from '../../commons/Toastify';
class LineRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: null,
            showMore: false,
            openModal: false,
            textConfirm: '',
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
        const { classes, idRule, onEdit, blocks, keyword, nameRule } = this.props;
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
                        onEdit(idRule, blocks, keyword, nameRule);
                        this.handleMenuClose();
                    }}
                >
                    Sửa
                </MenuItem>
                <MenuItem
                    className={classes.menuItem}
                    onClick={() => {
                        this.setState({ openModal: true });
                    }}
                >
                    Xóa
                </MenuItem>
            </Menu>
        );
        return xhtml;
    };

    renderAllBlocks = () => {
        const { blocks } = this.props;
        let xhtml = null;
        if (blocks !== null && blocks !== undefined && blocks.length > 0) {
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
        }
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
        const { classes, nameRule } = this.props;
        const { keyWordShow, showMore } = this.state;
        return (
            <Grid item sm={4}>
                <Paper elevation={3} className={classes.paper}>
                    <Typography component="div">
                        <Box
                            fontWeight={400}
                            fontFamily="Montserrat"
                            fontSize={12}
                            mb={1}
                            display="flex"
                        >
                            <Box
                                width="100%"
                                fontSize={12}
                                fontWeight="600"
                                color={'#208ef0'}
                            >{nameRule}</Box>
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
                {this.renderModalGroup()}
            </Grid>
        );
    }

    handleCloseModal = () => {
        this.handleMenuClose();
        this.setState({
            openModal: false,
            textConfirm: '',
        });
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmitModal = event => {
        event.preventDefault();
        const { textConfirm } = this.state;
        if (textConfirm === 'DELETE') {
            const {
                idRule,

                onDelete,
            } = this.props;
            onDelete(idRule);
            this.handleMenuClose();
        } else {
            toastMsgError('Bạn cần nhập đúng DELETE');
        }
    };

    renderModalGroup = () => {
        let xhtml = null;
        const { openModal } = this.state;
        const { classes } = this.props;
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
                    <DialogTitle id="form-dialog-title">
                        Xác nhận xóa
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Hành động này không thể được hoàn tác. Nhập DELETE
                            dưới đây để xác nhận rằng bạn muốn xóa vĩnh viễn
                            LUẬT với tất cả người dùng.
                        </DialogContentText>
                        <TextField
                            id="rule-confirm"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Nhập từ khóa DELETE"
                            fullWidth
                            name="textConfirm"
                            variant="outlined"
                            required={true}
                            autoFocus
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" type="submit">
                            Xóa
                        </Button>
                        <Button onClick={this.handleCloseModal}>Hủy bỏ</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
        return xhtml;
    };
}

LineRule.propTypes = {
    classes: PropTypes.object,
    id: PropTypes.number,
};

export default withStyles(styles)(LineRule);
