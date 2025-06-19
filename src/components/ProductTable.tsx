'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { productsAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

export default function ProductTable() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    nama_produk: '',
    harga_satuan: 0,
    quantity: 0
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const data = await productsAPI.getAll();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const success = await productsAPI.delete(id);
      if (success) {
        fetchProducts();
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      nama_produk: product.nama_produk,
      harga_satuan: product.harga_satuan,
      quantity: product.quantity
    });
  };

  const handleSave = async () => {
    if (editingProduct) {
      const success = await productsAPI.update(editingProduct.id, formData);
      if (success) {
        setEditingProduct(null);
        fetchProducts();
      }
    } else {
      const success = await productsAPI.create(formData);
      if (success) {
        setShowCreateForm(false);
        setFormData({ nama_produk: '', harga_satuan: 0, quantity: 0 });
        fetchProducts();
      }
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setShowCreateForm(false);
    setFormData({ nama_produk: '', harga_satuan: 0, quantity: 0 });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {user?.role === 'admin' && (
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Add New Product
          </button>
        </div>
      )}

      {(showCreateForm || editingProduct) && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">
            {editingProduct ? 'Edit Product' : 'Create New Product'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={formData.nama_produk}
                onChange={(e) => setFormData({ ...formData, nama_produk: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price
              </label>
              <input
                type="number"
                value={formData.harga_satuan}
                onChange={(e) => setFormData({ ...formData, harga_satuan: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unit Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              {user?.role === 'admin' && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.nama_produk}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(product.harga_satuan)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.quantity}
                </td>
                {user?.role === 'admin' && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}