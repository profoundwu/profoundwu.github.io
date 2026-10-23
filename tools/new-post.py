#!/usr/bin/env python3
"""Create a Markdown post or draft with YAML-safe metadata."""
import argparse
from datetime import datetime
import json
from pathlib import Path
import re
from zoneinfo import ZoneInfo

parser = argparse.ArgumentParser(description="创建一篇博客 Markdown 文章")
parser.add_argument("title", help="文章标题")
parser.add_argument("--slug", required=True, help="英文网址，例如 go-interface-design")
parser.add_argument("--category", default="技术思考")
parser.add_argument("--tags", default="", help="用英文逗号分隔")
parser.add_argument("--draft", action="store_true", help="创建到草稿目录")
args = parser.parse_args()
if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", args.slug):
    parser.error("slug 只允许小写英文字母、数字和中间的连字符")
root = Path(__file__).resolve().parent.parent
now = datetime.now(ZoneInfo("Asia/Shanghai"))
folder = root / ("_drafts" if args.draft else "_posts")
folder.mkdir(exist_ok=True)
filename = f"{args.slug}.md" if args.draft else f"{now:%Y-%m-%d}-{args.slug}.md"
path = folder / filename
quote = lambda value: json.dumps(value, ensure_ascii=False)
text = f'''---
title: {quote(args.title)}
date: {quote(now.strftime('%Y-%m-%d %H:%M:%S %z'))}
description: ""
categories: {quote([args.category])}
tags: {quote([tag.strip() for tag in args.tags.split(',') if tag.strip()])}
toc: true
---

在这里开始写作。
'''
with path.open("x") as stream:
    stream.write(text)
print(path)
