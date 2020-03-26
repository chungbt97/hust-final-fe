import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './styles';

class ImageBlock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: null,
            crop: {
                unit: '%',
                width: 30,
                aspect: 16 / 9,
            },
            open: false,
            croppedImageUrl: null,
            idImage: '',
        };
    }
    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                this.setState({ src: reader.result, open: true }),
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg',
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = isDone => {
        const {idImage} = this.state;
        if (isDone) {
            this.setState({
                open: false,
            });
        } else {
            this.setState({
                open: false,
                croppedImageUrl: null,
            });
            document.getElementById(idImage).value = '';
        }
    };

    renderModalCrop = () => {
        const { crop, src, open } = this.state;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Crop Image</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                            />
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleClose(true)}
                        color="primary"
                        autoFocus
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    componentWillMount() {
        this.setState({
            idImage: 'file-input',
        });
    }

    render() {
        const { croppedImageUrl, open, idImage } = this.state;
        const { classes } = this.props;
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

                        {croppedImageUrl && !open && (
                            <img
                                alt="Crop"
                                style={{ maxWidth: '100%' }}
                                src={croppedImageUrl}
                            />
                        )}
                    </div>
                </Paper>
                {this.renderModalCrop()}
            </Grid>
        );
    }
}

ImageBlock.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ImageBlock);
