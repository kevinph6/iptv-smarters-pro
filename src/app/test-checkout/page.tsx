import Link from 'next/link';

export default function TestCheckoutPage() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mx-auto flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-black text-white mb-2">Test Checkout</h1>
          <p className="text-white/60 mb-1">Product: TEST 3 Mois IPTV</p>
          <p className="text-white/60 mb-1">Package ID: 6 (3 Months)</p>
          <p className="text-white/60 mb-6">Price: <span className="text-green-400 font-bold">$5 USD</span></p>
          
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6 text-left">
            <p className="text-amber-300 text-sm font-bold mb-1">Test Mode</p>
            <p className="text-amber-200/60 text-xs">
              This is a test product. After payment, MegaOTT will create a 3-month IPTV subscription 
              and send credentials to your email. Make sure admin settings are configured first.
            </p>
          </div>

          <Link
            href="/checkout/test-iptv-3-mois"
            className="block w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black text-lg rounded-xl hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all"
          >
            Go to Checkout — $5
          </Link>
          
          <p className="text-white/30 text-xs mt-4">
            Requires: PayGate wallet + MegaOTT config + SMTP in /admin/settings
          </p>
        </div>
      </div>
    </main>
  );
}
