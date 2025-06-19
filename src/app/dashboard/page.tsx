'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Navigation from '@/components/Navigation';
import ProductTable from '@/components/ProductTable';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {user?.role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome, <span className="font-semibold">{user?.username}</span>
              </p>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg mb-8">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Dashboard Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800">Role</h4>
                    <p className="text-2xl font-bold text-blue-900 capitalize">{user?.role}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800">Status</h4>
                    <p className="text-2xl font-bold text-green-900">Active</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-800">Access Level</h4>
                    <p className="text-2xl font-bold text-purple-900">
                      {user?.role === 'admin' ? 'Full' : 'Read Only'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <ProductTable />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}