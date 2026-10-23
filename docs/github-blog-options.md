# GitHub 静态博客方案调研

调研日期：2026-10-23。目标是记录程序员生涯中的技术与个人思考，优先考虑日常写作简单、页面美观和长期维护成本。

## 建议

优先考虑 **GitHub Pages + Hugo + PaperMod**。这个组合适合以文字为主、希望长期积累文章的个人博客。PaperMod 自带文章目录、归档、搜索、代码复制和深浅色模式，不需要 Node.js 构建依赖。需要先配置 Hugo、主题和自动部署，之后日常维护主要是写 Markdown 并提交 Git。这是基于需求的选型判断，不是实测性能排名。[PaperMod 官方仓库](https://github.com/adityatelange/hugo-PaperMod)、[Hugo 部署文档](https://gohugo.io/host-and-deploy/deploy-to-github-pages/)

如果更看重带封面、配色和动效的视觉效果，优先看 Astro + Fuwari；如果希望直接在网页里发布文章，优先看 Gmeek。

## 托管与写作工具

GitHub 仓库保存文章、图片和配置；静态网站生成器把内容生成 HTML、CSS、JavaScript；GitHub Pages 对外提供网页访问。也可以把仓库连接 Cloudflare 或 Vercel，让它们负责构建和托管。后者属于“代码在 GitHub，网站由其他平台托管”。Cloudflare 当前对新项目推荐 Workers Static Assets，Pages 继续可用。[Cloudflare 官方建议](https://developers.cloudflare.com/workers/best-practices/workers-best-practices/)。托管细节见同目录的 `github-blog-hosting-research.md`。

## 方案比较

下列难度与适用性是基于官方安装流程的判断。美观依赖个人偏好，演示页用于直接比较。

| 方案 | 日常写作 | 初次配置和维护 | 风格与适用情况 | 官方资料与演示 |
| --- | --- | --- | --- | --- |
| Hugo + PaperMod | Markdown 文件，提交 Git 自动部署 | 安装 Hugo，配置主题和 Actions；后续需要兼顾 Hugo 与主题版本 | 简洁、偏文字，适合长期技术博客 | [仓库](https://github.com/adityatelange/hugo-PaperMod)、[演示](https://adityatelange.github.io/hugo-PaperMod/) |
| Astro + AstroPaper / Fuwari | Markdown；AstroPaper 也支持 MDX | 需要 Node.js 和包管理器，升级时维护框架和依赖 | AstroPaper 偏简洁阅读；Fuwari 有自定义配色、横幅和页面动效 | [AstroPaper](https://github.com/satnaing/astro-paper)、[演示](https://astro-paper.pages.dev/)；[Fuwari](https://github.com/saicaca/fuwari)、[演示](https://fuwari.vercel.app/) |
| Jekyll + Chirpy | Markdown 文件 | 官方提供 starter，推荐以模板创建；本地预览需要 Ruby/Jekyll 环境 | 适合技术长文，有分类、标签、搜索等内容组织功能 | [主题介绍](https://chirpy.cotes.page/about/)、[入门流程](https://chirpy.cotes.page/posts/getting-started/)、[演示](https://chirpy.cotes.page/) |
| Hexo + NexT | Markdown 文件 | Node.js、Git、Hexo 与主题配置；按需求增加插件 | 传统博客选择，适合愿意按主题文档配置的用户 | [Hexo 文档](https://hexo.io/docs/)、[NexT 仓库](https://github.com/next-theme/hexo-theme-next) |
| Gmeek | 在 GitHub Issues 中写作，并添加标签触发发布 | 无需本地环境，使用模板并开启 Actions | 适合随手记录，界面接近 GitHub；文章源依赖 Issues，迁移时需要导出与整理 | [作者上手教程](https://blog.meekdai.com/post/Gmeek-kuai-su-shang-shou.html)、[作者博客](https://blog.meekdai.com/) |
| Quartz | Markdown，可结合 Obsidian | 需要 Node.js、配置和部署流程 | 支持双向链接、关系图、搜索，适合互相关联的笔记和知识库 | [官方文档与演示](https://quartz.jzhao.xyz/) |

Hugo、Astro、Hexo、Jekyll 的 Markdown 文件可通过本地编辑器或 GitHub 网页编辑。启用自动部署后，通常不需要每篇文章手动执行部署命令。本地预览仍需要相应环境。Astro 官方提供 GitHub Pages Action，Chirpy 和 Hugo 也有对应部署文档。[Astro 部署](https://docs.astro.build/en/guides/deploy/github/)、[Chirpy 入门](https://chirpy.cotes.page/posts/getting-started/)、[Hugo 部署](https://gohugo.io/host-and-deploy/deploy-to-github-pages/)

## 按偏好缩小范围

- 希望配置好之后专注文字，先看 PaperMod 的演示。
- 更喜欢配色、封面和动画，先看 Fuwari；接受 Node.js 依赖维护。
- 喜欢侧栏、分类和成熟技术博客的组织方式，先看 Chirpy。
- 希望只用 GitHub 网页写作，先看 Gmeek。
- 大量使用 Obsidian，希望公开互相关联的笔记，先看 Quartz。

不建议为第一版从零编写 HTML/CSS。后续每次增加目录、归档、搜索或文章模板都会增加维护工作。现成博客模板更符合当前目标。这是维护成本判断，并非 GitHub Pages 的能力限制。

## 推荐的第一版范围

使用现成主题，保留首页文章列表、文章页、归档、标签、搜索、关于页和深浅色模式。完成自动部署后，用一篇包含中文长文、代码块、图片和手机阅读场景的样稿验证效果，再决定是否定制样式。

常规写作流程是创建 Markdown 文件，填写标题、日期和标签，添加正文与图片，然后提交 Git。让 Actions 自动构建并更新站点。尽量使用标准 Markdown，并将图片与文章一起保存，降低未来更换主题或生成器时的迁移成本。

本次仅完成调研，没有创建 GitHub 仓库或部署站点。
