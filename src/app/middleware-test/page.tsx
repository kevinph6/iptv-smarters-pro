export default function MiddlewareTest() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Middleware Test Page</h1>
        
        <div className="space-y-4">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Test Links:</h2>
            
            <div className="space-y-2">
              <a 
                href="/?restricted=true" 
                className="block text-cyan-400 hover:text-cyan-300 underline"
              >
                Test Restricted Page (Query Parameter)
              </a>
              
              <a 
                href="/?test_country=US" 
                className="block text-red-400 hover:text-red-300 underline"
              >
                Test Blocked Country (US)
              </a>
              
              <a 
                href="/?test_country=FR" 
                className="block text-green-400 hover:text-green-300 underline"
              >
                Test Allowed Country (France)
              </a>
              
              <a 
                href="/?test_country=MA" 
                className="block text-orange-400 hover:text-orange-300 underline"
              >
                Test Blocked Country (Morocco)
              </a>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Setup Instructions:</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-purple-400 mb-2">1. Vercel Domain Setup:</h3>
                <ol className="list-decimal list-inside space-y-1 ml-4">
                  <li>Go to your Vercel project dashboard</li>
                  <li>Click "Settings" → "Domains"</li>
                  <li>Add domain: <code className="bg-gray-700 px-2 py-1 rounded">restricted.abonnement-iptv-smarterspro.fr</code></li>
                  <li>Follow Vercel's verification steps</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400 mb-2">2. DNS Configuration:</h3>
                <p className="mb-2">Add a CNAME record in your domain registrar:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li><strong>Type:</strong> CNAME</li>
                  <li><strong>Name:</strong> restricted</li>
                  <li><strong>Target:</strong> cname.vercel-dns.com</li>
                  <li><strong>TTL:</strong> 3600 (or Auto)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-purple-400 mb-2">3. Wait for DNS Propagation:</h3>
                <p>Usually takes 5-60 minutes. Check status at:</p>
                <a 
                  href="https://dnschecker.org" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  https://dnschecker.org
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Current Status:</h2>
            <p className="text-yellow-400">
              ⚠️ The restricted subdomain is NOT yet configured in your DNS/hosting.
              Use the query parameter tests above until DNS is set up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
