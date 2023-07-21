"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("@vuepress/utils");
var plugin_git_1 = require("@vuepress/plugin-git");
var plugin_external_link_icon_1 = require("@vuepress/plugin-external-link-icon");
var plugin_theme_data_1 = require("@vuepress/plugin-theme-data");
var plugin_toc_1 = require("@vuepress/plugin-toc");
var plugin_active_header_links_1 = require("@vuepress/plugin-active-header-links");
var plugin_prismjs_1 = require("@vuepress/plugin-prismjs");
var plugin_container_1 = require("@vuepress/plugin-container");
var utils_2 = require("./utils");
__exportStar(require("./utils"), exports);
__exportStar(require("./types"), exports);
exports.default = (function (options) {
    (0, utils_2.assignOptions)(options);
    return function (app) { return ({
        name: 'vuepress-theme-knzn',
        layouts: utils_1.path.resolve(__dirname, '../client/layouts'),
        clientConfigFile: utils_1.path.resolve(__dirname, '../client/clientConfig.js'),
        alias: {
            '@theme-style': utils_1.path.resolve(__dirname, '../client/assets/styles'),
        },
        extendsPageOptions: function (pageOptions, app) {
            var _a;
            if (pageOptions.filePath) {
                var relativePath = utils_1.path.relative(process.cwd(), pageOptions.filePath);
                relativePath = relativePath.slice(relativePath.indexOf('/'));
                if (!/^\/(index|readme)\.md$/i.test(relativePath)) {
                    var dirPath = relativePath.slice(0, relativePath.lastIndexOf('/') + 1);
                    pageOptions.frontmatter = (_a = pageOptions.frontmatter) !== null && _a !== void 0 ? _a : {};
                    pageOptions.frontmatter.permalinkPattern = "".concat(dirPath, ":slug.html");
                }
            }
        },
        extendsPage: function (page) {
            page.routeMeta.title = page.title;
            page.data.filePathRelative = page.filePathRelative;
        },
        plugins: [
            (0, plugin_git_1.gitPlugin)({
                createdTime: false,
                updatedTime: true,
                contributors: true,
            }),
            (0, plugin_external_link_icon_1.externalLinkIconPlugin)(),
            (0, plugin_theme_data_1.themeDataPlugin)({ themeData: options }),
            (0, plugin_toc_1.tocPlugin)(),
            (0, plugin_active_header_links_1.activeHeaderLinksPlugin)({
                // 配置项
                headerLinkSelector: 'a.vuepress-toc-link',
            }),
            (0, plugin_prismjs_1.prismjsPlugin)(),
            // @vuepress/plugin-container
            (0, plugin_container_1.containerPlugin)({
                type: 'tip',
                locales: {
                    en: { defaultInfo: 'TIP' },
                },
            }),
            (0, plugin_container_1.containerPlugin)({
                type: 'warning',
                locales: {
                    en: { defaultInfo: 'WARNING' },
                },
            }),
            (0, plugin_container_1.containerPlugin)({
                type: 'danger',
                locales: {
                    en: { defaultInfo: 'DANGER' },
                },
            }),
            (0, plugin_container_1.containerPlugin)({
                type: 'details',
                before: function (info) {
                    return "<details class=\"custom-container details\">".concat(info ? "<summary>".concat(info, "</summary>") : '', "\n");
                },
                after: function () { return '</details>\n'; },
            }),
            (0, plugin_container_1.containerPlugin)({
                type: 'code-group',
                before: function () { return "<CodeGroup>\n"; },
                after: function () { return '</CodeGroup>\n'; },
            }),
            (0, plugin_container_1.containerPlugin)({
                type: 'code-group-item',
                before: function (info) { return "<CodeGroupItem title=\"".concat(info, "\">\n"); },
                after: function () { return '</CodeGroupItem>\n'; },
            }),
        ],
        onInitialized: function (app) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, utils_2.addExtraPages)(app)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    }); };
});
