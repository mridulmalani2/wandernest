import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to WanderNest
        </h1>
        <p className="text-center mb-8">
          Student-led tourism platform connecting travelers with local students
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/safety-guidelines"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Safety Guidelines
          </Link>
        </div>
      </div>
    </main>
  )
}
