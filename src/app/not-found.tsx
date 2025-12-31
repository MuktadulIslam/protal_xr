"use client";
import Link from 'next/link';
import Lottie from 'lottie-react';
import animationData from '../../public/animations/404.json';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="w-full max-w-sm mx-auto">
          <Lottie
            animationData={animationData}
            loop={true}
            autoplay={true}
          />
        </div>

        <div className="">
          <h2 className="text-3xl font-bold text-gray-800">Page Not Found</h2>
          <p className="text-gray-600 text-lg">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Go Back To Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Back To Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}
