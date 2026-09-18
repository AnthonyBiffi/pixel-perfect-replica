import React, { useState, useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBscentData } from '@/hooks/useBscentData';

export const Route = createFileRoute('/admin')({
  head: () => ({
    meta: [
      { title: 'Bscent — Painel Administrativo' },
      { name: 'robots', content: 'noindex, nofollow' },
    ],
  }),
  component: AdminPage,
});

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const { products, aromas, refetch } = useBscentData();

  // Estados dos formulários
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Velas');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodDesc, setProdDesc] = useState('');

  const [aromaTitle, setAromaTitle] = useState('');
  const [aromaDesc, setAromaDesc] = useState('');
  const [topNotes, setTopNotes] = useState('');
  const [heartNotes, setHeartNotes] = useState('');
  const [baseNotes, setBaseNotes] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([
      {
        name: prodName,
        category: prodCategory,
        price: parseFloat(prodPrice.replace(',', '.')),
        image_url: prodImage,
        description: prodDesc,
        available: true,
      },
    ]);
    if (!error) {
      setProdName('');
      setProdPrice('');
      setProdImage('');
      setProdDesc('');
      refetch();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    await supabase.from('products').delete().eq('id', id);
    refetch();
  };

  const handleAddAroma = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('aromas').insert([
      {
        title: aromaTitle,
        description: aromaDesc,
        top_notes: topNotes,
        heart_notes: heartNotes,
        base_notes: baseNotes,
      },
    ]);
    if (!error) {
      setAromaTitle('');
      setAromaDesc('');
      setTopNotes('');
      setHeartNotes('');
      setBaseNotes('');
      refetch();
    }
  };

  const handleDeleteAroma = async (id: string) => {
    await supabase.from('aromas').delete().eq('id', id);
    refetch();
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] p-4 font-sans">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-stone-200 w-full max-w-md">
          <h1 className="text-2xl font-serif text-stone-800 mb-2 text-center">Bscent Admin</h1>
          <p className="text-xs text-stone-500 text-center mb-6">Acesse o painel para gerenciar o catálogo</p>
          
          {authError && <div className="text-red-500 text-xs mb-4 text-center">{authError}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">E-mail</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="text-xs font-medium text-stone-600 block mb-1">Senha</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full bg-stone-900 text-white hover:bg-stone-800">
              Entrar
            </Button>
          </form>

          <div className="mt-5 text-center">
            <Link to="/" className="text-xs text-stone-500 hover:text-stone-800 transition-colors">
              ← Voltar para a loja
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] p-6 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex justify-between items-center border-b border-stone-200 pb-4">
          <div>
            <h1 className="text-3xl font-serif text-stone-800">Painel Bscent</h1>
            <p className="text-xs text-stone-500">Gestão de produtos e aromas</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-medium text-stone-600 hover:text-stone-900 border border-stone-300 rounded-md px-3 py-2 transition-colors"
            >
              ← Ver Loja
            </Link>
            <Button variant="outline" onClick={() => supabase.auth.signOut()}>
              Sair
            </Button>
          </div>
        </div>

        {/* Cadastro de Produtos */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-xl font-serif text-stone-800">Adicionar Novo Produto</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Nome do Produto" value={prodName} onChange={(e) => setProdName(e.target.value)} required />
            <select
              className="border border-stone-300 rounded-md p-2 text-sm bg-white"
              value={prodCategory}
              onChange={(e) => setProdCategory(e.target.value)}
            >
              <option value="Velas">Velas</option>
              <option value="Wax Melts">Wax Melts</option>
              <option value="Squishy Melts">Squishy Melts</option>
              <option value="Home Sprays">Home Sprays</option>
              <option value="Águas de Lençol">Águas de Lençol</option>
              <option value="Difusores">Difusores</option>
              <option value="Aromatizadores para Carro">Aromatizadores para Carro</option>
              <option value="Kits">Kits</option>
              <option value="Personalizados">Personalizados</option>
            </select>
            <Input placeholder="Preço (ex: 89.90)" value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} />
            <Input placeholder="URL da Imagem" value={prodImage} onChange={(e) => setProdImage(e.target.value)} />
            <div className="md:col-span-2">
              <Textarea placeholder="Descrição do produto" value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" className="bg-stone-900 text-white">Cadastrar Produto</Button>
            </div>
          </form>
        </div>

        {/* Lista de Produtos */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
          <h2 className="text-xl font-serif text-stone-800 mb-4">Produtos Cadastrados ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="border border-stone-200 p-4 rounded-md space-y-2 flex flex-col justify-between">
                <div>
                  <p className="font-serif font-bold text-stone-800">{p.name}</p>
                  <p className="text-xs text-stone-500">{p.category} - {p.price || 'Sem preço'}</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(p.id)}>
                  Remover
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Cadastro de Aromas */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm space-y-4">
          <h2 className="text-xl font-serif text-stone-800">Adicionar Novo Aroma</h2>
          <form onSubmit={handleAddAroma} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Título do Aroma" value={aromaTitle} onChange={(e) => setAromaTitle(e.target.value)} required />
            <Input placeholder="Notas de Saída" value={topNotes} onChange={(e) => setTopNotes(e.target.value)} />
            <Input placeholder="Notas de Corpo" value={heartNotes} onChange={(e) => setHeartNotes(e.target.value)} />
            <Input placeholder="Notas de Fundo" value={baseNotes} onChange={(e) => setBaseNotes(e.target.value)} />
            <div className="md:col-span-3">
              <Textarea placeholder="Descrição Sensorial" value={aromaDesc} onChange={(e) => setAromaDesc(e.target.value)} required />
            </div>
            <div className="md:col-span-3">
              <Button type="submit" className="bg-stone-900 text-white">Cadastrar Aroma</Button>
            </div>
          </form>
        </div>

        {/* Lista de Aromas */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-sm">
          <h2 className="text-xl font-serif text-stone-800 mb-4">Aromas Cadastrados ({aromas.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aromas.map((a, idx) => (
              <div key={a.id || idx} className="border border-stone-200 p-4 rounded-md space-y-2 flex flex-col justify-between">
                <div>
                  <p className="font-serif font-bold text-stone-800">{a.title || a.name}</p>
                  <p className="text-xs text-stone-600 line-clamp-2">{a.description || a.story}</p>
                </div>
                {a.id && (
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteAroma(a.id!)}>
                    Remover
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}