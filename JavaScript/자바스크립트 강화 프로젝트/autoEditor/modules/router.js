const ROUTE_CHANGE = 'router-change';

export const initRouter = (onRoute) => {
    window.addEventListener(ROUTE_CHANGE, e => {
        const { nextUrl } = e.detail;

        if (nextUrl) {
            history.pushState(null, null, nextUrl);
            onRoute();
        }
    })
};

export const push = (nextUrl) => {
    window.dispatchEvent(new CustomEvent(ROUTE_CHANGE, {
        detail: {
            nextUrl
        }
    }))
};