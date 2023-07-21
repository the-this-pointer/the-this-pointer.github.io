"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNavbar = void 0;
var fs = require('fs');
var path = require('path');
// type MenuItem = {
//   text: string
//   link: string
//   children?: MenuItem[]
// }
/**
 * 导航项
 * @param cPath
 * @param tName
 * @returns
 */
var getNavbarItem = function (cPath, tName) {
    var link = cPath
        .replace(process.cwd(), '')
        .replace(/\\/g, '/')
        .slice(tName.length + 1)
        .replace(/\.md$/i, '.html');
    var item = path.parse(cPath);
    return {
        text: item.name,
        link: link.endsWith('.html') ? link : link + '/?layout=PostsLayout',
    };
};
/**
 * 处理目录级别的导航项目
 * @param cPath
 * @param tName
 * @returns
 */
var getDirNavbarItem = function (cPath, tName) {
    // 默认目录页导航
    var navbarItem = getNavbarItem(cPath, tName);
    var cFiles = fs.readdirSync(cPath);
    var isNavbarItem = cFiles.every(function (item) {
        var cStat = fs.statSync(path.join(cPath, item));
        return cStat.isFile();
    });
    if (!isNavbarItem) {
        // 下拉框导航
        var children_1 = [];
        cFiles.forEach(function (file) {
            // if (file.toLowerCase() === 'index.md') return
            var item = getNavbarItem(path.join(cPath, file), tName);
            children_1.push(item);
        });
        navbarItem.children = children_1;
    }
    return navbarItem;
};
/**
 * 自动生成导航配置
 * @param tName
 * @returns
 */
var getNavbar = function (tName) {
    var tPath = path.resolve(process.cwd(), tName);
    var navbar = [];
    var files = fs.readdirSync(tPath);
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var cPath = path.join(tPath, file);
        if (['.vuepress', 'index.md'].includes(file.toLowerCase()))
            continue;
        var stat = fs.statSync(cPath);
        if (stat.isDirectory()) {
            // 跳转到目录页面，或者为下拉框的导航项目
            navbar.push(getDirNavbarItem(cPath, tName));
        }
        else {
            // 其它直接跳转到文章内容的导航项目
            navbar.push(getNavbarItem(cPath, tName));
        }
    }
    // 首页
    return navbar;
};
exports.getNavbar = getNavbar;
