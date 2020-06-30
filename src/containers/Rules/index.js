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
            name: '',
            blocks: [],
            id: null,
            notifyName: 'Tên của luật. VD: Lorem ipsum',
            notifyKeyword:
                'Các từ khóa phân tách nhau bởi dấu , : VD: chó, mèo, gà, ...',
            validName: true,
            validKey: true,
        };
    }

    handleAddRule = () => {
        this.setState({ open: true });
    };

    renderAllRule = () => {
        let xhtml = null;
        const { listRuleFilter } = this.props;
        if (
            listRuleFilter !== undefined &&
            listRuleFilter !== null &&
            listRuleFilter.length > 0
        ) {
            xhtml = listRuleFilter.map(rule => {
                return (
                    <LineRule
                        key={rule.keyword}
                        idRule={rule._id}
                        nameRule={rule.name}
                        blocks={rule.blocks}
                        keyword={rule.keyword}
                        onEdit={this.handleEditRule}
                        onDelete={this.handleDeleteRule}
                    />
                );
            });
        }
        return xhtml;
    };

    handleEditRule = (id, blocks, keyword, name) => {
        this.setState({
            id,
            blocks,
            keyword,
            name,
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

    handleSubmit = e => {
        e.preventDefault();
        const { _title, _name } = this.refs;
        let validName = true;
        let validKey = true;
        let notifyName = this.state.notifyName;
        let notifyKeyword = this.state.notifyKeyword;
        let regexKeyWord = /^(((\s)*(\w)+(\s)*)+,?)+$/g;
        let name = _name.value;
        let title = _title.value;
        title = title.replace(
            /ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự|Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g,
            'u',
        );
        title = title.replace(
            /á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ|Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ/g,
            'a',
        );
        title = title.replace(/đ|Đ/g, 'd');
        title = title.replace(
            /é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ|É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ/g,
            'e',
        );
        title = title.replace(/í|ì|ỉ|ĩ|ị|Í|Ì|Ỉ|Ĩ|Ị/g, 'i');
        title = title.replace(
            /ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ|Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g,
            'o',
        );
        title = title.replace(/ý|ỳ|ỷ|ỹ|ỵ|Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, 'y');
        if (name.length === 0) {
            notifyName = 'Bạn cần nhập tên cho luật';
            validName = false;
        }
        if (title.length === 0) {
            notifyKeyword = 'Bạn cần nhập từ khóa cho luật';
            validKey = false;
        }
        if (!regexKeyWord.test(title)) {
            notifyKeyword =
                'Bạn cần nhập từ khóa đúng định dạng: từ khóa, từ khóa, từ khóa...';
            validKey = false;
        }
        if (validName && validKey) {
            const { id, blocks } = this.state;
            const { ruleActionCreators, match } = this.props;
            const { botId } = match.params;
            const { callApiAddRule, callApiupdateRule } = ruleActionCreators;
            let keyword = _title.value;
            if (keyword.charAt(keyword.length - 1) === ',') {
                // eslint-disable-next-line
                keyword = keyword.substring(0, title.length - 1);
            }
            if (id === null) {
                callApiAddRule({ botId, keyword, blocks, name });
            } else {
                callApiupdateRule({
                    botId,
                    name,
                    keyword: keyword,
                    blocks,
                    ruleId: id,
                });
            }
            this.setState({ keyword });
            this.handleClose();
        } else if (!validName && validKey) {
            this.setState({ notifyName, validName });
        } else if (!validKey && validName) {
            this.setState({ notifyKeyword, validKey });
        } else {
            this.setState({ notifyName, notifyKeyword, validName, validKey });
        }
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
                        label="Chuỗi hành động"
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
        const {
            open,
            keyword,
            blocks,
            name,
            notifyName,
            notifyKeyword,
            validName,
            validKey,
        } = this.state;
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
                    <DialogTitle id="form-dialog-title">
                        Thiết lập luật mới
                    </DialogTitle>
                    <DialogContent style={{ width: '600px' }}>
                        <DialogContentText>
                            Keyword sẽ được thêm để làm dữ liệu cho bot trả lời.
                        </DialogContentText>
                        <Box
                            fontWeight="fontWeightLight"
                            fontFamily="Montserrat"
                            fontSize={12}
                            mb={1}
                        >
                            <input
                                type="text"
                                id="name-rule"
                                ref="_name"
                                name="name-rule"
                                className={classes.blockTitle}
                                defaultValue={name}
                                placeholder="Tên của luật"
                            />
                        </Box>
                        <div
                            style={validName ? null : { color: 'red' }}
                            className={classes.invalid}
                        >
                            {notifyName}
                        </div>
                        <textarea
                            rows="4"
                            placeholder="chuỗi từ khóa..."
                            ref="_title"
                            type="text"
                            name={`Rule`}
                            className={classes.textareaTitle}
                            defaultValue={keyword}
                        ></textarea>
                        <div
                            style={validKey ? null : { color: 'red' }}
                            className={classes.invalid}
                        >
                            {notifyKeyword}
                        </div>
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
                            type="button"
                        >
                            Xác nhận
                        </Button>
                        <Button onClick={this.handleClose}>Hủy bỏ</Button>
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
