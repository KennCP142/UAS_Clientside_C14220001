'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/signin');
  };

  return (
    <nav className="bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-xl border-b border-orange-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <svg className="h-6 w-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>

            <Link href="/dashboard" className="text-xl font-bold hover:text-orange-100 transition-colors">
              Dashboard
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white shadow-sm rounded-xl px-4 py-2">
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-black">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {user?.role}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 hover:shadow-lg"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Log out</span>
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}