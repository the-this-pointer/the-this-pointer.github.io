import type { Ref } from 'vue';
import type { LayoutType } from '../types';
export declare const layoutMap: Record<string, LayoutType>;
export declare const getLayout: (path: any) => LayoutType;
export declare const useLayout: () => Ref<string>;
