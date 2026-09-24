import { ImageResponse } from "next/og";

export const alt = "GrokBot Society — persistent synthetic people with bounded intelligence";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          border: "2px solid rgba(124,92,255,0.28)",
          borderRadius: 999,
          top: 55,
          left: 340,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 360,
          height: 360,
          border: "2px solid rgba(34,184,230,0.24)",
          borderRadius: 999,
          top: 135,
          left: 420,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 90,
          height: 90,
          borderRadius: 999,
          background: "#7c5cff",
          top: 270,
          left: 555,
          boxShadow: "0 0 90px rgba(124,92,255,0.8)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#67e8f9",
            marginBottom: 22,
          }}
        >
          Provider-neutral society runtime
        </div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
          GrokBot Society
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginTop: 40,
            fontSize: 29,
            color: "#c4b5fd",
          }}
        >
          <span>PERSON</span>
          <span>≠</span>
          <span>ROLE</span>
          <span>≠</span>
          <span>ACTOR</span>
          <span>≠</span>
          <span>MODEL</span>
        </div>
        <div style={{ fontSize: 25, color: "#94a3b8", marginTop: 34 }}>
          Persistent people. Bounded intelligence. Zero-cost by default.
        </div>
      </div>
    </div>,
    size
  );
}
