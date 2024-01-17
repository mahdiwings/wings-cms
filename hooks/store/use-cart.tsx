import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item._id === data._id);
    
    if (existingItem) {
      return toast('محصول در سبد موجود است');
    }

    set({ items: [...get().items, data] });
    toast.success('محصول به سبد اضافه شد');
  },
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item._id !== id)] });
    toast.success('محصول از سبد حذف شد');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'cart-storage',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;