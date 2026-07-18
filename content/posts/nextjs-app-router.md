---
title: "Next.js App Router 深度解析"
date: "2026-07-01"
description: "深入了解 Next.js App Router 的核心概念、渲染策略和最佳实践。"
tags:
  - nextjs
  - react
  - web
cover: ""
draft: false
---

## App Router vs Pages Router

Next.js 13 引入的 App Router 是一次重大架构升级：

| 特性 | Pages Router | App Router |
|---|---|---|
| 路由定义 | 文件即路由 | 文件夹 + `page.tsx` |
| 布局 | `_app.tsx` / 手动组合 | 嵌套 Layout |
| 数据获取 | `getServerSideProps` 等 | `async` 组件 + `cache()` |
| 流式渲染 | 不支持 | `loading.tsx` + `Suspense` |

## Server Components

默认情况下，App Router 中所有组件都是 **Server Components**：

```typescript
// app/posts/page.tsx — Server Component（默认）
import { getAllPosts } from "@/lib/posts";

export default async function PostsPage() {
  const posts = getAllPosts(); // 直接访问数据库/文件系统
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>{post.title}</li>
      ))}
    </ul>
  );
}
```

## 渲染策略

Next.js 提供了三种渲染模式：

- **Static (SSG)**：构建时生成，`generateStaticParams`
- **Dynamic (SSR)**：请求时渲染，`cache: 'no-store'`
- **ISR**：`export const revalidate = 3600` —— 定时重新验证

### 选择策略

```typescript
// 博客文章 → 静态生成
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// 实时数据看板 → 动态渲染
export const dynamic = "force-dynamic";
```

## 数据缓存

React 的 `cache()` 函数会自动去重同一请求中的重复数据获取：

```typescript
import { cache } from "react";

export const getPost = cache(async (slug: string) => {
  // 同一请求中多次调用只会执行一次
  return db.post.findUnique({ where: { slug } });
});
```

## 总结

App Router 的设计理念是**默认服务端，渐进增强**。对于博客类内容站点，它可以实现近乎完美的 Lighthouse 分数。
