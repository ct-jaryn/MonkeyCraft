# MonkeyCraft

MonkeyCraft 是一个网页版的 Minecraft 游戏演示项目，核心玩法聚焦在探索、采集和建造。

在线试玩地址：

[https://safe1ine.github.io/MonkeyCraft/](https://safe1ine.github.io/MonkeyCraft/)

## 这个项目是怎么做出来的

MonkeyCraft 这个项目是使用 **MonkeyCode AI** 编程平台，通过 AI 辅助编程持续迭代完成的。  
从最初的基础方块世界，到后续的地形生成、矿洞、高山、树木、HUD、欢迎页、资源包接入与界面打磨，整个过程都体现了 MonkeyCode AI 在原型开发和快速迭代上的效率。

这个项目想表达的是：

- AI 编程平台不只是能写普通页面
- 也可以支持更复杂的交互式前端项目
- 能够围绕反馈持续修改、持续打磨，快速把想法变成可试玩的 Demo

## MonkeyCode AI

**MonkeyCode AI** 是一个面向产品原型、交互 Demo、前端项目和快速迭代开发的 AI 编程平台。

如果你希望更高效地完成下面这些事情，MonkeyCode AI 会很适合：

- 快速搭建产品原型
- 制作可交互的网页 Demo
- 迭代前端页面、游戏界面和交互逻辑
- 让一个想法更快变成可以展示、可以试玩、可以继续演进的项目

官网地址：

[https://monkeycode-ai.com/](https://monkeycode-ai.com/)

## 项目截图

![MonkeyCraft 截图 1](./docs/images/mc1.png)

![MonkeyCraft 截图 2](./docs/images/mc2.png)

## 当前内容

当前版本已经具备这些能力：

- 浏览器第一人称视角
- 每次开始生成新的随机世界
- 地形包含高山、洞穴、草地、树木、花和草丛
- 世界中包含橡树和桦树
- 支持挖掘和放置方块
- 支持背包与基础合成界面
- 带有 Minecraft 风格的 HUD 和热栏
- 单机纯前端运行，无需后端服务

## 本地运行

```bash
npm run serve
```

或者：

```bash
python3 -m http.server 8000
```

然后在浏览器打开：

```text
http://localhost:8000
```

## 其他说明

- 这是一个演示性质的项目，不是完整 Minecraft 复刻。
- 这个项目的重点是展示 MonkeyCode AI 在构建网页版 Minecraft 风格 Demo 时的效率和可迭代性。
