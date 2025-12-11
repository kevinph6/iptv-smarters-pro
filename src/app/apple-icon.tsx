import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
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
          borderRadius: '20px',
        }}
      >
        <svg
          width="150"
          height="150"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TV antenna */}
          <circle cx="85" cy="35" r="8" fill="#a78bfa" />
          <circle cx="115" cy="35" r="8" fill="#a78bfa" />
          <line x1="85" y1="43" x2="92" y2="60" stroke="#a78bfa" strokeWidth="4" />
          <line x1="115" y1="43" x2="108" y2="60" stroke="#a78bfa" strokeWidth="4" />
          
          {/* TV screen */}
          <rect x="40" y="60" width="120" height="100" rx="15" fill="#a78bfa" />
          <rect x="50" y="70" width="100" height="80" rx="8" fill="#1a1f36" />
          
          {/* Play button icon */}
          <path
            d="M 90 95 L 90 125 L 115 110 Z"
            fill="#a78bfa"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}