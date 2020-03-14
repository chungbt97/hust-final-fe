import { Button, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as botActions from '../../actions/bot';
import * as modalActions from '../../actions/modal';
import { toastMsgError } from '../../commons/Toastify';
import Bot from '../../components/Bot';
import BotModal from '../../components/Modal/BotModal';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { TYPE_MODAL } from '../../constants/modal';
import BotForm from './BotForm';
import styles from './styles';
import * as messageConstans from '../../constants/Messages';
class LobbyPage extends Component {
    renderAllChatBot = () => {
        const { listBot } = this.props;
        let xhtml = null;
        xhtml = listBot.map((bot, index) => {
            return (
                <Grid item xs={12} md={6} lg={3} key={index}>
                    <Bot
                        data={bot}
                        handleDelete={this.handleConfirmDeleteBot}
                        handleUpdate={this.handleUpdateBot}
                    />
                </Grid>
            );
        });
        return xhtml;
    };

    renderBotForm = () => {
        const {
            botEdit,
            open,
            title,
            modalActionCreators,
            typeModal,
        } = this.props;
        const { hideModal } = modalActionCreators;
        let updateBot = Boolean(botEdit);
        let xhtml = null;
        if (typeModal === TYPE_MODAL.BOT) {
            xhtml = (
                <BotForm>
                    <BotModal
                        formName={TYPE_MODAL.BOT}
                        open={open}
                        title={title}
                        hideModal={hideModal}
                        handleSubmitBot={this.handleSubmitForm}
                        updateBot={updateBot}
                    />
                </BotForm>
            );
        } else if (typeModal === TYPE_MODAL.CONFIRM) {
            xhtml = (
                <BotForm>
                    <ConfirmModal
                        formName={TYPE_MODAL.CONFIRM}
                        open={open}
                        handleSubmitBot={this.handleDeleteBot}
                        handleDelete={this.handleDeleteBot}
                        handleClose={hideModal}
                    />
                </BotForm>
            );
        }
        return xhtml;
    };

    handleUpdateBot = bot => {
        const { modalActionCreators, botActionCreators } = this.props;
        const { showModal, changeTitle } = modalActionCreators;
        const { chooseBotToEdit } = botActionCreators;
        chooseBotToEdit(bot);
        showModal(TYPE_MODAL.BOT);
        changeTitle(bot.title);
    };

    handleSubmitForm = data => {
        const { botActionCreators, botEdit } = this.props;
        const { addNewBot, updateBot } = botActionCreators;
        let { id, title, description } = data;
        let timestampNow = new Date();
        if (botEdit === null) {
            addNewBot({
                title,
                description,
                timestampCreate: timestampNow,
            });
        } else {
            let { timestampCreate } = botEdit;
            updateBot({
                id,
                title,
                description,
                lastTimeEdit: timestampNow,
                timestampCreate,
            });
        }
    };

    handleDeleteBot = data => {
        const { botActionCreators, botDelete } = this.props;
        const { deleteBot } = botActionCreators;
        let { confirmName } = data;
        let { title } = botDelete;
        if (confirmName === title) {
            deleteBot(botDelete.id, botDelete.title);
        } else {
            toastMsgError(messageConstans.ERROR_MESSAGE);
        }
    };

    handleConfirmDeleteBot = bot => {
        const { modalActionCreators, botActionCreators } = this.props;
        const { showModal } = modalActionCreators;
        const { confirmDeleteBot } = botActionCreators;
        showModal(TYPE_MODAL.CONFIRM);
        confirmDeleteBot(bot);
    };

    handleOpenBotModal = () => {
        const { modalActionCreators } = this.props;
        const { showModal, changeTitle } = modalActionCreators;
        showModal(TYPE_MODAL.BOT);
        changeTitle('New Chatbot');
    };

    componentDidMount() {
        const { botActionCreators } = this.props;
        const { fetchAllBots } = botActionCreators;
        fetchAllBots();
    }

    render() {
        const { classes } = this.props;
        return (

                <div className={classes.root} spacing={2}>
                    <div>
                        <Button
                            className={classes.btnAdd}
                            onClick={this.handleOpenBotModal}
                        >
                            <AddIcon />
                            Add new ChatBot
                        </Button>
                    </div>

                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                        spacing={2}
                    >
                        {this.renderAllChatBot()}
                    </Grid>
                    {this.renderBotForm()}
                </div>

        );
    }
}

LobbyPage.propTypes = {
    classes: PropTypes.object,
    listBot: PropTypes.array,
    modalActionCreators: PropTypes.shape({
        showModal: PropTypes.func,
        changeTitle: PropTypes.func,
        hideModal: PropTypes.func,
    }),
    botActionCreators: PropTypes.shape({
        fetchAllBots: PropTypes.func,
        deleteBot: PropTypes.func,
    }),
    open: PropTypes.bool,
    title: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        listBot: state.bot.listBot,
        botEdit: state.bot.botEdit,
        botDelete: state.bot.botDelete,
        open: state.modal.open,
        title: state.modal.title,
        typeModal: state.modal.typeModal,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        modalActionCreators: bindActionCreators(modalActions, dispatch),
        botActionCreators: bindActionCreators(botActions, dispatch),
    };
};
const connectRedux = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), connectRedux)(LobbyPage);
