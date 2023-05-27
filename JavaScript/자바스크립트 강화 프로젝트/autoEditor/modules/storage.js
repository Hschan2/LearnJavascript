const localStorage = window.localStorage;

export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getItem = (key, value) => {
    try {
        const storedItem = localStorage.getItem(key);

        return storedItem ? JSON.parse(storedItem) : value;
    } catch (err) {
        return value;
    }
}

export const removeItem = (key) => {
    localStorage.removeItem(key);
}