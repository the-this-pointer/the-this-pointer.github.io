/**
 * 监听滚动行为
 */
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { getScrollTop } from '../utils';
import { debounce } from 'ts-debounce';
var scrollTop = ref(getScrollTop());
export var useScrollTop = function () {
    return scrollTop;
};
export var setupScrollTop = function () {
    var onScrollFunc = debounce(function () {
        scrollTop.value = getScrollTop();
    }, 100);
    var onScroll = function () {
        onScrollFunc();
    };
    onMounted(function () {
        window.addEventListener('scroll', onScroll, false);
    });
    onBeforeUnmount(function () {
        window.removeEventListener('scroll', onScroll, false);
    });
};
