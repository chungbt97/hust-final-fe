import { Box, Grid, Paper, TextField, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';
class LineRule extends Component {
    render() {
        const {
            classes,
            //idBlock,
            listWord,
            //valueText,
            renderOptionReply,
            renderBtnActions,
            handleEnterWord,
        } = this.props;
        console.log(this.props);
        return (
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
                                            if user says something similar to:
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
                                        defaultValue={listWord}
                                        onKeyPress={handleEnterWord}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Box component="div" pt={1} pb={2}>
                                        <Box
                                            component="div"
                                            fontFamily="Montserrat"
                                            fontSize={12}
                                        >
                                            if user says something similar to:
                                        </Box>
                                    </Box>
                                    {renderOptionReply()}
                                    <div className={classes.buttonChooseOption}>
                                        {renderBtnActions()}
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

LineRule.propTypes = {
    classes: PropTypes.object,
    idBlock: PropTypes.number,
    listWord: PropTypes.array,
    valueText: PropTypes.string,
    renderOptionReply: PropTypes.func,
    renderBtnActions: PropTypes.func,
    handleEnterWord: PropTypes.func,
};

export default withStyles(styles)(LineRule);
