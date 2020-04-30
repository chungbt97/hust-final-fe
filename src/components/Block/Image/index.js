import { Box, Grid, Paper, TextField, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './styles';

class ImageBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            open: false,
            imageUrl: null,
            idImage: '',
            title: '',
            url: '',
            file: null,
        };
    }
    onSelectFile = e => {
        const { id, upload } = this.props;
        const { title } = this.state;
        if (e.target.files && e.target.files.length > 0) {
            let url = URL.createObjectURL(e.target.files[0]);
            let file = e.target.files[0];
            this.setState({
                file: file,
                imageUrl: url,
            });
            upload({ file, id, title });
        }
    };

    handleChangeTitle = event => {
        const {id, onChange} = this.props;
        let { value } = event.target;
        onChange({id, title: value});
        this.setState({
            title: value,
        });
    };

    componentDidMount() {
        const { url, id, title } = this.props;
        this.setState({
            idImage: `file-input-${id}`,
            imageUrl: url,
            title: title,
        });
    }

    render() {
        const { imageUrl, open, idImage, title } = this.state;
        const { classes, id } = this.props;
        return (
            <Grid item sm={8}>
                <Paper elevation={3}>
                    <div className="App">
                        <div>
                            <input
                                id={idImage}
                                type="file"
                                accept="image/*"
                                onChange={this.onSelectFile}
                                className={classes.inputFile}
                            />
                        </div>

                        {imageUrl && !open && (
                            <div>
                                <Typography component="div">
                                    <Box
                                        fontWeight="fontWeightLight"
                                        fontFamily="Montserrat"
                                        fontSize={12}
                                        ml={1}
                                        mr={1}
                                        mb={1}
                                    >
                                        <TextField
                                            id={this.state.idImage}
                                            name={`titleImage-${id}`}
                                            variant="outlined"
                                            className={classes.blockTitle}
                                            defaultValue={title}
                                            placeholder="Tiêu đề"
                                            fullWidth
                                            onChange={this.handleChangeTitle}
                                        />
                                    </Box>
                                </Typography>
                                <div
                                    style={{
                                        width: '100%',
                                        height: '300px',
                                        background: `url(${imageUrl})`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'contain',
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>
                </Paper>
            </Grid>
        );
    }
}

ImageBlock.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ImageBlock);
