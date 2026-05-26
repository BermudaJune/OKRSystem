# 开发说明

## 生产环境安装

如果你想在公司中使用 BurningOKR，请参考 [主文档](../README.md)。
**本页仅用于开发场景。**

开发时可选使用 Keycloak，请参考 [Keycloak 开发安装文档](keycloak_development_install.md)。

## 开发快速开始

我们正在持续优化安装流程，让本地开发更快更简单。

### 检查清单

0. 请先阅读 [代码规范](../CODE_GUIDELINES.md) 与 [实现通用说明](developer_readme.md)（也可参考 [前端说明](../frontend/README.md)）
1. 安装 [PostgreSQL](postgres_install.md) 9.5.14+ 或 [MSSQL](mssql_install.md)
2. 安装 JDK 17（可在[这里](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)下载）
3. 安装 Node.js 与 npm 的 LTS 版本（[下载地址](https://nodejs.org/en/download/)）
4. 安装 Angular CLI

### 源码结构

项目源码分为两部分：

- 前端：基于 **Angular** 的单页应用（SPA）
- 后端：基于 **Spring Boot** 的服务

可使用以下命令克隆完整仓库（包含前后端）：

`git clone https://github.com/BurningOKR/BurningOKR`

### 前端（IntelliJ）

1. 在 IntelliJ 中导入 `frontend` 项目。
2. 在命令行执行 `npm install` 安装依赖。
3. 执行 `npm start` 启动应用，访问 `http://localhost:4200`。

### 后端（IntelliJ）

在 IntelliJ 中选择 `Import Project`，导入 `backend` 目录下的 `build.gradle`。
在导入弹窗中勾选 `use auto-import`。

如果 IntelliJ 没有自动生成运行配置，需要手动创建一个 Gradle 配置：

- Gradle project 选择 `okr-tool`
- Tasks 填写 `bootRun`

![intelliJ-Run-Configuration](./images/intellij_run_config.png)

后端使用了 [Project Lombok](https://projectlombok.org)。
如需在 IDE 中启用，请参考 [Lombok setup 文档](https://projectlombok.org/setup/overview)。

在 PostgreSQL 安装并配置完成后，即可启动 Spring Boot 应用。

## 后端（不使用 IntelliJ）

进入 `backend/burning-okr` 目录，运行：

`./gradlew bootRun -Dspring.profiles.active=local`

在部分 UNIX 系统中，Gradle 可能无法正确找到 JDK。
若出现异常，可尝试：

`export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk<version>.jdk/Contents/Home`

将路径替换为你的实际 JDK 路径，然后重启 shell 或执行：

`source ~/.bash_profile`

### 构建

- 构建后端：`gradlew build`
- 构建前端：`ng build`

## 贡献者

感谢所有已经为 BurningOKR 做出贡献的人和机器人。

<!-- generate new contributor list.. https://contributors-img.firebaseapp.com/ -->
<a href="https://github.com/BurningOKR/BurningOKR/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=BurningOKR/BurningOKR" />
</a>

Made with: [contributors-img](https://contrib.rocks).
