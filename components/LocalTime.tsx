"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

/* Live local time.
   EN: viewer's own timezone — "10:30 PM in London".
   ZH: forced to Beijing time, city shown in pinyin — "BeiJing · 10:30 PM". */
export default function LocalTime() {
  const { t, lang } = useLang();
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    const isZh = lang === "zh";
    const tz = isZh ? "Asia/Shanghai" : Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    setCity(isZh ? "BeiJing" : (tz.split("/").pop() || "Local").replace(/_/g, " "));
    const fmt = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: tz || undefined,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [lang]);

  return <span suppressHydrationWarning>{time ? t.timeIn(city, time) : "—"}</span>;
}
