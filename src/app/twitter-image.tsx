import { ImageResponse } from "next/og";

export const alt = "GrokBot Society — persistent synthetic people with bounded intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #050811 0%, #11112a 55%, #071827 100%)",
        color: "#f8fafc",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 24, letterSpacing: 5, color: "#67e8f9" }}>
        PROVIDER-NEUTRAL SOCIETY RUNTIME
      </div>
      <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24 }}>
        GrokBot Society
      </div>
      <div style={{ fontSize: 30, color: "#c4b5fd", marginTop: 38 }}>
        PERSON ≠ ROLE ≠ ACTOR ≠ MODEL
      </div>
      <div style={{ fontSize: 25, color: "#94a3b8", marginTop: 30 }}>
        Persistent people. Bounded intelligence. Zero-cost by default.
      </div>
    </div>,
    size
  );
}
