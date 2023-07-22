import type { ComputedRef } from 'vue';
export declare type Bloger = {
    blogger: string | undefined;
    slogan: string | undefined;
    avatarSrc: ComputedRef<string | undefined>;
};
export declare const useBloger: () => Bloger;
