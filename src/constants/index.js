export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';

export function checkValue(value) {
    if (value !== null && value !== "" && value !== undefined && value !== "undefined" && value !== "null" && typeof(value) !== undefined) {
        return true;
    } else {
        return false;
    }
}