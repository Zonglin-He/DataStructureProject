# AlgoVis 桌面版（纯 JavaFX）

纯 JavaFX 桌面应用，内置 Dijkstra / Kruskal / Huffman，可输入数据查看每一步的计算与可视化，适合课堂演示、实验作业或快速验证。

## 环境要求
- JDK 17+（推荐 17；若用 21/24 遇到 JavaFX 模块缺失，切回 17）
- 无需预装 Maven，使用仓库自带的 Maven Wrapper（`mvnw` / `mvnw.cmd`）自动下载 Maven 与依赖
- 如有多个 JDK，确保 `java -version` 输出指向预期 JDK，必要时设置 `JAVA_HOME`

## 首次运行（逐步）
1) 克隆/下载本仓库，进入项目根目录。  
2) **Windows**：在 PowerShell/CMD 执行  
   `.\mvnw.cmd -DskipTests javafx:run`  
   **macOS / Linux**：执行  
   `./mvnw -DskipTests javafx:run`  
   > 首次会下载 Maven 与依赖，耗时取决于网络；完成后会弹出 JavaFX 窗口。  
3) 如果用 IDE，直接运行主类 `com.example.algovis.gui.AlgoVisGuiApp` 也可。

## 常用命令速查
- 启动 GUI（跳过测试）：`.\mvnw.cmd -DskipTests javafx:run`（Windows） / `./mvnw -DskipTests javafx:run`
- 仅编译：`./mvnw -DskipTests compile`
- 运行测试：`./mvnw test`
- 清理：`./mvnw clean`
- 构建 jar（演示用途，未绑定 JavaFX 运行时）：`./mvnw -DskipTests package`

## GUI 操作指南
- **Dijkstra 标签**：输入顶点数、源点（0-based），可选 Directed；边列表按行填 `from to weight`，空格或逗号分隔。点击 “Run Dijkstra” 查看距离/父节点/松弛步骤，图形区高亮当前节点与被松弛的边。
- **Kruskal 标签**：输入顶点数与边列表，点击 “Run Kruskal” 查看 MST 权重、已选边及并查集 parent/rank 变化，图形区高亮候选边与 MST 边。
- **Huffman 标签**：输入文本，点击 “Generate codes”，显示编码表、压缩比特数及树节点信息；`HuffmanPane` 绘制编码树。
- 图形区可用 Prev / Next 按钮逐步查看；输出区域列出完整步骤日志。

## 输入规则与校验
- 顶点编号为 0-based，`vertexCount >= 1`，`source` 范围为 `[0, vertexCount-1]`。
- 边行格式 `from to weight`，空格/逗号均可，空行会被忽略；非法格式会弹窗提示。
- Dijkstra 不允许负权边；Kruskal 需要非负权重；有向/无向由复选框决定。
- Huffman 文本不能为空；单字符文本会自动补哨兵节点保证编码至少 1 位。
- 所有错误提示为英文，直接源自算法/校验逻辑，方便排查。

## 示例数据
```
Dijkstra / Kruskal 边列表:
0 1 2
0 2 5
1 2 1
1 3 3
2 3 1
3 4 2

Huffman 文本:
hello huffman
```

## 目录结构
```
.
├── pom.xml
├── README.md
├── src/main/java/com/example/algovis/gui/AlgoVisGuiApp.java   # JavaFX 入口
├── src/main/java/com/example/algovis/gui/GraphPane.java       # 图可视化
├── src/main/java/com/example/algovis/gui/HuffmanPane.java     # Huffman 树可视化
├── src/main/java/com/example/algovis/algo/dijkstra            # Dijkstra 实现
├── src/main/java/com/example/algovis/algo/kruskal             # Kruskal 实现
├── src/main/java/com/example/algovis/algo/huffman             # Huffman 实现
└── src/main/java/com/example/algovis/api/dto                  # 请求/响应模型
```

## 常见问题 / 故障排查
- **JavaFX 模块缺失或启动报错**：优先用 JDK 17；确认 `PATH`/`JAVA_HOME` 指向正确 JDK。
- **首次下载慢**：`mvnw` 会下载 Maven 与依赖，耐心等待；可改用本地 Maven 或配置镜像加速。
- **窗口未弹出或闪退**：查看命令行栈信息，通常是 JDK/JavaFX 版本问题或输入校验失败。
- **字体/语言**：界面文案为英文，如需中文可在 `AlgoVisGuiApp` 控件文本中调整。

## 开发与打包提示
- 打包可执行：在 `javafx-maven-plugin` 使用 `jlink` 或其他工具捆绑 JavaFX 运行时，生成双击可运行包。
- 扩展算法：可按现有 DTO/Service/Pane 的模式增加新标签页和可视化逻辑。
- 测试建议：新增算法或可视化逻辑时补充单元测试；现有命令 `./mvnw test` 可快速回归。
