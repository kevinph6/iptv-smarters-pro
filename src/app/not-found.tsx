"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ─────────────────────────────────────────────
   TV Static Canvas — draws random noise pixels
   ───────────────────────────────────────────── */
function TVStatic({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const w = 320;
    const h = 240;
    canvas.width = w;
    canvas.height = h;

    const draw = () => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 200;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ imageRendering: "pixelated" }}
    />
  );
}

/* ─────────────────────────────────────────
   Disconnected Cable SVG
   ───────────────────────────────────────── */
function DisconnectedCable() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="w-48 md:w-56 mx-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left cable */}
      <g className="animate-cable-left">
        <path
          d="M20 80 Q40 60 60 75 Q75 85 80 70"
          stroke="#888"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Connector plug left */}
        <rect x="76" y="62" width="16" height="20" rx="3" fill="#555" stroke="#777" strokeWidth="1.5" />
        <rect x="80" y="67" width="3" height="4" rx="1" fill="#C72C82" />
        <rect x="80" y="73" width="3" height="4" rx="1" fill="#C72C82" />
        <rect x="86" y="67" width="3" height="4" rx="1" fill="#5D3FD3" />
        <rect x="86" y="73" width="3" height="4" rx="1" fill="#5D3FD3" />
      </g>

      {/* Right cable */}
      <g className="animate-cable-right">
        <path
          d="M180 80 Q160 55 140 72 Q125 82 120 68"
          stroke="#888"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Connector plug right */}
        <rect x="108" y="60" width="16" height="20" rx="3" fill="#555" stroke="#777" strokeWidth="1.5" />
        <rect x="112" y="65" width="3" height="4" rx="1" fill="#C72C82" />
        <rect x="112" y="71" width="3" height="4" rx="1" fill="#C72C82" />
        <rect x="118" y="65" width="3" height="4" rx="1" fill="#5D3FD3" />
        <rect x="118" y="71" width="3" height="4" rx="1" fill="#5D3FD3" />
      </g>

      {/* Spark / electricity */}
      <g className="animate-spark">
        <path d="M96 68 L100 60 L98 68 L102 58" stroke="#C72C82" strokeWidth="2" strokeLinecap="round" />
        <path d="M96 75 L93 82 L97 75 L94 84" stroke="#5D3FD3" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="99" cy="70" r="3" fill="#C72C82" opacity="0.6" />
      </g>

      {/* Label */}
      <text x="100" y="120" textAnchor="middle" fill="#888" fontSize="11" fontFamily="monospace">
        CÂBLE DÉCONNECTÉ
      </text>
      <text x="100" y="140" textAnchor="middle" fill="#555" fontSize="9" fontFamily="monospace">
        Vérifiez la connexion...
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────
   Color Bars (classic TV test pattern)
   ───────────────────────────────────────── */
function ColorBars({ visible }: { visible: boolean }) {
  const colors = [
    "#FFFFFF", "#FFE100", "#00FFFF", "#00FF00",
    "#FF00FF", "#FF0000", "#0000FF", "#000000",
  ];
  return (
    <div
      className="flex w-full h-full transition-opacity duration-500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {colors.map((c) => (
        <div key={c} className="flex-1 h-full" style={{ backgroundColor: c }} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   Main 404 Page
   ───────────────────────────────────────── */
export default function NotFound() {
  const [showBars, setShowBars] = useState(false);
  const [crtOff, setCrtOff] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Occasionally flash color bars
    const interval = setInterval(() => {
      setShowBars(true);
      setTimeout(() => setShowBars(false), 400);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleGoHome = useCallback(() => {
    setCrtOff(true);
  }, []);

  return (
    <>
      {/* Inline keyframes that Tailwind can't express */}
      <style>{`
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          5% { opacity: 0.3; }
          10% { opacity: 1; }
          15% { opacity: 0.7; }
          20% { opacity: 1; }
          50% { opacity: 1; }
          52% { opacity: 0.4; }
          54% { opacity: 1; }
          80% { opacity: 1; }
          82% { opacity: 0; }
          83% { opacity: 1; }
        }
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 85% 0); transform: translate(-3px, 0); }
          25% { clip-path: inset(15% 0 60% 0); transform: translate(3px, 0); }
          50% { clip-path: inset(50% 0 20% 0); transform: translate(-2px, 0); }
          75% { clip-path: inset(70% 0 5% 0); transform: translate(4px, 0); }
        }
        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }
          25% { clip-path: inset(20% 0 50% 0); transform: translate(-3px, 0); }
          50% { clip-path: inset(0 0 70% 0); transform: translate(2px, 0); }
          75% { clip-path: inset(40% 0 30% 0); transform: translate(-4px, 0); }
        }
        @keyframes scanline-move {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes vhs-track {
          0% { top: -10%; }
          100% { top: 110%; }
        }
        @keyframes cable-sway-left {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(-2deg) translateX(-3px); }
          75% { transform: rotate(1deg) translateX(2px); }
        }
        @keyframes cable-sway-right {
          0%, 100% { transform: rotate(0deg) translateX(0); }
          25% { transform: rotate(2deg) translateX(3px); }
          75% { transform: rotate(-1deg) translateX(-2px); }
        }
        @keyframes spark-flash {
          0%, 40%, 100% { opacity: 0; }
          45%, 55% { opacity: 1; }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes crt-off {
          0% { transform: scale(1,1); filter: brightness(1); }
          50% { transform: scale(1,0.005); filter: brightness(2); }
          60% { transform: scale(0,0.005); filter: brightness(2); }
          100% { transform: scale(0,0); filter: brightness(0); }
        }
        @keyframes noise-bar {
          0% { top: 100%; }
          100% { top: -30%; }
        }
        @keyframes text-shadow-glitch {
          0%, 100% { text-shadow: 2px 0 #C72C82, -2px 0 #5D3FD3; }
          25% { text-shadow: -2px 2px #C72C82, 2px -2px #5D3FD3; }
          50% { text-shadow: 3px -1px #C72C82, -3px 1px #5D3FD3; }
          75% { text-shadow: -1px -2px #C72C82, 1px 2px #5D3FD3; }
        }
        @keyframes float-404 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .animate-flicker { animation: flicker 3s infinite; }
        .animate-glitch-1 { animation: glitch-1 0.3s infinite linear; }
        .animate-glitch-2 { animation: glitch-2 0.3s infinite linear reverse; }
        .animate-cable-left { animation: cable-sway-left 3s ease-in-out infinite; transform-origin: left center; }
        .animate-cable-right { animation: cable-sway-right 3s ease-in-out infinite; transform-origin: right center; }
        .animate-spark { animation: spark-flash 2.5s ease-in-out infinite; }
        .animate-crt-off { animation: crt-off 0.6s forwards cubic-bezier(0.55, 0.085, 0.68, 0.53); }
        .animate-text-glitch { animation: text-shadow-glitch 0.15s infinite; }
        .animate-float { animation: float-404 3s ease-in-out infinite; }

        /* CRT curvature & glow */
        .crt-screen {
          border-radius: 18px / 20px;
          box-shadow:
            inset 0 0 80px rgba(0,0,0,0.6),
            0 0 30px rgba(93,63,211,0.15),
            0 0 60px rgba(199,44,130,0.08);
          overflow: hidden;
          position: relative;
        }

        /* Scanlines overlay */
        .scanlines::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 4px
          );
          pointer-events: none;
          z-index: 10;
        }

        /* Thick VHS tracking bar */
        .vhs-bar {
          position: absolute;
          left: 0;
          right: 0;
          height: 25%;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(255,255,255,0.04) 20%,
            rgba(255,255,255,0.08) 50%,
            rgba(255,255,255,0.04) 80%,
            transparent 100%
          );
          animation: vhs-track 4s linear infinite;
          pointer-events: none;
          z-index: 8;
        }

        /* Moving scanline */
        .moving-scanline {
          position: absolute;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.06);
          animation: scanline-move 3s linear infinite;
          pointer-events: none;
          z-index: 9;
        }

        /* Noise bar (horizontal distortion) */
        .noise-bar-h {
          position: absolute;
          left: -5%;
          right: -5%;
          height: 4px;
          background: rgba(255,255,255,0.12);
          filter: blur(1px);
          animation: noise-bar 2s linear infinite;
          pointer-events: none;
          z-index: 7;
        }

        /* TV body */
        .tv-body {
          background: linear-gradient(145deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
          border: 3px solid #2a2a4a;
          border-radius: 28px;
          padding: 22px;
          box-shadow:
            0 25px 60px rgba(0,0,0,0.7),
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 0 0 1px rgba(255,255,255,0.03);
        }

        /* TV stand */
        .tv-stand {
          width: 120px;
          height: 16px;
          background: linear-gradient(180deg, #2a2a4a 0%, #1a1a2e 100%);
          border-radius: 0 0 10px 10px;
          margin: 0 auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }
        .tv-stand-leg {
          width: 200px;
          height: 8px;
          background: linear-gradient(180deg, #1a1a2e 0%, #0f0f23 100%);
          border-radius: 0 0 6px 6px;
          margin: 0 auto;
        }

        /* Power LED */
        .power-led {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #C72C82;
          box-shadow: 0 0 8px #C72C82, 0 0 20px rgba(199,44,130,0.4);
          animation: flicker 4s infinite;
        }

        /* CTA button glow */
        .btn-glow {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .btn-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #5D3FD3, #C72C82, #5D3FD3);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .btn-glow:hover::before {
          opacity: 1;
        }
        .btn-glow:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(93,63,211,0.4);
        }
      `}</style>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
            style={{ background: "#5D3FD3" }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px] opacity-8"
            style={{ background: "#C72C82" }}
          />
        </div>

        <div
          className={`relative z-10 transition-all duration-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* TV Unit */}
          <div className="tv-body max-w-[580px] w-full mx-auto">
            {/* Screen area */}
            <div
              className={`crt-screen scanlines relative aspect-video bg-black ${
                crtOff ? "animate-crt-off" : ""
              }`}
            >
              {/* TV Static */}
              <TVStatic className="absolute inset-0 w-full h-full object-cover opacity-50" />

              {/* Color bars flash */}
              <div className="absolute inset-0 z-[5]">
                <ColorBars visible={showBars} />
              </div>

              {/* VHS tracking artifacts */}
              <div className="vhs-bar" />
              <div className="moving-scanline" />
              <div className="noise-bar-h" />

              {/* Main content overlay */}
              <div className="absolute inset-0 z-[6] flex flex-col items-center justify-center">
                {/* 404 number */}
                <div className="relative animate-float">
                  <span
                    className="text-7xl md:text-8xl font-bold tracking-tighter select-none animate-text-glitch"
                    style={{
                      color: "#fff",
                      fontFamily: "monospace",
                      textShadow: "2px 0 #C72C82, -2px 0 #5D3FD3",
                    }}
                  >
                    404
                  </span>
                  {/* Glitch layers */}
                  <span
                    className="absolute inset-0 text-7xl md:text-8xl font-bold tracking-tighter select-none animate-glitch-1"
                    style={{
                      color: "#C72C82",
                      fontFamily: "monospace",
                      opacity: 0.7,
                    }}
                    aria-hidden
                  >
                    404
                  </span>
                  <span
                    className="absolute inset-0 text-7xl md:text-8xl font-bold tracking-tighter select-none animate-glitch-2"
                    style={{
                      color: "#5D3FD3",
                      fontFamily: "monospace",
                      opacity: 0.7,
                    }}
                    aria-hidden
                  >
                    404
                  </span>
                </div>

                {/* NO SIGNAL text */}
                <div className="mt-2 animate-flicker">
                  <span
                    className="text-lg md:text-xl font-bold tracking-[0.3em] uppercase"
                    style={{
                      color: "#fff",
                      fontFamily: "monospace",
                      textShadow: "0 0 10px rgba(255,255,255,0.5)",
                    }}
                  >
                    ◆ PAS DE SIGNAL ◆
                  </span>
                </div>

                {/* Subtitle */}
                <p
                  className="mt-2 text-xs md:text-sm opacity-60"
                  style={{ fontFamily: "monospace", color: "#aaa" }}
                >
                  Vérifiez votre antenne ou câble
                </p>
              </div>

              {/* Corner info — channel display */}
              <div
                className="absolute top-3 left-3 z-[11] animate-flicker"
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#fff",
                  textShadow: "0 0 4px rgba(255,255,255,0.4)",
                }}
              >
                CH --
              </div>
              <div
                className="absolute top-3 right-3 z-[11] animate-flicker"
                style={{
                  fontFamily: "monospace",
                  fontSize: "11px",
                  color: "#fff",
                  textShadow: "0 0 4px rgba(255,255,255,0.4)",
                }}
              >
                IPTV PRO
              </div>

              {/* Bottom info bar */}
              <div
                className="absolute bottom-2 left-0 right-0 z-[11] text-center animate-flicker"
                style={{
                  fontFamily: "monospace",
                  fontSize: "10px",
                  color: "#888",
                  animationDelay: "1s",
                }}
              >
                ▸ ENTRÉE : AUCUNE &nbsp; ▸ RÉSOLUTION : -- x -- &nbsp; ▸ SIGNAL : 0%
              </div>
            </div>

            {/* TV bottom bar with controls */}
            <div className="flex items-center justify-between mt-3 px-2">
              <div className="flex items-center gap-3">
                <div className="power-led" />
                <span
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: "#555", fontFamily: "monospace" }}
                >
                  IPTV Smarters Pro
                </span>
              </div>
              <div className="flex gap-2">
                {/* Fake TV buttons */}
                {["VOL", "CH", "⏻"].map((label) => (
                  <div
                    key={label}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[8px]"
                    style={{
                      background: "linear-gradient(180deg, #2a2a4a, #1a1a2e)",
                      border: "1px solid #3a3a5a",
                      color: "#666",
                      fontFamily: "monospace",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TV Stand */}
          <div className="tv-stand" />
          <div className="tv-stand-leg" />

          {/* Disconnected Cable */}
          <div className="mt-8">
            <DisconnectedCable />
          </div>

          {/* Message & CTA */}
          <div className="text-center mt-6 space-y-4">
            <h1
              className="text-xl md:text-2xl font-bold"
              style={{ color: "#fff", fontFamily: "var(--font-inter)" }}
            >
              Oups ! Cette page n&apos;existe pas
            </h1>
            <p className="text-sm md:text-base max-w-md mx-auto" style={{ color: "#888" }}>
              On dirait que le câble est débranché… La page que vous cherchez
              a été déplacée, supprimée, ou n&apos;a jamais existé.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/"
                onClick={handleGoHome}
                className="btn-glow inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #5D3FD3, #C72C82)",
                  boxShadow: "0 4px 20px rgba(93,63,211,0.3)",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Retour à l&apos;accueil
              </Link>
              <Link
                href="/abonnement-iptv"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all hover:bg-white/10"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#ccc",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                </svg>
                Voir nos abonnements
              </Link>
            </div>
          </div>

          {/* Error code footer */}
          <div className="text-center mt-10">
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{ color: "#333", fontFamily: "monospace" }}
            >
              ERR_404 • PAGE_NOT_FOUND • SIGNAL_LOST
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
