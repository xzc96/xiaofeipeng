import { navbar } from "vuepress-theme-hope";

export const navbarConfig = navbar([
  { text: "首页", icon: "discover", link: "/" },
  { text: "随笔", icon: "edit", link: "/posts/"},
  //   TODO 数据库 中间件 算法 spring  方法论
  { text: "学习路径", icon: "java", link: "/learning-path/" },
  { text: "学习笔记", icon: "book", link: "/学习笔记/" },
  { text: "面试指南", icon: "java", link: "/home.md" },
  { text: "开源项目推荐", icon: "github", link: "/open-source-project/" },
  { text: "书籍推荐", icon: "book", link: "/books/" },
  { text: "工具", icon: "book", link: "/tools/" },
  { text: "AI", icon: "book", link: "/ai/" },
  // { text: "技术文章", icon: "article", link: "/high-quality-technical-articles/" },
  {
    text: "网站相关",
    icon: "about",
    link: "/about-the-author/"
  },
]);
