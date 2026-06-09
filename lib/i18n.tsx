"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "zh";

type Dict = {
  brand: string;
  tagline: string;
  scroll: string;
  nav: { home: string; about: string; work: string };
  timeIn: (city: string, time: string) => string;
  second: { name: string; role: string; intro: string };
  work: {
    headline: ReactNode;
    filters: { all: string; ui: string; product: string; other: string };
    cardBrief: string;
  };
  fourth: {
    about: string;
    statement: string;
    bio: string;
    eduHeading: string;
    edu: { school: string; year: string }[];
    learnedHeading: string;
    learnedBody: string;
    skillsHeading: string;
    tools: string[];
    skillsNote: string;
    workExpHeading: string;
    workExpPlaceholder: string;
    studioHeading: string;
    photo: string;
  };
  detail: { back: string; description: string };
};

/* emphasised word inside the page-3 headline (off-white page → dark ink) */
const Em = ({ children }: { children: ReactNode }) => (
  <span className="font-semibold text-ink">{children}</span>
);

export const DICT: Record<Lang, Dict> = {
  en: {
    brand: "Nanxi Dao",
    tagline: "Turning everyday annoyances into something better.",
    scroll: "Scroll",
    nav: { home: "Home", about: "About", work: "Work" },
    timeIn: (city: string, time: string) => `${time} in ${city}`,
    second: {
      name: "NANXI DAO",
      role: "UI/UX & Industrial Designer",
      intro:
        "I’m a designer who starts from real problems, not products. I research before I draw, and I care about the whole experience — the object, the service, and the interface around it. I work carefully and rigorously: I hunt down every flaw and test repeatedly, and I keep questioning whether each detail truly fits the product, trimming where needed rather than piling on features.",
    },
    work: {
      headline: (
        <>
          A visual archive of <Em>interface design</Em>, <Em>industrial objects</Em>, and other{" "}
          <Em>creative explorations</Em>.
        </>
      ),
      filters: { all: "All", ui: "UI/UX", product: "Industrial Design", other: "Other" },
      cardBrief: "A short description of this project — replace with the real story behind the work.",
    },
    fourth: {
      about: "About",
      statement:
        "I design to make everyday things clearer, kinder, and a little more thoughtful — and my design journey is just beginning.",
      bio:
        "I grew up in Beijing and I’m currently based in the UK, finishing my undergraduate degree and continuing on to a master’s. I work across UI/UX and industrial design; most of my work so far turns careful research into products people can actually use, and I also take on some more speculative, future-facing projects.",
      eduHeading: "Education",
      edu: [
        { school: "Loughborough University — BA Design", year: "2023 – 2026" },
        { school: "Royal College of Art — MA Design Products", year: "2026 –" },
      ],
      learnedHeading: "What I learned at Loughborough",
      learnedBody:
        "At Loughborough I learned to drive a design process systematically — from research to a finished concept. I learned how to find the real problem behind what users say, and to keep adjusting a product’s features around that problem instead of my first idea. It taught me to be both rigorous and flexible: structured in process, open in thinking.",
      skillsHeading: "Skills & Tools",
      tools: [
        "Figma", "Illustrator", "Photoshop", "InDesign", "After Effects", "Premiere Pro",
        "SolidWorks", "Rhino", "Blender", "TouchDesigner", "Arduino", "Hand sketching",
      ],
      skillsNote:
        "I’m happy to pick up new tools for whatever a project needs, and I enjoy trying new things to make my design process faster and sharper.",
      workExpHeading: "Work Experience",
      workExpPlaceholder: "To be added.",
      studioHeading: "In the studio",
      photo: "Photo",
    },
    detail: {
      back: "Back to work",
      description:
        "A placeholder project description. Replace this with the story of the project — the problem, your approach, and the outcome.",
    },
  },
  zh: {
    brand: "刀婻西",
    tagline: "把日常里的小麻烦，变成更好的样子。",
    scroll: "向下滚动",
    nav: { home: "首页", about: "关于", work: "作品" },
    timeIn: (city: string, time: string) => `${city} · ${time}`,
    second: {
      name: "刀婻西",
      role: "UI/UX & 工业设计师",
      intro:
        "我是一名从真实问题、而不是从产品出发的设计师。动手之前，我会先做研究；我在意的是完整的体验——产品本身、它的服务，以及围绕它的界面。做设计时我细心而严谨，会揪住每一个漏洞反复测试；对细节也会反复推敲它是否真的与产品适配，并适当做减法，而不是盲目堆砌功能。",
    },
    work: {
      headline: (
        <>
          一份关于 <Em>界面设计</Em>、<Em>工业产品</Em> 与其他 <Em>创作探索</Em> 的视觉档案。
        </>
      ),
      filters: { all: "全部", ui: "UI/UX", product: "工业设计", other: "其他" },
      cardBrief: "这个项目的简短描述——之后替换成作品背后的真实故事。",
    },
    fourth: {
      about: "关于",
      statement: "我做设计，是想让日常的东西更清晰、更贴心，也更用心一点——我的设计旅程才刚刚开始。",
      bio:
        "我在北京长大，现在生活在英国，正在完成本科、即将继续攻读硕士。我的工作横跨 UI/UX 与工业设计，目前接触的设计作品大多是这样的：把扎实的研究，一步步变成人们真正用得上的产品；也会做一些偏未来性的项目。",
      eduHeading: "教育",
      edu: [
        { school: "拉夫堡大学 — 设计学士", year: "2023 – 2026" },
        { school: "皇家艺术学院 — 产品设计硕士", year: "2026 –" },
      ],
      learnedHeading: "在拉夫堡的收获",
      learnedBody:
        "在拉夫堡，我学会了系统地推进整个设计流程——从前期研究到成型的方案。我学会了透过用户说出口的话，找到背后真正的问题，并围绕它不断调整产品功能，而不是固执于最初的想法。这让我既严谨又灵活：流程上有条理，思考上够开放。",
      skillsHeading: "技能与工具",
      tools: [
        "Figma", "Illustrator", "Photoshop", "InDesign", "After Effects", "Premiere Pro",
        "SolidWorks", "Rhino", "Blender", "TouchDesigner", "Arduino", "手绘",
      ],
      skillsNote:
        "我也乐于根据每个项目的需求学习新工具，乐于接受新鲜事物并尝试使用，以提升我的设计效率。",
      workExpHeading: "工作经历",
      workExpPlaceholder: "待补充。",
      studioHeading: "工作中",
      photo: "照片",
    },
    detail: {
      back: "返回作品",
      description:
        "这里是占位的项目描述。之后替换成这个项目的故事——问题、你的方法，以及最终结果。",
    },
  },
};

type Ctx = { lang: Lang; toggle: () => void; t: Dict };

const LangContext = createContext<Ctx>({ lang: "en", toggle: () => {}, t: DICT.en });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "zh" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const toggle = () =>
    setLang((l) => {
      const next: Lang = l === "en" ? "zh" : "en";
      localStorage.setItem("lang", next);
      return next;
    });

  return (
    <LangContext.Provider value={{ lang, toggle, t: DICT[lang] }}>{children}</LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
