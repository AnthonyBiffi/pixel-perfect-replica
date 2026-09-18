import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { products as initialProducts, aromas as initialAromas, Product, Aroma } from '@/data/bscent';
import vela from '@/assets/p-vela.jpg';
import difusor from '@/assets/p-difusor.jpg';
import homespray from '@/assets/p-homespray.jpg';
import waxmelts from '@/assets/p-waxmelts.jpg';

function getFallbackImage(category: string): string {
  switch (category) {
    case 'Velas':
      return vela;
    case 'Difusores':
    case 'Aromatizadores para Carro':
      return difusor;
    case 'Home Sprays':
    case 'Águas de Lençol':
      return homespray;
    case 'Wax Melts':
    case 'Squishy Melts':
    case 'Personalizados':
      return waxmelts;
    default:
      return vela;
  }
}

export function useBscentData() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [aromas, setAromas] = useState<Aroma[]>(initialAromas);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = useCallback(async () => {
    try {
      const [productsRes, aromasRes] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('aromas').select('*'),
      ]);

      if (productsRes.data && productsRes.data.length > 0) {
        setProducts(
          productsRes.data.map((p) => {
            const numPrice = typeof p.price === 'number' ? p.price : parseFloat(p.price);
            const formattedPrice = !isNaN(numPrice)
              ? `R$ ${numPrice.toFixed(2).replace('.', ',')}`
              : undefined;

            return {
              id: String(p.id),
              name: p.name,
              category: p.category,
              description: p.description || '',
              price: formattedPrice,
              image: p.image_url && p.image_url.trim() !== '' ? p.image_url : getFallbackImage(p.category),
              featured: p.available ?? true,
              isNew: p.available ?? true,
            };
          }),
        );
      }

      if (aromasRes.data && aromasRes.data.length > 0) {
        setAromas(
          aromasRes.data.map((a) => ({
            id: String(a.id),
            title: a.title || a.name || 'Sem título',
            name: a.title || a.name || 'Sem título',
            description: a.description || a.story || '',
            story: a.description || a.story || '',
            topNotes: a.top_notes || a.top || '',
            top: a.top_notes || a.top || '',
            heartNotes: a.heart_notes || a.heart || '',
            heart: a.heart_notes || a.heart || '',
            baseNotes: a.base_notes || a.base || '',
            base: a.base_notes || a.base || '',
          })),
        );
      }
    } catch (error) {
      console.error('Erro ao carregar dados do Supabase:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Sincronização em tempo real via canais do Supabase
    const channel = supabase
      .channel('bscent-realtime-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
        fetchData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'aromas' }, () => {
        fetchData();
      })
      .subscribe();

    // Atualiza ao voltar o foco para a aba
    const onFocus = () => {
      fetchData();
    };
    window.addEventListener('focus', onFocus);

    return () => {
      window.removeEventListener('focus', onFocus);
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  return { products, aromas, loading, refetch: fetchData };
}