# Microsoft SQL Server 安装与配置

## Windows

1. 下载 Microsoft SQL Server：<https://www.microsoft.com/de-de/sql-server/sql-server-downloads>
   - 生产负载需要商业许可。
   - 开发场景可使用 SQL Server Express。
   - 更多信息请参考微软官网。

2. 使用安装程序安装 SQL Server，选择 **Basic Installation**。

   安装完成后会看到如下界面，先不要关闭。

   ![SQL_Server_Install_Overview](./images/sqlserver_install_overview.PNG)

3. 点击 `Install SSMS`，浏览器会打开。
4. 在页面中点击 `Download SQL Server Management Studio (SSMS)` 开始下载。
5. 运行下载的安装程序，点击 `Install`。安装完成后可关闭相关窗口。
6. 打开 `Microsoft SQL Server Management Studio`（SSMS）。
   1. 启动时会弹出连接服务器窗口，不改默认值直接点击连接。
      这会连接到本机刚安装的 SQL Server 实例。

      ![SQL_Server_Connect_Window](./images/ssms_connect_to_server.PNG)

   2. 左侧是 `Object Explorer`，展开后应类似下图：

      ![SQL_Server_Object_Explorer](./images/ssms_object_explorer.PNG)

   3. 修改 `Server Authentication Mode`：
      1. 右键 `Object Explorer` 根节点，选择 `properties`
      2. 左侧选择 `Security`
      3. 在 `Server authentication` 选择 `SQL Server and Windows Authentication mode`，示例如下：
      ![SQL_SERVER_AUTHENTICATION_MODE](./images/ssms_change_server_authentication.png)

   4. 新建登录账号：右键 `Logins` -> `New Login...`
      1. 设置有意义的 `Login Name`，例如 `BurningOKR_User`
      2. 选择 `SQL Server authentication`
      3. 设置强密码
      4. 取消勾选 `Enforce password expiration` 和 `User must change password at next login`
      5. 点击 `Ok`
   5. 新建数据库：右键 `Databases` -> `New Database...`
      1. 设置有意义的 `Database name`，例如 `okr`
      2. 在 `Owner` 旁点击 `...`，打开窗口后点 `Browse...`，选择刚创建的登录账号。

         ![SQL_Server_Create_Database](./images/ssms_create_database.PNG)

      3. 在所有打开窗口中点击 `Ok` 保存。
   6. 现在可以关闭 SSMS。
7. 打开 `SQL Server Configuration Manager`
（`Win + R` 输入 `compmgmt.msc` -> 展开 `Services and Applications` -> 展开 `SQL Server Configuration Manager`）
   1. 点击 `SQL Server Network Configuration`
   2. 点击 `Protocols for SQLEXPRESS`
   3. 右键 `TCP/IP` -> `Properties`
   4. 切换到 `IP Addresses` 标签
   5. 滚动到底部 `IPALL`
   6. 清空 `TCP Dynamic Ports`
   7. 将 `TCP Port` 设为 `1433`
   8. 点击 `Ok`
   9. 点击 `SQL Server Services`
   10. 右键 `SQL Server (SQLEXPRESS)`，选择 `Restart`
   11. 关闭 SQL Server Configuration Manager
8. 完成。你的 SQL Server 已可用于 BurningOKR，可返回安装主流程。
