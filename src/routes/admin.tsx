import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useBscentData, Product } from '@/hooks/useBscentData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Pencil, Trash2, Upload, Plus, X } from 'lucide-react';

export const Route = createFileRoute('/admin')({
  component: AdminPage,
});

interface ProductFormData {
  title: string;
  description: string;
  price: number | '';
  image: string;
  category: string;
}

const initialProductState: ProductFormData = {
  title: '',
  description: '',
  price: '',
  image: '',
  category: '',
};

const initialAromaState = {
  title: '',
  description: '',
  top: '',
  heart: '',
  base: '',
};

function AdminPage() {
  const { 
    products, addProduct, updateProduct, deleteProduct,
    aromas, addAroma, deleteAroma 
  } = useBscentData();
  
  // Estados para Produtos
  const [productData, setProductData] = useState<ProductFormData>(initialProductState);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Estados para Aromas
  const [aromaData, setAromaData] = useState(initialAromaState);

  // --- HANDLERS DE PRODUTOS ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setProductData({
      title: product.title || product.name || '',
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setProductData(initialProductState);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!productData.title || !productData.price || !productData.image) {
      alert('Por favor, preencha todos os campos obrigatórios do produto!');
      return;
    }

    const payload = {
      title: productData.title,
      description: productData.description,
      price: Number(productData.price),
      image: productData.image,
      category: productData.category || 'Geral',
    };

    if (editingId) {
      updateProduct(editingId, payload);
      setEditingId(null);
    } else {
      addProduct(payload);
    }

    setProductData(initialProductState);
  };

  // --- HANDLERS DE AROMAS ---
  const handleAromaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aromaData.title) {
      alert('O título do aroma é obrigatório!');
      return;
    }
    addAroma(aromaData);
    setAromaData(initialAromaState);
  };

  return (
    <div className="container mx-auto p-6 space-y-12 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight">Painel do Administrador</h1>

      {/* ================= SEÇÃO DE PRODUTOS ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">Gerenciamento de Produtos</h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{editingId ? 'Editar Produto' : 'Cadastrar Novo Produto'}</span>
              {editingId && (
                <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                  <X className="w-4 h-4 mr-1" /> Cancelar Edição
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Título *</label>
                  <Input
                    value={productData.title}
                    onChange={(e) => setProductData({ ...productData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Categoria</label>
                  <Input
                    value={productData.category}
                    onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Preço (R$) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={productData.price}
                    onChange={(e) =>
                      setProductData({ ...productData, price: e.target.value ? Number(e.target.value) : '' })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Imagem do Produto *</label>
                  <Input
                    placeholder="URL da imagem ou faça upload"
                    value={productData.image}
                    onChange={(e) => setProductData({ ...productData, image: e.target.value })}
                  />
                  <div className="pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 border">
                      <Upload className="w-3.5 h-3.5" />
                      Enviar do computador
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  value={productData.description}
                  onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
              </div>

              {productData.image && (
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground">Pré-visualização:</span>
                  <img src={productData.image} alt="Preview" className="w-24 h-24 object-cover rounded-md border" />
                </div>
              )}

              <Button type="submit">
                {editingId ? <><Pencil className="w-4 h-4 mr-2" /> Salvar Alterações</> : <><Plus className="w-4 h-4 mr-2" /> Cadastrar Produto</>}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Produtos Cadastrados ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between py-4 gap-4">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.title} className="w-16 h-16 object-cover rounded-md border" />
                    <div>
                      <h3 className="font-semibold">{product.title || product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                      <p className="text-sm font-bold text-primary">R$ {Number(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleStartEdit(product)}>
                      <Pencil className="w-4 h-4 mr-1" /> Editar
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                      <Trash2 className="w-4 h-4 mr-1" /> Excluir
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= SEÇÃO DE AROMAS ================= */}
      <div className="space-y-6 pt-8 border-t">
        <h2 className="text-2xl font-semibold border-b pb-2">Gerenciamento de Aromas</h2>

        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Aroma</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAromaSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome do Aroma *</label>
                  <Input
                    placeholder="Ex: Baunilha & Macadâmia"
                    value={aromaData.title}
                    onChange={(e) => setAromaData({ ...aromaData, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notas de Saída</label>
                  <Input
                    value={aromaData.top}
                    onChange={(e) => setAromaData({ ...aromaData, top: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notas de Corpo</label>
                  <Input
                    value={aromaData.heart}
                    onChange={(e) => setAromaData({ ...aromaData, heart: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notas de Fundo</label>
                  <Input
                    value={aromaData.base}
                    onChange={(e) => setAromaData({ ...aromaData, base: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">História / Descrição</label>
                <Textarea
                  placeholder="Conte um pouco sobre este aroma..."
                  value={aromaData.description}
                  onChange={(e) => setAromaData({ ...aromaData, description: e.target.value })}
                />
              </div>
              <Button type="submit">
                <Plus className="w-4 h-4 mr-2" /> Cadastrar Aroma
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aromas Cadastrados ({aromas.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {aromas.map((aroma) => (
                <div key={aroma.id} className="flex items-center justify-between py-4 gap-4">
                  <div>
                    <h3 className="font-semibold">{aroma.title}</h3>
                    <p className="text-sm text-muted-foreground">{aroma.description}</p>
                    <div className="text-xs text-muted-foreground mt-1 space-x-2">
                      {aroma.top && <span><strong>Saída:</strong> {aroma.top}</span>}
                      {aroma.heart && <span><strong>Corpo:</strong> {aroma.heart}</span>}
                      {aroma.base && <span><strong>Fundo:</strong> {aroma.base}</span>}
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => deleteAroma(aroma.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Excluir
                  </Button>
                </div>
              ))}
              {aromas.length === 0 && (
                <p className="text-center py-6 text-muted-foreground">Nenhum aroma cadastrado.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}