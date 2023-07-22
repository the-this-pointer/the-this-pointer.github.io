import { usePages } from '../hooks';
import { useRoute } from 'vue-router';
import { getSidebarPages } from '../utils';
import { ref, watch } from 'vue';
export var useMenuList = function () {
    var menuList = ref([]);
    var route = useRoute();
    var pages = usePages();
    var getList = function () {
        menuList.value = [];
        var dirPath = route.path.replace(/[\w%-]+\.html$/, '');
        var sidebarPages = pages.filter(function (page) { return page.path.startsWith(dirPath); });
        getSidebarPages(sidebarPages, dirPath, menuList.value);
        menuList.value = menuList.value.filter(function (item) {
            return !/index\.html$/i.test(item.link);
        });
    };
    watch(function () { return route.path; }, function () { return getList(); }, { immediate: true });
    return menuList;
};
