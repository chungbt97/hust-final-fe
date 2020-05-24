import { Grid, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as botActions from '../../actions/bot';
import styles from './styles';
class HomePage extends Component {
    componentDidMount() {
        const { botActionCreators, match } = this.props;
        const { botId } = match.params;
        const { callApiGetDataBot } = botActionCreators;
        callApiGetDataBot({ botId });
    }

    render() {
        const {
            classes,
            botSelected,
            totalFollowers,
            totalRules,
            totalBlocks,
            totalSession,
        } = this.props;
        if (botSelected !== null) {
            console.log(botSelected);
        }
        let cover = botSelected !== null ? botSelected.cover : '';
        let name = botSelected !== null ? botSelected.name : '';
        let avatar = botSelected !== null ? botSelected.avatar : '';
        let description = botSelected !== null ? botSelected.description : '';
        let oa_id = botSelected !== null ? botSelected.oa_id : '';
        description = description.replace(/\\n/g, '<br /> - ');
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} md={5} style={{ position: 'relative' }}>
                        <Paper elevation={3}>
                            <div
                                className={classes.imageCover}
                                style={{
                                    backgroundImage: `url(${cover})`,
                                    backgroundSize: 'cover',
                                }}
                            ></div>

                            <div className={classes.imageAvatar}>
                                <img
                                    className={classes.imageAvatarTag}
                                    src={avatar}
                                    alt="Ảnh avatar"
                                />
                            </div>
                            <div className={classes.nameBot}>{name}</div>
                            <div className={classes.oaId}>
                                <a
                                    href={`https://zalo.me/${oa_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {oa_id}
                                </a>
                            </div>
                            <div
                                className={classes.description}
                                style={{ padding: '15px' }}
                            >
                                {ReactHtmlParser(description)}
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={7} style={{ padding: '10px' }}>
                        <Grid container>
                            <Grid item xs={5}>
                                Số người theo dõi
                            </Grid>
                            <Grid item xs={5} style={{paddingLeft: '10px'}}>
                                {totalFollowers}
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container>
                            <Grid item xs={5}>
                                Số luật
                            </Grid>
                            <Grid item xs={5} style={{paddingLeft: '10px'}}>
                                {totalRules}
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container>
                            <Grid item xs={5}>
                                Số chuỗi hành động
                            </Grid>
                            <Grid item xs={5} style={{paddingLeft: '10px'}}>
                                {totalBlocks}
                            </Grid>
                        </Grid>
                        <hr />
                        <Grid container>
                            <Grid item xs={5}>
                                Tổng số phiên
                            </Grid>
                            <Grid item xs={5} style={{paddingLeft: '10px'}}>
                                {totalSession}
                            </Grid>
                        </Grid>
                        <hr />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

HomePage.propTypes = {
    classes: PropTypes.object,
    botActionCreators: PropTypes.shape({
        callApiGetDataBot: PropTypes.func,
    }),
};
const mapStateToProps = state => {
    return {
        botSelected: state.bot.botSelected,
        totalFollowers: state.bot.totalFollowers,
        totalRules: state.bot.totalRules,
        totalBlocks: state.bot.totalBlocks,
        totalSession: state.bot.totalSession,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        botActionCreators: bindActionCreators(botActions, dispatch),
    };
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(HomePage);
