/**
 * 根据类型获取文章
 */
import { usePages, useThemeOptions } from '.';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export var useTypePages = function (key, param) {
    var themeOptions = useThemeOptions();
    var pages = usePages();
    var route = useRoute();
    var type = computed(function () {
        return route.query[param];
    });
    var typePages = ref(pages);
    var getTypePages = function () {
        if (type.value === 'all') {
            typePages.value = pages.filter(function (item) {
                var _a;
                return (_a = item.frontmatter[key]) === null || _a === void 0 ? void 0 : _a.length;
            });
        }
        else {
            typePages.value = pages.filter(function (item) {
                var _a;
                return (_a = item.frontmatter[key]) === null || _a === void 0 ? void 0 : _a.includes(type.value);
            });
        }
    };
    getTypePages();
    var perPage = themeOptions.value.perPage || 10;
    var page = ref(1);
    var total = ref(typePages.value.length);
    watch(type, function () {
        page.value = 1;
        getTypePages();
        total.value = typePages.value.length;
    });
    var pageList = computed(function () {
        var skip = (page.value - 1) * perPage;
        return typePages.value.slice(skip, skip + perPage);
    });
    var handlePageChange = function (num) {
        page.value = num;
    };
    return {
        pages: pages,
        pageList: pageList,
        handlePageChange: handlePageChange,
        perPage: perPage,
        page: page,
        total: total,
    };
};
