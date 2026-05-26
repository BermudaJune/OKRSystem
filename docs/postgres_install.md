# PostgreSQL 安装与配置（手动安装）

## 概览

如果你还没有创建数据库，这份文档就是给你的。

如果你想用更简单的方式，请参考 [PostgreSQL Docker 安装](./postgres_install_docker.md)。

1. 需要为后端应用单独准备一个 PostgreSQL 数据库。
2. 还需要创建一个可连接该数据库的用户。

注意：请记住你设置的 **用户名**、**密码**、**数据库名**。
后续配置会用到这些值。

## Windows

1. 安装 PostgreSQL（9.5 或更高）：<https://www.enterprisedb.com/downloads/postgres-postgresql-downloads>
   1. 重要：安装时需要设置 `postgres` 超级用户密码，并选择端口号。这两个值必须记住。
2. PostgreSQL 安装器通常会一并安装 pgAdmin4。启动 pgAdmin4 后会在浏览器打开，首次启动可能要求设置 master password。
3. 左侧应看到服务器浏览器（Server Browser）。

   ![Server Browser](./images/pgAdmin_browser.PNG)

   按图示展开节点。
4. 右键 `Login/Group Roles`，选择 `Create > Login/Group Role...`。
   1. 在 `General` 页签中填写有意义的名称，例如 `admin` 或 `BurningOKR`。
   2. 在 `Definition` 页签设置强密码。
   3. 点击 `Save`。
5. 在服务器浏览器中右键 `Databases`，选择 `Create > Database...`。
   1. 填写数据库名称，建议使用有意义的名字，如 `okr` 或 `burningokr`。
   2. 将 Owner 设置为 `admin`（或你刚创建的用户）。

      ![Create Database](./images/pgAdmin_create_database.PNG)

   3. 点击 `Save`。
6. 你现在应能看到两个数据库和新建的登录角色：

   ![Two Databases and a new Login Role](./images/pgAdmin_done.PNG)

   数据库已可使用。你可以关闭 pgAdmin4，并返回安装主流程。

## Linux（Ubuntu）

1. 安装 PostgreSQL：

```bash
sudo apt install postgresql postgresql-contrib
```

2. 为 BurningOKR 创建 `admin` 角色：

```bash
sudo -u postgres createuser --interactive --pwprompt
```

输入新角色名称与密码，随后三个问题都回答 `n`，示例如下：

```bash
Enter name of role to add: admin
Enter password for new role:
Enter it again:
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) n
Shall the new role be allowed to create more new roles? (y/n) n
```

3. 为 BurningOKR 创建数据库：

```bash
sudo -u postgres createdb okr -O admin
```

数据库已可使用。你可以返回安装主流程。
