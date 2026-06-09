# Nanxi Dao — Portfolio (Next.js) · 最终版

瑞士 / 编辑式极简风格的双语个人作品集。**暖白 ⇄ 黑** 四页叙事，滚动驱动的暖色光晕过渡，自定义光标，无限横向 3D 作品展墙。

- 技术栈：**Next.js 14（App Router）+ TypeScript + Tailwind + Framer Motion + Lenis**
- 语言：**中 / EN** 一键切换（底部正中按钮），自动记住选择
- 状态：**最终版（2026-06）**

---

## 怎么本地运行

> Node 已安装。如果终端找不到 `node`，新开一个终端即可。

```powershell
cd nanxi-portfolio
npm install      # 第一次
npm run dev      # 打开 http://localhost:3000
```

构建 / 部署：

```powershell
npm run build    # 生产构建（已通过）
npm start        # 本地跑生产版
```

部署到 Vercel：把 `nanxi-portfolio` 推到 GitHub → 在 vercel.com Import 该仓库 → 默认配置 Deploy。

---

## 页面结构（从上往下滚）

1. **第一页 Hero**：无限横向自动滚动的 3D 斜立作品卡（可拖拽、有惯性）。
2. **第二页 About / 简介**（黑底）：刀婻西 / 身份 / 自我介绍，钉住停留 + 滚动后内容浮现。
3. **第三页 Works / 作品**（暖白）：顶部标题 + 分类（全部 / UI/UX / 工业设计 / 其他），下方图片在**内部滚动窗口**里浏览；鼠标移到作品上，方块光标**变形成信息卡**（项目名 + 年份 + 简介）；点击作品 → 进入**作品详情页**。
4. **第四页 About / 详细**（黑底）：关于、个人宣言、Bio、教育、在拉夫堡的收获、技能与工具、工作经历、照片墙。
5. **作品详情页 `/work/[id]`**：第一行左图右文（标题 + 描述），下面 4 个长条图框；左上角固定「返回作品」回到第三页。

过渡：四页底色 **白→黑→白→黑**，每次切换都用同一套暖橙红「日出」光晕从底部升起。详情页是静态暖白底。

---

## 全站组件一览

| 组件 | 作用 |
| --- | --- |
| `components/SmoothScroll.tsx` | Lenis 平滑滚动 |
| `components/ScrollBackground.tsx` | 四页滚动联动底色 + 暖色光晕过渡（详情页静态白底） |
| `components/CustomCursor.tsx` | 方块光标（随底色反色）⇄ 作品信息卡（反相底图颜色） |
| `components/CornerFrame.tsx` | 四角信息：名字 / 实时时间 / 标语 / Scroll |
| `components/LocalTime.tsx` | 右上角实时时间（英文=本地时区；中文=北京时间 BeiJing） |
| `components/TopNav.tsx` | 顶部菜单 首页 / 关于(→第四页) / 作品 |
| `components/LangToggle.tsx` | 底部正中 中 / EN 切换 |
| `components/Hero.tsx` | 第一页 3D 作品展墙 |
| `components/SecondSection.tsx` | 第二页简介 |
| `components/ThirdSection.tsx` | 第三页作品（内部滚动 + 详情链接） |
| `components/FourthSection.tsx` | 第四页详细 About |
| `app/work/[id]/page.tsx` | 作品详情页模板 |
| `lib/i18n.tsx` | **所有中英文案**（词典 + 语言上下文） |
| `lib/projects.ts` | 第一页作品卡数据（标题 / 年份 / 渐变） |

**改文字**：基本都在 `lib/i18n.tsx`（中英两份）。

---

## 🖼️ 如何上传 / 替换图片（重点）

目前所有图位都是「占位图」（渐变色块 / CSS 画的界面与产品示意）。换成真图分两步：

### 第 1 步：把图片放进 `public` 文件夹
在 `nanxi-portfolio/public/` 下建一个 `images` 文件夹，把图片拖进去，例如：

```
nanxi-portfolio/public/images/
  hero-1.jpg
  about-me.jpg
  work-nomi-cover.jpg
  work-nomi-1.jpg ...
  studio-1.jpg ...
```

放进 `public` 的文件，在代码里就用**以 `/` 开头的路径**引用，例如 `public/images/hero-1.jpg` → 写成 `/images/hero-1.jpg`。

> 建议：图片先压缩（TinyPNG 等），命名用英文 / 数字、无空格；保留各自原始比例即可。

### 第 2 步：把路径填到对应位置
五个图位分别在这些文件里（每处现在都是占位，替换成 `<img src="/images/xxx.jpg" .../>` 即可）：

| 图位 | 文件 | 说明 |
| --- | --- | --- |
| 第一页 作品卡 | `lib/projects.ts` + `components/Hero.tsx` | 每张卡现在用 `gradient` 渐变；可改成图片背景 |
| 第二页 个人照片（3:4 竖图） | `components/SecondSection.tsx` | 左侧 “Your photo · 3:4” 占位框 |
| 第三页 作品缩略图 | `components/ThirdSection.tsx` | UI/产品/其他三种占位（`UIShot` / `ProductShot` / `OtherShot`） |
| 作品详情页 图片 | `app/work/[id]/page.tsx` | 第一行大图 + 4 张长条图（`Frame` 占位） |
| 第四页 照片墙 | `components/FourthSection.tsx` | “Photo” 占位的瀑布流 |

**最省事的做法**：把图片放进 `public/images/`，然后直接告诉我「哪张图放在哪个位置」（或发给我文件名清单），我来把占位框换成真实图片并保留排版、比例、动效。这样你不用碰代码。

> 说明：为什么不能拖进去就显示——这些图位现在是程序生成的占位元素，需要在上面几个文件里把占位换成 `<img>`（或 Next 的 `<Image>`）。一次性接好后，以后你只要替换 `public/images/` 里的同名文件即可。

---

## 进度记录

| 日期 | 内容 |
| --- | --- |
| 2026-06-05 | 框架 + 四角 + Hero 3D 卡片；改无限循环 marquee；白→黑滚动过渡 |
| 2026-06-06 | 暖色「日出」光晕过渡；第二页 About；第三页作品（内部滚动 + 光标信息卡 + 尖角）；第四页详细 About（教育/学到的/照片墙） |
| 2026-06-06 | 全站中英双语 + 底部语言切换；菜单 About 跳第四页；三段过渡统一暖色 |
| 2026-06-06 | 第四页新增 Skills 区块；更新多处文案；Hero 角度参照参考图 |
| 2026-06-07 | 作品详情页 `/work/[id]`（左图右文 + 4 长条图）；点击作品跳转；返回键固定左上角并回到作品页；光标路由切换重置；中文版右上角显示北京时间 BeiJing |
| 2026-06-07 | **定为最终版** |

*本网站由刀婻西 × Claude 共同搭建。*
