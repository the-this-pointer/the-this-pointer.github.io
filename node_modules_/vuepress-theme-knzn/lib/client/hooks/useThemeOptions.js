/**
 * 获取主题配置
 */
import { useThemeData } from '@vuepress/plugin-theme-data/lib/client';
export var useThemeOptions = function () {
    return useThemeData();
};
