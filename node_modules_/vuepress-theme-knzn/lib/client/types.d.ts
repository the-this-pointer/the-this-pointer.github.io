import type { ThemePageData } from '../node';
export declare type LayoutType = 'HomeLayout' | 'CategoriesLayout' | 'TagsLayout' | 'SearchLayout' | 'PostsLayout' | 'PostLayout';
export declare type LabelItem = {
    text: string;
    num: number;
};
export declare type PostInfo = {
    author: string;
    date: string;
    categories: string[];
    tags: string[];
    postImage: string;
};
export declare type SidebarData = Partial<ThemePageData> & {
    children?: ThemePageData[];
};
export declare type SidebarItem = Partial<ThemePageData & {
    children: ThemePageData;
}>;
