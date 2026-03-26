<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bc98470b-98d0-46ab-9fcb-892a6c2b50ca

## 本地运行

**环境要求：** 已安装 Node.js

1. **安装依赖**（首次运行或依赖变更后执行）：
   ```bash
   npm install
   ```
2. **（可选）** 若需使用 AI 对话功能，在项目根目录的 `.env.local` 中填写你的 `GEMINI_API_KEY`。
3. **启动开发服务器**（会自动在浏览器打开 http://localhost:3000）：
   ```bash
   npm run dev
   ```

在浏览器中访问：**http://localhost:3000** 即可查看应用。

---

## Run Locally (English)

**Prerequisites:** Node.js

1. Install dependencies: `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key (optional for UI-only).
3. Run the app: `npm run dev` — browser will open automatically at http://localhost:3000.
