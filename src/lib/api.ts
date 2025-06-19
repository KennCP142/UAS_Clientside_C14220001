import axios from 'axios';
import { User, Product } from '@/types';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: async (username: string, password: string): Promise<User | null> => {
    try {
      const response = await api.get('/users', {
        params: { username, password }
      });
      return response.data[0] || null;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }
};

export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Get products error:', error);
      return [];
    }
  },

  create: async (product: Omit<Product, 'id'>): Promise<Product | null> => {
    try {
      const response = await api.post('/products', product);
      return response.data;
    } catch (error) {
      console.error('Create product error:', error);
      return null;
    }
  },

  update: async (id: number, product: Partial<Product>): Promise<Product | null> => {
    try {
      const response = await api.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      console.error('Update product error:', error);
      return null;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/products/${id}`);
      return true;
    } catch (error) {
      console.error('Delete product error:', error);
      return false;
    }
  }
};