import * as types from '../constants/rule';

const initialState = {
    listRule: [],
    currentRule: null,
    listRuleFilter: [],
    keySearch: '',
    allBlocks: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_RULE_SUCCESS: {
            // data: list rule
            const data = action.payload;
            const { rules, blocks } = data;
            return {
                ...state,
                listRule: rules,
                listRuleFilter: rules,
                allBlocks: blocks,
            };
        }

        case types.ADD_RULE_SUCCESS: {
            const rule = action.payload;
            return {
                ...state,
                listRule: [rule, ...state.listRule],
                listRuleFilter: [rule, ...state.listRuleFilter, ],
            };
        }

        case types.UPDATE_RULE_SECCESS: {
            const rule = action.payload;
            const { listRule } = state;
            listRule.forEach(r => {
                if (r._id === rule._id) {
                    r.keyword = rule.keyword;
                    r.blocks = rule.blocks;
                }
            });
            return {
                ...state,
                listRule: [...listRule],
                listRuleFilter: [...listRule],
            };
        }

        case types.DELETE_RULE_SECCESS: {
            const rule = action.payload;
            let newListRule = state.listRule.filter(r => {
                return r._id !== rule._id;
            });
            return {
                ...state,
                listRule: newListRule,
                listRuleFilter: newListRule,
            };
        }

        case types.SEARCH_RULE: {
            return state;
        }

        default:
            return state;
    }
};
export default reducer;
