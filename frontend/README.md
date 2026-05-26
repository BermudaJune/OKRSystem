# 简介

这是 **Brockhaus AG** 的 Burning OKR 工具前端项目。
对应后端位于本仓库中的其他模块。

该工具用于组织和传达企业目标，遵循 OKR 规划框架。

用户可以为公司中的 OKR 单元设定 Objective（目标），这些目标可以是定性的；
随后通过关联可量化的 Key Result（关键结果）来衡量目标完成情况，并据此跟踪进度。

此外，该工具支持回顾历史周期目标，并对当前周期结束时的达成度进行较准确的预测。

本项目基于 Angular 构建。

# 快速开始

### 安装

- 安装 Node.js：<https://nodejs.org/en/>
- 安装 Angular CLI：`npm install @angular/cli -g`
- 在项目目录执行 `npm install` 安装依赖

安装 Angular CLI 后，你可以在任意 IDE 中打开并开发该前端项目。

### 开发

启动开发服务器：`npm start`

注意：需要后端服务运行在 `8080` 端口，或自行调整 `proxy.conf.json`。

# 构建与测试

- 生产构建：`npm run build`
- 运行单元测试：`npm run test`

前端 `develop` 分支在代码推送后会部署到测试系统：

http://javatrainingkit.westeurope.cloudapp.azure.com/app/

测试服务器访问时间表：

![alt text](zeitplan_azure_vm.png)

# 部署

`master` 分支会部署到生产环境，因此进入 `master` 的提交应经过充分测试。

生产服务地址：

https://okr.brockhaus-ag.de/
