import { Grid, TextField, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IconContext } from 'react-icons';
import { FaFileVideo } from 'react-icons/fa';
import styles from './styles';

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item sm={8}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <IconContext.Provider
                                value={{
                                    color: '#208ef0',
                                    className: 'video-class-name',
                                }}
                            >
                                <div>
                                    <FaFileVideo/>
                                </div>
                            </IconContext.Provider>
                        }
                        title="Audio"
                        className={classes.cardHeader}
                    />
                    <CardContent>
                        <Typography
                            component="p"
                            className={classes.infoCard}
                            paragraph
                            variant="body1"
                            m={1}
                        >
                            Send a video file in the chat.
                        </Typography>
                        <Typography
                            component="p"
                            className={classes.infoCard}
                            paragraph
                            variant="body2"
                        >
                            Upload a video to cloud storage, obtain the direct
                            download link and paste it here. Maximum file size
                            is 20 MB. Supported format is MP4.
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <TextField
                            id="outlined-full-width"
                            label="URL"
                            helperText="Example: https://dl.dropbox.com/s/sample.mp4"
                            fullWidth
                            variant="outlined"
                        />
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

Video.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Video);
