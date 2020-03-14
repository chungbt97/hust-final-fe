import { Box, Grid, Typography, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Block from '../Block';
import styles from './styles';
import { SPACE_CHARACTER, EM_DASH_CHARACTER } from '../../constants';

class ListBlock extends Component {
    handleClick = () => {
        console.log('CLick');
    };

    handleDelete = () => {
        console.log('Delete');
    };
    renderAllBlock = (id, list) => {
        const { classes, match } = this.props;
        let { url } = match;
        let xhtml = null;
        xhtml = list.map((block, index) => {
            let titleUrl = block.title
                .replace(SPACE_CHARACTER, EM_DASH_CHARACTER)
                .toLowerCase();
            return (
                <Grid item xs={id === 0 ? 12 : 4} className={classes.Block} key={index}>
                    <NavLink
                        to={`${url}/${titleUrl}`}
                        className={classes.blockLink}
                        activeClassName={classes.activedBlockLink}
                    >
                        <Block title={block.title} />
                    </NavLink>
                </Grid>
            );
        });
        return xhtml;
    };
    renderButtonAddBlock = id => {
        // TO DO
        // Gắn link group cho block
        let { classes, match } = this.props;
        let { url } = match;
        let xhtml = null;
        xhtml = id === 0 ? null : (
            <Grid item xs={4} className={classes.Block} >
                <NavLink
                    to={`${url}/${id}/newBlock`}
                    className={classes.blockLink}
                    activeClassName={classes.activedBlockLink}
                >
                    <Block title={null} />
                </NavLink>
            </Grid>
        );
        return xhtml;
    };
    render() {
        const { list, classes } = this.props;
        let xhtml = null;
        xhtml = list.map((group, index) => {
            return (
                <div key={index}>
                    <Typography component="div">
                        <Box
                            fontWeight="fontWeightMedium"
                            fontFamily="Montserrat"
                            fontSize={14}
                            mt={1}
                            mb={1}
                        >
                            {group.groupName}
                        </Box>
                    </Typography>

                    <Grid container spacing={1} className={classes.group}>
                        {this.renderAllBlock(group.id, group.listBlock)}
                        {this.renderButtonAddBlock(group.id)}
                    </Grid>
                </div>
            );
        });
        return <div className={classes.root}>{xhtml}</div>;
    }
}

ListBlock.propTypes = {
    list: PropTypes.array,
    classes: PropTypes.object,
    match: PropTypes.object,
};

export default withStyles(styles)(ListBlock);
