import * as types from '../constants/block';
import { covertOptionToElement } from '../commons/Method';

const initialState = {
    listGroup: [],
    newBlock: null,
    elements: [],
    currentBlock: null,
    editContent: false,
    defaultBlock: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BLOCK: {
            const { data } = action.payload;
            return {
                ...state,
                listGroup: data,
            };
        }
        case types.UPDATE_NAME_GROUP: {
            const newGroup = action.payload;
            let groups = state.listGroup;
            groups.forEach(g => {
                if (g._id === newGroup._id && !g.defaultGroup) {
                    g = newGroup;
                }
            });
            return {
                ...state,
                listGroup: groups,
            };
        }
        case types.DELETE_GROUP: {
            const { _id } = action.payload;
            let groups = state.listGroup.filter(g => {
                return g._id !== _id;
            });
            return {
                ...state,
                listGroup: groups,
            };
        }
        case types.ADD_GROUP: {
            const group = action.payload;
            let groups = state.listGroup;
            return {
                ...state,
                listGroup: [...groups, group],
            };
        }

        case types.ADD_BLOCK: {
            const { block, groupId } = action.payload;
            let groups = state.listGroup;
            groups.forEach(g => {
                if (g._id === groupId) {
                    g.blocks.push(block);
                }
            });
            return {
                ...state,
                newBlock: block,
                listGroup: groups,
            };
        }

        case types.DELETE_BLOCK: {
            const { blockId, groupId } = action.payload;
            let groups = state.listGroup;
            groups.forEach(g => {
                if (g._id === groupId) {
                    let newBlocks = g.blocks.filter(b => {
                        return b._id !== blockId;
                    });
                    g.blocks = newBlocks;
                }
            });
            return {
                ...state,
                listGroup: groups,
            };
        }

        case types.API_FETCH_ELEMENT: {
            return {
                ...state,
                elements: [],
                editContent: false,
                currentBlock: null,
                defaultBlock: false,
            };
        }
        // chỉnh sửa ở Content block

        case types.FETCH_ELEMENT: {
            const { data } = action.payload;
            let { defaultBlock } = state;
            if (
                state.listGroup[0] !== null &&
                state.listGroup[0] !== undefined
            ) {
                defaultBlock = data.group_id === state.listGroup[0]._id;
            }
            return {
                ...state,
                elements: [...data.elements],
                currentBlock: data,
                editContent: false,
                defaultBlock,
            };
        }

        case types.UPDATE_NAME_BLOCK: {
            const { name } = action.payload;
            let { currentBlock } = state;
            currentBlock.name = name;
            return {
                ...state,
                currentBlock,
                editContent: true,
            };
        }

        case types.ADD_ELEMENT: {
            const { block, newElement } = action.payload;
            const { currentBlock } = state;
            for (let i = 0; i < block.elements.length; i++) {
                if (block.elements[i]._id !== newElement._id) {
                    block.elements[i] = currentBlock.elements[i];
                }
            }
            return {
                ...state,
                elements: block.elements,
                currentBlock: block,
            };
        }

        case types.UPLOAD_SUCCESS: {
            const { filePath, id, title } = action.payload;
            let { elements } = state;
            elements.forEach(e => {
                // lấy vị trí cảu thằng element
                if (e._id === id) {
                    e.text_msg = title;
                    if (
                        e.attachment_msg !== undefined &&
                        e.attachment_msg !== null
                    ) {
                        e.attachment_msg.payload.elements[0].url = filePath;
                    } else {
                        e.attachment_msg = {
                            payload: {
                                elements: [
                                    {
                                        media_type: 'image',
                                        url: filePath,
                                    },
                                ],
                                template_type: 'media',
                            },
                            type: 'template',
                        };
                    }
                }
            });
            return {
                ...state,
                elements: elements,
                editContent: true,
            };
        }

        case types.UPLOAD_CARD_SUCCESS: {
            const { filePath, id, title, subtitle } = action.payload;
            let { elements } = state;
            elements.forEach(e => {
                // lấy vị trí cảu thằng element
                if (e._id === id) {
                    if (e.attachment_msg !== undefined) {
                        e.attachment_msg.payload.elements[0].title = title;
                        e.attachment_msg.payload.elements[0].subtitle = subtitle;
                        e.attachment_msg.payload.elements[0].image_url = filePath;
                    } else {
                        e.attachment_msg = {
                            type: 'template',
                            payload: {
                                template_type: 'list',
                                elements: [
                                    {
                                        title,
                                        subtitle,
                                        image_url: filePath,
                                    },
                                ],
                            },
                        };
                    }
                }
            });
            return {
                ...state,
                elements: elements,
                editContent: true,
            };
        }

        case types.CHANGE_OPTION: {
            const { id, options } = action.payload;
            let { elements } = state;
            let optionConvert = [];
            options.forEach(op => {
                optionConvert.push(covertOptionToElement(op));
            });
            console.log(optionConvert);

            elements.forEach(e => {
                if (e._id === id) {
                    if (e.attachment_msg !== undefined) {
                        let { elements } = e.attachment_msg.payload;
                        let newElements = [elements[0], ...optionConvert];
                        e.attachment_msg.payload.elements = newElements;
                    } else {
                        let newElements = [{}, ...optionConvert];
                        e.attachment_msg = {
                            type: 'template',
                            payload: {
                                template_type: 'list',
                                elements: newElements,
                            },
                        };
                    }
                }
            });
            return {
                ...state,
                elements: elements,
                editContent: true,
            };
        }

        case types.CHANGE_VALUE_ELEMENT: {
            const data = action.payload;
            const { id, title, attribute } = data;
            let { elements } = state;
            elements.forEach(e => {
                // lấy vị trí cảu thằng element
                if (e._id === id) {
                    e.text_msg = title;
                    if (attribute !== undefined && attribute.length > 0) {
                        e.attribute = attribute;
                    }
                }
            });
            return {
                ...state,
                elements: elements,
                editContent: true,
            };
        }

        case types.DELETE_ELEMENT: {
            const { block } = action.payload;

            return {
                ...state,
                elements: block.elements,
                currentBlock: block,
            };
        }

        case types.UPDATE_ELEMENT: {
            const { currentBlock, listGroup } = state;
            listGroup.forEach(g => {
                if (g._id === currentBlock.group_id) {
                    g.blocks.forEach(b => {
                        if (b._id === currentBlock._id) {
                            b.name = currentBlock.name;
                        }
                    });
                }
            });
            return {
                ...state,
                editContent: false,
                listGroup: [...listGroup],
            };
        }

        default:
            return state;
    }
};
export default reducer;
