const ALLOWED_METHODS = [
    'where',
    'whereIn',
    'whereBetween',
];

function filterByConstructor(filters) {
    const filterValues = filters.split('|');
    const method = filterValues.shift();

    const isValidMethod = ALLOWED_METHODS.includes(method);

    if (!isValidMethod) {
        return;
    }

    if (method !== 'where') {
        const filterLenght = filterValues.length;
        const filterPosition = filterLenght - 1;
        filterValues[filterPosition] = filterValues[filterPosition].split(',');
    }

    return {
        method,
        filterValues, 
    };
}

export default filterByConstructor;