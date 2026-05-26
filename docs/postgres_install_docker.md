# PostgreSQL 安装与配置（Docker）

## 概览

如果你还没有创建数据库，这份文档就是给你的。

安装后你会得到一个正在运行的 PostgreSQL 实例，默认配置如下：

- Host：`localhost`
- Port：`5432`
- User：`postgres`
- Password：`4c0K8sJGcxIercJDlmhs`

## Windows

1. 安装 Docker
2. 执行以下命令：

`docker run -p 5434:5432 --name okr-postgres -e POSTGRES_PASSWORD=4c0K8sJGcxIercJDlmhs -e POSTGRES_DB=okr -d postgres`

3. 数据库现在已经可以使用。

使用上述凭据，你可以通过 IntelliJ、DataGrip 或 pgAdmin 连接数据库。
完成。

### 重新启动容器

该容器默认不会随系统自动启动。

- 启动容器：`docker start okr-postgres`
- 停止容器：`docker stop okr-postgres`

### 重新创建容器

如需重建容器，执行：

1. `docker rm okr-postgres -f`
2. `docker run -p 5434:5432 --name okr-postgres -e POSTGRES_PASSWORD=4c0K8sJGcxIercJDlmhs -e POSTGRES_DB=okr -d postgres`

然后可返回安装主流程。
