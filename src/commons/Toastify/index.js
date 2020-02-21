import { toast } from 'react-toastify';

export const toastError = error => {
    let message = null;
    if (typeof error === 'object' && error.message) {
        ({ message } = error);
    }
    if (message !== 'undefined' && message !== null && message !== '') {
        toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
};

export const toastSuccess = msg => {
    if (msg !== 'undefined' && msg !== null && msg !== '') {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
};


export const toastMsgError = msg => {
    if (msg !== 'undefined' && msg !== null && msg !== '') {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
};
