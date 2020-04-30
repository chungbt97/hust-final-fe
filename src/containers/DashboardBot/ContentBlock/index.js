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

class ContentBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listElement: [],
            blockName: '',
            edit: false,
            open: false,
            confirm: '',
        };
    }

    hanldeClickAddElement = element_type => {
        const { match, blockActionCreators } = this.props;
        const { blockId } = match.params;
        const { callApiAddEmptyElemnet } = blockActionCreators;
        callApiAddEmptyElemnet({ blockId, element_type });
    };

    fillDataToElement = element => {
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
                if (attachment_msg !== undefined) {
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
                if (attachment_msg !== undefined) {
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
            default:
                break;
        }
    };

    uploadCard = data => {
        const { blockActionCreators } = this.props;
        const { callApiUploadCard } = blockActionCreators;
        callApiUploadCard(data);
    }

    handleChangeOptions = data => {
        const { blockActionCreators } = this.props;
        const { changeOptions } = blockActionCreators;
        changeOptions(data);
    }

    renderAllElement = () => {
        // TO DO lúc này phải lấy từ list this prop
        const { classes, elements } = this.props;
        let xhtml = null;
        xhtml = elements.map((rawElement, index) => {
            let element = this.fillDataToElement(rawElement);
            return (
                <Grid container key={index} className={classes.spaceLine}>
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
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
        return xhtml;
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

    handleChange = event => {
        let { value } = event.target;
        this.setState({
            name: value,
            edit: true,
        });
    };

    handleDelete = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form
                    className={classes.formContentBlock}
                    onSubmit={this.handleSubmit}
                >
                    <div className={classes.root}>
                        <Grid container className={classes.spaceLine}>
                            <Grid item sm={8}>
                                <TextField
                                    id="block-title"
                                    name="blockName"
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={this.state.blockName}
                                    fullWidth
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
                                        {this.state.edit ? (
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                type="submit"
                                            >
                                                Save
                                            </Button>
                                        ) : (
                                            <IconButton
                                                aria-label="delete"
                                                onClick={this.handleDelete}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        {this.renderAllElement()}
                        <Grid container className={classes.spaceLine}>
                            <Grid item sm={9}>
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
                                        Text
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
                                        Image
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
                                        Audio
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
                                        Video
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
                                        Options
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
                                        Attribute
                                    </Button>
                                </Paper>
                            </Grid>
                            {/* Đây là tranh control pannel */}
                        </Grid>
                    </div>
                </form>
                {this.renderModal()}
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
                        Are you sure you want to delete this block?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={this.handleClose}
                        color="secondary"
                    >
                        Disagree
                    </Button>
                    <Button
                        onClick={this.handleDeleteBlock}
                        color="default"
                        autoFocus
                    >
                        Agree
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
        callApiFetcheElements: PropTypes.func,
        callApiUploadImage: PropTypes.func,
    }),
    currentBlock: PropTypes.object,
};
const mapStateToProps = state => {
    return {
        elements: state.block.elements,
        currentBlock: state.block.currentBlock,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        blockActionCreators: bindActionCreators(blockAction, dispatch),
    };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(ContentBlock);
