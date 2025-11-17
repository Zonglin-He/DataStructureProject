# AlgoVis 项目说明

一个基于 **Spring Boot + Vue3 + Element Plus** 的算法可视化项目，当前内置 Dijkstra / Kruskal / Huffman 三大模块，支持逐步播放、并查集树形展示、Huffman 树缩放拖拽及编码导出。

---

## 目录结构

```
.
├── pom.xml                          # 后端 Maven 配置
├── src/main/java/com/example/...    # 算法核心 & REST API
├── src/main/java/org/example/...    # Spring Boot 启动类（扫描 com.example.algovis）
├── frontend/                        # Vue3 + Vite 前端
└── .github/workflows/ci.yml         # GitHub Actions，前后端分别构建
```

> 注意：`DataStructureProjectApplication` 已通过 `@SpringBootApplication(scanBasePackages = {...})` 同时扫描 `org.example` 与 `com.example.algovis`，才能加载 CORS 配置、算法控制器。

---

## 后端运行

1. **安装 JDK 17** 并设置 `JAVA_HOME`。可用 `java -version` 验证。
2. 在项目根目录执行：
   ```bash
   ./mvnw spring-boot:run
   ```
3. 默认监听 `http://localhost:8080`，Swagger UI 地址：`http://localhost:8080/swagger-ui.html`。

### API 速览

| 接口 | 描述 | 请求体 |
| --- | --- | --- |
| `POST /api/dijkstra/run` | Dijkstra 算法，返回步骤序列 | `GraphRequest`（节点数、源点、边列表） |
| `POST /api/kruskal/run` | Kruskal 最小生成树 | `KruskalRequest`（节点数、边列表） |
| `POST /api/huffman/encode` | Huffman 编码 | `HuffmanRequest{text}` |

返回的数据结构均携带每一步的快照信息，方便前端可视化。

---

## 前端运行

1. 进入 `frontend/`，准备 Node.js 18+：
   ```bash
   npm install
   npm run dev     # 默认 http://localhost:5173
   ```
2. 如后端地址非 `http://localhost:8080`，在 `frontend/.env` 中设置：
   ```
   VITE_API_BASE=http://your-host:port
   ```
   重启 `npm run dev` 即可。
3. 生产构建：
   ```bash
   npm run build
   ```

---

## 前端功能亮点

### Dijkstra 视图
- 支持编辑节点、边、是否有向与源点。
- 步骤播放器控制播放/暂停/拖动。
- GraphCanvas 以圆形布局高亮正在 relax 的边、当前节点。

### Kruskal 视图
- 同步显示：图上候选/已选边、步骤详情、parent/rank 表格。
- **并查集树形动画**：`DisjointSetForest` 将每个根展示成树状结构，路径压缩或 union 时相关节点会高亮且带缩放动画，便于观察逐帧变化。

### Huffman 视图
- Huffman 树画布支持滚轮缩放、拖拽平移、重置视图。
- 编码表/编码结果面板内置**复制编码**、**复制全部 bit 串**、**导出 JSON**（包含输入文本、编码表、统计信息）。

---

## 常见问题

1. **前端提示 Network Error 或 CORS**  
   - 确保 Spring Boot 已启动且运行在 `VITE_API_BASE` 指定的地址。  
   - 启动类需包含 `scanBasePackages`，以加载 `WebConfig`（CORS 允许 `*`）。

2. **Rollup 可选依赖报错**  
   - 项目已显式安装 `@rollup/rollup-linux-x64-gnu`，若仍报错，可删除 `frontend/node_modules` 与 `package-lock.json` 后重新 `npm install`。

3. **构建体积警告**  
   - `npm run build` 会提示 chunk > 500 kB，可按需拆分路由或调整 Rollup `manualChunks`，暂不影响运行。

---

## CI / 持续集成

`.github/workflows/ci.yml` 包含两个 Job：
- **backend**：Ubuntu + Temurin JDK 17，执行 `./mvnw -B verify`。
- **frontend**：Node.js 20，缓存 npm 依赖，执行 `npm install && npm run build`。

Push / PR 到 `master` 或 `main` 时自动执行，保证代码在合并前可构建。

