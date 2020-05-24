import {
    ClearOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { Box, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Avatar, Button, message, Modal, Select, Table } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as userAction from '../../actions/user';
import UserModal from '../../components/Modal/UserModal';
import styles from './styles';
import BlockLoading from '../../components/Loading/BlockLoading';
const { Option } = Select;

class Analyze extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attrSelected: '',
            valueSelected: '',
            querySelected: 'is',
            userSelected: [],
            dataTable: [],
            selectedRowKeys: [],
            detailUser: null,
            openModal: false,
            contentModal: null,
            titleModal: '',
            dataModal: {},
        };
    }

    showDetaiUser = phone => {
        const { listUser, listData, listBlock } = this.props;
        let userArr = listUser.filter(user => {
            return user.phone === phone;
        });
        let user = userArr[0];
        let attributes = listData.filter(attr => {
            return attr.user_id === user._id;
        });
        this.setState({
            titleModal: 'Thông tin chi tiết',
            detailUser: user,
            openModal: true,
            contentModal: (
                <UserModal
                    user={user}
                    attributes={attributes}
                    listBlock={listBlock}
                    onClose={this.handleCloseModal}
                    onSubmit={this.handleSendMessage}
                />
            ),
        });
    };

    handleSendMsgToPeople = () => {
        const { selectedRowKeys } = this.state;
        const { listBlock } = this.props;

        let attributes = [
            { _id: '0', name: 'zalo_name', value: 'Tên' },
            { _id: '1', name: 'zalo_phone', value: 'Số điện thoại' },
            { _id: '2', name: 'zalo_address', value: 'Địa chỉ' },
            { _id: '3', name: 'zalo_city', value: 'Thành phố' },
        ];
        this.setState({
            titleModal: 'Gửi tin nhắn cho',
            openModal: true,
            contentModal: (
                <UserModal
                    attributes={attributes}
                    listBlock={listBlock}
                    onClose={this.handleCloseModal}
                    onSubmit={this.handleSendMessage}
                    listUserId={selectedRowKeys}
                />
            ),
        });
    };

    handleSendMessage = data => {
        const { userActionCreators, match } = this.props;
        const { callApiSendMessage } = userActionCreators;
        const { botId } = match.params;
        const { blockId, recipientId, sendText, text } = data;
        callApiSendMessage({ botId, blockId, recipientId, sendText, text });
        this.handleCloseModal();
    };

    handleSearch = event => {
        const { userActionCreators, match } = this.props;
        const { callApiFetchUser } = userActionCreators;
        const { botId } = match.params;
        const { attrSelected, valueSelected, querySelected } = this.state;
        if (
            attrSelected === '' ||
            valueSelected === '' ||
            querySelected === ''
        ) {
            message.error('Bạn cần điền đầy đủ thông tin lọc');
        } else {
            callApiFetchUser({
                botId,
                name: attrSelected,
                value: valueSelected,
                query: querySelected,
            });
        }
    };

    componentDidMount() {
        const { userActionCreators, match } = this.props;
        const { callApiFetchUser } = userActionCreators;
        const { botId } = match.params;
        callApiFetchUser({
            botId,
            name: '',
            value: '',
            query: '',
        });
    }

    handleCloseModal = () => {
        this.setState({
            openModal: false,
            contentModal: null,
            titleModal: '',
            selectedRowKeys: [],
        });
    };

    handleChangeAttribute = value => {
        this.setState({
            attrSelected: value.value,
        });
    };

    handleChangeQuery = value => {
        this.setState({
            querySelected: value.value,
        });
    };

    handleChangeValue = value => {
        this.setState({
            valueSelected: value.value,
        });
    };

    handleResetFilter = () => {
        const { userActionCreators, match } = this.props;
        const { callApiFetchUser } = userActionCreators;
        const { botId } = match.params;
        callApiFetchUser({
            botId,
            name: '',
            value: '',
            query: '',
        });
        this.setState({
            attrSelected: '',
            valueSelected: '',
            querySelected: 'is',
        });
    };

    renderAllAttribute = () => {
        const { listAttr } = this.props;
        let xhtml = null;
        if (
            listAttr !== null &&
            listAttr !== undefined &&
            listAttr.length > 0
        ) {
            xhtml = listAttr.map((attr, index) => {
                return (
                    <Option key={index} value={attr}>
                        {attr}
                    </Option>
                );
            });
        }
        return xhtml;
    };

    renderValue = () => {
        const { listData } = this.props;
        const { attrSelected } = this.state;
        let xhtml = null;
        if (
            attrSelected !== '' &&
            listData !== null &&
            listData !== undefined &&
            listData.length > 0
        ) {
            xhtml = listData.map((data, index) => {
                if (data.name === attrSelected) {
                    return (
                        <Option key={data._id} value={data.value}>
                            {data.value}
                        </Option>
                    );
                }
                return null;
            });
        }
        return xhtml;
    };

    onSelectChange = selectedRowKeys => {
        console.log(selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const columns = [
            {
                title: 'Tên',
                dataIndex: 'avatar',
                render: src => <Avatar src={src} />,
                width: '50px',
                paddingRight: '0px',
            },
            {
                dataIndex: 'name',
                width: '150px',
            },
            {
                title: 'Tương tác cuối',
                dataIndex: 'lastSeen',
            },
            {
                title: 'Đăng kí',
                dataIndex: 'signUp',
            },
            {
                title: 'Phiên',
                dataIndex: 'totalSession',
            },
            {
                title: 'Thuộc tính',
                dataIndex: 'totalAttribute',
            },
            {
                title: 'Chi tiết',
                dataIndex: 'phone',
                width: '220px',
                render: phone => (
                    <Button onClick={() => this.showDetaiUser(phone)}>
                        Xem thêm
                    </Button>
                ),
            },
        ];
        const { classes, listUser, loading } = this.props;
        const {
            selectedRowKeys,
            attrSelected,
            valueSelected,
            querySelected,
        } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography component="div">
                            <Box fontSize="fontSize" mb={1}>
                                Bộ lọc thuộc tính
                            </Box>
                        </Typography>
                        <Typography component="div">
                            <Box fontSize="fontSize" m={1}>
                                <Grid container>
                                    <Select
                                        labelInValue
                                        style={{
                                            width: 240,
                                            marginRight: '10px',
                                        }}
                                        defaultValue={{ value: attrSelected }}
                                        onChange={this.handleChangeAttribute}
                                    >
                                        {this.renderAllAttribute()}
                                    </Select>

                                    <Select
                                        labelInValue
                                        style={{
                                            width: 150,
                                            marginRight: '10px',
                                        }}
                                        defaultValue={{ value: querySelected }}
                                        onChange={this.handleChangeQuery}
                                    >
                                        <Option value="not">không phải </Option>
                                        <Option value="is">là </Option>
                                    </Select>

                                    <Select
                                        labelInValue
                                        style={{
                                            width: 240,
                                            marginRight: '10px',
                                        }}
                                        defaultValue={{ value: valueSelected }}
                                        onChange={this.handleChangeValue}
                                    >
                                        {this.renderValue()}
                                    </Select>
                                    <Button
                                        type="primary"
                                        style={{ marginRight: '5px' }}
                                        icon={<SearchOutlined />}
                                        onClick={this.handleSearch}
                                    />
                                    <Button
                                        type="primary"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={this.handleResetFilter}
                                    />
                                </Grid>
                            </Box>
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <Typography component="div">
                            <Box fontSize="fontSize" mb={1}>
                                Danh sách người dùng
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div
                            style={{
                                marginBottom: 8,
                                display: 'flex',
                                justifyContent: 'space-around',
                            }}
                        >
                            <div style={{ width: '100%' }}>
                                <Button
                                    type="primary"
                                    onClick={this.handleSendMsgToPeople}
                                    disabled={!hasSelected}
                                >
                                    Gửi tin nhắn cho
                                </Button>
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected
                                        ? `${selectedRowKeys.length} người dùng được chọn`
                                        : ''}
                                </span>
                                {loading ? <BlockLoading /> : null}
                            </div>
                            <div>
                                <Button
                                    onClick={() => {
                                        this.setState({ selectedRowKeys: [] });
                                    }}
                                    icon={<ClearOutlined />}
                                ></Button>{' '}
                            </div>
                        </div>

                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={listUser}
                            size="middle"
                            scroll={{ y: 285 }}
                            yScroll={true}
                        />
                    </Grid>

                    <Modal
                        style={{ top: 20 }}
                        width={800}
                        title={this.state.titleModal}
                        visible={this.state.openModal}
                        footer={null}
                        onCancel={this.handleCloseModal}
                    >
                        {/* <UserModal /> */}
                        {this.state.contentModal}
                    </Modal>
                </Grid>
            </div>
        );
    }
}

Analyze.propTypes = {
    classes: PropTypes.object,
    listUser: PropTypes.array,
    listBlock: PropTypes.array,
    listData: PropTypes.array,
    listAttr: PropTypes.array,
    userActionCreators: PropTypes.shape({
        callApiFetchUser: PropTypes.func,
        callApiSendMessage: PropTypes.func,
    }),
};
const mapStateToProps = state => {
    return {
        listUser: state.user.listUser,
        listBlock: state.user.listBlock,
        listData: state.user.listData,
        listAttr: state.user.listAttr,
        loading: state.ui.loading,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        userActionCreators: bindActionCreators(userAction, dispatch),
    };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(styles), connectRedux)(Analyze);
