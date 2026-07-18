---
title: "高效的 Git 工作流程"
date: "2026-06-20"
description: "介绍一个经过实践验证的高效 Git 分支管理和提交工作流。"
tags:
  - git
  - devops
  - productivity
cover: ""
draft: false
---

## 分支模型

我推荐使用 **Trunk-Based Development** 的简化版：

- `main` — 始终可部署
- `feature/*` — 短期功能分支（1-3 天内合并）
- `fix/*` — Bug 修复分支

```bash
# 创建一个功能分支
git checkout -b feature/add-login

# 工作完成后，确保基于最新的 main
git fetch origin
git rebase origin/main

# 提交 PR
gh pr create --title "Add login page"
```

## 提交信息规范

遵循 **Conventional Commits**：

```
<type>(<scope>): <description>

[optional body]
```

常用 type：

- `feat` — 新功能
- `fix` — Bug 修复
- `refactor` — 代码重构
- `docs` — 文档变更
- `chore` — 构建/工具变更

## 交互式 Rebase

在合并前整理提交历史：

```bash
git rebase -i HEAD~3
```

```
pick abc1234 feat: add login form
squash def5678 fix: correct button alignment
squash ghi9012 refactor: extract validation
```

## 总结

好的 Git 习惯能显著提高团队协作效率。核心原则：

1. 保持分支短命
2. 提交信息有意义
3. Rebase 不要改写已推送的历史
