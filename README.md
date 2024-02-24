# JS Console Alert Tool

这个 Visual Studio Code 插件为 JavaScript 开发提供了快速打印和警告功能，允许开发者通过简单的快捷键在代码中插入 `console.log` 或 `alert` 语句，以便于调试。


## 使用

##### vscode settings.json 文件中添加以下配置：
![](https://luyyych.oss-cn-hangzhou.aliyuncs.com/obsidianPIC/202402241225648.png)
##### 功能展示:
![](https://luyyych.oss-cn-hangzhou.aliyuncs.com/obsidianPIC/202402241224140.gif)

##### 安装插件后，你可以使用以下快捷键在代码中快速插入 `console.log` 或 `alert` 语句：

- `alt/option+L`：插入 `console.log` 语句。
- `alt/option+K`：插入 `alert` 语句。
- 选择变量,插入时会带上变量
- 配合vscode的 `alt/option+↑/↓` 快速移动到调试语句`



## 特性

- **快速插入**：不选择变量会在空白行写入调试语句,选择变量会自动插入变量
- **自动缩进**：插入语句时，插件会自动缩进代码，使得代码整洁美观。
- **自定义前缀和后缀**：可以通过设置自定义前缀和后缀来增强调试信息的可读性。

## 配置

该插件提供以下配置选项，允许你自定义前缀和后缀：

- `console-alert-tool.prefix`：设置插入语句的前缀。
- `console-alert-tool.suffix`：设置插入语句的后缀。
- ![](https://luyyych.oss-cn-hangzhou.aliyuncs.com/obsidianPIC/202402241225648.png)

