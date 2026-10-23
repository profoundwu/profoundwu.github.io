# GitHub 博客托管方式调研

核验日期：2026-10-23。仅使用官方文档。当前目录及上级目录未发现适用的 AGENTS.md。

个人技术博客优先考虑 GitHub Pages。它直接托管仓库生成的静态文件，无需管理服务器。页面是否美观取决于生成器和主题，托管平台主要决定发布流程、域名和访问能力。这是基于产品机制的选型判断。[GitHub Pages 简介](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

## GitHub Pages 的两种发布方式

| 方式 | 如何发布 | 适用情况 |
| --- | --- | --- |
| 从分支发布 | 在 Settings → Pages 选择分支，以及仓库根目录或 `/docs`，推送后自动发布 | 原生静态文件、使用内置 Jekyll 构建的简单博客 |
| GitHub Actions | 推送后运行工作流，构建网站、上传静态产物并部署 | Hugo、Astro、Hexo 等有独立构建流程的生成器，或需要自定义 Jekyll 插件 |

GitHub 官方仍提供两种方式。发布源文档建议无需控制构建过程时使用分支；Jekyll 文档则把 Actions 称为当前推荐的部署自动化方式。初次建站可以直接采用主题官方提供的 Actions 模板。[发布源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[Jekyll 与 Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

分支发布默认执行 Jekyll；提交已构建好的其他生成器产物时，可以在发布根目录放置空的 `.nojekyll` 文件。Actions 允许自己选择构建工具，不要求使用 Jekyll。[创建 Pages 站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## 账号、网址和域名

- GitHub Free 支持公开仓库的 Pages。GitHub Pro、Team 等计划还支持从私有仓库发布。个人免费账号不能直接从私有仓库使用 Pages。[GitHub 计划](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)
- 个人站点的仓库必须命名为 `<用户名>.github.io`，默认网址为 `https://<用户名>.github.io/`，每个账号最多一个。项目站点通常为 `https://<用户名>.github.io/<仓库名>/`，每个仓库最多一个。[站点类型](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- 支持自定义域名；配置正确的自定义域名也支持 HTTPS 和强制 HTTPS。自定义域名需要另行注册，免费 `github.io` 地址可直接使用。[HTTPS 官方说明](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
- 私有仓库不等于私有网站。普通 Pages 网站对互联网公开；私有站点访问控制涉及组织和 Enterprise Cloud，个人 Pro 的私有源仓库不自动提供私有访问。[发布源配置](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)、[GitHub 计划](https://docs.github.com/en/get-started/learning-about-github/githubs-plans)

## 与个人博客有关的限制

Pages 只托管静态文件，不运行 PHP、Python 等服务端程序。文章、标签、归档、RSS 等内容可以在构建时生成；评论、跨设备点赞、邮件订阅等交互需要外部服务或独立后端。这些功能不应被当作 Pages 自带能力。[创建 Pages 站点](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

已发布网站大小上限 1 GB，源仓库建议不超过 1 GB，每月带宽软限制 100 GB，部署超过 10 分钟会超时。每小时 10 次构建的软限制不适用于自定义 Actions 构建发布。对普通文字和适量图片的博客，这些额度通常足够，此判断不包括大量视频或原始照片托管。[Pages 限制](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## GitHub 存源码，外部平台托管

这条路线仍可以在 GitHub 保存 Markdown、图片和主题，每次推送由另一个平台构建发布。它需要多维护一个账号及 GitHub 仓库授权。

| 路径 | 已核验能力 | 选型含义 |
| --- | --- | --- |
| GitHub + Cloudflare Pages | 支持公开及私有 GitHub 仓库、推送自动构建、PR 预览，默认 `*.pages.dev` 地址。Free 每月 500 次构建，单次最多 20 分钟 | 能用，但当前新项目应同时评估 Workers Static Assets |
| GitHub + Cloudflare Workers Static Assets | 静态文件托管，无需 Worker 业务脚本；Workers Builds 支持 GitHub 推送后自动构建部署 | Cloudflare 当前对新项目的官方推荐路线 |
| GitHub + Vercel | GitHub 推送自动部署，分支和 PR 可生成预览 | 适合想要部署预览，或以后可能增加应用功能的作者 |

Cloudflare Pages 的依据为 [Git 集成](https://developers.cloudflare.com/pages/get-started/git-integration/)、[静态 HTML 部署](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)、[额度限制](https://developers.cloudflare.com/pages/platform/limits/)。Cloudflare 官方明确表示 Pages 继续可用，但新功能与优化集中于 Workers，新项目建议用 Workers Static Assets。[Workers 最佳实践](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)、[Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/)

Vercel Hobby 为免费方案，仅限个人非商业用途。GitHub 组织的私有仓库不支持连接 Hobby，个人仓库和协作部署也应遵守其提交作者规则。日常个人博客可以评估，但不要将免费方案理解为没有用途限制或无限资源。[Vercel GitHub 集成](https://vercel.com/docs/git/vercel-for-github)、[Hobby 方案](https://vercel.com/docs/plans/hobby)、[Git 仓库部署规则](https://vercel.com/docs/git)

本次未做中国大陆多运营商访问测试，因此不能声称 GitHub Pages、Cloudflare 或 Vercel 哪一种在国内始终更快、更稳定。正式选托管前，可用准备采用的实际域名，在作者与主要读者网络上测试。
