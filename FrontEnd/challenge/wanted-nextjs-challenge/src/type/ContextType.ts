export type Type = {
    path: string;
    changePath: (path: string) => void;
}

export type useRouterType = {
    push: (push: string) => void;
    pathname: string
}