import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/site";

export const alt = "TamilDev — the realtime developer community for web, mobile and AI engineers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const dynamic = "force-static";

const star = (color: string) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill={color}
    style={{ marginRight: 8 }}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BRAND.ink,
          color: "#ffffff",
          fontFamily: "sans-serif",
          padding: "64px 72px",
        }}
      >
        {/* Grid accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            opacity: 0.06,
            backgroundImage:
              "linear-gradient(to right,#ffffff 1px,transparent 1px),linear-gradient(to bottom,#ffffff 1px,transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 800, letterSpacing: -2 }}>
          {star(BRAND.orange)}
          <span style={{ color: BRAND.orange }}>தமிழ்</span>Dev
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, fontWeight: 800, letterSpacing: -4, lineHeight: 1.02 }}>
            Build in realtime.
            <br />
            Ship with the <span style={{ color: BRAND.orange, fontStyle: "italic" }}>best.</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: "#d4d4d8", letterSpacing: -0.5 }}>
            The realtime developer community for Tamil-speaking engineers — React, Next.js,
            <br />
            Node.js, PostgreSQL &amp; AI, reviewed live and shipped together.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 18, color: "#a1a1aa" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {star(BRAND.orange)}
            Join 15,000+ developers shipping code daily
          </span>
          <span style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: 1 }}>TAMILDEVS.DHIDROID.WORKERS.DEV</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
