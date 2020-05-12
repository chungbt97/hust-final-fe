import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { bindActionCreators, compose } from 'redux';
import * as blockAction from '../../actions/block';
import ListBlock from '../../components/ListBlock';
import { URL_BLOCK, URL_BOT, URL_GROUP } from '../../constants';
import ContentBlock from './ContentBlock';
import styles from './styles';

class DashBoardBot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            name: '',
            nameSubmit: '',
        };
    }
    renderBlockRoutes = () => {
        const { listGroup } = this.props;
        return (
            <Route
                path={`/admin/dashboard/${URL_BOT}/:botId/${URL_GROUP}/:groupId/${URL_BLOCK}/:blockId`}
                component={props => (
                    <ContentBlock {...props} group={listGroup} />
                )}
            />
        );
    };

    handleRenderListBlock = () => {
        const { classes, listGroup, newBlock, ...props } = this.props;
        let xhtml = null;
        xhtml = listGroup.map((group, index) => {
            return (
                <ListBlock
                    key={index}
                    group={group}
                    {...props}
                    handleRenameGroup={this.renameGroup}
                    handleDeleteGroup={this.deleteGroup}
                    addBlock={this.addNewBlockDefault}
                />
            );
        });
        return xhtml;
    };

    renameGroup = data => {
        const { blockActionCreators, match } = this.props;
        const { callApiUpdateGroupName } = blockActionCreators;

        callApiUpdateGroupName({
            groupId: data._id,
            name: data.name,
            botId: match.params.botId,
        });
    };

    deleteGroup = id => {
        const { blockActionCreators, match } = this.props;
        const { callApiDeleteGroup } = blockActionCreators;
        callApiDeleteGroup({ groupId: id, botId: match.params.botId });
    };

    componentDidMount() {
        const { blockActionCreators, match } = this.props;
        const { callApiFetch } = blockActionCreators;
        const { botId } = match.params;
        callApiFetch(botId);
    }

    handleSearch = event => {
        let value = event.target.value;
        const { blockActionCreators, match } = this.props;
        const { botId } = match.params;
        const { searchBlock } = blockActionCreators;
        searchBlock({ botId, keySearch: value });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container className={classes.container}>
                    <Grid item xs={4} className={classes.listBlock}>
                        <TextField
                            id="outlined-search"
                            label="Tên block"
                            type="search"
                            variant="outlined"
                            size="small"
                            fullWidth
                            onChange={this.handleSearch}
                            className={classes.inputSearch}
                        />
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                mt={1}
                            >
                                Chatbot bao gồm các "khối" - block. Khối giống
                                như 1 chuỗi tin nhắn mà chatbot sẽ trả lời.
                            </Box>
                        </Typography>
                        <hr className="MuiDivider-root"></hr>

                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                mt={1}
                                mb={1}
                            >
                                <Button
                                    className={classes.btnAdd}
                                    onClick={this.handleAddGroup}
                                >
                                    <AddIcon />
                                    Tạo nhóm mới
                                </Button>
                            </Box>
                        </Typography>
                        <hr className="MuiDivider-root"></hr>

                        {this.handleRenderListBlock()}
                    </Grid>
                    <Grid item xs={8} className={classes.blockContent}>
                        {this.renderBlockRoutes()}
                    </Grid>
                </Grid>
                {this.renderModalAddGroup()}
            </div>
        );
    }

    handleAddGroup = () => {
        this.setState({ open: true });
    };

    handleChange = event => {
        let { value } = event.target;
        this.setState({
            name: value,
        });
    };

    handleCloseModal = () => {
        this.setState({ open: false, name: '', nameSubmit: '' });
    };

    handleSubmitModal = event => {
        event.preventDefault();
        const { blockActionCreators, match } = this.props;
        const { name } = this.state;
        const { callApiAddGroup } = blockActionCreators;
        callApiAddGroup({ botId: match.params.botId, name });
        this.handleCloseModal();
    };

    renderModalAddGroup = () => {
        let xhtml = null;
        const { open } = this.state;
        const { classes } = this.props;
        xhtml = (
            <Dialog
                open={open}
                onClose={this.handleCloseModal}
                aria-labelledby="form-dialog-title"
            >
                <form
                    className={classes.form}
                    onSubmit={this.handleSubmitModal}
                >
                    <DialogTitle id="form-dialog-title">
                        Tạo nhóm mới
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{fontSize: '14px'}}>
                            Để điều hướng dễ dàng hơn, bạn cũng có thể tạo các
                            nhóm khối. Vì vậy, nhập
                            tên của nhóm mới.
                        </DialogContentText>
                        <TextField
                            id="group-new"
                            style={{ margin: 8 }}
                            placeholder="ABC"
                            helperText="Tên nhóm"
                            fullWidth
                            name="groupName"
                            variant="outlined"
                            required
                            autoFocus
                            onChange={this.handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" type="submit">
                            Tạo nhóm
                        </Button>
                        <Button onClick={this.handleCloseModal}>Hủy tạo</Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
        return xhtml;
    };

    addNewBlockDefault = data => {
        const { name, groupId } = data;
        const { blockActionCreators, match } = this.props;
        const { callApiAddBlock } = blockActionCreators;
        callApiAddBlock({
            botId: match.params.botId,
            groupId,
            url: match.url,
            name,
        });
    };
}

DashBoardBot.propTypes = {
    classes: PropTypes.object,
    blockActionCreators: PropTypes.shape({
        callApiUpdateGroupName: PropTypes.func,
        callApiDeleteGroup: PropTypes.func,
        callApiFetch: PropTypes.func,
        callApiAddGroup: PropTypes.func,
        callApiAddBlock: PropTypes.func,
        searchBlock: PropTypes.func,
    }),
    listGroup: PropTypes.array,
};
const mapStateToProps = state => {
    return {
        listGroup: state.block.listGroup,
        newBlock: state.block.newBlock,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        blockActionCreators: bindActionCreators(blockAction, dispatch),
    };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(DashBoardBot);
