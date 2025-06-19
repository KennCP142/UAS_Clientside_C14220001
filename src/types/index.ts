export interface User {
  id: number;
  username: string;
  password: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: number;
  nama_produk: string;
  harga_satuan: number;
  quantity: number;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}