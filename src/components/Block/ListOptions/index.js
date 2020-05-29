import { Box, Grid, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toastMsgError } from '../../../commons/Toastify';
import {
    DEFAULT_IMAGE,
    DEFAULT_SUBTITLE,
    DEFAULT_TITLE,
    OPTION_LINK,
} from '../../../constants/element';
import styles from './styles';

class ListOption extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            open: false,
            title: '',
            file: null,
            imageUrl: null,
            subtitle: '',
            openModalAdd: false,
            nameOption: '',
            urlOrPhone: '',
            type: null,
            indexEdit: null,
        };
    }

    onSelectFile = e => {
        if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            this.setState({
                file: file,
            });
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleClose = isDone => {
        const { id, upload } = this.props;
        if (!isDone) {
            this.setState({
                file: null,
                open: false,
            });
        } else {
            const { file, title, subtitle } = this.state;
            let url = '';
            if (file !== null) {
                url = URL.createObjectURL(file);
                // thuc hien upload anh len server va change data in store
                upload({ file, id, title, subtitle });
                this.setState({
                    file: null,
                    imageUrl: url,
                    open: false,
                });
            } else {
                toastMsgError('File is required');
            }
        }
    };

    renderModal = () => {
        const { open, title, subtitle } = this.state;
        const { id, classes } = this.props;
        let xhtml = null;
        xhtml = (
            <Dialog
                open={open}
                onClose={() => this.handleClose(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Card</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Nhập các trường và xem preview ở màn hình chính
                    </DialogContentText>

                    <Grid container>
                        <Grid item xs={12}>
                            <Typography component="div">
                                <Box
                                    fontWeight="fontWeightLight"
                                    fontFamily="Montserrat"
                                    fontSize={12}
                                    mt={1}
                                    ml={1}
                                    mb={1}
                                >
                                    Ảnh bìa
                                </Box>
                                <input
                                    id={`title-card-${id}`}
                                    type="file"
                                    accept="image/*"
                                    onChange={this.onSelectFile}
                                    className={classes.inputFile}
                                />
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography component="div">
                                <Box
                                    fontWeight="fontWeightLight"
                                    fontFamily="Montserrat"
                                    fontSize={12}
                                    mt={1}
                                    ml={1}
                                    mb={1}
                                >
                                    Title
                                </Box>

                                <TextField
                                    id={`title-${this.state.idImage}`}
                                    name={`title`}
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={title}
                                    placeholder="Tiêu đề chính"
                                    fullWidth
                                    required
                                    label="Tiêu đề chính"
                                    onChange={this.handleChange}
                                />
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography component="div">
                                <Box
                                    fontWeight="fontWeightLight"
                                    fontFamily="Montserrat"
                                    fontSize={12}
                                    mt={1}
                                    ml={1}
                                    mb={1}
                                >
                                    Subtile
                                </Box>
                                <TextField
                                    id={`subtitle-${this.state.idImage}`}
                                    name={`subtitle`}
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={subtitle}
                                    placeholder="Tiêu đề"
                                    fullWidth
                                    required
                                    multiline
                                    label="Tiêu đề chính"
                                    onChange={this.handleChange}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => this.handleClose(false)}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => this.handleClose(true)}
                        color="primary"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        );
        return xhtml;
    };

    handleCloseModalAdd = isDone => {
        const { id, onChangeOptions } = this.props;
        if (!isDone) {
            this.setState({
                openModalAdd: false,
                nameOption: '',
                urlOrPhone: '',
                type: null,
            });
        } else {
            let { options, nameOption, urlOrPhone, type } = this.state;
            if (nameOption === '' || urlOrPhone === '') {
                toastMsgError('Bạn cần điền đẩy đủ thông tin cho button');
            } else {
                console.log(type);
                if (type === null) {
                    toastMsgError('Bạn cần chọn 1 trong 3 loại button');
                } else {
                    let isAdd = true;
                    if (type === 'oa.open.sms' || type === 'oa.open.phone') {
                        // eslint-disable-next-line
                        let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

                        if (!vnf_regex.test(urlOrPhone)) {
                            isAdd = false;
                            toastMsgError(
                                'Số điện thoại nhập vào không hợp lệ',
                            );
                        }
                    } else if (type === 'oa.open.url') {
                        // eslint-disable-next-line
                        let vnf_regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
                        if (!vnf_regex.test(urlOrPhone)) {
                            isAdd = false;
                            toastMsgError('Url nhập vào không hợp lệ');
                        }
                    }
                    if (isAdd) {
                        options.push({
                            nameOption,
                            urlOrPhone,
                            type,
                        });
                        this.setState({
                            nameOption: '',
                            urlOrPhone: '',
                            type: null,
                            options: options,
                            openModalAdd: false,
                        });
                        onChangeOptions({ id, options });
                    }
                }
            }
        }
    };

    handleUpdateOption = () => {
        const { id, onChangeOptions } = this.props;
        const { options, indexEdit, nameOption, urlOrPhone, type } = this.state;
        options.forEach((op, index) => {
            if (index === indexEdit) {
                op.nameOption = nameOption;
                op.urlOrPhone = urlOrPhone;
                op.type = type;
            }
        });
        this.setState({
            openModalAdd: false,
            indexEdit: null,
            nameOption: '',
            urlOrPhone: '',
            type: null,
            options,
        });
        onChangeOptions({ id, options });
    };

    handleDelete = () => {
        const { id, onChangeOptions } = this.props;
        const { options, indexEdit } = this.state;
        let newOptions = options.filter((op, index) => {
            return index !== indexEdit;
        });
        this.setState({
            openModalAdd: false,
            nameOption: '',
            urlOrPhone: '',
            type: null,
            indexEdit: null,
            options: newOptions,
        });
        onChangeOptions({ id, options: newOptions });
    };

    renderModalAddOption = () => {
        const { classes } = this.props;
        const {
            openModalAdd,
            nameOption,
            urlOrPhone,
            type,
            indexEdit,
        } = this.state;
        let xhtml = null;
        xhtml = (
            <Dialog
                open={openModalAdd}
                onClose={() => this.handleCloseModalAdd(false)}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Card</DialogTitle>
                <DialogContent>
                    <DialogContentText>Thêm 1 option</DialogContentText>

                    <Grid container>
                        <Grid item xs={12}>
                            <Typography component="div">
                                <Box
                                    fontWeight="fontWeightLight"
                                    fontFamily="Montserrat"
                                    fontSize={12}
                                    mt={1}
                                    ml={1}
                                    mb={1}
                                >
                                    Tên của option
                                </Box>
                                <TextField
                                    id={`subtitle-${this.state.idImage}`}
                                    name="nameOption"
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={nameOption}
                                    placeholder="Tên"
                                    fullWidth
                                    required
                                    multiline
                                    label="Tên của option"
                                    onChange={this.handleChange}
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="div">
                                <Box
                                    fontWeight="fontWeightLight"
                                    fontFamily="Montserrat"
                                    fontSize={12}
                                    mt={1}
                                    ml={1}
                                    mb={1}
                                >
                                    Link url hoặc số điện thoại
                                </Box>
                                <TextField
                                    id={`subtitle-${this.state.idImage}`}
                                    name="urlOrPhone"
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={urlOrPhone}
                                    fullWidth
                                    required
                                    multiline
                                    label="Reference"
                                    onChange={this.handleChange}
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography component="div">
                                <Box
                                    fontWeight="fontWeightLight"
                                    fontFamily="Montserrat"
                                    fontSize={12}
                                    mt={1}
                                    ml={1}
                                    mb={1}
                                >
                                    Loại option
                                </Box>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="gender"
                                        name="type"
                                        value={type}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel
                                            value="oa.open.url"
                                            control={<Radio />}
                                            label="Link url"
                                        />
                                        <FormControlLabel
                                            value="oa.open.sms"
                                            control={<Radio />}
                                            label="SMS"
                                        />
                                        <FormControlLabel
                                            value="oa.open.phone"
                                            control={<Radio />}
                                            label="Phone Call"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>

                {indexEdit === null ? (
                    <DialogActions>
                        <Button
                            onClick={() => this.handleCloseModalAdd(false)}
                            color="primary"
                        >
                            Hủy
                        </Button>
                        <Button
                            onClick={() => this.handleCloseModalAdd(true)}
                            color="primary"
                        >
                            Thêm
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions>
                        <Button onClick={this.handleDelete} color="primary">
                            Xóa
                        </Button>
                        <Button
                            onClick={this.handleUpdateOption}
                            color="primary"
                        >
                            Sửa
                        </Button>
                    </DialogActions>
                )}
            </Dialog>
        );
        return xhtml;
    };

    handleOpenModal = () => {
        this.setState({ open: true });
    };

    componentWillMount() {
        const { elements } = this.props;
        if (elements !== undefined) {
            const main = elements[0];
            let options = [];
            for (let i = 1; i < elements.length; i++) {
                let type = elements[i].default_action.type;
                let urlOrPhone =
                    type !== OPTION_LINK
                        ? elements[i].default_action.payload.phone_code
                        : elements[i].default_action.url;
                let nameOption = elements[i].title;
                let op = { nameOption, urlOrPhone, type };
                options.push(op);
            }
            this.setState({
                title: main.title,
                imageUrl: main.image_url,
                subtitle: main.subtitle,
                options,
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { imageUrl, title, subtitle, options } = this.state;
        return (
            <Grid item sm={8}>
                <Card className={classes.root}>
                    <CardActionArea onClick={this.handleOpenModal}>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={imageUrl !== null ? imageUrl : DEFAULT_IMAGE}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="h2"
                            >
                                {title !== '' ? title : DEFAULT_TITLE}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                component="p"
                            >
                                {subtitle !== '' ? subtitle : DEFAULT_SUBTITLE}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions style={{ display: 'block' }}>
                        {options.map((option, index) => {
                            return (
                                <div style={{ margin: '8px' }} key={index}>
                                    <Button
                                        style={{ textTransform: 'capitalize' }}
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            this.setState({
                                                openModalAdd: true,
                                                nameOption: option.nameOption,
                                                urlOrPhone: option.urlOrPhone,
                                                type: option.type,
                                                edit: true,
                                                indexEdit: index,
                                            });
                                        }}
                                    >
                                        {option.nameOption}
                                    </Button>
                                </div>
                            );
                        })}
                        <div>
                            <Button
                                size="small"
                                color="primary"
                                onClick={() => {
                                    this.setState({
                                        openModalAdd: true,
                                        edit: false,
                                    });
                                }}
                            >
                                Thêm option
                            </Button>{' '}
                        </div>
                    </CardActions>
                </Card>
                {this.renderModal()}
                {this.renderModalAddOption()}
            </Grid>
        );
    }
}

ListOption.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ListOption);
