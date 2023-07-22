import type { MenuList, ThemePageData } from '../../node';
import type { LabelItem, PostInfo } from '../types';
export declare const Tagcolors: string[];
export declare const isPostsLayout: (path: string) => boolean;
/**
 * 获取左侧菜单
 * @param pages
 * @param dirPath 当前文章所属的目录 /dirname/.../
 * @returns
 */
export declare function getSidebarPages(pages: ThemePageData[], dirPath: string, list: MenuList): MenuList;
/**
 * 格式 时间戳 为日期
 * @param timestamp 时间戳
 * @returns 日期字符串
 */
export declare function formatTimestamp(timestamp: number): string;
export declare const getPostInfo: (post: ThemePageData) => PostInfo;
/**
 * 获取页面信息
 * @param pages 页面信息数组
 * @param type 页面信息类型
 * @returns 特定页面信息数组
 */
export declare function getInfoFromPages(pages: ThemePageData[], type: 'categories' | 'tags'): LabelItem[];
