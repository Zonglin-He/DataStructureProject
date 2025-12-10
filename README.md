# AlgoVis 桌面版（纯 JavaFX）

已去掉 Spring Boot 和前端，项目只保留算法核心 + JavaFX GUI。内置 Dijkstra / Kruskal / Huffman，可在桌面窗口输入数据直接看步骤与结果。

## 运行方式
- **Windows（推荐）**：在项目根目录打开 PowerShell/CMD，运行  
  `mvnw.cmd -DskipTests javafx:run`  
  会自动下载 Maven 并启动主类 `com.example.algovis.gui.AlgoVisGuiApp`。
- **其他平台**：安装 Maven 后运行 `mvn -DskipTests javafx:run`，或在 IDE 直接运行 `AlgoVisGuiApp`。

> 需要 JDK 17+。若用 JDK 24 也可运行，出现 JavaFX 模块缺失再换回 JDK 17。

## 使用说明
- **Dijkstra**：输入顶点数、源点，勾选有向/无向，边按行填 `from to weight`（空格或逗号分隔），点击“运行 Dijkstra”。
- **Kruskal**：输入顶点数 + 边列表，点击“运行 Kruskal”查看 MST 权重与步骤。
- **Huffman**：输入文本，点击“生成编码”查看编码表、压缩信息和树节点列表。

输出区域会列出每一步的快照，图形区可用 Prev/Next 按钮逐步高亮当前节点/边，便于演示与调试。

## 目录结构
```
.
├── pom.xml                       # 纯 Java/JavaFX Maven 配置
├── src/main/java/com/example/... # 算法核心 + JavaFX GUI
└── src/main/java/com/example/.../api/dto # 请求/响应模型
```

## 维护提示
- 如需双击运行的独立包，可在 `javafx-maven-plugin` 配置 `jlink` 或用打包工具捆绑 JavaFX 依赖。
- 想增强可视化，可在 GUI 中加入画布绘制节点/边动画。
