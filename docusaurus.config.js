// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Try's Blog",
  tagline: "记录📝",
  url: "https://guoxiaxing.github.io",
  baseUrl: `${process.env.NODE_ENV === "development" ? "/" : "/Blog/"}`,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "/img/logo.jpeg",
  organizationName: "guoxiaxing", // Usually your GitHub org/user name.
  projectName: "Blog", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          path: "./blog"
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      })
    ]
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Try's Blog",
        logo: {
          alt: "Try's Blog",
          src: `/img/logo.jpeg`
        },
        items: [
          { to: "/blog", label: "日常积累", position: "left" },
          { to: "/fragment", label: "框架", position: "left" },
          { to: "/typescript", label: "Typescript", position: "left" },
          {
            href: "https://github.com/guoxiaxing/",
            label: "GitHub",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "社区",
            items: [
              {
                label: "掘金",
                href: "https://juejin.cn/user/4362499364494445"
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with GuoXiaxing.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      }
    }),
  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * 此参数对于任何支持多实例的插件都需要
         */
        id: "fragment",
        /**
         * URL route for the blog section of your site.
         * *不要* 在末尾添加斜线（/）
         */
        routeBasePath: "fragment",
        /**
         * 指向存放博客文章的目录的路径。相对于网站根目录。
         */
        path: "./fragment"
      }
    ],
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * 此参数对于任何支持多实例的插件都需要
         */
        id: "typescript",
        /**
         * URL route for the blog section of your site.
         * *不要* 在末尾添加斜线（/）
         */
        routeBasePath: "typescript",
        /**
         * 指向存放博客文章的目录的路径。相对于网站根目录。
         */
        path: "./typescript"
      }
    ]
  ]
};

module.exports = config;
