import { Button, Grid, Paper, TextField, withStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FaCompactDisc, FaDatabase, FaFileVideo, FaFont, FaRegCommentDots, FaRegImage, FaRoute } from 'react-icons/fa';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AudioBlock from '../../../components/Block/Audio';
import ImageBlock from '../../../components/Block/Image';
import RedirectBlock from '../../../components/Block/Redirect';
import TextBlock from '../../../components/Block/Text';
import TypingBlock from '../../../components/Block/Typing';
import VideoBlock from '../../../components/Block/Video';
import styles from './styles';

class ContentBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listElement: [],
        };
    }

    handleDeleteBlock = () => {
        //TO DO
        // confirm
    };

    hanldeClickAddElement = element => {
        let currentList = this.state.listElement;
        this.setState({
            listElement: [...currentList, element],
        });
    };

    renderAllElement = () => {
        // TO DO lúc này phải lấy từ list this prop
        const { classes } = this.props;
        let xhtml = null;
        xhtml = this.state.listElement.map((element, index) => {
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
        //TO DO
        // gọi đến saga để lấy toàn bộ Element trong block đó
    }

    render() {
        const { classes, match } = this.props;
        //console.log(this.props);
        const { id, idBlock } = match.params;
        return (
            <form className={classes.formContentBlock}>
                <div className={classes.root}>
                    <Grid container className={classes.spaceLine}>
                        <Grid item sm={8}>
                            <TextField
                                id="block-title"
                                name={`block-title-${id}-${idBlock}`}
                                variant="outlined"
                                className={classes.blockTitle}
                                defaultValue={'Tên của block'}
                                fullWidth
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
                                    <IconButton aria-label="delete">
                                        <DeleteIcon />
                                    </IconButton>
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
                                            <TextBlock />,
                                        )
                                    }
                                >
                                    <FaFont />
                                    Text
                                </Button>
                                <span className={classes.borderRight}></span>
                                <Button
                                    className={classes.btnControlPanel}
                                    onClick={() =>
                                        this.hanldeClickAddElement(
                                            <ImageBlock />,
                                        )
                                    }
                                >
                                    <FaRegImage />
                                    Image
                                </Button>
                                <span className={classes.borderRight}></span>
                                <Button
                                    className={classes.btnControlPanel}
                                    onClick={() =>
                                        this.hanldeClickAddElement(
                                            <AudioBlock />,
                                        )
                                    }
                                >
                                    <FaCompactDisc />
                                    Audio
                                </Button>
                                <span className={classes.borderRight}></span>
                                <Button
                                    className={classes.btnControlPanel}
                                    onClick={() =>
                                        this.hanldeClickAddElement(
                                            <VideoBlock />,
                                        )
                                    }
                                >
                                    <FaFileVideo />
                                    Video
                                </Button>
                                <span className={classes.borderRight}></span>
                                <Button
                                    className={classes.btnControlPanel}
                                    onClick={() =>
                                        this.hanldeClickAddElement(
                                            <TypingBlock />,
                                        )
                                    }
                                >
                                    <FaRegCommentDots />
                                    Typing
                                </Button>
                                <span className={classes.borderRight}></span>
                                <Button
                                    className={classes.btnControlPanel}
                                    onClick={() =>
                                        this.hanldeClickAddElement(
                                            <RedirectBlock
                                                block={{
                                                    title: 'Test thử cái',
                                                }}
                                            />,
                                        )
                                    }
                                >
                                    <FaRoute />
                                    Redirect
                                </Button>
                                <span className={classes.borderRight}></span>
                                {/* TO DO câu hỏi */}
                                <Button
                                    className={classes.btnControlPanel}
                                    onClick={() =>
                                        this.hanldeClickAddElement(
                                            <TextBlock />,
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
        );
    }
}

ContentBlock.propTypes = {
    classes: PropTypes.object,
    handleSubmit: PropTypes.func,
    match: PropTypes.object,
};
const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = dispatch => {
    return {};
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(ContentBlock);
