import { ImageResponse } from "next/og";
import logo from "@/app/assets/my_community_logo.svg";
export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/svg+xml";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
          border: "1px solid rgba(250, 103, 57, 0.4)",
        }}
      >
        <img src={logo} height={34} width={34} alt="Niral Developer logo" />
      </div>
    ),
    { ...size }
  );
}
