import { ALPHABER_COLOR, SPACE_CHARACTER, THREE_DOTS } from '../../constants';

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
