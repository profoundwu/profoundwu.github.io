---
title: "写作示例，请替换为你的文章"
description: "这里填写文章摘要。此文件保存在草稿目录，不会发布到正式网站。"
categories: [编程与设计]
tags: [Go, 接口设计]
toc: true
---

这是一份 Markdown 写作模板。将标题、摘要、分类和正文替换为自己的内容。

## 问题与背景

描述遇到的问题，以及当时的约束。

## 我的尝试

```go
type UserReader interface {
    FindByID(ctx context.Context, id int64) (*User, error)
}
```

## 判断与取舍

记录为什么选择这个方案，以及还有哪些问题需要继续验证。
