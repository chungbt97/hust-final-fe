import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    Paper,
    Select,
    TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TextBlock from '../../components/Block/Text';
import styles from './styles';
import LineRule from '../../components/LineRule';

class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listBlock: [],
            listRule: [],
            idBlockSelected: null,
            textField: null,
            valuteArea: '',
            choosed: false,
            optionText: false,
            listWord: [],
        };
    }

    handleChange = event => {
        this.setState({
            idBlockSelected: event.target.value,
        });
    };

    handleChangeTextRep = value => {
        this.setState({
            valueText: value,
        });
    };

    renderOptionReply = () => {
        let xhtml = null;
        const { optionText, choosed } = this.state;
        const { classes } = this.props;
        if (choosed && optionText) {
            const { textField } = this.state;
            xhtml = (
                <Grid container className={classes.spaceLine}>
                    {textField}
                </Grid>
            );
        } else if (choosed && !optionText) {
            const { listBlock } = this.state;
            xhtml = (
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="outlined-age-native-simple">
                        Block
                    </InputLabel>
                    <Select
                        native
                        //value={this.state.block}
                        onChange={this.handleChange}
                        inputProps={{
                            id: 'outlined-age-native-simple',
                        }}
                        fullWidth
                        value={5}
                    >
                        <option aria-label="None" value="" />
                        {listBlock.map(block => (
                            <option key={block.id} value={block.id}>
                                {block.title}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            );
        } else {
            xhtml = <span></span>;
        }
        return xhtml;
    };

    componentDidUpdate() {
        (async () => {
            const response = await fetch(' http://localhost:8080/bots');
            if (response.status === 200) {
                let listResp = [];
                const blocks = await response.json();
                blocks.forEach((element, index) => {
                    listResp = [...listResp, element];
                });
                this.setState({
                    listBlock: listResp,
                });
            }
        })();
    }

    handleAddBlock = () => {
        this.setState({
            optionText: false,
            choosed: true,
        });
    };

    handleAddText = () => {
        this.setState({
            optionText: true,
            choosed: true,
            textField: (
                <TextBlock
                    fullWidth={true}
                    onChange={this.handleChangeTextRep}
                />
            ),
        });
    };

    handleClearAll = () => {
        this.setState({
            listBlock: [],
            idBlockSelected: null,
            textField: null,
            choosed: false,
            valueText: '',
            listWord: [],
        });
    };

    handleEditRule = () => {
        this.handleClearAll();
    };

    handleSaveRules = () => {
        const {
            listWord,
            optionText,
            listRule,
            idBlockSelected,
            valueText,
        } = this.state;
        if (optionText) {
            console.log(valueText);
            //TO DO
            // gọi saga gửi dữ liệu lên
        } else {
            console.log(idBlockSelected);
            //TO DO
            // gọi saga gửi dữ liệu lên
        }
        this.setState({
            listRule: [
                ...listRule,
                <LineRule
                    idBlock={idBlockSelected}
                    listWord={listWord}
                    valueText={valueText}
                    renderOptionReply={this.renderOptionReply}
                    renderBtnActions={this.renderBtnActions}
                    handleEnterWord={this.handleEnterWord}
                />,
            ],
        });
        this.handleClearAll();
    };

    handleEnterWord = event => {
        if (event.key === 'Enter') {
            // Do code here
            let value = event.target.value;
            let listWordAdd = value.split('\n');
            this.setState({
                listWord: listWordAdd,
            });
        }
    };

    renderBtnActions = () => {
        let xhtml = null;
        const { choosed } = this.state;
        const { classes } = this.props;
        if (choosed) {
            xhtml = (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        margin: '10px 0px',
                    }}
                >
                    <Button
                        size="small"
                        className={classes.btnSaveRule}
                        onClick={this.handleSaveRules}
                    >
                        Save
                    </Button>
                    <Button
                        size="small"
                        className={classes.margin}
                        onClick={this.handleClearAll}
                    >
                        Cancel
                    </Button>
                </div>
            );
        } else {
            xhtml = (
                <div>
                    <Button
                        size="small"
                        className={classes.marginButton}
                        onClick={this.handleAddBlock}
                        variant="outlined"
                        color="primary"
                    >
                        Block
                    </Button>
                    <Button
                        style={{ marginLeft: '15px' }}
                        size="small"
                        className={classes.marginButton}
                        onClick={this.handleAddText}
                        variant="outlined"
                        color="primary"
                    >
                        Text
                    </Button>
                </div>
            );
        }
        return xhtml;
    };

    renderAllRule = () => {
        const { listRule } = this.state;
        let xhtml = null;

        xhtml = listRule.map((rule, index) => (
            <LineRule
                key={index}
                idBlock={rule.idBlockSelected}
                listWord={rule.listWord}
                valueText={rule.valueText}
                renderOptionReply={this.renderOptionReply}
                renderBtnActions={this.renderBtnActions}
                handleEnterWord={this.handleEnterWord}
            />
        ));

        return xhtml;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container direction="row">
                    <Grid item xs={12} sm={8}>
                        <Box component="div" p={2} pr={3}>
                            <Box
                                variant="h6"
                                fontFamily="Montserrat"
                                fontWeight={500}
                            >
                                Set up how bot replies to text messages
                            </Box>

                            <Box
                                component="p"
                                fontFamily="Montserrat"
                                fontSize={12}
                            >
                                Your bot will understand user phrases similar to
                                those you write on the left and reply with some
                                text or a block. labore.
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box component="div" pt={5}>
                            <TextField
                                id="outlined-search"
                                label="Search field"
                                type="search"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}></Grid>
                </Grid>
                <Grid container direction="row" className={classes.newRule}>
                    <Grid item xs={12}>
                        <Box component="div" p={2}>
                            <Paper style={{ padding: '20px 15px' }}>
                                <Grid
                                    container
                                    direction="row"
                                    className={classes.inputRule}
                                    spacing={2}
                                >
                                    <Grid item xs={12} md={8}>
                                        <Box component="div" pt={1} pb={2}>
                                            <Box
                                                component="div"
                                                fontFamily="Montserrat"
                                                fontSize={12}
                                            >
                                                if user says something similar
                                                to:
                                            </Box>
                                        </Box>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Multiline"
                                            multiline
                                            rows="4"
                                            placeholder="Enter the new word"
                                            variant="outlined"
                                            fullWidth
                                            onKeyPress={this.handleEnterWord}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <Box component="div" pt={1} pb={2}>
                                            <Box
                                                component="div"
                                                fontFamily="Montserrat"
                                                fontSize={12}
                                            >
                                                if user says something similar
                                                to:
                                            </Box>
                                        </Box>
                                        {this.renderOptionReply()}
                                        <div
                                            className={
                                                classes.buttonChooseOption
                                            }
                                        >
                                            {this.renderBtnActions()}
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                {this.renderAllRule()}
            </div>
        );
    }
}

Rules.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Rules);
