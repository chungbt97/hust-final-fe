import * as types from '../constants/block';

export const callApiFetch = botId => {
    return {
        type: types.API_FETCH_GROUP_BLOCK,
        payload: { botId },
    };
};

export const fetchGroupAndBlock = data => {
    return {
        type: types.FETCH_BLOCK,
        payload: { data },
    };
};

export const callApiUpdateGroupName = data => {
    return {
        type: types.API_UPDATE_NAME_GROUP,
        payload: data,
    };
};

export const updateGroupName = data => {
    //const { _id, name } = data;
    return {
        type: types.UPDATE_NAME_GROUP,
        payload: data,
    };
};

export const callApiDeleteGroup = data => {
    return {
        type: types.API_DELETE_GROUP,
        payload: data,
    };
};

export const deleteGroup = id => {
    return {
        type: types.DELETE_GROUP,
        payload: { _id: id },
    };
};

export const callApiAddGroup = data => {
    return {
        type: types.API_ADD_GROUP,
        payload: data,
    };
};

export const addGroup = group => {
    return {
        type: types.ADD_GROUP,
        payload: group,
    };
};

export const callApiAddBlock = data => {
    console.log(data);
    return {
        type: types.API_ADD_BLOCK,
        payload: data,
    };
};

export const addBlock = data => {
    // const { block, groupId } = data
    return {
        type: types.ADD_BLOCK,
        payload: data,
    };
};

export const callApiUpdateNameBlock = () => {
    return { type: types.API_UPDATE_NAME_BLOCK };
};

export const updateNameBlock = data => {
    // const {name, blockId, groupId} = data
    return { type: types.UPDATE_NAME_BLOCK, payload: data };
};

export const callApiDeleteBlock = data => {
    return { type: types.API_DELETE_BLOCK, payload: data };
};

export const deleteBlock = data => {
    //const { blockId, groupId } = data;
    return { type: types.DELETE_BLOCK, payload: data };
};

export const callApiFetcheElements = data => {
    return {
        type: types.API_FETCH_ELEMENT,
        payload: data,
    };
};

export const fetchElements = data => {
    return {
        type: types.FETCH_ELEMENT,
        payload: { data },
    };
};

export const callApiAddEmptyElemnet = data => {
    return {
        type: types.API_ADD_ELEMENT,
        payload: data,
    };
};

export const addEmptyElemnet = data => {
    return {
        type: types.ADD_ELEMENT,
        payload: data,
    };
};

export const callApiUploadImage = data => {
    return {
        type: types.API_UPLOAD_IMAGE,
        payload: data,
    };
};

export const uploadImageSuccess = data => {
    return {
        type: types.UPLOAD_SUCCESS,
        payload: data,
    };
};

export const callApiUploadCard = data => {
    return {
        type: types.API_UPLOAD_CARD,
        payload: data,
    };
};

export const uploadCardSuccess = data => {
    return {
        type: types.UPLOAD_CARD_SUCCESS,
        payload: data,
    };
};

export const changeValueElement = data => {
    return {
        type: types.CHANGE_VALUE_ELEMENT,
        payload: data,
    };
};

export const changeOptions = data => {
    return {
        type: types.CHANGE_OPTION,
        payload: data,
    };
};
