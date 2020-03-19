import { Box, Grid, Paper, Slider, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BlockLoading from '../../Loading/BlockLoading';
import styles from './styles';

const marks = [
    {
        value: 0,
        label: '0s',
    },
    {
        value: 5,
        label: '5s',
    },
    {
        value: 10,
        label: '10s',
    },
    {
        value: 15,
        label: '15s',
    },
    {
        value: 20,
        label: '20s',
    },
];
class Typing extends Component {
    handleonChangeCommitted = (event, newValue) => {
        console.log(newValue);
    }
    valuetext = value => {
        return `${value}s`;
    };
    render() {
        const { classes } = this.props;
        return (
            <Grid item sm={8}>
                <Paper elevation={3}>
                    <BlockLoading />
                    <Typography variant="body1" gutterBottom className={classes.titleTyping} component="span">
                        Show "typing…" for at least
                    </Typography>
                    <Box m={3} marginTop={4}>
                        <Slider
                            defaultValue={2}
                            getAriaValueText={this.valuetext}
                            step={1}
                            marks={marks}
                            valueLabelDisplay="on"
                            min={0}
                            max={20}
                            onChangeCommitted={(event, newValue) => this.handleonChangeCommitted(event, newValue)}
                        />
                    </Box>
                </Paper>
            </Grid>
        );
    }
}

Typing.propTypes = {
    claases: PropTypes.object,
};

export default withStyles(styles)(Typing);
