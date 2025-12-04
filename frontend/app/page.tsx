"use client";
import { useState } from 'react';

export default function Home() {
  // estado para armazenar os inputs 
  const [formData, setFormData] = useState({
    area: '',
    quartos: '',
    banheiros: '',
    idade: '',
    distancia: ''
  });

  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResultado(null);

    try {
      // conexão com a API Flask criada na Parte B 
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResultado(data.preco_estimado);
      } else {
        alert('Erro ao calcular: ' + data.error);
      }
    } catch (error) {
      alert('Erro de conexão com a API.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Predição de Imóveis
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Área (m²)</label>
            <input type="number" name="area" required onChange={handleChange}
              className="mt-1 block text-gray-600 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border" placeholder="Ex: 120" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quartos</label>
              <input type="number" name="quartos" required onChange={handleChange}
                className="mt-1 block text-gray-600 w-full rounded-md border p-2" placeholder="Ex: 3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Banheiros</label>
              <input type="number" name="banheiros" required onChange={handleChange}
                className="mt-1 block text-gray-600 w-full rounded-md border p-2" placeholder="Ex: 2" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Idade (anos)</label>
              <input type="number" name="idade" required onChange={handleChange}
                className="mt-1 block text-gray-600 w-full rounded-md border p-2" placeholder="Ex: 5" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Dist. Centro (km)</label>
              <input type="number" name="distancia" required step="0.1" onChange={handleChange}
                className="mt-1 block text-gray-600 w-full rounded-md border p-2" placeholder="Ex: 4.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200 font-medium"
          >
            {loading ? 'Calculando...' : 'Estimar Preço'}
          </button>
        </form>

        {/* Exibição do Resultado - colocar no slide */}
        {resultado && (
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200 text-center animate-fade-in">
            <p className="text-sm text-green-600 font-medium">Valor Estimado</p>
            <p className="text-3xl font-bold text-green-700">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(resultado)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}