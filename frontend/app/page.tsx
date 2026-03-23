"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });

// Type for history
type PredictionResult = {
  id: string;
  data: {
    area: string;
    quartos: string;
    banheiros: string;
    idade: string;
    distancia: string;
  };
  preco_estimado: number;
};

export default function Home() {
  const [formData, setFormData] = useState({
    area: '',
    quartos: '',
    banheiros: '',
    idade: '',
    distancia: ''
  });

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<PredictionResult[]>([]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://projeto-imoveis-t5xu.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        const newResult: PredictionResult = {
          id: Date.now().toString(),
          data: { ...formData },
          preco_estimado: data.preco_estimado
        };
        setHistory((prev) => [newResult, ...prev]);
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
    <div className={`min-h-screen bg-[#F5F5F3] ${inter.className} text-[#3B2D27]`}>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Content */}
          <div className="space-y-6">
            <h1 className={`${inter.className} text-4xl md:text-[5rem] font-bold leading-[1.1] text-[#2B1B12]`}>
              Predição de<br />
              Imóveis
            </h1>
            <p className="text-md md:text-xl text-[#2B1B12]/80 max-w-lg leading-relaxed font-semibold">
              Este projeto é um portfólio demonstrando a integração de uma interface moderna com Machine Learning. Um banco de dados simulado em Python foi utilizado para treinar um modelo de <strong>Regressão Linear</strong> para predição de preços de imóveis.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center">
            <Image
              src="/house1.png"
              alt="Modern House"
              fill
              className="object-contain z-10 mix-blend-multiply drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              priority
            />
          </div>
        </div>
      </main>

      {/* Floating Form Section */}
      <div className="max-w-6xl mx-auto px-6 relative z-20 -mt-36 mb-24">
        <div className="bg-[#DABCA8] rounded-[2rem] p-4 md:p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-4 items-end justify-between">

            <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-3 w-full">

              {/* Field 1: Area */}
              <div className="flex flex-col w-full">
                <label className="text-[11px] font-bold text-[#2B1B12]/80 uppercase tracking-wider mb-1.5 ml-1">Área (m²)</label>
                <div className="bg-[#FDFCF8] flex items-center px-4 py-3.5 rounded-2xl w-full shadow-sm">
                  <svg className="w-5 h-5 text-[#3B2D27]/80 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                  <input type="number" name="area" required onChange={handleChange} value={formData.area}
                    className="bg-transparent w-full outline-none text-sm text-[#2B1B12] placeholder:text-[#2B1B12]/40 font-semibold" placeholder="Ex: 120" />
                </div>
              </div>

              {/* Field 2: Quartos */}
              <div className="flex flex-col w-full">
                <label className="text-[11px] font-bold text-[#2B1B12]/80 uppercase tracking-wider mb-1.5 ml-1">Quartos</label>
                <div className="bg-[#FDFCF8] flex items-center px-4 py-3.5 rounded-2xl w-full shadow-sm">
                  <input type="number" name="quartos" required onChange={handleChange} value={formData.quartos}
                    className="bg-transparent w-full outline-none text-sm text-[#2B1B12] placeholder:text-[#2B1B12]/40 font-semibold" placeholder="Ex: 3" />
                </div>
              </div>

              {/* Field 3: Banheiros */}
              <div className="flex flex-col w-full">
                <label className="text-[11px] font-bold text-[#2B1B12]/80 uppercase tracking-wider mb-1.5 ml-1">Banheiros</label>
                <div className="bg-[#FDFCF8] flex items-center px-4 py-3.5 rounded-2xl w-full shadow-sm">
                  <input type="number" name="banheiros" required onChange={handleChange} value={formData.banheiros}
                    className="bg-transparent w-full outline-none text-sm text-[#2B1B12] placeholder:text-[#2B1B12]/40 font-semibold" placeholder="Ex: 2" />
                </div>
              </div>

              {/* Field 4: Idade */}
              <div className="flex flex-col w-full">
                <label className="text-[11px] font-bold text-[#2B1B12]/80 uppercase tracking-wider mb-1.5 ml-1">Idade (anos)</label>
                <div className="bg-[#FDFCF8] flex items-center px-4 py-3.5 rounded-2xl w-full shadow-sm">
                  <input type="number" name="idade" required onChange={handleChange} value={formData.idade}
                    className="bg-transparent w-full outline-none text-sm text-[#2B1B12] placeholder:text-[#2B1B12]/40 font-semibold" placeholder="Ex: 5" />
                </div>
              </div>

              {/* Field 5: Distância */}
              <div className="flex flex-col w-full">
                <label className="text-[11px] font-bold text-[#2B1B12]/80 uppercase tracking-wider mb-1.5 ml-1">Distância (km)</label>
                <div className="bg-[#FDFCF8] flex items-center px-4 py-3.5 rounded-2xl w-full shadow-sm">
                  <input type="number" name="distancia" required step="0.1" onChange={handleChange} value={formData.distancia}
                    className="bg-transparent w-full outline-none text-sm text-[#2B1B12] placeholder:text-[#2B1B12]/40 font-semibold" placeholder="Ex: 10" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2B1B12] text-white px-8 py-3.5 w-full lg:w-auto min-w-[160px] rounded-2xl font-bold tracking-wide hover:bg-[#1A100B] transition-colors focus:ring-4 focus:ring-[#2B1B12]/20 disabled:opacity-70 shadow-md flex-shrink-0"
            >
              {loading ? 'Calculando...' : 'Estimar'}
            </button>
          </form>
        </div>
      </div>

      {/* History Table */}
      {history.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            {/* Delicate decorative background circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F5F5F3] rounded-full blur-3xl z-0"></div>

            <div className="relative z-10">
              <h2 className={`${playfair.className} text-3xl font-bold mb-8 text-[#2B1B12] flex items-center`}>
                <svg className="w-8 h-8 mr-3 text-[#DABCA8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Histórico de Previsões
              </h2>

              <div className="w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-[#F5F5F3] text-[#2B1B12]/60 text-xs uppercase tracking-widest">
                      <th className="pb-4 font-bold">Área</th>
                      <th className="pb-4 font-bold">Quartos</th>
                      <th className="pb-4 font-bold">Banheiros</th>
                      <th className="pb-4 font-bold">Idade</th>
                      <th className="pb-4 font-bold">Distância</th>
                      <th className="pb-4 font-bold text-right">Valor Estimado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((item) => (
                      <tr key={item.id} className="border-b border-[#F5F5F3] last:border-0 hover:bg-[#FDFCF8] transition-colors group">
                        <td className="py-5 text-[#2B1B12] font-semibold">{item.data.area} m²</td>
                        <td className="py-5 text-[#2B1B12] font-semibold">{item.data.quartos}</td>
                        <td className="py-5 text-[#2B1B12] font-semibold">{item.data.banheiros}</td>
                        <td className="py-5 text-[#2B1B12] font-semibold">{item.data.idade} anos</td>
                        <td className="py-5 text-[#2B1B12] font-semibold">{item.data.distancia} km</td>
                        <td className="py-5 font-bold text-[#2B1B12] text-right text-xl group-hover:scale-105 transition-transform origin-right">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco_estimado)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
