// pages/index.js
import Head from 'next/head';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <Head>
        <title>ProductSnap - AI Product Image Enhancer</title>
      </Head>
      <div className="min-h-screen flex flex-col">
        {/* 顶部导航 */}
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            ProductSnap
          </Link>
          <div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </header>

        {/* 主体内容 */}
        <main className="flex flex-col items-center justify-center flex-1 text-center px-4 bg-gray-50">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Welcome to <span className="text-blue-600">ProductSnap</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            AI-powered ecommerce product image enhancer. Upload your product images and create stunning visuals that convert.
          </p>
          <Link href="/upload">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </main>

        {/* 页脚 */}
        <footer className="text-center text-sm text-gray-400 py-4">
          © 2025 ProductSnap. All rights reserved.
        </footer>
      </div>
    </>
  );
}
