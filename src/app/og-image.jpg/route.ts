import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

const CHIPS = [
  "IPTV Premium",
  "IPTV 4K",
  "IPTV Smart TV",
  "IPTV Android / iOS",
  "Fire TV Stick",
];

function TvMark() {
  return React.createElement(
    "svg",
    {
      width: "64",
      height: "64",
      viewBox: "0 0 200 200",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("circle", { cx: 85, cy: 35, r: 8, fill: "#0b0b0b", opacity: "0.9" }),
    React.createElement("circle", { cx: 115, cy: 35, r: 8, fill: "#0b0b0b", opacity: "0.9" }),
    React.createElement("path", { d: "M85 43 L92 60", stroke: "#0b0b0b", strokeWidth: 5, opacity: "0.9" }),
    React.createElement("path", { d: "M115 43 L108 60", stroke: "#0b0b0b", strokeWidth: 5, opacity: "0.9" }),
    React.createElement("rect", { x: 40, y: 60, width: 120, height: 100, rx: 15, fill: "#0b0b0b", opacity: "0.9" }),
    React.createElement("rect", { x: 50, y: 70, width: 100, height: 80, rx: 10, fill: "#111827" }),
    React.createElement("path", { d: "M92 95 L132 110 L92 125 Z", fill: "#22d3ee" })
  );
}

export async function GET(request: Request) {
  const { origin } = new URL(request.url);

  const header = React.createElement(
    "div",
    { style: { display: "flex", alignItems: "center", gap: 18 } },
    React.createElement(
      "div",
      {
        style: {
          width: 88,
          height: 88,
          borderRadius: 22,
          background: "linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 60px rgba(34,211,238,0.25)",
        },
      },
      TvMark()
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      React.createElement(
        "div",
        { style: { fontSize: 44, fontWeight: 900, letterSpacing: -1 } },
        "IPTV SMARTERS PRO"
      ),
      React.createElement(
        "div",
        { style: { fontSize: 22, color: "rgba(255,255,255,0.7)" } },
        "Abonnement IPTV France • Activation instantanée • 4K/FHD/HD"
      )
    )
  );

  const chipStyle: React.CSSProperties = {
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    fontSize: 18,
    fontWeight: 700,
    color: "rgba(255,255,255,0.8)",
  };

  const body = React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 14 } },
    React.createElement(
      "div",
      { style: { fontSize: 58, fontWeight: 950, lineHeight: 1.05 } },
      "Meilleur Abonnement IPTV France 2026"
    ),
    React.createElement(
      "div",
      { style: { fontSize: 26, color: "rgba(255,255,255,0.75)", maxWidth: 980 } },
      "160 000+ chaînes TV • 20 000+ films & séries VOD • Support 24/7"
    ),
    React.createElement(
      "div",
      { style: { display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" } },
      ...CHIPS.map((label) => React.createElement("div", { key: label, style: chipStyle }, label))
    ),
    React.createElement(
      "div",
      { style: { fontSize: 18, color: "rgba(255,255,255,0.45)", marginTop: 10 } },
      origin.replace(/^https?:\/\//, "")
    )
  );

  const element = React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(circle at 20% 20%, #22d3ee33, transparent 55%), radial-gradient(circle at 80% 30%, #a78bfa33, transparent 55%), linear-gradient(180deg, #000000 0%, #050505 100%)",
        color: "#ffffff",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      },
    },
    header,
    body
  );

  return new ImageResponse(element, { width: 1200, height: 630 });
}

