/**
 * 浅色或暗黑模式
 */
import { usePreferredDark, useStorage } from '@vueuse/core';
import { computed, inject, onMounted, onUnmounted, provide, watch } from 'vue';
export var darkModeSymbol = Symbol('darkMode');
/**
 * Inject dark mode global computed
 */
export var useDarkMode = function () {
    var isDarkMode = inject(darkModeSymbol);
    if (!isDarkMode) {
        throw new Error('useDarkMode() is called without provider.');
    }
    return isDarkMode;
};
/**
 * Create dark mode ref and provide as global computed in setup
 */
export var setupDarkMode = function () {
    var isDarkPreferred = usePreferredDark();
    var darkStorage = useStorage('vuepress-color-scheme', 'auto');
    var isDarkMode = computed({
        get: function () {
            // auto detected from prefers-color-scheme
            if (darkStorage.value === 'auto') {
                return isDarkPreferred.value;
            }
            // storage value
            return darkStorage.value === 'dark';
        },
        set: function (val) {
            if (val === isDarkPreferred.value) {
                darkStorage.value = 'auto';
            }
            else {
                darkStorage.value = val ? 'dark' : 'light';
            }
        },
    });
    provide(darkModeSymbol, isDarkMode);
    updateHtmlDarkClass(isDarkMode);
};
export var updateHtmlDarkClass = function (isDarkMode) {
    var update = function (value) {
        if (value === void 0) { value = isDarkMode.value; }
        // set `class="dark"` on `<html>` element
        var htmlEl = window === null || window === void 0 ? void 0 : window.document.querySelector('html');
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.toggle('dark', value);
    };
    onMounted(function () {
        watch(isDarkMode, update, { immediate: true });
    });
    onUnmounted(function () { return update(); });
};
