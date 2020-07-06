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
import { FaCompactDisc } from 'react-icons/fa';
import styles from './styles';

class Audio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            message: '',
        };
    }

    componentWillMount() {
        const { src } = this.props;
        this.setState({
            url: src,
        });
    }

    handleChange = event => {
        const { id, onChange } = this.props;
        let { value } = event.target;
        onChange({ id, title: value });
        this.setState({
            url: value,
        });
        onChange(value);
    };

    render() {
        const { classes, id } = this.props;
        return (
            <Grid item sm={8}>
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <IconContext.Provider
                                value={{
                                    color: '#208ef0',
                                    className: 'audio-class-name',
                                }}
                            >
                                <div>
                                    <FaCompactDisc />
                                </div>
                            </IconContext.Provider>
                        }
                        title="Âm thanh"
                        className={classes.cardHeader}
                    />
                    <CardContent>
                        <Typography
                            component="p"
                            className={classes.infoCard}
                            paragraph
                            variant="body2"
                        >
                            Đường dẫn bạn điền vào dưới đây sẽ là địa chỉ URL của bên thứ 3 dấn đến file âm thanh của bạn! Kiểm tra kĩ trước khi lưu!
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <TextField
                            id={`audio-${id}`}
                            label="URL"
                            helperText="Example: https://dl.dropbox.com/s/sample.mp3"
                            fullWidth
                            defaultValue={this.state.url}
                            variant="outlined"
                            onChange={this.handleChange}
                            className={classes.urlInput}
                        />
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

Audio.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Audio);
