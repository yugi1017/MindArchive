# 项目开发规则

## PowerShell 编码问题

### UTF-8 编码处理注意事项

在使用 PowerShell 处理文件内容时，经常遇到 UTF-8 编码错误问题。请注意以下事项：

1. **避免使用 PowerShell 原生命令处理 UTF-8 文件**
   - PowerShell 5.1 默认编码可能不是 UTF-8
   - 使用 `Get-Content`、`Set-Content` 等命令可能导致编码问题
   - 中文字符可能被错误编码或损坏

2. **推荐解决方案**
   - 优先使用 Node.js 脚本处理文件读写操作
   - Node.js 的 `fs.readFileSync` 和 `fs.writeFileSync` 对 UTF-8 支持更好
   - 示例：使用 `node script.js` 替代 PowerShell 命令

3. **如果必须使用 PowerShell**
   - 显式指定编码：`Get-Content -Encoding UTF8`
   - 或使用 PowerShell 7+ 版本（默认 UTF-8）
   - 写入时也需指定：`Set-Content -Encoding UTF8`

4. **常见错误表现**
   - 中文字符变成乱码
   - 文件编码被改变（如 UTF-8 变成 UTF-8 with BOM）
   - 特殊字符丢失或变形

**记录时间**: 2026-02-21
