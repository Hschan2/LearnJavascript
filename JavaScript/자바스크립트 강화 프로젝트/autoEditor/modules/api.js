export const API_URL = 'https://kdt.roto.codes';

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            return await res.json();
        }

        throw new Error('Fetch 실패');
    } catch (err) {
        alert(err.message);
    }
}