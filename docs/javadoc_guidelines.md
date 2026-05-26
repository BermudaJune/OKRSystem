# Javadoc 编写规范

在开始之前，BurningOKR 团队想感谢 [Stephen Colebourne](https://blog.joda.org/ "Stephen's blog")。
我们在制定 Javadoc 规范草案时，受到了他这篇[博文](https://blog.joda.org/2012/11/javadoc-coding-standards.html)的很大启发（可在 [Twitter](https://twitter.com/jodastephen) 关注他）。

为保证文档风格统一，并提升可读性与可维护性，我们制定了以下规则，用于你在编写（或补充）代码文档时参考。
这些规则可以帮助新贡献者更快理解代码，降低项目上手成本。
因此，文档需要尽量做到完整、一致、可读。

## 通用规则

Javadoc 注释的每个部分都应遵循：

- 语法正确（拼写、标点）
- 简短但信息充分
- 避免双关和玩笑
- 不要使用 `@author`
- 每个元素（header、body、param 区块等）用 `<p>` 分段

`注意：字符数限制并非绝对。复杂场景可以适当超出，但仍应尽量简洁。`

### Header（摘要行）

Header 用于简要说明该代码的用途。

- 用一句精确的话描述方法或类
- 不超过 100 个字符
- 应为纯文本
- 不展开深层背景

```java
/**
  * 接收一个整数并返回其两倍值。
  *
  * [...]
  */
public String double(int number){return 2*number;}
```

### Body（正文）

Body 可用于补充更深入的上下文。
但在某些情况下，Header 已足够说明用途，Body 可以省略。

建议：

- 提供必要上下文
- 每行不超过 100 个字符
- 可使用 HTML 标签
- 可引用其他类、方法（`@code` 与 `@link`）
- 复杂场景建议拆分为多个段落（`<p>`）

`重要：在正文中引用其他类时，首次出现使用 @link，后续出现使用 @code。`

```java
/**
  * [...]
  * Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
  * tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
  * <p>
  * Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
  * eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
  * voluptua.
  * [...]
  */
public String foo(int number, Object obj){...}
```

### Params（参数）

`@param` 用于说明方法参数。
还需要明确参数为 `null` 时的行为。
我们规定在参数说明后追加后缀（用逗号分隔）来表达这一点。

| 后缀 | 含义 |
| :------------------- | :------------------------------------------------------------------------------------------------ |
| not null             | 参数不能为空，否则会抛出 `NullPointerException`。 |
| nullable -> [result] | 参数可为空；`[result]` 说明空值处理方式。 |
| null returns [value] | 参数可为空；可自定义返回值，例如 `null returns -1`。 |

参数描述本身应尽量简短。
若参数上下文很多，请放到 Body 说明。

通用要求：

- 每个参数都要有 `@param`
- 每个参数都要注明上表中的一种后缀
- `@param` 顺序与方法签名参数顺序一致
- 描述不必写成完整句子

```java
/**
  * [...]
  * </p>
  * @param number  an integer value, not null
  * @param obj  an random object, null returns null
  * [...]
  */
public String foo(int number, Object obj){...}
```

### Returns（返回值）

`@return` 用于描述方法返回结果。
写作时可把它看成以“returns ...”开头的一句话。

- 保持精确
- 按句子方式表述
- 返回类型为 `void` 的方法不需要 `@return`

```java
/**
  * [...]
  *
  * @param x  an integer value, not null
  * @param y  an integer value, not null
  * @return the product of two integers
  */
public String multiply(int y, int y){...}
```
