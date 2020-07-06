import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    withStyles,
} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
    FaCompactDisc,
    FaDatabase,
    FaFileVideo,
    FaFont,
    FaListOl,
    FaRegImage,
} from 'react-icons/fa';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as blockAction from '../../../actions/block';
import * as elementTypes from '../../../constants/element';
import styles from './styles';
import TextBlock from '../../../components/Block/Text';
import AudioBlock from '../../../components/Block/Audio';
import VideoBlock from '../../../components/Block/Video';
import ImageBlock from '../../../components/Block/Image';
import ListOptions from '../../../components/Block/ListOptions';
import AttributeBlock from '../../../components/Block/Attribute';
import { toastMsgError } from '../../../commons/Toastify';
import BlockLoading from '../../../components/Loading/BlockLoading';

class ContentBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listElement: [],
            blockName: '',
            edit: false,
            open: false,
            confirm: '',
            defaultBlock: false,
            requestDelete: false,
            requestDeleteId: null,
        };
    }

    hanldeClickAddElement = (element_type, ...params) => {
        const { match, blockActionCreators } = this.props;
        const { blockId } = match.params;
        const { callApiAddEmptyElemnet } = blockActionCreators;
        if (params.length === 0) {
            callApiAddEmptyElemnet({ blockId, element_type });
        } else {
            let preId = params[0];
            callApiAddEmptyElemnet({ blockId, element_type, preId });
        }
    };

    fillDataToElement = (element, ...params) => {
        const { element_type, text_msg, _id } = element;
        switch (element_type) {
            case elementTypes.TEXT_ELEMENT: {
                return (
                    <TextBlock
                        text={text_msg}
                        id={_id}
                        onChange={this.changeTextMsg}
                    />
                );
            }
            case elementTypes.AUDIO_ELEMENT: {
                return (
                    <AudioBlock
                        src={text_msg}
                        id={_id}
                        onChange={this.changeTextMsg}
                    />
                );
            }
            case elementTypes.VIDEO_ELEMENT: {
                return (
                    <VideoBlock
                        src={text_msg}
                        id={_id}
                        onChange={this.changeTextMsg}
                    />
                );
            }
            case elementTypes.IMAGE_ELEMENT: {
                const { attachment_msg } = element;
                if (attachment_msg !== undefined && attachment_msg !== null) {
                    const { url } = attachment_msg.payload.elements[0];
                    return (
                        <ImageBlock
                            title={text_msg}
                            id={_id}
                            url={url}
                            upload={this.uploadImageToServer}
                            onChange={this.changeTextMsg}
                        />
                    );
                }
                return (
                    <ImageBlock
                        title={text_msg}
                        id={_id}
                        upload={this.uploadImageToServer}
                        onChange={this.changeTextMsg}
                    />
                );
            }
            case elementTypes.OPTION_ELEMENT: {
                const { attachment_msg } = element;
                if (attachment_msg !== undefined && attachment_msg !== null) {
                    const elements = attachment_msg.payload.elements;
                    return (
                        <ListOptions
                            title={text_msg}
                            id={_id}
                            elements={elements}
                            upload={this.uploadCard}
                            onChangeOptions={this.handleChangeOptions}
                        />
                    );
                }
                return (
                    <ListOptions
                        id={_id}
                        upload={this.uploadCard}
                        onChangeOptions={this.handleChangeOptions}
                    />
                );
            }
            case elementTypes.ATTR_ELEMENT: {
                const { text_msg, attribute, _id } = element;
                const nextElementType =
                    params[0] !== undefined
                        ? params[0].element_type
                        : elementTypes.ATTR_ELEMENT;
                if (
                    text_msg !== undefined &&
                    attribute !== undefined &&
                    text_msg !== null &&
                    attribute !== null
                ) {
                    return (
                        <AttributeBlock
                            id={_id}
                            textMsg={text_msg}
                            attribute={attribute}
                            onChange={this.changeTextMsg}
                            addQuestion={this.hanldeClickAddElement}
                            nextType={nextElementType}
                        />
                    );
                } else {
                    return (
                        <AttributeBlock
                            id={_id}
                            onChange={this.changeTextMsg}
                            textMsg={text_msg}
                            attribute={attribute}
                            addQuestion={this.hanldeClickAddElement}
                            nextType={nextElementType}
                        />
                    );
                }
            }
            default:
                break;
        }
    };

    uploadCard = data => {
        const { blockActionCreators } = this.props;
        const { callApiUploadCard } = blockActionCreators;
        callApiUploadCard(data);
    };

    handleChangeOptions = data => {
        const { blockActionCreators } = this.props;
        const { changeOptions } = blockActionCreators;
        changeOptions(data);
    };

    handleDeleteElement = elementId => {
        const { match, blockActionCreators } = this.props;
        const { callApiDeleteElement } = blockActionCreators;
        const { botId, groupId, blockId } = match.params;
        callApiDeleteElement({ botId, groupId, blockId, elementId });
        this.setState({
            requestDelete: false,
            requestDeleteId: null,
        });
    };

    renderAllElement = () => {
        const { classes, currentBlock } = this.props;
        let xhtml = null;
        if (
            currentBlock !== null &&
            currentBlock.elements !== undefined &&
            currentBlock.elements.length > 0
        ) {
            xhtml = currentBlock.elements.map((rawElement, index) => {
                let element = this.fillDataToElement(
                    rawElement,
                    currentBlock.elements[index + 1],
                );
                return (
                    <Grid container key={rawElement._id} className={classes.spaceLine}>
                        {element}
                        <Grid item sm={4}>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                                style={{ height: '100%' }}
                            >
                                <Grid item>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            this.handleOpenConfirmDelete(
                                                rawElement._id,
                                            )
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                );
            });
        }
        return xhtml;
    };

    handleOpenConfirmDelete = id => {
        this.setState({
            requestDelete: true,
            requestDeleteId: id,
        });
    };

    confirmDelete = () => {
        const { requestDeleteId, requestDelete } = this.state;
        return (
            <Dialog
                open={requestDelete}
                onClose={() =>
                    this.setState({
                        requestDelete: false,
                        requestDeleteId: null,
                    })
                }
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Xác nhận xóa hành động
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Hành động không thể hoàn tác! Bạn có chắc chắn muốn xóa
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() =>
                            this.handleDeleteElement(requestDeleteId)
                        }
                        style={{ color: '#DC3545' }}
                    >
                        Xác nhận xóa
                    </Button>
                    <Button
                        onClick={() =>
                            this.setState({
                                requestDelete: false,
                                requestDeleteId: null,
                            })
                        }
                        color="primary"
                        autoFocus
                    >
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    componentDidMount() {
        const { match, blockActionCreators } = this.props;
        const { botId, groupId, blockId } = match.params;
        const { callApiFetcheElements } = blockActionCreators;
        callApiFetcheElements({ botId, groupId, blockId });

    }

    componentWillMount() {
        const { group, match } = this.props;
        const { groupId, blockId } = match.params;
        group.forEach(g => {
            if (g._id === groupId) {
                g.blocks.forEach(b => {
                    if (b._id === blockId) {
                        this.setState({ blockName: b.name });
                    }
                });
            }
        });
    }

    handleChange = async event => {
        let { value } = event.target;
        const { blockActionCreators } = this.props;
        const { updateNameBlock } = blockActionCreators;
        await this.setState({
            blockName: value,
        });
        updateNameBlock({ name: this.state.blockName });
    };

    handleDelete = () => {
        this.setState({ open: true });
    };

    updateContentBlock = () => {
        const { blockActionCreators, match, currentBlock } = this.props;
        const { botId, groupId, blockId } = match.params;
        const { callApiUpdateElement } = blockActionCreators;
        if (
            currentBlock.name !== null &&
            currentBlock.name !== undefined &&
            currentBlock.name !== ''
        ) {
            callApiUpdateElement({
                botId,
                groupId,
                blockId,
                elements: currentBlock.elements,
                name: currentBlock.name,
            });
        } else {
            toastMsgError('Tên của Hành động không thể để trống!');
        }
    };

    render() {
        const { classes, editContent, defaultBlock, currentBlock } = this.props;
        return (
            <div id="content-block" >
                <form
                    className={classes.formContentBlock}
                    onSubmit={this.handleSubmit}
                    id="content-block-form"

                >
                    <div className={classes.root}>
                        <div style={{
                            position: 'sticky',
                            zIndex:'1000',
                            top: ' 14.5px',
                            right: ' 0',
                            backgroundColor: '#F9F8F8',
                        }}>
                            <Grid container className={classes.spaceLine}>
                                <Grid item sm={8}>
                                    <TextField
                                        id="block-title"
                                        name="blockName"
                                        variant="outlined"
                                        className={classes.blockTitle}
                                        defaultValue={
                                            currentBlock !== null
                                                ? currentBlock.name
                                                : this.state.blockName
                                        }
                                        fullWidth
                                        disabled={defaultBlock}
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item sm={4}>
                                    <Grid
                                        container
                                        direction="row"
                                        justify="center"
                                        alignItems="center"
                                        style={{ height: '100%' }}
                                    >
                                        <Grid item>
                                            {editContent ? (
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    type="button"
                                                    onClick={
                                                        this.updateContentBlock
                                                    }
                                                >
                                                    <BlockLoading/>
                                                    Lưu
                                                </Button>
                                            ) : (
                                                !defaultBlock && (
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={
                                                            this.handleDelete
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )
                                            )}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                        {this.renderAllElement()}
                        <Grid container className={classes.spaceLine}>
                            <Grid item sm={12}>
                                <Paper
                                    elevation={3}
                                    className={classes.controlPanel}
                                >
                                    <Button
                                        className={classes.btnControlPanel}
                                        onClick={() =>
                                            this.hanldeClickAddElement(
                                                elementTypes.TEXT_ELEMENT,
                                            )
                                        }
                                    >
                                        <FaFont />
                                        Văn bản
                                    </Button>
                                    <span
                                        className={classes.borderRight}
                                    ></span>
                                    <Button
                                        className={classes.btnControlPanel}
                                        onClick={() =>
                                            this.hanldeClickAddElement(
                                                elementTypes.IMAGE_ELEMENT,
                                            )
                                        }
                                    >
                                        <FaRegImage />
                                        Hình ảnh
                                    </Button>
                                    <span
                                        className={classes.borderRight}
                                    ></span>
                                    <Button
                                        className={classes.btnControlPanel}
                                        onClick={() =>
                                            this.hanldeClickAddElement(
                                                elementTypes.AUDIO_ELEMENT,
                                            )
                                        }
                                    >
                                        <FaCompactDisc />
                                        Âm thanh
                                    </Button>
                                    <span
                                        className={classes.borderRight}
                                    ></span>
                                    <Button
                                        className={classes.btnControlPanel}
                                        onClick={() =>
                                            this.hanldeClickAddElement(
                                                elementTypes.VIDEO_ELEMENT,
                                            )
                                        }
                                    >
                                        <FaFileVideo />
                                        Video Clip
                                    </Button>
                                    <span
                                        className={classes.borderRight}
                                    ></span>
                                    <Button
                                        className={classes.btnControlPanel}
                                        onClick={() =>
                                            this.hanldeClickAddElement(
                                                elementTypes.OPTION_ELEMENT,
                                            )
                                        }
                                    >
                                        <FaListOl />
                                        Thẻ chọn
                                    </Button>
                                    <span
                                        className={classes.borderRight}
                                    ></span>
                                    <Button
                                        className={classes.btnControlPanel}
                                        onClick={() =>
                                            this.hanldeClickAddElement(
                                                elementTypes.ATTR_ELEMENT,
                                            )
                                        }
                                    >
                                        <FaDatabase />
                                        Câu hỏi
                                    </Button>
                                </Paper>
                            </Grid>
                            {/* Đây là tranh control pannel */}
                        </Grid>
                    </div>
                </form>
                {this.renderModal()}
                {this.confirmDelete()}
            </div>
        );
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDeleteBlock = () => {
        const { blockActionCreators, match } = this.props;
        const { botId, groupId, blockId } = match.params;
        const { callApiDeleteBlock } = blockActionCreators;
        callApiDeleteBlock({ botId, groupId, blockId });
    };

    renderModal = () => {
        let xhtml = null;
        const { open } = this.state;
        xhtml = (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {this.state.blockName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có thực sự muốn xóa chuỗi hành động?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button
                        onClick={this.handleDeleteBlock}
                        color="default"
                        autoFocus
                    >
                        Xác nhận xóa
                    </Button>
                    <Button
                        autoFocus
                        onClick={this.handleClose}
                        color="secondary"
                    >
                       Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        );
        return xhtml;
    };

    // xử lí các hàm liên quan đến block

    uploadImageToServer = data => {
        const { blockActionCreators } = this.props;
        const { callApiUploadImage } = blockActionCreators;
        callApiUploadImage(data);
    };

    changeTextMsg = data => {
        const { blockActionCreators } = this.props;
        const { changeValueElement } = blockActionCreators;
        changeValueElement(data);
    };
}

ContentBlock.propTypes = {
    classes: PropTypes.object,
    handleSubmit: PropTypes.func,
    match: PropTypes.object,
    blockActionCreators: PropTypes.shape({
        callApiDeleteBlock: PropTypes.func,
        callApiFetcheElements: PropTypes.func,

        updateNameBlock: PropTypes.func,
        callApiAddEmptyElemnet: PropTypes.func,
        callApiUploadImage: PropTypes.func,
        callApiUploadCard: PropTypes.func,
        changeOptions: PropTypes.func,
        changeValueElement: PropTypes.func,
        callApiDeleteElement: PropTypes.func,
    }),
    currentBlock: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        elements: state.block.elements,
        currentBlock: state.block.currentBlock,
        editContent: state.block.editContent,
        listGroup: state.block.listGroup,
        defaultBlock: state.block.defaultBlock,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        blockActionCreators: bindActionCreators(blockAction, dispatch),
    };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(ContentBlock);
