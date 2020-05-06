import * as types from '../constants/rule';

export const callApiFetchRule = data => {
    return {
        type: types.API_FETCH_RULE,
        payload: data,
    };
};
export const fetchRules = data => {
    return {
        type: types.FETCH_RULE_SUCCESS,
        payload: data,
    };
};

export const callApiAddRule = data => {
    return {
        type: types.API_ADD_RULE,
        payload: data,
    };
};
export const addRule = data => {
    return {
        type: types.ADD_RULE_SUCCESS,
        payload: data,
    };
};

export const callApiupdateRule = data => {
    return {
        type: types.API_UPDATE_RULE,
        payload: data,
    };
};
export const updateRule = data => {
    return {
        type: types.UPDATE_RULE_SECCESS,
        payload: data,
    };
};

export const callApiDeleteRule = data => {
    return {
        type: types.API_DELETE_RULE,
        payload: data,
    };
};
export const deleteRule = data => {
    return {
        type: types.DELETE_RULE_SECCESS,
        payload: data,
    };
};

