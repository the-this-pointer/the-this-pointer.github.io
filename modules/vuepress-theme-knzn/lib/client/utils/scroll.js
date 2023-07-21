/**
 * 滚动到顶部
 * @returns void
 */
export var scrollToTop = function () {
    window === null || window === void 0 ? void 0 : window.scrollTo({ top: 0, behavior: 'smooth' });
};
/**
 * 获取滚动的高度
 * @returns number
 */
export var getScrollTop = function () {
    if (typeof window === 'undefined')
        return 0;
    return (window.pageYOffset ||
        window.document.documentElement.scrollTop ||
        window.document.body.scrollTop ||
        0);
};
/**
 * 是否滚动到底部
 * @param scrollTop 滚动条距离顶部的距离
 * @returns
 */
export var assetScrollToBottom = function (scrollTop) {
    if (typeof window !== 'undefined') {
        var windowHeight = window.document.documentElement.clientHeight ||
            window.document.body.clientHeight; // 可视区的高度
        var scrollHeight = window.document.documentElement.scrollHeight ||
            window.document.body.scrollHeight; // dom元素的高度，包含溢出不可见的内容
        return (scrollHeight > windowHeight &&
            scrollHeight <= scrollTop + windowHeight + 200);
    }
    return false;
};
/**
 * 是否滚动到顶部
 * @param scrollTop 滚动条距离顶部的距离
 * @returns
 */
export var assetScrollToTop = function (scrollTop) {
    return scrollTop < 300;
};
