# Bo · 技术与思考

基于 Jekyll + Chirpy 7.6，使用已确认的“轻盈白”配色。白色侧栏、浅灰点阵背景、柔和阴影，搭配少量浅蓝、粉色和薄荷色。星舰头像、Bo 和 `Stay hungry, Stay foolish.` 均已配置。

站点地址：https://profoundwu.github.io

## 日常写作

文章存放在 `_posts/`，图片放在 `assets/img/`。可以在本地编辑，也可以直接在 GitHub 网页中新建 Markdown 文件。

创建文章：

```sh
python3 tools/new-post.py "重新理解 Go 接口" --slug go-interface-design --category 编程与设计 --tags Go,接口设计
```

先写草稿则加 `--draft`，文章会保存到 `_drafts/`，正式发布不会包含草稿。完成后，将它移到 `_posts/` 并按 `YYYY-MM-DD-slug.md` 命名。

文章格式：

```yaml
---
title: "文章标题"
date: 2026-10-23 15:00:00 +0800
description: "一两句话概括文章内容。"
categories: [编程与设计]
tags: [Go, 接口设计]
toc: true
---
```

在上述元数据之后写 Markdown 正文，使用二级标题自动生成目录。代码块写明语言，例如 `go`。文章图片可引用 `/assets/img/example.jpg`。

## 本地预览

安装 Ruby 3.4 和 Bundler 后，在仓库根目录运行：

```sh
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

然后打开 http://127.0.0.1:4000 。要查看草稿，运行 `bundle exec jekyll serve --drafts`。

也可以使用隔离的 Docker 环境：

```sh
docker compose up --build
```

打开相同地址，按 Ctrl+C 停止。首次运行需要下载 Ruby 镜像和依赖。

## 发布到 GitHub Pages

仓库使用 `profoundwu.github.io`，默认分支为 `main`。在 Settings → Pages → Source 选择 GitHub Actions。以后将文章提交到 `main`，工作流会自动构建、检查内部链接并发布。

手动检查：

```sh
JEKYLL_ENV=production bundle exec jekyll build
bundle exec htmlproofer _site --disable-external --allow-hash-href
```

`.github/workflows/check.yml` 检查 PR；`pages-deploy.yml` 负责正式部署。构建产物 `_site/` 不提交到仓库。

## 修改外观和内容

- `_config.yml`：姓名、签名、站点地址和头像。
- `assets/css/light-air.css`：轻盈白样式。
- `_layouts/home.html`：首页横幅、空状态和文章列表，保留 Chirpy 分页。
- `_includes/sidebar.html`：侧栏。
- `_tabs/about.md`：关于页。
- `assets/img/README.md`：星舰图片来源。
- `_drafts/writing-example.md`：写作模板，不发布为正式文章。

正式站点不包含原型切换器，也不发布演示文章。最初没有文章时显示空状态，发布第一篇 Markdown 后自动出现文章列表、分类和标签。

主题使用 MIT 许可。星舰照片来自 SpaceX / The Planetary Society，来源页注明属于公共领域。第三方前端资源位于 `assets/lib/`，保留其上游许可文件。
