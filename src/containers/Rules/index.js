import { Box, Grid, Icon, Button, Chip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as ruleAction from '../../actions/rule';
import styles from './styles';
import LineRule from '../../components/LineRule';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';

class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            keyword: '',
            blocks: [],
            id: null,
        };
    }

    handleAddRule = () => {
        this.setState({ open: true });
    };

    renderAllRule = () => {
        let xhtml = null;
        const { listRuleFilter } = this.props;
        xhtml = listRuleFilter.map(rule => {
            return (
                <LineRule
                    key={rule.keyword}
                    idRule={rule._id}
                    blocks={rule.blocks}
                    keyword={rule.keyword}
                    onEdit={this.handleEditRule}
                    onDelete={this.handleDeleteRule}
                />
            );
        });
        return xhtml;
    };

    handleEditRule = (id, blocks, keyword) => {
        this.setState({
            id,
            blocks,
            keyword,
            open: true,
        });
    };

    handleDeleteRule = id => {
        const { ruleActionCreators, match } = this.props;
        const { botId } = match.params;
        const { callApiDeleteRule } = ruleActionCreators;
        callApiDeleteRule({ botId, ruleId: id });
    };

    componentDidMount() {
        const { ruleActionCreators, match } = this.props;
        const { botId } = match.params;
        const { callApiFetchRule } = ruleActionCreators;
        callApiFetchRule({ botId });
    }

    handleSearch = event => {
        const { value } = event.target;
        const { ruleActionCreators, match } = this.props;
        const { botId } = match.params;
        const { searchRule } = ruleActionCreators;
        searchRule({ botId, keyword: value });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container direction="row" justify="flex-start">
                    <Grid item xs={12} sm={7}>
                        <Box component="div" p={2} pr={3}>
                            <Box
                                variant="h6"
                                fontFamily="Montserrat"
                                fontWeight={500}
                            >
                                Thiết lập các rule - luật
                            </Box>

                            <Box
                                component="p"
                                fontFamily="Montserrat"
                                fontSize={12}
                                mt={1}
                            >
                                Luật bao gồm các cụm từ cách nhau bới dấu ","
                            </Box>
                            <Box
                                component="p"
                                fontFamily="Montserrat"
                                fontSize={12}
                                mt={1}
                                mr={2}
                            >
                                Chatbot của bạn sẽ dựa vào các luật để tìm các
                                cụm từ có trong tin nhắn của người dùng khi họ
                                nhắn tin đến chatbot của bạn.
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                mt={2}
                                ml={1}
                                mr={1}
                            >
                                <TextField
                                    id={`search`}
                                    name={`search`}
                                    variant="outlined"
                                    className={classes.inputSearch}
                                    placeholder="Từ khóa"
                                    fullWidth
                                    multiline
                                    onChange={this.handleSearch}
                                />
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    className={classes.buttonAddNewRule}
                    justify="center"
                >
                    <Grid item xs={5}>
                        <Box
                            className={classes.buttonSearch}
                            display="flex"
                            onClick={this.handleAddRule}
                        >
                            <Box className={classes.buttonText}>
                                Thiết lập luật mới...
                            </Box>
                            <Box className={classes.buttonIcon}>
                                <Icon className={classes.iconAddButton}>
                                    add_icon
                                </Icon>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container justify="center" className={classes.lineRule}>
                    <Grid item xs={10}>
                        <Grid container spacing={2}>
                            {this.renderAllRule()}
                        </Grid>
                    </Grid>
                </Grid>
                {this.renderModal()}
            </div>
        );
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            keyword: '',
            blocks: [],
            id: null,
        });
    };

    // handleChange = event => {
    //     const { ruleActionCreators } = this.props;
    //     const { changTitleRule } = ruleActionCreators;
    //     changTitleRule({ title: event.target.value });
    // };

    handleSubmit = e => {
        e.preventDefault();
        const { _title } = this.refs;
        const { id, blocks } = this.state;
        const { ruleActionCreators, match } = this.props;
        const { botId } = match.params;
        const { callApiAddRule, callApiupdateRule } = ruleActionCreators;
        if (id === null) {
            callApiAddRule({ botId, keyword: _title.value, blocks });
        } else {
            callApiupdateRule({
                botId,
                keyword: _title.value,
                blocks,
                ruleId: id,
            });
        }
        this.setState({ keyword: _title.value });
        this.handleClose();
    };

    handleAddBlockToRule = (event, value) => {
        const { blocks } = this.state;
        let existing = false;
        if (value !== null && value !== undefined) {
            for (let i = 0; i < blocks.length; i++) {
                if (blocks[i]._id === value._id) {
                    existing = true;
                    break;
                }
            }
            if (!existing) {
                this.setState({
                    blocks: [...blocks, value],
                });
            }
        }
    };

    renderBlocks = () => {
        let xhtml = null;
        const { allBlocks } = this.props;
        xhtml = (
            <Autocomplete
                style={{ width: '100%' }}
                id="size-small-filled-multi"
                size="small"
                options={allBlocks}
                getOptionLabel={option => option.name}
                onChange={this.handleAddBlockToRule}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option.name}
                            size="small"
                            color="primary"
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={params => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Block"
                        fullWidth
                        multiline
                    />
                )}
            />
        );

        return xhtml;
    };

    handleDeleteBlock = id => {
        const newBlocks = this.state.blocks.filter(block => {
            return block._id !== id;
        });
        this.setState({ blocks: newBlocks });
    };

    renderModal = () => {
        const { open, keyword, blocks } = this.state;
        const { classes } = this.props;
        let xhtml = null;
        xhtml = (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                className={classes.dialog}
            >
                <form>
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent style={{ width: '600px' }}>
                        <DialogContentText>
                            Keyword sẽ được thêm để làm dữ liệu cho bot trả lời.
                        </DialogContentText>
                        <textarea
                            rows="4"
                            placeholder="User say..."
                            ref="_title"
                            type="text"
                            name={`Rule`}
                            className={classes.textareaTitle}
                            defaultValue={keyword}
                        ></textarea>
                        {/* <TextField
                            name={`Rule`}
                            variant="outlined"
                            className={classes.inputRule}
                            defaultValue={keyword}
                            placeholder="User say..."
                            fullWidth
                            multiline
                            onChange={this.handleChange}
                        /> */}
                        <div className={classes.lineBlock}>
                            {blocks.map(block => (
                                <Chip
                                    key={block._id}
                                    variant="outlined"
                                    color="primary"
                                    label={block.name}
                                    size="small"
                                    onDelete={() =>
                                        this.handleDeleteBlock(block._id)
                                    }
                                />
                            ))}
                        </div>
                        <div className={classes.autocompleteBlock}>
                            {this.renderBlocks()}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.handleSubmit}
                            color="primary"
                            type="submit"
                        >
                            Xác nhận
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Hủy bỏ
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        );
        return xhtml;
    };
}

const mapStateToProps = state => {
    return {
        listRule: state.rule.listRule,
        listRuleFilter: state.rule.listRuleFilter,
        allBlocks: state.rule.allBlocks,
        bot: state.rule.bot,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        ruleActionCreators: bindActionCreators(ruleAction, dispatch),
    };
};
Rules.propTypes = {
    classes: PropTypes.object,
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(Rules);
