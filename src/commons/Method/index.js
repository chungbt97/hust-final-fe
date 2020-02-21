import { ALPHABER_COLOR, MONTHS_STRING } from '../../constants';

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
