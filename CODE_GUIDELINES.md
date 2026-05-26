# 代码规范

## 通用要求

### 测试

后续所有新增代码都必须由单元测试覆盖。

### Commit Message

我们尽量遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范组织提交信息。

推荐在 IntelliJ 中安装 [conventional commit 插件](https://plugins.jetbrains.com/plugin/13389-conventional-commit)。

### 注释

如果你写 `todo` 注释，请使用如下格式：

```java
// TODO (F.L. 25.06.20): <Your Todo message>
```

其中 `F.` 和 `L.` 分别表示你的名和姓的首字母。

## 前端

### TS-Lint

本项目使用 [ts-lint](https://palantir.github.io/tslint/) 强制执行大部分代码规范。
如果要贡献代码，需遵循这些规则。
建议在 IDE 安装 tslint 插件；IntelliJ 默认已内置。

如果 IDE 不支持 ts-lint，可通过命令 `ng lint` 查找 lint 错误。

### 定义

- 类型定义示例：`export type ExampleType = string;`

### 通用代码规范

这里只列出 ts-lint 不会自动强制的规则：

| 建议做 | 不建议做 |
|----|-------|
| 使用 [Angular I18n](https://angular.io/guide/i18n) 向用户展示文案/消息。 | 未做国际化就直接展示字符串。 |
| 尽量避免使用 `any`，优先泛型或显式类型。 | 在明确类型已知时仍使用 `any`。 |
| 始终使用显式类型，必要时定义新类型。 | 使用匿名对象作为类型定义。 |
| 类型过长时，提取为较短的类型定义。 | 使用比标识符与泛型参数还冗长的类型表达式。 |
| 全局复用的新类型定义放到 `typings.d.ts`。 | 将全局类型定义放在 `typings.d.ts` 之外。 |
| 组件/服务局部类型定义放在对应类的同一文件中。 | 把组件/服务局部类型定义塞进 `typings.d.ts`。 |

### 架构约定

如果某个组件或服务被用于：

- 所有模块：声明在 `core` 模块。
- 多个模块：声明在 `shared` 模块。
- 单个模块：声明在该模块内部。

## 后端

### Spotless

我们使用 [Spotless](https://github.com/diffplug/spotless/blob/master/plugin-gradle/README.md) 应用 [Google Java Style](https://google.github.io/styleguide/javaguide.html)。

只有 Spotless 无格式问题时，我们才会接受 PR。
因此请在提交前先运行 `spotlessApply`。

### Migration 脚本

当你创建的迁移脚本会：

- 删除表
- 删除列
- 删除数据
- 或移除其他内容

请在对应 SQL 语句前添加注释，说明删除理由。
迁移脚本不应造成数据丢失。
