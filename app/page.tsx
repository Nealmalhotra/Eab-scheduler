import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Interview Scheduler
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Non-Technical Interview */}
          <Link
            href="/book/non-technical"
            className="bg-white border-2 border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold">
                Non-Technical Interview
              </h3>
            </div>
          </Link>

          {/* Technical Interview */}
          <Link
            href="/book/tech-software"
            className="bg-white border-2 border-black p-8 hover:bg-black hover:text-white transition-colors"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold">
                Technical Interview
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
