---
title: "TypeScript 实用模式与技巧"
date: "2026-07-10"
description: "总结一些在日常开发中非常实用的 TypeScript 模式和技巧。"
tags:
  - typescript
  - patterns
cover: ""
draft: false
---

## 引言

TypeScript 已经成为前端开发的标配。但除了基础的 Type Annotations，还有一些实用模式可以帮助我们写出更安全、更简洁的代码。

## Discriminated Unions

当你有一组类型，它们共享一个共同的字段用于区分具体类型：

```typescript
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.side ** 2;
  }
}
```

编译器会在 `switch` 中提供完整的类型守卫和自动补全。

## `satisfies` 操作符

`satisfies` 让你在保持类型约束的同时，保留具体的字面量类型：

```typescript
const palette = {
  red: [255, 0, 0],
  green: "#00ff00",
  blue: [0, 0, 255],
} satisfies Record<string, string | number[]>;

// palette.green 的类型是 "#00ff00" 而不是 string
palette.green.toUpperCase(); // OK!
```

## Template Literal Types

结合模板字面量类型可以实现字符串级别的类型约束：

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

// "onClick" | "onFocus" | "onBlur"
type MouseEventNames = EventName<"click" | "focus" | "blur">;
```

## 总结

这些模式在大型项目中特别有用，能够显著减少运行时错误。希望对你有所帮助！
