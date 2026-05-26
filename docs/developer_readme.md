# 实现说明

## 后端

### 日志

项目使用 [`java.util.logging.Logger`](https://docs.oracle.com/javase/7/docs/api/java/util/logging/Logger.html) 输出运行时信息。

#### 日志级别

- `Level.FINE`：异常堆栈、测试中异常的背景信息
- `Level.SEVERE`：触发异常的参数信息、异常错误信息

### 代码文档

源码中的 *JavaDoc* 注释请遵循 [此规范](/docs/javadoc_guidelines.md)。

### 格式化

该部分后续仍可进一步完善。

我们在构建过程中使用 [format-maven-plugin](https://github.com/coveooss/fmt-maven-plugin)，其底层依赖 google-java-format 来统一代码格式。

如需手动自动格式化，可在项目根目录执行：

`mvn com.coveo:fmt-maven-plugin:format`

### Checkstyle

可通过 `mvn checkstyle:check` 运行 [Checkstyle Maven Plugin](https://maven.apache.org/plugins/maven-checkstyle-plugin/index.html)。

该插件使用了一个基于 [google java style](https://google.github.io/styleguide/javaguide.html) 的[修改版配置](build-tools/src/main/resources/google_checks.xml)。

### 数据库迁移

PostgreSQL 与 Microsoft SQL Server 的迁移脚本需要分别维护。
两种数据库在部分数据类型上不同，等价关系如下：

| PostgreSQL | MSSQL |
|------------|-------|
| boolean    | bit   |
| timestamp without timezone | datetime2 |
| uuid   | uniqueidentifier |

使用 PostgreSQL 时，请在 `application.yaml` 中设置：

```yaml
spring:
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```

使用 MSSQL 时，请在 `application.yaml` 中设置：

```yaml
spring:
  jpa:
    properties:
      hibernate:
        dialect: org.burningokr.dialects.SQLServer2012UUIDFixDialect
```

每次新增迁移时，你**必须同时**提供：

- MSSQL 迁移脚本
- PostgreSQL 迁移脚本

迁移脚本位于 `burning-okr-app/src/main/resources/db/migration`，包含 `postgresql` 与 `sqlserver` 两个目录。
请在两个目录分别创建脚本，语义上应一致，但语法需符合对应数据库方言。

## 前端

### 装饰器

#### Fetchable 装饰器

如果某个 Service 需要在应用启动或用户登录时拉取数据，则该 Service 需要：

- 添加 `@Fetchable()` 装饰器
- 实现 `Fetchable` 接口

`Fetchable` 接口要求实现 `fetchData(): void` 方法。

你可以将该 Service 所需的数据拉取逻辑放入 `fetchData` 方法。
该方法会在应用启动及用户登录后由 Fetchable 装饰器触发。

示例：

```typescript
@Fetchable()
@Injectable({
  providedIn: 'root'
})
export class CurrentUserService implements Fetchable {
  private isAdmin$: Observable<boolean>;

  constructor(private oAuthService: OAuthService,
              private userApiService: UserApiService) {
  }

  getCurrentUser(): Observable<User> {
    return this.userApiService.getCurrentUser();
  }

  isCurrentUserAdmin(): Observable<boolean> {
    return this.isAdmin$;
  }

  fetchData(): void {
    this.isAdmin$ = this.userApiService.isCurrentUserAdmin$()
      .pipe(shareReplay(1));
  }
}
```
