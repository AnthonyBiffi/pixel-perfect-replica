import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name?: string;
  title?: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export interface Aroma {
  id: string;
  title: string;
  description: string;
  top: string;
  heart: string;
  base: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vela Aromática',
    name: 'Vela Aromática',
    description: 'Vela artesanal com essências naturais.',
    price: 49.9,
    image: '/src/assets/p-vela.jpg',
    category: 'Velas',
    isNew: true,
  },
  {
    id: '2',
    title: 'Home Spray',
    name: 'Home Spray',
    description: 'Aromatizador de ambientes de alta fixação.',
    price: 39.9,
    image: '/src/assets/p-homespray.jpg',
    category: 'Sprays',
    isNew: false,
  },
];

const INITIAL_AROMAS: Aroma[] = [
  {
    id: '1',
    title: 'Baunilha & Macadâmia',
    description: 'Um abraço quente em dias frios.',
    top: 'Macadâmia',
    heart: 'Baunilha',
    base: 'Musk',
  },
];

export function useBscentData() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [aromas, setAromas] = useState<Aroma[]>(INITIAL_AROMAS);
  const [loading, setLoading] = useState(true);

  // Lê do localStorage no carregamento inicial
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProducts = localStorage.getItem('bscent_products');
      const savedAromas = localStorage.getItem('bscent_aromas');
      
      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed);
        } catch (e) {}
      }

      if (savedAromas) {
        try {
          const parsed = JSON.parse(savedAromas);
          if (Array.isArray(parsed) && parsed.length > 0) setAromas(parsed);
        } catch (e) {}
      }
      
      setLoading(false);
    }
  }, []);

  // Salva no localStorage quando os dados mudam
  useEffect(() => {
    if (!loading && typeof window !== 'undefined') {
      localStorage.setItem('bscent_products', JSON.stringify(products));
      localStorage.setItem('bscent_aromas', JSON.stringify(aromas));
    }
  }, [products, aromas, loading]);

  // --- FUNÇÕES DE PRODUTOS ---
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      name: newProduct.title,
      id: Date.now().toString(),
    };
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedData: Omit<Product, 'id'>) => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedData, name: updatedData.title } : item
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  // --- FUNÇÕES DE AROMAS ---
  const addAroma = (newAroma: Omit<Aroma, 'id'>) => {
    const aroma: Aroma = { ...newAroma, id: Date.now().toString() };
    setAromas((prev) => [aroma, ...prev]);
  };

  const deleteAroma = (id: string) => {
    setAromas((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    products: products || [],
    aromas: aromas || [],
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addAroma,
    deleteAroma,
  };
}