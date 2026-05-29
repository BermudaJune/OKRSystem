<p align="center"><img src="/docs/ci/Logo_burningOKR_RGB_web.png" width="35%" height="35%" alt="Burning OKR"/></p>

<br/><br/><br/>

# BurningOKR

BurningOKR 的目标是帮助团队围绕公司目标持续建立聚焦与对齐，并把透明协作融入企业文化。

BurningOKR 是一个 Web 应用，技术栈为 Angular 前端 + Java Spring Boot 后端，数据库使用 PostgreSQL。

## 项目介绍（当前版本）

本项目目前采用前后端分离与容器化部署：

- 前端：Angular + Nginx（对外入口）
- 后端：Spring Boot（REST API + WebSocket）
- 数据库：PostgreSQL
- 认证：OIDC（默认可对接 Keycloak）

默认访问入口：

- 前端：`http://localhost:4200`
- Keycloak（如启用）：`http://localhost:8081`

## 已完成修改（本地二次开发版）

当前仓库已完成以下实用化调整（面向中文使用场景与本地试用）：

- 主要说明文档已中文化（`README`、`docs` 下开发/安装/配置相关文档）。
- 补充了项目深度说明文档：`docs/project_deep_dive_zh.md`（架构、数据库、部署、配置说明）。
- 已验证 Docker 方式可启动前后端、数据库与 Keycloak，并可通过 `4200` 访问页面。
- 前端中文可用性进行了补充（包含部分文案修订与翻译完善）。
- 启动与排障流程已沉淀为可复用命令（见下文“当前推荐启动方式”）。

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

## 当前推荐启动方式（本地试用）

如果你希望直接使用“本地代码构建镜像”启动（便于二次开发验证），推荐执行：

1. 进入 `docker` 目录。
2. 按需编辑：
   - `backend.env.sample`
   - `postgres.env.sample`
3. 构建并启动：
   - `docker compose -f docker-compose.yml -f docker-compose.localbuild.yml up -d --build`
4. 查看状态：
   - `docker ps`
5. 查看日志：
   - `docker logs -f burning-okr-frontend`
   - `docker logs -f burning-okr-backend`
   - `docker logs -f burning-okr-postgres`
   - `docker logs -f burning-okr-keycloak`
6. 停止环境：
   - `docker compose -f docker-compose.yml -f docker-compose.localbuild.yml down`

说明：

- 前端容器会通过 Nginx 反向代理后端 API（`/api`）与 WebSocket（`/wsregistry`）。
- 若使用 Keycloak，建议保持 `issuer` 为 `http://localhost:8081/realms/burning-okr`（浏览器访问）。
- 后端 JWT 校验可使用容器内 JWK 地址（见 `backend.env.sample` 中 `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI` 示例）。

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
