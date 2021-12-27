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
  favicon: "/img/logo.png",
  organizationName: "guoxiaxing", // Usually your GitHub org/user name.
  projectName: "Blog", // Usually your repo name.

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js")
        },
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
          src: `/img/logo.png`
        },
        items: [
          {
            type: "doc",
            docId: "quick-link",
            position: "left",
            label: "技术"
          },
          { to: "blog", label: "生活", position: "left" },
          {
            href: "https://github.com/guoxiaxing/",
            label: "GitHub",
            position: "right"
          }
        ]
      },
      footer: {
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with GuoXiaxing.`
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      },
      hideableSidebar: true
    }),
  plugins: []
};

module.exports = config;
