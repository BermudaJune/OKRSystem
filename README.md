<p align="center"><img src="/docs/ci/Logo_burningOKR_RGB_web.png" width="35%" height="35%" alt="Burning OKR"/></p>

<br/><br/><br/>

# BurningOKR

BurningOKR 的目标是帮助团队围绕公司目标持续建立聚焦与对齐，并把透明协作融入企业文化。

BurningOKR 是一个 Web 应用，技术栈为 Angular 前端 + Java Spring Boot 后端，数据库使用 PostgreSQL。

## 安装与部署（Docker）

请先安装 Docker 和 Docker Compose，然后执行以下步骤：

1. 进入项目目录下的 `docker` 文件夹。
2. 编辑 [backend.env.sample](/docker/backend.env.sample)，填入数据库连接、认证、邮件等配置。
3. 编辑 [postgres.env.sample](/docker/postgres.env.sample)，设置 `POSTGRES_USER`、`POSTGRES_PASSWORD`、`POSTGRES_DB`。
4. 如果不使用 Azure 或 SMTP，可在 `backend.env.sample` 中将相关配置注释掉。
5. 在 `docker` 目录执行：
   - 前台运行：`docker compose up`
   - 后台运行：`docker compose up -d`
6. 启动后可通过 `http://localhost:4200` 访问前端页面。

## 本地开发

如果你要参与开发或二次开发，请参考 [开发文档](/docs/development.md)。

## FAQ

- **我现在通过 Tomcat 运行 BurningOKR，是否建议迁移到 Docker？**  
  建议迁移。项目主要维护并支持 Docker 镜像方式；你仍可使用 Tomcat，但官方不提供支持。

- **`npm install` 出现错误（python2、node-sass、node-gyp 等）怎么办？**  
  请使用 Node.js 的 LTS 版本，不要使用 Current 版本：<https://nodejs.org/en/download/>

## 联系方式

你可以发送邮件至 [burningokr@brockhaus-ag.de](mailto:burningokr@brockhaus-ag.de)，或在 Twitter 联系 [@BurningOKR](https://twitter.com/BurningOkr)。

## 许可证

BurningOKR 最初是 [BROCKHAUS AG](http://brockhaus-ag.de) 的培训项目之一。

我们相信开源方案能释放更大价值，因此该项目以 Apache 2.0 许可证在 GitHub 开源。

详见 [LICENSE.txt](LICENSE.txt)。
