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
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                mt={1}
                            >
                                Your bot consists of content ‘blocks’. Blocks
                                are like individual pages on a website.
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
                                    Create new group
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
                        Add new group
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            For easier navigation, you can also create groups of
                            blocks. So enter name of new group.
                        </DialogContentText>
                        <TextField
                            id="group-new"
                            style={{ margin: 8 }}
                            placeholder="Lorem"
                            helperText="Enter name of group"
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
                            Submit
                        </Button>
                        <Button onClick={this.handleCloseModal}>Cancel</Button>
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
