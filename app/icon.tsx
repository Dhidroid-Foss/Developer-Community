import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const logo = `data:image/svg+xml;base64,${readFileSync(
  join(process.cwd(), "app/assets/my_community_logo.svg")
).toString("base64")}`;

export const dynamic = "force-static";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

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
