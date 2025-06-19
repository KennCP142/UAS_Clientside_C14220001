'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import ProductTable from '@/components/ProductTable';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
        <Navigation />
        
        <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Welcome Header */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                      Welcome, <span className="font-semibold text-orange-600">{user?.username}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Table */}
            <ProductTable />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}