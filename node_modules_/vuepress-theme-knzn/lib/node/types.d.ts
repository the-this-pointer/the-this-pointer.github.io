import type { ISourceOptions } from 'tsparticles-engine';
import type { GitPluginPageData } from '@vuepress/plugin-git';
import type { PageBase } from '@vuepress/shared';
import type { PageData } from '@vuepress/client';
export declare type MediaItem = {
    link: string;
    icon: string;
};
export declare type Comment = {
    repo: `${string}/${string}`;
    repoId: string;
    category: string;
    categoryId: string;
    lang?: string;
};
/**
 * 主题配置
 */
export interface ThemeOptions {
    dirname?: string;
    logo?: string;
    darkLogo?: string;
    backgroundImage?: string;
    darkBackgroundImage?: string;
    postImage?: string;
    darkPostImage?: string;
    particlesOptions?: ISourceOptions;
    /**
     * 博主信息相关
     */
    blogger?: string;
    slogan?: string;
    avatar?: string;
    darkAvatar?: string;
    medias?: MediaItem[];
    /**
     * 数据显示相关
     */
    perPage?: number;
    maxCategories?: number;
    maxTags?: number;
    navbar?: MenuItem[];
    /**
     *  页脚相关配置
     */
    beian?: string;
    beianUrl?: string;
    siteStartDate?: string;
    comment?: Comment;
}
/**
 * 页面相关配置
 */
export interface ThemeExtraPageData {
    filePathRelative: string | null;
}
export declare type ThemePageData = PageData<ThemeExtraPageData, ThemeExtraPageFrontmatter> & GitPluginPageData;
/**
 * frontmatter 配置
 */
export interface ThemeExtraPageFrontmatter {
    author?: string;
    date?: string;
    tags?: string[];
    categories?: string[];
    postImage?: string;
}
export declare type ThemePageFrontmatter = PageBase<ThemeExtraPageFrontmatter>;
/**
 * 支持的多媒体类型
 */
export declare type MediaType = 'pinterest' | 'youtube' | 'zhihu' | 'linkedin' | 'facebook' | 'instagram' | 'QQ' | 'twitter' | 'gitlab' | 'github' | 'email' | 'gitee' | 'jianshu';
/**
 * 导航项配置
 */
export interface MenuItem {
    text: string;
    link: string;
    children?: MenuList;
}
export declare type MenuList = MenuItem[];
