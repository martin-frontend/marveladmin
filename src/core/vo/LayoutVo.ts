export type sidebarContentVo = {
    title: string;
    list: [];
};

export type sidebarListVo = {
    title: string;
    children: childrenVo[];
};

export type childrenVo = {
    title: string;
    link: string;
};

export type tagsVo = {
    name: string;
    path: string;
    meta: metaVo;
};

export type metaVo = {
    affix: boolean;
};
