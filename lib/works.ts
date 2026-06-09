/* Real project content for page-3 tiles + detail pages.
   Key = work id used in the URL (/work/<id>), matching the page-3 tile.

   title/types/date/description = optional, bilingual where text.
   collab    = mark as a collaboration project.
   cover     = page-3 thumbnail (4:3) + detail first image.
   images    = process shots, FULL WIDTH at natural ratio (one per row).
   heroshots = finished / hero shots, shown LAST, FULL WIDTH (enlarged).
   theme     = "dark" → black detail page to match dark imagery. */

export type Localized = { en: string; zh: string };
export type Work = {
  title?: string;
  types?: Localized;
  date?: string;
  description?: Localized;
  collab?: boolean;
  solo?: boolean;
  cover: string;
  images: string[];
  heroshots?: string[];
  /** how many hero/finished shots per row (default 1 = full width) */
  heroCols?: number;
  /** YouTube URL — embedded (16:9) at the end of the detail page */
  video?: string;
  theme?: "light" | "dark";
};

const img = (kind: string, n: number, files: string[]): string[] =>
  files.map((f) => `/slide3/${kind}/${n}/${f}`);

export const works: Record<string, Work> = {
  "product-1": {
    title: "BREATHMORPH",
    types: {
      en: "Wearable Product Design / Sustainable Design / Biomimetic design",
      zh: "可穿戴产品设计 / 可持续设计 / 仿生设计",
    },
    date: "9/2025 - 12/2025",
    description: {
      en: "Using biomimetic structures and natural color-changing materials, this wearable visualizes breathing in real time and adapts to facial support zones. Designed to improve respiratory comfort, airflow efficiency, and training awareness during sports.",
      zh: "运用仿生结构与天然变色材料，这款可穿戴设备能实时可视化呼吸，并贴合面部的支撑区域。旨在提升运动时的呼吸舒适度、气流效率，以及训练中的自我感知。",
    },
    cover: "/slide3/product/1/1.png",
    images: img("product", 1, ["2.png", "3.png", "4.png", "5.png", "6.png"]),
  },

  "product-2": {
    title: "Finger dynamics",
    solo: true,
    types: {
      en: "Integrated product design | Children’s Training",
      zh: "综合产品设计 | 儿童训练",
    },
    date: "11/2024 - 3/2025",
    description: {
      en: "This project presents an interactive rhythm-based training system designed for children with Developmental Coordination Disorder (DCD). It integrates a modular toy and a rhythm game app on iPad. Through Bluetooth connection, children use interchangeable control rods and pressure-sensitive caps to interact with gamified challenges across three progressive levels. Each level increases in complexity—from simple directional sliding to multi-directional movement and fine motor control training—encouraging hand–eye coordination, spatial awareness, and grip strength. The system aims to build long-term motor training habits by turning therapy into engaging play.",
      zh: "这是一套基于节奏的互动训练系统，专为患有发展性协调障碍（DCD）的儿童设计。它由一个模块化玩具和 iPad 上的节奏游戏应用组成。通过蓝牙连接，孩子使用可更换的控制杆与压感帽，与三个递进关卡的游戏化挑战互动。每一关复杂度递增——从简单的方向滑动，到多方向移动与精细动作控制训练——以锻炼手眼协调、空间感知与握力。系统通过把康复训练变成有趣的游戏，帮助孩子建立长期的运动训练习惯。",
    },
    cover: "/slide3/product/2/1.png",
    images: img("product", 2, ["2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg"]),
    heroshots: img("product", 2, ["IMG1-1.png", "IMG1-3.png", "IMG1-4.png", "IMG1-6.png", "IMG1-7.png", "IMG1-8.png"]),
    heroCols: 3,
  },

  "product-3": {
    title: "SEAVA",
    collab: true,
    types: { en: "Product Design / Sustainable Design", zh: "产品设计 / 可持续设计" },
    date: "09.2025 - 11.2025",
    description: {
      en: "This is a solar-powered ocean filtration pod designed to remove sunscreen-derived pollutants from nearshore waters. It operates autonomously, combining mechanical filtration, adsorptive purification, and photocatalytic degradation within a compact modular system.",
      zh: "这是一款太阳能驱动的海洋过滤舱，用于清除近海水域中来自防晒霜的污染物。它能自主运行，在紧凑的模块化系统中结合了机械过滤、吸附净化与光催化降解。",
    },
    cover: "/slide3/product/3/1.png",
    images: img("product", 3, ["2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"]),
    heroshots: img("product", 3, ["heroshot1.png", "heroshot2.png"]),
    video: "https://youtu.be/5gwGRgj_DMk",
  },

  "product-4": {
    title: "SKINTRACE",
    types: { en: "Machine Learning / Product Design", zh: "机器学习 / 产品设计" },
    date: "06.2024 - 09.2024",
    description: {
      en: "SKINTRACE is an AI-powered handheld skin scanner designed for early melanoma detection. The project uses Edge Impulse and TinyML image classification to analyse skin lesions locally on a low-power device, giving users immediate visual feedback through an OLED screen. The design shifted from a wearable concept to a handheld form to improve image quality, scanning flexibility, and usability. It combines a camera module, magnetic charging stand, sleep/wake modes, recycled aluminium casing, and a familiar beauty-device form to make skin monitoring more accessible, sustainable, and easy to use.",
      zh: "SKINTRACE 是一款 AI 驱动的手持皮肤扫描仪，用于黑色素瘤的早期检测。项目使用 Edge Impulse 与 TinyML 图像分类，在低功耗设备上本地分析皮肤病变，并通过 OLED 屏幕为用户即时提供可视化反馈。设计从可穿戴概念转向手持形态，以提升图像质量、扫描灵活性与易用性。它结合了摄像头模块、磁吸充电底座、睡眠/唤醒模式、再生铝外壳，以及人们熟悉的美容仪造型，让皮肤监测更易获得、更可持续、也更易使用。",
    },
    cover: "/slide3/product/4/1.png",
    images: img("product", 4, ["2.png", "3.png", "4.png", "5.png", "6.png"]),
  },

  "product-5": {
    title: "RescueGlove",
    theme: "dark",
    types: { en: "Wearable Product Design", zh: "可穿戴产品设计" },
    date: "11.2025 - 12.2025",
    description: {
      en: "This project is a protective wearable glove designed to assist volunteers in rescuing rare birds in jungle environments while preventing secondary injuries during handling. The glove integrates heating, flashlight illumination, and pressure-sensing functions to support safe, precise, and humane rescue operations.",
      zh: "这是一款防护型可穿戴手套，旨在帮助志愿者在丛林环境中救助珍稀鸟类，并在操作过程中防止二次伤害。手套集成了加热、手电照明与压力感应功能，支持安全、精准且人道的救援操作。",
    },
    cover: "/slide3/product/5/1.png",
    images: img("product", 5, ["2.png", "3.png", "4.png", "5.png"]),
    heroshots: img("product", 5, ["heroshot1.png", "heroshot2.png"]),
  },

  "product-6": {
    title: "EaseDry",
    types: {
      en: "Product Design / Inclusive Design / Ergonomic Design",
      zh: "产品设计 / 包容性设计 / 人体工学设计",
    },
    date: "January 2024 – May 2024",
    description: {
      en: "EaseDry is an ergonomic hairdryer concept designed for people with rheumatoid arthritis. The project focuses on reducing hand strain during daily grooming through a lightweight form, balanced structure, and accessible handling details. It explores how product design can support independence, comfort, and confidence for users with joint pain or limited mobility.",
      zh: "EaseDry 是一款为类风湿关节炎患者设计的人体工学吹风机概念。项目通过轻量化造型、平衡的结构与友好的握持细节，减少日常打理时的手部负担。它探索产品设计如何为关节疼痛或行动不便的用户带来独立、舒适与自信。",
    },
    cover: "/slide3/product/6/1.png",
    images: img("product", 6, ["2.png", "3.png", "4.png"]),
  },

  "product-7": {
    title: "Beoscent Aura",
    types: {
      en: "Product Design / Brand-led Design / CMF & Packaging Design",
      zh: "产品设计 / 品牌主导设计 / CMF 与包装设计",
    },
    date: "January 2024 – May 2024",
    description: {
      en: "Beoscent Aura is a premium aroma diffuser inspired by Bang & Olufsen’s brand language. The design combines fragrance, ambient lighting, smart control, and high-quality materials such as aluminium and wood to create a calm sensory experience for modern home environments. The project includes brand research, form exploration, product detailing, exploded views, and packaging design.",
      zh: "Beoscent Aura 是一款以 Bang & Olufsen 品牌语言为灵感的高端香薰机。设计融合香氛、氛围灯光、智能控制，以及铝与木等高品质材料，为现代家居营造平静的感官体验。项目涵盖品牌研究、形态探索、产品细节、爆炸视图与包装设计。",
    },
    cover: "/slide3/product/7/1.png",
    images: img("product", 7, ["2.png", "3.png", "4.png"]),
  },

  "product-8": {
    title: "POP MART Living Habitat",
    types: {
      en: "Product Design / Interaction Design / Smart Hardware / App-connected Experience",
      zh: "产品设计 / 交互设计 / 智能硬件 / 联动应用体验",
    },
    date: "01.2026 – 02.2026",
    description: {
      en: "POP MART Living Habitat is a smart modular display system designed for blind box collectors. It responds to the problem of “clutter anxiety” and the emotional drop after unboxing by turning display storage into an interactive experience. The product combines magnetic modular shelves, NFC/RFID recognition, UV monitoring, electrochromic glass protection, dustproof sealing, and AI-generated lighting/backgrounds to help users protect, curate, and emotionally reconnect with their collections.",
      zh: "POP MART Living Habitat 是一套为盲盒收藏者设计的智能模块化展示系统。它针对「凌乱焦虑」以及拆盒后的情绪落差，把展示收纳变成一种互动体验。产品结合磁吸模块化层架、NFC/RFID 识别、紫外线监测、电致变色玻璃保护、防尘密封，以及 AI 生成的灯光/背景，帮助用户保护、策展并在情感上重新连接自己的收藏。",
    },
    cover: "/slide3/product/8/1.png",
    images: img("product", 8, ["2.png", "3.png"]),
    heroshots: img("product", 8, ["heroshot.png"]),
  },

  "ui-1": {
    title: "NOMI — A Cooking Companion App for Solo Renters",
    types: {
      en: "UI/UX Design · Mobile App Design · Service Design · Sustainable / Social-Impact Design",
      zh: "UI/UX 设计 · 移动应用设计 · 服务设计 · 可持续 / 社会影响力设计",
    },
    date: "Oct 2025 – May 2026",
    description: {
      en: "NOMI is a mobile cooking app that helps people who live alone waste less food, spend less money, and cook more at home. Built around three principles — stop waste at the supermarket, make sustainable choices effortless, and make every decision obvious — it combines a smart shopping list that filters out staples you already own, a “one photo, one portion” feature that suggests gram amounts from WRAP UK solo-portion data (replacing an abandoned AR concept after user testing), and a leftover-reuse loop that turns unfinished ingredients into the next meal's recipes. Grounded in UN SDG 12.3, the project spans user research, a six-round iterative prototyping process, a full design system, and a two-stage business model.",
      zh: "NOMI 是一款移动烹饪应用，帮助独居者减少食物浪费、节省开支、在家多做饭。它围绕三条原则——在超市就阻止浪费、让可持续选择毫不费力、让每个决定都一目了然——结合了能自动过滤掉你已有常备食材的智能购物清单、依据 WRAP UK 单人份量数据由「一张照片，一人份」给出克数建议的功能（在用户测试后取代了原先放弃的 AR 概念），以及把吃剩食材变成下一餐食谱的剩余再利用循环。项目以联合国可持续发展目标 12.3 为基础，涵盖用户研究、六轮迭代原型流程、完整的设计系统，以及两阶段的商业模式。",
    },
    cover: "/slide3/ui/1/1.jpg",
    images: img("ui", 1, ["2.png", "3.png", "4.png"]),
    video: "https://youtu.be/GiSvVsz_Wz0",
  },
  "ui-2": {
    title: "DineLink",
    types: {
      en: "Product Design / UIUX Design / Experience Design / Remote Interaction",
      zh: "产品设计 / UIUX 设计 / 体验设计 / 远程交互",
    },
    date: "02.2024 – 03.2024",
    description: {
      en: "DineLink is a remote dining product and app experience designed for families living apart. The project explores how shared mealtime rituals can maintain emotional connection across distance, especially when traditional video calls feel too formal or lack warmth. The design combines a physical desktop device with an app interface, using gesture-based interaction, lighting and sound feedback, passive camera visibility, voice chat, remote reminders, and food data reports to recreate a sense of dining together even when family members are in different places.",
      zh: "DineLink 是一款为分隔两地的家庭设计的远程共餐产品与应用体验。项目探索共享的用餐仪式如何跨越距离维系情感连接，尤其是在传统视频通话显得过于正式或缺乏温度时。设计将一个桌面实体设备与应用界面结合，运用手势交互、灯光与声音反馈、被动的摄像头可见性、语音聊天、远程提醒以及饮食数据报告，即使家人身处不同地方，也能重现一同进餐的感觉。",
    },
    cover: "/slide3/ui/2/1.png",
    images: img("ui", 2, ["2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png"]),
    video: "https://youtu.be/Y1-o-ro-B28",
  },
  "ui-3": {
    title: "Holo-History",
    collab: true,
    types: {
      en: "UI Design / Interaction Design / Exhibition Design / Museum Experience",
      zh: "UI 设计 / 交互设计 / 展览设计 / 博物馆体验",
    },
    date: "2023",
    description: {
      en: "Holo-History is an interactive museum experience designed to make history exhibitions more engaging and easier for children to understand. This was a group project, and I was mainly responsible for the UI design part, including the screen interface, information layout, language selection, battle selection, transcript page, and detail pages. The project uses holographic projection, audio narration, tactile control buttons, and a digital interface to transform passive museum learning into a more immersive, sensory experience. Based on user research, the design was refined to reduce over-reliance on touchscreens and increase physical interaction, helping children stay focused and engaged during museum visits.",
      zh: "Holo-History 是一个互动式博物馆体验，旨在让历史展览更具吸引力、也更易于儿童理解。这是一个小组项目，我主要负责 UI 设计部分，包括屏幕界面、信息布局、语言选择、对战选择、文字记录页与详情页。项目运用全息投影、音频解说、触觉控制按钮与数字界面，把被动的博物馆学习转化为更沉浸、更感官化的体验。基于用户研究，设计经过优化以减少对触摸屏的过度依赖、增加实体互动，帮助孩子在参观时保持专注与投入。",
    },
    cover: "/slide3/ui/3/1.png",
    images: [],
  },

  "other-1": {
    title: "WayFinder Pin",
    types: {
      en: "Product Design / Wearable Design / Inclusive Navigation / Safety Design",
      zh: "产品设计 / 可穿戴设计 / 包容性导航 / 安全设计",
    },
    date: "2024",
    description: {
      en: "WayFinder Pin is a wearable navigation concept designed for new international students who feel unsafe or lack confidence when walking in unfamiliar environments. The project focuses on way-finding without relying fully on mobile navigation, especially in situations with poor signal, low visibility, or unclear road signs. The design combines a pin-type wearable device, a portable charging case, projected navigation, flashlight support, offline map mode, and an emergency alarm triggered by pressing the control wheel twice. It aims to improve students' safety, confidence, and comfort while walking at night or in unfamiliar areas.",
      zh: "WayFinder Pin 是一款可穿戴导航概念，专为在陌生环境中行走时感到不安全或缺乏信心的国际新生设计。项目聚焦于不完全依赖手机导航的寻路，尤其是在信号差、能见度低或路标不清的情况下。设计结合了胸针式可穿戴设备、便携充电盒、投影导航、手电照明、离线地图模式，以及双击控制拨轮触发的紧急报警。它旨在提升学生在夜间或陌生区域行走时的安全感、信心与舒适度。",
    },
    cover: "/slide3/other/1/1.png",
    images: img("other", 1, ["2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"]),
  },
  "other-2": {
    title: "Fridgely Promo Video",
    types: {
      en: "Video Editing / Motion Design / App Promotion / Visual Communication",
      zh: "视频剪辑 / 动态设计 / 应用推广 / 视觉传达",
    },
    date: "2024",
    description: {
      en: "Fridgely Promo Video is a promotional video project created for Fridgely, an app concept that helps users detect and manage food expiration. The app focuses on reducing food waste by reminding users when ingredients are close to expiring and helping them keep track of food stored at home. My role in this project was to edit and produce the promotional video, translating the app's core function into a clear visual story that communicates the problem, user scenario, and product value.",
      zh: "Fridgely Promo Video 是为 Fridgely 制作的宣传视频项目；Fridgely 是一款帮助用户检测和管理食物保质期的应用概念。该应用通过在食材临近过期时提醒用户、并帮助他们追踪家中存放的食物，专注于减少食物浪费。我在该项目中的角色是剪辑并制作这支宣传视频，把应用的核心功能转化为清晰的视觉叙事，传达问题、用户场景与产品价值。",
    },
    cover: "/slide3/other/2/1.png",
    images: [],
    video: "https://youtu.be/xHHAjVlIsig",
  },
  "other-3": {
    title: "The Robe of Emergence",
    collab: true,
    types: {
      en: "Speculative Design / Environment Design / 3D Modelling / Sustainable Ceremony Design",
      zh: "思辨设计 / 环境设计 / 3D 建模 / 可持续仪式设计",
    },
    date: "2025",
    description: {
      en: "The Robe of Emergence is a group speculative design project exploring a future ceremony for a fictional society called Heterarchia. The project imagines a coming-of-age ritual where individuals receive a ceremonial robe as a symbol of responsibility, shared values, and transition into society. The design includes a sustainable ceremony environment with biodegradable materials, modular furniture, bonfire area, storytelling space, food-sharing area, and symbolic structures connected to the society's values. In this group project, I was responsible for all the 3D modelling, including the ceremony environment, spatial layout, modular components, and rendered scene development.",
      zh: "The Robe of Emergence 是一个小组思辨设计项目，探索一个名为 Heterarchia 的虚构社会的未来仪式。项目设想了一种成人礼，个体会获得一件礼袍，作为责任、共同价值观以及融入社会这一转变的象征。设计包含一个可持续的仪式环境，采用可生物降解材料、模块化家具、篝火区、讲故事空间、食物分享区，以及与该社会价值观相关的象征性结构。在这个小组项目中，我负责所有的 3D 建模，包括仪式环境、空间布局、模块化组件，以及渲染场景的开发。",
    },
    cover: "/slide3/other/3/1.png",
    images: img("other", 3, ["2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"]),
  },
  "other-4": {
    title: "Park Healing Space",
    types: {
      en: "Placemaking Design / Spatial Design / Environmental Design / Experience Design",
      zh: "场所营造设计 / 空间设计 / 环境设计 / 体验设计",
    },
    date: "2024",
    description: {
      en: "Park Healing Space is a temporary placemaking intervention designed for Beacon Hill Country Park. The project responds to issues found during a field trip, including the lack of dedicated resting spaces, discomfort from forest debris, and the absence of quiet areas for stillness and reflection. The design introduces a lightweight fabric-and-wood structure that acts as a soft pause point along walking routes, allowing visitors to rest, slow down, and reconnect with nature through filtered light, soft textures, ambient sound, and an immersive forest atmosphere. The structure is designed to be low-impact, removable, and biodegradable, respecting the natural character of the site.",
      zh: "Park Healing Space 是为 Beacon Hill Country Park 设计的临时场所营造介入。项目回应实地考察中发现的问题，包括缺乏专门的休息空间、林间碎屑带来的不适，以及没有可供静思与放松的安静区域。设计引入一个轻量的织物与木结构，作为步道沿途柔和的停顿点，让访客通过被过滤的光线、柔软的材质、环境声音与沉浸式的森林氛围休息、放慢脚步、重新与自然连接。该结构设计为低影响、可拆卸、可生物降解，尊重场地的自然特质。",
    },
    cover: "/slide3/other/4/1.png",
    images: img("other", 4, ["2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png"]),
  },
};
