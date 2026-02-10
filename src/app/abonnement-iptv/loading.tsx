export default function Loading() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation skeleton */}
      <div className="fixed top-0 left-0 right-0 z-50 h-20 bg-black/50 backdrop-blur-sm" />

      {/* Hero skeleton */}
      <div className="relative min-h-screen bg-black pt-36 flex flex-col items-center px-6">
        {/* Badge skeleton */}
        <div className="h-10 w-72 rounded-full bg-white/5 mb-8" />
        {/* Title skeleton */}
        <div className="h-16 w-full max-w-3xl rounded-xl bg-white/5 mb-4" />
        <div className="h-12 w-full max-w-2xl rounded-xl bg-white/5 mb-8" />
        {/* Subtitle skeleton */}
        <div className="h-6 w-full max-w-xl rounded bg-white/5 mb-3" />
        <div className="h-6 w-full max-w-lg rounded bg-white/5 mb-10" />
        {/* CTA buttons skeleton */}
        <div className="flex gap-4 mb-16">
          <div className="h-14 w-52 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20" />
          <div className="h-14 w-40 rounded-2xl bg-white/5" />
        </div>
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl w-full">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 rounded-2xl bg-white/5" />
          ))}
        </div>
      </div>
    </main>
  );
}
