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

interface FormData {
  title: string;
  description: string;
  price: number | '';
  image: string;
  category: string;
}

const initialFormState: FormData = {
  title: '',
  description: '',
  price: '',
  image: '',
  category: '',
};

export function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useBscentData();
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Manipula o upload de arquivo local de imagem (converte para Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Preenche o formulário para edição
  const handleStartEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  // Cancela a edição e limpa os campos
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  // Submissão do formulário (Criar ou Atualizar)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.image) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }

    const productPayload = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      image: formData.image,
      category: formData.category || 'Geral',
    };

    if (editingId) {
      updateProduct(editingId, productPayload);
      setEditingId(null);
    } else {
      addProduct(productPayload);
    }

    setFormData(initialFormState);
  };

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <h1 className="text-3xl font-bold tracking-tight">Painel do Administrador</h1>

      {/* Formulário de Cadastro / Edição */}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Título *</label>
                <Input
                  type="text"
                  placeholder="Nome do produto"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Input
                  type="text"
                  placeholder="Ex: Velas, Home Spray"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preço (R$) *</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : '' })
                  }
                />
              </div>

              {/* Seção da Imagem: URL ou File Upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Imagem do Produto *</label>
                <Input
                  type="text"
                  placeholder="URL da imagem (http://...)"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                <div className="flex items-center gap-2 pt-1">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 border">
                    <Upload className="w-3.5 h-3.5" />
                    Enviar do computador
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descrição</label>
              <Textarea
                placeholder="Descrição detalhada do produto"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            {/* Pré-visualização da Imagem */}
            {formData.image && (
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Pré-visualização:</span>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md border"
                />
              </div>
            )}

            <Button type="submit" className="w-full md:w-auto">
              {editingId ? (
                <>
                  <Pencil className="w-4 h-4 mr-2" /> Salvar Alterações
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" /> Cadastrar Produto
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Tabela de Produtos Cadastrados */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Cadastrados ({products.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between py-4 gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div>
                    <h3 className="font-semibold">{product.title}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="text-sm font-bold text-primary">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartEdit(product)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Excluir
                  </Button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <p className="text-center py-6 text-muted-foreground">
                Nenhum produto cadastrado no momento.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}