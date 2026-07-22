import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#151515",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#fa6739"
        >
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
