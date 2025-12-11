import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1a1f36',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
        }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TV antenna */}
          <circle cx="85" cy="35" r="8" fill="#a78bfa" />
          <circle cx="115" cy="35" r="8" fill="#a78bfa" />
          <path d="M85 43 L92 60" stroke="#a78bfa" strokeWidth="4" />
          <path d="M115 43 L108 60" stroke="#a78bfa" strokeWidth="4" />
          
          {/* TV screen */}
          <rect x="40" y="60" width="120" height="100" rx="15" fill="#a78bfa" />
          <rect x="50" y="70" width="100" height="80" rx="8" fill="#1a1f36" />
          
          {/* Play icon in center */}
          <path d="M90 95 L120 110 L90 125 Z" fill="#a78bfa" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}