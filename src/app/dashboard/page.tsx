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

            {/* Dashboard Overview Cards */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                Dashboard Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-orange-800 uppercase tracking-wide">Role</h4>
                      <p className="text-2xl font-bold text-orange-900 capitalize mt-1">{user?.role}</p>
                    </div>
                    <div className="h-12 w-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-green-800 uppercase tracking-wide">Status</h4>
                      <p className="text-2xl font-bold text-green-900 mt-1">Active</p>
                    </div>
                    <div className="h-12 w-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-purple-800 uppercase tracking-wide">Access Level</h4>
                      <p className="text-2xl font-bold text-purple-900 mt-1">
                        {user?.role === 'admin' ? 'Full' : 'Read Only'}
                      </p>
                    </div>
                    <div className="h-12 w-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
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