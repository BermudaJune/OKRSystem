# 如何参与贡献

## 报告 Bug 与提出功能需求
我们统一使用 GitHub Issues 处理这两类问题。
请先用 [GitHub 搜索](https://github.com/burningOKR/burningOKR/search?q=is%3Aissue&unscoped_q=is%3Aissue) 检查该问题是否已被报告。
如果已有同类问题，欢迎补充信息，帮助我们更快定位与修复。

如果没有找到对应 issue 并准备新建，请尽量遵循 issue 模板并提供必要信息。
但如果是严重问题，即使信息不完整，也比不提 issue 更好。

## 成为开发者
构建、测试与编码规范请参考 [开发者说明](/docs/developer_readme.md)。

我们非常欢迎 Pull Request。如果你第一次在 GitHub 参与开源项目，可以先看这份[新手指南](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/)。
创建 PR 时，请尽量遵循模板；若为了更清晰简洁而增删部分内容也完全可以。

## 从哪里开始更好

#### 改进文档
改进文档（代码注释、Wiki、网站等）是快速熟悉项目并同时提升代码库质量的好方式。

#### 修复 lint 警告
我们希望将 Burning OKR 逐步做到 [checkstyle](https://checkstyle.org/) 无警告。
为此可打开 [checkstyle 配置](build-tools/src/main/resources/google_checks.xml)（路径：`build-tools/src/main/resources/google_checks.xml`），恢复一个被注释掉的规则，然后修复相关警告并提交 PR。

#### 修复 Bug
从 [问题列表](https://github.com/BurningOKR/BurningOKR/issues) 选择一个 issue，并评论说明你正在修复。
如果有疑问，欢迎直接在该 issue 下讨论。
请确保修复符合 [编码规范](docs/developer_readme.md)。

#### 实现新功能
在集成新功能前，建议先和核心开发者沟通。
通常可在 [问题列表](https://github.com/BurningOKR/BurningOKR/issues) 对应 issue 中讨论。

- 请为你的功能补充测试。
- 所有测试需通过，代码需按规范格式化，且 CI 必须通过。
- 最后提交 [pull request](https://github.com/BurningOKR/BurningOKR/compare)。

## 遵循许可证
对本项目的所有改动都必须符合 [Apache 2.0 License](/LICENSE.txt)。
