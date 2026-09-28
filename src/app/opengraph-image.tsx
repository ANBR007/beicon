import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#141414",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", opacity: 0.7 }}>
          Beicon Mkt
        </div>
        <div style={{ fontSize: 64, marginTop: 24, lineHeight: 1.05, maxWidth: 900 }}>
          Transformamos sua marca em uma máquina previsível de atração e vendas.
        </div>
      </div>
    ),
    size
  );
}
