import { Grid, TextField, withStyles, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styles from './styles';
import TextBlock from '../../../components/Block/Text';
import AudioBlock from '../../../components/Block/Audio';
import VideoBlock from '../../../components/Block/Video';
import TypingBlock from '../../../components/Block/Typing';

class ContentBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listElement: [],
        };
    }

    componentDidMount() {}

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
        const {classes} = this.props;
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
                        <Grid item sm={12}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    this.hanldeClickAddElement(<TextBlock />)
                                }
                            >
                                Text
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    this.hanldeClickAddElement(<AudioBlock />)
                                }
                            >
                                Audio
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    this.hanldeClickAddElement(<VideoBlock />)
                                }
                            >
                                Video
                            </Button>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={() =>
                                    this.hanldeClickAddElement(<TypingBlock />)
                                }
                            >
                                Typing
                            </Button>
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
