import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RedirectPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
          <svg
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Product Management Dashboard
        </h1>

        <p className="text-gray-600 mb-6">
          You're being redirected to the product management dashboard where you
          can view, add, edit, and manage all products.
        </p>

        <Link
          href="/dashboard/product"
          className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          Go to Product Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Can't find what you're looking for?{" "}
            <Link href="/support" className="text-blue-600 hover:underline">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
