import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from './styles';
import { Grid } from '@material-ui/core';
import TextArea from '../../Block/Text';
import { Button, Select, Switch, Card, Table } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import './index.css';
import { CopyOutlined } from '@ant-design/icons';
const { Option } = Select;
const { Meta } = Card;

class UserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            blockSelect: '',
            sendText: true,
        };
    }

    handleChangeBlock = value => {
        this.setState({
            blockSelect: value.value,
        });
    };

    handleChangeText = data => {
        const { title } = data;
        this.setState({ text: title });
    };

    handleSwitchInput = checked => {
        this.setState({ sendText: checked });
    };

    handleAddText = attrName => {
        const { user } = this.props;
        let { text } = this.state;
        let id = user !== undefined ? user._id : 1325;
        let cursorPos = document.getElementById(`text-block-${id}`)
            .selectionStart;
        let startMsg = text.substring(0, cursorPos);
        let endMSg = text.substring(cursorPos, text.length);
        let textInput = startMsg.trim() + ` {{${attrName}}} ` + endMSg.trim();
        this.setState({ text: textInput });
    };

    handleSubmit = () => {
        const { onSubmit, user, listUserId } = this.props;
        const { text, blockSelect, sendText } = this.state;
        if (user !== undefined) {
            const { zaloId } = user;
            onSubmit({
                text,
                blockId: blockSelect,
                sendText,
                recipientId: [zaloId],
            });
        } else {
            onSubmit({
                text,
                blockId: blockSelect,
                sendText,
                recipientId: [...listUserId],
            });
        }
    };

    handleCancel = () => {
        const { onClose } = this.props;
        onClose();
    };

    render() {
        const { user, listBlock, attributes } = this.props;
        attributes.forEach(attr => {
            attr.key = attr._id;
        });
        const { sendText } = this.state;
        const columns = [
            {
                title: 'Thuộc tính',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Giá trị nhập',
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: 'Copy',
                dataIndex: 'name',
                key: 'name',
                render: name => (
                    <Button
                        type="primary"
                        icon={<CopyOutlined />}
                        onClick={() => this.handleAddText(name)}
                    />
                ),
            },
        ];
        attributes.forEach(attr => {
            attr.key = attr._id;
        });
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container>
                        {user !== undefined ? (
                            <Grid item xs={4}>
                                <Card
                                    style={{ width: 200 }}
                                    cover={
                                        <img alt="example" src={user.avatar} />
                                    }
                                >
                                    <Meta title={user.name} />
                                    <p>
                                        SĐT:
                                        {user.phone.length === 10
                                            ? user.phone
                                            : ''}
                                    </p>
                                    <a
                                        href={
                                            user.phone.length === 10
                                                ? `https://chat.zalo.me/?phone=${user.phone}`
                                                : 'https://oa.zalo.me/chatv2'
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Liên hệ trực tiếp
                                    </a>
                                </Card>
                                ,
                            </Grid>
                        ) : (
                            <> </>
                        )}
                        <Grid item xs={user !== undefined ? 8 : 12}>
                            <Table
                                pagination={false}
                                columns={columns}
                                dataSource={attributes}
                                size="small"
                                scroll={{ y: 285 }}
                                yScroll={true}
                                hideOnSinglePage={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 10 }}>
                    Tin nhắn văn bản
                    <Switch
                        style={{ marginLeft: 8 }}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={this.handleSwitchInput}
                        defaultChecked
                    />
                </Grid>
                <Grid item xs={12} style={{ marginBottom: 10 }}>
                    {sendText ? (
                        <TextArea
                            onChange={this.handleChangeText}
                            fullWidth={true}
                            id={user !== undefined ? user._id : 1325}
                            text={this.state.text}
                        />
                    ) : (
                        <Select
                            labelInValue
                            style={{
                                width: '100%',
                            }}
                            onChange={this.handleChangeBlock}
                        >
                            {listBlock.map(b => (
                                <Option key={b._id} value={b._id}>
                                    {b.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </Grid>
                <Grid
                    item
                    xs={12}
                    style={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                    <Button
                        style={{ marginRight: '10px' }}
                        size="small"
                        onClick={this.handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="primary"
                        size="small"
                        onClick={this.handleSubmit}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

UserModal.propTypes = {
    classes: PropTypes.object,
    user: PropTypes.object,
    listBlock: PropTypes.array,
};

export default withStyles(styles)(UserModal);
