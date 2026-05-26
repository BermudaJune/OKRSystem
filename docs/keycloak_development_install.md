# 安装 Keycloak

# <span style="color:#E52B50">免责声明</span>

**本 README 仅用于开发场景。**

**本文内容仅用于开发与技术说明，帮助开发者理解并实现相关功能。<span style=color:#E52B50>本文并非官方产品文档，也不保证覆盖所有情况或为最终标准。</span>**

**文中信息可能随时变更，且不一定是最新状态。请以 Keycloak 维护方提供的[官方文档](https://www.keycloak.org/getting-started/getting-started-docker)为准。**

**我们已尽力保证信息准确，但不对内容的完整性、正确性或特定用途适用性做任何担保。请在实际决策前自行核验官方信息。**

**软件开发本身存在风险。基于本文执行任何操作，风险由使用者自行承担。本文作者与贡献者不对因使用或误用本文信息导致的损失负责。**

**阅读本文即表示你已知悉并同意上述免责声明。若不同意，请勿将本文作为开发依据。**

## 概览

欢迎使用 Keycloak 说明文档。
本文提供 Keycloak 的高层介绍。Keycloak 是 Red Hat 提供的开源身份与访问管理（IAM）方案，可通过集中式认证与授权简化应用安全接入。

## 什么是 Keycloak？

Keycloak 是一个健壮且可扩展的 IAM 系统，用于安全且友好地管理用户身份、认证与授权。
它提供用户认证、单点登录（SSO）和授权能力，让开发者把精力集中在业务开发，将用户管理交给 Keycloak。

## 快速开始

请按 Keycloak 官方文档操作：<https://www.keycloak.org/getting-started/getting-started-docker>

1. 创建的 realm 名称请设置为 `burning-okr`
2. 在该 realm 中创建 Realm Role，名称必须为 `burning-okr-admin`

按官方文档完成全部步骤后，Keycloak 即可用于 BurningOKR 开发。
