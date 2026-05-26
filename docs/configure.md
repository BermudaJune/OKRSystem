# 配置说明（Windows 与 Linux）

## 使用 `docker run` 安装 PostgreSQL 的配置方式

如果你是通过 `docker run` 命令安装的 PostgreSQL，请看本节。

1. 如果你没有修改过默认 `docker run` 参数，可以直接将 `application-local.docker.yaml` 重命名为 `application-local.yaml`。

如果你修改过参数，请同步调整该 yaml 文件中的配置（用户名、密码、端口等）。

## 使用 docker-compose 的配置方式

如果你只是想使用 BurningOKR，而不需要本地开发环境，请优先参考根文档中的 Docker 部署说明：[README](../README.md)。

## 手动安装 PostgreSQL 的配置方式

如果你是在本机手动安装的 PostgreSQL，本节就是给本地开发环境使用的。

1. 进入 `backend/burning-okr/burning-okr-app/src/main/resources/`。
2. 复制 `application-local.example.yaml` 并命名为 `application-local.yaml`。
3. 将占位符替换为真实值：
   1. `url`
   2. `username`
   3. `password`
4. 若不需要邮件功能，可删除或注释 `mail` 相关占位配置。
5. 在 `auth-mode` 中选择 `local` 或 `azure`。
   若你不确定，建议先使用 `local`。
6. 保存文件。

如需使用 Azure AD，可参考 `application.sample.yaml` 中的注释示例。
