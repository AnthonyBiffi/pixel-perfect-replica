import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vela Aromática',
    description: 'Vela artesanal com essências naturais.',
    price: 49.9,
    image: '/src/assets/p-vela.jpg',
    category: 'Velas',
  },
  {
    id: '2',
    title: 'Home Spray',
    description: 'Aromatizador de ambientes de alta fixação.',
    price: 39.9,
    image: '/src/assets/p-homespray.jpg',
    category: 'Sprays',
  },
];

export function useBscentData() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('bscent_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('bscent_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString(),
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedData: Omit<Product, 'id'>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...updatedData, id } : item))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}