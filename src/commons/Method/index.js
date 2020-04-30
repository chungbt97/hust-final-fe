import { ALPHABER_COLOR, SPACE_CHARACTER, THREE_DOTS } from '../../constants';
import { OPTION_LINK, OPTION_SMS, OPTION_PHONE } from '../../constants/element';

export const getColorWithAlphaber = key => {
    let bgColor = null;
    ALPHABER_COLOR.map(color => {
        if (color.key === key.toLowerCase()) {
            bgColor = color.color;
            return bgColor;
        }
        return null;
    });
    return bgColor;
};

export const convertTimestampToDate = timestamp => {
    let dateTime = null;
    if (timestamp !== null && timestamp !== undefined) {
        let ts = new Date(timestamp);
        dateTime = ts.toDateString();
    }
    return dateTime;
};

export const splitName = (name, maxLength) => {
    let wordArray = null;
    if (name !== null && name.length > 0) {
        wordArray = name.split(' ');
    }
    let nameMini = '';
    if (wordArray !== null) {
        nameMini = wordArray[0];
        for (let i = 1; i < wordArray.length; i++) {
            var lenghtMini = nameMini.length + wordArray[i].length + 1;
            if (lenghtMini > maxLength) {
                break;
            } else {
                nameMini = nameMini.concat(SPACE_CHARACTER, wordArray[i]);
            }
        }
    }
    nameMini = nameMini.concat(THREE_DOTS);
    return nameMini;
};

export const removeLastSlashUrl = url => {
    let lastChar = url.charAt(url.length - 1);
    if (lastChar === '/') {
        return url.substring(0, url.length - 1);
    }
    return url;
};

export const covertOptionToElement = option => {
    if (option.type === OPTION_LINK) {
        return {
            title: option.nameOption,
            default_action: {
                type: option.type,
                url: option.urlOrPhone,
            },
        };
    } else if (option.type === OPTION_SMS){
        return {
            title: option.nameOption,
            default_action: {
                type: option.type,
                payload: {
                    content: 'alo',
                    phone_code: option.urlOrPhone,
                },
            },
        };
    } else if (option.type === OPTION_PHONE){
        return {
            title: option.nameOption,
            default_action: {
                type: option.type,
                payload: {
                    phone_code: option.urlOrPhone,
                },
            },
        };
    }
    return null;
};
