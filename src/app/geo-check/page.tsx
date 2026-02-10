import { headers } from 'next/headers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geo Diagnostic',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function GeoCheckPage() {
  const headersList = await headers();
  
  // Get all geo-related headers
  const geoHeaders = {
    'cf-ipcountry': headersList.get('cf-ipcountry'),
    'x-vercel-ip-country': headersList.get('x-vercel-ip-country'),
    'x-forwarded-for': headersList.get('x-forwarded-for'),
    'x-real-ip': headersList.get('x-real-ip'),
    'cloudfront-viewer-country': headersList.get('cloudfront-viewer-country'),
    'x-country-code': headersList.get('x-country-code'),
  };

  const allowedCountries = ['FR', 'BE', 'GF', 'GP', 'MQ', 'MF', 'BL'];
  const detectedCountry = geoHeaders['cf-ipcountry'] || geoHeaders['x-vercel-ip-country'] || 'UNKNOWN';
  const isAllowed = allowedCountries.includes(detectedCountry?.toUpperCase() || '');

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">🌍 Geo-Location Diagnostic</h1>
        
        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Current Detection Status</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xl">{isAllowed ? '✅' : '❌'}</span>
              <div>
                <p className="font-semibold">Detected Country: <span className="text-purple-400">{detectedCountry || 'NONE'}</span></p>
                <p className="text-sm text-gray-400">
                  {isAllowed ? 'You have access to the site' : 'You would be blocked from accessing the site'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Geo Headers Received</h2>
          <div className="space-y-2 font-mono text-sm">
            {Object.entries(geoHeaders).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-purple-400">{key}:</span>
                <span className="text-green-400">{value || 'null'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Allowed Countries</h2>
          <div className="flex flex-wrap gap-3">
            {allowedCountries.map(country => (
              <div key={country} className="bg-purple-900 px-4 py-2 rounded-full">
                {country}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-900 border-l-4 border-yellow-500 p-6 rounded">
          <h3 className="text-xl font-bold mb-3">🧪 Testing Instructions</h3>
          <div className="space-y-2 text-sm">
            <p>1. To test blocking, add <code className="bg-black px-2 py-1 rounded">?test_country=US</code> to any URL</p>
            <p>2. Example: <code className="bg-black px-2 py-1 rounded">https://officieliptvsmarterspro.fr/?test_country=US</code></p>
            <p>3. Use a VPN to test from different countries</p>
            <p>4. Check this page from different locations to verify detection</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a href="/abonnement-iptv/" className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition">
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
}
