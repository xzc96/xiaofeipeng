import { defineUserConfig } from "vuepress";
import { themeConfig } from "./themeConfig";
import {shikiPlugin} from "@vuepress/plugin-shiki";
import { searchPlugin } from "@vuepress/plugin-search";
import { commentPlugin } from "vuepress-plugin-comment2";
import { seoPlugin } from "vuepress-plugin-seo2";
import type { CursorEffectsOptions } from 'vuepress-plugin-cursor-effects';

export default defineUserConfig({
  base: "/xiaofeipeng/",
  theme: themeConfig,
  title: "阿飞的博客",
  description: "vuepress-theme-hope 阿飞的博客",
  head: [
    // meta
    ["meta", { name: "robots", content: "all" }],
    ["meta", { name: "author", content: "Guide" }],
    [
      "meta",
      {
        "http-equiv": "Cache-Control",
        content: "no-cache, no-store, must-revalidate",
      },
    ],
    ["meta", { "http-equiv": "Pragma", content: "no-cache" }],
    ["meta", { "http-equiv": "Expires", content: "0" }],
    [
      "meta",
      {
        name: "keywords",
        content:
            "Java基础, 多线程, JVM, 虚拟机, 数据库, MySQL, Spring, Redis, MyBatis, 系统设计, 分布式, RPC, 高可用, 高并发",
      },
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    // 添加百度统计
    [
      "script",
      {},
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?5dd2e8c97962d57b7b8fea1737c01743";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();`,
    ],
    ["link", { rel: "stylesheet", href: "/iconfont/iconfont.css" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  plugins: [
    //   npm i -D @vuepress/plugin-shiki@next
    // shikiPlugin({
    //   // 你的选项
    //   theme: "one-dark-pro",
    // }),
    //   npm i -D @vuepress/plugin-search@next
    searchPlugin({
      // https://v2.vuepress.vuejs.org/zh/reference/plugin/search.html
      // 排除首页
      isSearchable: (page) => page.path !== "/",
      maxSuggestions: 10,
      hotKeys: ["s", "/"],
      // 用于在页面的搜索索引中添加额外字段
      getExtraFields: () => [],
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
    }),

    // 评论 npm i -D vuepress-plugin-comment2
    commentPlugin({
      // https://giscus.app/zh-CN#repository
      // 插件选项
      provider: "Giscus",
      comment: true, //启用评论功能
      repo: "cuckoocry/xiaofeipeng", //远程仓库
      repoId: "R_kgDOJLYAww", //对应自己的仓库Id
      category: "Announcements",
      categoryId: "DIC_kwDOJLYAw84CU-hL" //对应自己的分类Id

    }),

    seoPlugin({
      hostname: "https://cuckoocry.github.io/xiaofeipeng"
    }),
    ['vuepress-plugin-cursor-effects', {
      size: 2,
      shape: 'circle',
      zIndex: 999999,
      strokeColor: 'random',
      fillColor: 'random',
      outerSpace: 2,
    } as CursorEffectsOptions]
  ],

  locales: {
    "/": {
      lang: "zh-CN",
    }
  },



  // Enable it with pwa
  shouldPrefetch: false,
});
