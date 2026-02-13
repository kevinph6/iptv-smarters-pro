import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";

export async function GET() {
  const svg = React.createElement(
    "svg",
    {
      width: "320",
      height: "320",
      viewBox: "0 0 200 200",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
    },
    React.createElement("circle", { cx: 85, cy: 35, r: 8, fill: "#0b0b0b", opacity: "0.9" }),
    React.createElement("circle", { cx: 115, cy: 35, r: 8, fill: "#0b0b0b", opacity: "0.9" }),
    React.createElement("path", { d: "M85 43 L92 60", stroke: "#0b0b0b", strokeWidth: 6, opacity: "0.9" }),
    React.createElement("path", { d: "M115 43 L108 60", stroke: "#0b0b0b", strokeWidth: 6, opacity: "0.9" }),
    React.createElement("rect", { x: 40, y: 60, width: 120, height: 100, rx: 15, fill: "#0b0b0b", opacity: "0.9" }),
    React.createElement("rect", { x: 50, y: 70, width: 100, height: 80, rx: 10, fill: "#111827" }),
    React.createElement("path", { d: "M92 95 L132 110 L92 125 Z", fill: "#22d3ee" })
  );

  const element = React.createElement(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0b0b0b",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          width: 440,
          height: 440,
          borderRadius: 96,
          background: "linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 40px 120px rgba(34,211,238,0.22)",
        },
      },
      svg
    )
  );

  return new ImageResponse(element, { width: 512, height: 512 });
}

