import type { ComputedRef, Ref } from 'vue';
import type { ThemePageData } from '../../node';
export interface ITypePages {
    pages: ThemePageData[];
    pageList: ComputedRef<ThemePageData[]>;
    handlePageChange: (num: number) => void;
    perPage: number;
    page: Ref<number>;
    total: Ref<number>;
}
export declare const useTypePages: (key: 'tags' | 'categories', param: 'tag' | 'category') => ITypePages;
