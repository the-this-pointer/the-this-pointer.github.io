import type { ThemePageData } from '../../node';
import type { App } from 'vue';
declare type ThemePages = ThemePageData[];
export declare const usePages: () => ThemePages;
export declare function setupPages(app: App, router: any): Promise<void>;
export {};
