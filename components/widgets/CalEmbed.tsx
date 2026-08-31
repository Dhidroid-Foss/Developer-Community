"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function CalEmbed() {
  useEffect(() => {
    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal: any = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            const script = d.createElement("script");
            script.src = A;
            script.async = true;
            d.head.appendChild(script);
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal;
    if (Cal) {
      Cal("init", "30min", { origin: "https://app.cal.com" });
      Cal.config = Cal.config || {};
      Cal.config.forwardQueryParams = true;

      Cal.ns["30min"]("floatingButton", {
        calLink: "dhidroid/30min",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        hideButtonIcon: false,
        buttonText: "Book Session",
        buttonPosition: "bottom-right",
      });

      Cal.ns["30min"]("ui", {
        cssVarsPerTheme: { light: { "cal-brand": "#292929" } },
        hideEventTypeDetails: true,
        layout: "month_view",
      });
    }
  }, []);

  return null;
}

export default CalEmbed;
