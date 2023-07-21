// tags 背景颜色
export var Tagcolors = [
    '#849b87',
    '#b1e5c1',
    '#41b9d7',
    '#f69880',
    '#e77c83',
    '#C158D3',
    '#5A5AB7',
];
export var isPostsLayout = function (path) {
    if (typeof window !== 'undefined') {
        var search = window.location.search;
        return search.includes('layout=PostsLayout');
    }
    return false;
};
/**
 * 获取左侧菜单
 * @param pages
 * @param dirPath 当前文章所属的目录 /dirname/.../
 * @returns
 */
export function getSidebarPages(pages, dirPath, list) {
    var _loop_1 = function (page) {
        var paths = page.path.split(dirPath);
        var secondPath = paths[1];
        if (!secondPath)
            return "continue";
        var path = page.path, title = page.title;
        if (!secondPath.includes('/')) {
            var menuItem = {
                link: path,
                text: title,
            };
            // 如果 secondPath 为不包括 / 字符，则为 page  配置
            list.push(menuItem);
        }
        else {
            var deepPaths = secondPath.split('/');
            var deepDir_1 = dirPath + deepPaths[0] + '/';
            var isExist = list.find(function (item) { return item.link === deepDir_1; });
            if (isExist)
                return "continue";
            var menuItem = {
                text: decodeURIComponent(deepPaths[0]),
                link: deepDir_1,
                children: [],
            };
            var deepPages = pages.filter(function (item) { return item.path.startsWith(deepDir_1); });
            getSidebarPages(deepPages, deepDir_1, menuItem.children);
            list.push(menuItem);
        }
    };
    for (var _i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
        var page = pages_1[_i];
        _loop_1(page);
    }
    return list.sort(function (a, b) {
        var s1 = a.text.toLocaleLowerCase();
        var s2 = b.text.toLocaleLowerCase();
        if (s1 < s2) {
            return -1;
        }
        if (s1 > s2) {
            return 1;
        }
        return 0;
    });
}
/**
 * 格式 时间戳 为日期
 * @param timestamp 时间戳
 * @returns 日期字符串
 */
export function formatTimestamp(timestamp) {
    var date = new Date(timestamp);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var format = function (num) {
        if (num < 10)
            return "0".concat(num);
        return "".concat(num);
    };
    return "".concat(year, "-").concat(format(month), "-").concat(format(day));
}
export var getPostInfo = function (post) {
    // frontmatter
    var frontmatter = post.frontmatter;
    var contributors = post.git.contributors;
    // 作者
    var author = frontmatter.author ||
        (contributors ? (contributors[0] ? contributors[0].name : '') : '');
    // 日期
    var date = frontmatter.date || formatTimestamp(post.git.updatedTime || Date.now());
    // 标签
    var tags = frontmatter.tags || [];
    // 分类
    var categories = frontmatter.categories || [];
    // 文章海报
    var postImage = frontmatter.postImage || '';
    return {
        author: author,
        date: date,
        tags: tags,
        categories: categories,
        postImage: postImage,
    };
};
/**
 * 获取页面信息
 * @param pages 页面信息数组
 * @param type 页面信息类型
 * @returns 特定页面信息数组
 */
export function getInfoFromPages(pages, type) {
    var result = {};
    pages.forEach(function (page) {
        var infos = page.frontmatter[type];
        if (infos) {
            for (var _i = 0, infos_1 = infos; _i < infos_1.length; _i++) {
                var info = infos_1[_i];
                if (!result[info]) {
                    result[info] = 1;
                }
                else {
                    result[info]++;
                }
            }
        }
    });
    var list = Object.entries(result).reduce(function (res, item) {
        res.push({ text: item[0], num: item[1] });
        return res;
    }, []);
    return list.sort(function (a, b) { return b.num - a.num; });
}
