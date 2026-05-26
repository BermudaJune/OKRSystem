# BurningOKR 项目深度解析（面向二次开发）

本文基于当前仓库代码与当前运行容器的实际结构整理，目标是让你能快速建立“系统级理解”。

## 1. 项目定位与业务边界

BurningOKR 是一个 OKR 管理系统，核心围绕以下业务对象：

- 周期（Cycle）
- 公司/组织结构（OkrUnit：公司、分支、团队）
- 目标（Objective）
- 关键结果（KeyResult）
- 任务看板（TaskBoard/Task/TaskState）
- 主题草案（TopicDraft）
- 用户与角色（User，管理员组）
- 系统配置（Configuration，OIDC 配置等）

支持能力包括：

- 组织结构维护与层级展示
- OKR 生命周期管理（创建、编辑、排序、状态控制）
- 任务看板与实时协作（WebSocket）
- OIDC 登录（Keycloak 或 Azure AD）
- 管理端配置与数据导出

---

## 2. 总体系统架构

## 2.1 逻辑架构（前后端）

```text
Browser (Angular SPA)
  -> Nginx (frontend container)
    -> /api/*                  -> Spring Boot REST API
    -> /applicationSettings/*  -> Spring Boot settings endpoint
    -> /wsregistry             -> Spring Boot STOMP WebSocket endpoint
                                      |
                                      -> PostgreSQL (JPA + Flyway)
                                      -> OIDC Provider (Keycloak/Azure AD)
```

## 2.2 后端分层（Gradle 多模块）

后端是多模块 Gradle 工程（`backend/burning-okr/settings.gradle`）：

- `burning-okr-app`：启动类、Controller、配置（安全、WebSocket、Swagger）
- `burning-okr-logic`：业务服务层（service/*）
- `burning-okr-data`：Repository/JPA 数据访问
- `burning-okr-model`：领域模型（Entity/DTO 基础模型）

典型调用链：

`Controller -> Service(Logic) -> Repository(Data) -> Entity(Model) -> PostgreSQL`

## 2.3 前端结构（Angular）

前端主目录 `frontend/src/app`：

- `core`：认证、拦截器、基础服务、全局行为
- `okrview`：OKR 主视图、目标、关键结果、任务看板、WebSocket
- `okr-units`：公司/组织结构管理
- `cycle-admin`：周期管理
- `admin`：管理员相关功能
- `dashboard`：看板
- `topic-drafts`：主题草案流程
- `shared`：通用组件、模型、工具服务
- `config`：OIDC 等前端配置获取逻辑

---

## 3. 核心技术栈

## 3.1 后端

- Java 17
- Spring Boot 3.x
- Spring Security 6（OAuth2 Resource Server + JWT）
- Spring Data JPA
- Hibernate + Envers（审计）
- Flyway（数据库迁移）
- WebSocket STOMP（`/wsregistry` + `/topic/*`）
- PostgreSQL / MSSQL 双方言支持（迁移脚本分目录维护）

参考：

- `backend/burning-okr/libs.versions.toml`
- `backend/burning-okr/burning-okr-app/build.gradle`

## 3.2 前端

- Angular 14
- Angular Material + Flex Layout
- `angular-oauth2-oidc`（OIDC 登录）
- `@ngx-translate/core`（多语言）
- STOMP 客户端：`@stomp/ng2-stompjs`, `@stomp/rx-stomp`
- Jest（单测）

参考：

- `frontend/package.json`
- `frontend/angular.json`

## 3.3 部署基础设施

- Docker / Docker Compose
- 前端容器：Nginx 托管静态资源 + 反向代理 API/WS
- 后端容器：Spring Boot fat jar
- 数据库容器：PostgreSQL 15.3（默认 compose）

---

## 4. 数据库设计（核心）

## 4.1 迁移机制

- Flyway 扫描路径：`classpath:db/migration/{vendor}`
- PostgreSQL 脚本：`backend/.../resources/db/migration/postgresql`
- SQL Server 脚本：`backend/.../resources/db/migration/sqlserver`
- 当前运行实例中已执行迁移：66 条（最新 rank 对应 `V72`）

## 4.2 当前运行库中的主要表（39 张）

核心业务表（节选）：

- `cycle`
- `okr_unit`
- `objective`
- `key_result`
- `task_board`
- `task_state`
- `task`
- `okr_topic_description`
- `okr_topic_draft`
- `user`
- `user_settings`
- `configuration`
- `dashboard_creation`
- `chart_creation_options`
- `activity`
- `note` + `note_*`

审计/历史相关：

- `revision_information`
- `task_aud`, `task_state_aud`, `key_result_aud`, `task_user_aud`
- `key_result_history`
- `okr_unit_history`
- `okr_topic_draft_history`

## 4.3 实体与表的关键映射

## 4.3.1 组织与 OKR 主干

- `Cycle` -> `cycle`
- `OkrUnit`（单表继承）-> `okr_unit`
  - `OkrCompany` / `OkrBranch` / `OkrDepartment` 通过 `okr_unit_type` 区分
- `Objective` -> `objective`
- `KeyResult` -> `key_result`

关键外键：

- `okr_unit.cycle_id -> cycle.id`
- `okr_unit.parent_okr_unit_id -> okr_unit.id`
- `objective.parent_okr_unit_id -> okr_unit.id`
- `objective.parent_objective_id -> objective.id`
- `key_result.parent_objective_id -> objective.id`

## 4.3.2 看板与任务

- `TaskBoard` -> `task_board`
- `TaskState` -> `task_state`
- `Task` -> `task`
- `task_user` 存任务-用户 UUID 集合

关键外键：

- `task_board.parent_unit_id -> okr_unit.id`
- `task_state.parent_task_board_id -> task_board.id`
- `task.parent_task_board_id -> task_board.id`
- `task.task_state_id -> task_state.id`
- `task.assigned_key_result_id -> key_result.id`
- `task.previous_task_id -> task.id`

## 4.3.3 主题草案与说明

- `OkrTopicDescription` -> `okr_topic_description`
- `OkrTopicDraft`（继承）-> `okr_topic_draft` + `okr_topic_description`
- `okr_description_member` / `okr_description_stakeholder` 保存 UUID 集合

关键外键：

- `okr_topic_draft.id -> okr_topic_description.id`（继承关联）
- `okr_topic_draft.parent_unit_id -> okr_unit.id`
- `okr_topic_draft.history_id -> okr_topic_draft_history.id`

## 4.3.4 注释与审计

- `Note` 基类表：`note`
- 子类：`note_objective`, `note_key_result`, `note_topic_draft`
- Envers 修订表：`revision_information` + `*_aud`

## 4.3.5 用户与配置

- `User` -> `user`（UUID 主键）
- `UserSettings` -> `user_settings`
- `Configuration` -> `configuration`
- OIDC 历史配置表：`oauth_client_details`, `oauth_configuration`

---

## 5. 安全与认证架构

## 5.1 鉴权方式

后端是 OAuth2 Resource Server，所有业务 API 默认需要 JWT：

- 放行路径：Swagger、`/actuator/**`、`/wsregistry`、`/applicationSettings/oidcConfiguration`
- 其余路径默认认证

关键文件：

- `WebSecurityConfig.java`
- `CustomAuthenticationProvider.java`

## 5.2 多身份提供商策略

通过 `system.configuration.provider` 切换：

- `keycloak` -> `AuthenticationUserContextServiceKeycloak`
- `azureAD` -> `AuthenticationUserContextServiceAzureAD`

Token 解析后，会将用户信息同步/更新到本地 `user` 表缓存与数据库。

## 5.3 前端登录流程

1. 前端先请求 `/applicationSettings/oidcConfiguration`
2. 动态获取 `issuerUri/clientId/scopes`
3. `angular-oauth2-oidc` 发起 OIDC code flow
4. 登录成功后，对 `/api/*` 自动加 `Authorization: Bearer <token>`

关键文件：

- `frontend/src/app/config/oidc/oidc-configuration.service.ts`
- `frontend/src/app/core/auth/services/authentication.service.ts`
- `frontend/src/app/core/auth/interceptors/oauth.interceptor.ts`

---

## 6. 实时通信（WebSocket/STOMP）

## 6.1 通道设计

- STOMP Endpoint：`/wsregistry`
- 前端发送前缀：`/ws`
- 后端广播前缀：`/topic`

任务看板核心频道示例：

- 订阅：`/topic/unit/{unitId}/tasks`
- 订阅：`/topic/unit/{unitId}/tasks/deleted`
- 订阅：`/topic/unit/{unitId}/tasks/users`
- 发送：`/ws/unit/{unitId}/tasks/add|update|delete`

## 6.2 鉴权机制

WebSocket CONNECT 时通过 STOMP Header `Authorization` 传 Bearer Token，
后端 `WebSocketAuthentication` 解码 JWT 并建立安全上下文。

---

## 7. API 架构概览

后端大多数 Controller 使用 `@RestApiController`，默认挂载到 `${system.configuration.api-endpoint}`，默认是 `/api`。

主要资源域：

- 组织：`/companies`, `/units`, `/departments`, `/branch`
- 周期：`/cycles`, `/clonecycle/*`
- OKR：`/objectives`, `/keyresults`, `/topicDrafts`
- 任务：`/unit/{unitId}/tasks`, `/unit/{unitId}/states`
- 配置：`/configurations`, `/settings`
- 看板：`/dashboards*`
- 导出：`/export/*`

特殊路径（不在 `/api` 下）：

- `/applicationSettings/oidcConfiguration`
- `/wsregistry`

---

## 8. 部署与配置设计

## 8.1 Docker Compose（默认）

文件：`docker/docker-compose.yml`

服务：

- `db`：postgres:15.3
- `backend`：`ghcr.io/burningokr/b-okr-be-dev:latest`
- `frontend`：`ghcr.io/burningokr/b-okr-fe-dev:latest`

端口：

- 前端对外：`4200 -> 80`
- 后端默认仅容器内访问（由前端 Nginx 反代）

## 8.2 本地源码构建镜像模式

文件：`docker/docker-compose.localbuild.yml`

覆盖行为：

- `backend` 改为本地 `backend/Dockerfile` 构建
- `frontend` 改为本地 `frontend/Dockerfile` 构建

适用于你正在改代码并希望立即在容器验证的场景。

## 8.3 前端 Nginx 路由

`frontend/nginx.conf` 中定义：

- `/api/` -> `http://burning-okr-backend:8080/api/`
- `/applicationSettings/` -> `http://burning-okr-backend:8080/applicationSettings/`
- `/wsregistry` -> `ws://burning-okr-backend:8080/wsregistry`
- `/` -> SPA fallback 到 `index.html`

## 8.4 关键环境变量（后端）

文件：`docker/backend.env.sample`

最关键参数：

- `SPRING_PROFILES_ACTIVE`
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_JPA_PROPERTIES_HIBERNATE_DIALECT`
- `SPRING_SECURITY_OAUTH2_RESOURCESERVER_JWT_JWK_SET_URI`

OIDC 关键参数：

- `SYSTEM_CONFIGURATION_PROVIDER`（`keycloak` 或 `azureAD`）
- `SYSTEM_CONFIGURATION_CLIENT_ID`
- `SYSTEM_CONFIGURATION_ISSUER_URI`
- `SYSTEM_CONFIGURATION_OIDC_ADMIN_GROUP_NAME`
- `SYSTEM_CONFIGURATION_SCOPES_*`

SMTP 关键参数：

- `SPRING_MAIL_HOST`
- `SPRING_MAIL_PORT`
- `SPRING_MAIL_USERNAME`
- `SPRING_MAIL_PASSWORD`

## 8.5 PostgreSQL 容器环境变量

文件：`docker/postgres.env.sample`

- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

## 8.6 Keycloak（可选）

仓库提供 realm 模板：`docker/keycloak/realm-burning-okr.json`

默认信息：

- Realm: `burning-okr`
- Role: `burning-okr-admin`
- Client: `burning-okr`（public client）
- Demo 用户：`demo / Demo123!`（仅开发用途，生产必须更换）

---

## 9. 配置优先级与运行模式

后端配置来源主要是：

- `application.yaml`（基础默认）
- 环境变量（Docker 注入，通常覆盖默认）
- 本地开发可用 `application-local.yaml`（从 example 复制）

前端环境由 Angular build configuration 决定：

- `environment.ts`（默认）
- `environment.local.ts`（`npm run start-dev`）
- `environment.demo.ts`
- `environment.prod.ts`
- `environment.docker.ts`

---

## 10. 二次开发入口建议

如果你要改业务能力，建议按这个顺序阅读：

1. 前端路由与页面入口：`app-routing.module.ts`
2. 对应 Controller：`backend/.../controller/*`
3. 业务 Service：`backend/.../service/*`
4. Entity 与 Repository：`model/*` + `repositories/*`
5. Flyway 迁移：`db/migration/postgresql` 与 `sqlserver`

开发改动原则：

- 先改模型与迁移，再改后端逻辑，再改前端
- 涉及数据库结构时，同时补 PostgreSQL 与 SQLServer 脚本
- 涉及实时功能时，同步检查 REST 与 WebSocket 两条路径
- 涉及权限时，同时检查 HTTP 鉴权和 WS CONNECT 鉴权

---

## 11. 常见风险点（架构视角）

- 多数据库方言差异：迁移脚本需双维护
- OIDC 提供商差异：Keycloak 与 Azure AD 的 claim 结构不同
- 前端为静态构建：运行时无法像后端那样动态注入大量配置
- WebSocket 与 REST 并存：状态一致性要同时验证
- 审计与历史表并存：变更查询时要区分“当前值”和“历史值”

---

## 12. 快速命令清单

预构建镜像启动：

```bash
docker compose -f docker/docker-compose.yml up -d
```

本地源码构建并启动：

```bash
docker compose -f docker/docker-compose.yml -f docker/docker-compose.localbuild.yml build
docker compose -f docker/docker-compose.yml -f docker/docker-compose.localbuild.yml up -d
```

查看 PostgreSQL 表：

```bash
docker exec burning-okr-postgres psql -U postgres -d okr -c "\dt"
```

---

如果你愿意，我可以下一步再给你补一份“按业务流程拆解的阅读地图”（例如“创建目标”“拖拽任务状态”“发布主题草案”分别会经过哪些前后端类和表），更适合你直接开始二开。
