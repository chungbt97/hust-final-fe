import {
    Box,
    Grid,
    TextField,
    Typography,
    withStyles,
    Icon,
    IconButton,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
import * as elementTypes from '../../../constants/element';

class Attribute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attribute: '',
            question: '',
        };
    }

    handleAddQuestion = () => {
        const { id, addQuestion } = this.props;
        addQuestion(elementTypes.ATTR_ELEMENT, id);
    };

    handleChangeValue = async event => {
        const { id, onChange } = this.props;
        const { name, value } = event.target;
        await this.setState({
            [name]: value,
        });
        onChange({
            id: id,
            title: this.state.question,
            attribute: this.state.attribute,
        });
    };

    render() {
        const { classes, id, textMsg, attribute, nextType } = this.props;
        const showButton = nextType === elementTypes.ATTR_ELEMENT;
        return (
            <Grid item sm={8} className={classes.line} id={id}>
                <Grid container>
                    <Grid item sm={8}>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                ml={1}
                                mr={1}
                                mb={1}
                            >
                                Câu hỏi
                            </Box>
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                ml={1}
                                mr={1}
                                mb={1}
                            >
                                <TextField
                                    id={`question-${id}`}
                                    name={`question`}
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={
                                        textMsg !== undefined ? textMsg : ''
                                    }
                                    placeholder="Câu hỏi"
                                    fullWidth
                                    multiline
                                    onChange={this.handleChangeValue}
                                />
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item sm={4}>
                        <Typography component="div">
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={12}
                                ml={1}
                                mr={1}
                                mb={1}
                            >
                                Thuộc tính
                            </Box>
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
                                    name={`attribute`}
                                    variant="outlined"
                                    className={classes.blockTitle}
                                    defaultValue={
                                        attribute !== undefined ? attribute : ''
                                    }
                                    placeholder="Giá trị lưu"
                                    fullWidth
                                    onChange={this.handleChangeValue}
                                />
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>
                {!showButton ? (
                    <Grid container className={classes.lineButtonAdd}>
                        <Grid item sm={12}>
                            <Box
                                fontWeight="fontWeightLight"
                                fontFamily="Montserrat"
                                fontSize={10}
                                display="flex" justifyContent="center"
                            >
                                <IconButton
                                    aria-label="delete"
                                    className={classes.margin}
                                    size="small"
                                    onClick={this.handleAddQuestion}
                                >
                                    <Icon className={classes.iconAddButton}>
                                        add_icon
                                    </Icon>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                ) : (
                    <></>
                )}
            </Grid>
        );
    }
}

Attribute.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Attribute);
