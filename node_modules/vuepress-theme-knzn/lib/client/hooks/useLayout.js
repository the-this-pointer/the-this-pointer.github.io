/**
 * 当前布局
 */
import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { isPostsLayout } from '../utils';
export var layoutMap = {
    '/': 'HomeLayout',
    '/tags/': 'TagsLayout',
    '/categories/': 'CategoriesLayout',
    '/search/': 'SearchLayout',
};
export var getLayout = function (path) {
    var layout = layoutMap[path];
    if (!layout) {
        if (isPostsLayout(path))
            return 'PostsLayout';
        return 'PostLayout';
    }
    return layout;
};
export var useLayout = function () {
    var route = useRoute();
    var layout = ref(getLayout(route.path));
    watch(function () { return route.path; }, function () {
        layout.value = getLayout(route.path);
    });
    return layout;
};
