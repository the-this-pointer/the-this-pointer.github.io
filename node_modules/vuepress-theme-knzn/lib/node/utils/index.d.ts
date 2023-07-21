import type { ThemeOptions } from '../types';
import type { App } from '@vuepress/core';
export declare const DEFAULT_LOCALE_OPTIONS: ThemeOptions;
/**
 * 合并默认配置
 */
export declare const assignOptions: (options: ThemeOptions) => void;
/**
 * 添加额外的页面
 * @param app App
 */
export declare const addExtraPages: (app: App) => Promise<void>;
