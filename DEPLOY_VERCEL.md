# 用 Vercel 部署本项目（让别人通过链接访问）

## 方式一：用 Vercel 网页 + GitHub（推荐）

### 1. 把项目推到 GitHub

1. 在 [GitHub](https://github.com) 登录，新建一个仓库（例如 `wealth-agent`），不要勾选「Add a README」。
2. 在本项目目录打开终端，执行：

```bash
cd /Users/yiliu/Desktop/财富管理-agent-0314
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

（把 `你的用户名/仓库名` 换成你刚建的仓库地址。）

### 2. 在 Vercel 里导入并部署

1. 打开 [vercel.com](https://vercel.com)，用 GitHub 登录。
2. 点击 **Add New…** → **Project**。
3. 在列表里选你刚推送的仓库，点 **Import**。
4. **Framework Preset** 选 **Vite**（一般会自动识别）。
5. **Build Command** 留空或填 `npm run build`，**Output Directory** 留空或填 `dist`。
6. 点 **Deploy**，等一两分钟。

### 3. 拿到访问链接

部署完成后会给你一个链接，例如：  
`https://wealth-agent-xxx.vercel.app`  
把这个链接发给别人，对方就能在浏览器里打开你的项目。

---

## 方式二：用 Vercel 命令行（不经过 GitHub）

### 1. 安装并登录 Vercel CLI

```bash
npm i -g vercel
vercel login
```

按提示用邮箱或 GitHub 登录。

### 2. 在项目目录里部署

```bash
cd /Users/yiliu/Desktop/财富管理-agent-0314
vercel
```

第一次会问：

- **Set up and deploy?** 选 **Y**
- **Which scope?** 选你的账号
- **Link to existing project?** 选 **N**
- **Project name?** 直接回车或用默认名
- **In which directory is your code?** 直接回车（当前目录）

然后等构建完成，终端里会给出一个 **Preview** 链接，就是别人可以访问的地址。

### 3. 正式上线（可选）

```bash
vercel --prod
```

会多一个**生产环境**的稳定链接，适合长期分享。

---

## 注意事项

- **环境变量**：如果项目里用了 `GEMINI_API_KEY` 等敏感信息，在 Vercel 项目 **Settings → Environment Variables** 里配置，不要写进代码或提交到 Git。
- **更新内容**：改完代码后，用方式一就再 `git push` 一次，Vercel 会自动重新部署；用方式二就再执行一次 `vercel` 或 `vercel --prod`。
