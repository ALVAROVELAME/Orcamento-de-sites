import { useState, FormEvent } from 'react'; // Corrigido: Importando o FormEvent diretamente
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { AboutUs } from '../components/AboutUs';
import { CardapioSection } from '../components/CardapioSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FloatingWhatsapp } from '../components/FloatingWhatsapp';
import { Footer } from '../components/Footer';
import { DeveloperBanner } from '../components/DeveloperBanner'; 
import { SITE_IMAGES } from '../data/imageConfig';
import { SITE_CONFIG, getWhatsappLink } from '../data/config';

export default function PortfolioPage() {
  const [nome, setNome] = useState('');
  const [itemSelecionado, setItemSelecionado] = useState('');
  const [endereco, setEndereco] = useState('');
  const [pedido, setPedido] = useState('');

  // Corrigido: Tipagem limpa com FormEvent nativo do escopo do React importado acima
  const handleWhatsAppOrder = (e: FormEvent) => {
    e.preventDefault();
    const textoMensagem = `Olá! Meu nome é ${nome}. Gostaria de pedir: ${itemSelecionado}. 
Endereço de entrega: ${endereco}. 
Observações: ${pedido}`;
    
    const url = getWhatsappLink(textoMensagem);
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen">
      {/* 1. Navbar no topo */}
      <Navbar />

      {/* 2. Banner de desenvolvimento logo abaixo da Navbar */}
      <DeveloperBanner 
        whatsappLink={getWhatsappLink("Olá, Álvaro! Gostaria de um site com este modelo premium.")} 
      />

      {/* 3. Restante do conteúdo */}
      <HeroSection />
      <CardapioSection />         
      <AboutUs />
      <TestimonialsSection />

      {/* Formulário + Mapa */}
      <section id="pedido" className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold mb-8">Faça seu Pedido</h2>
            <form onSubmit={handleWhatsAppOrder} className="space-y-6">
              <input 
                type="text" 
                placeholder="Seu Nome" 
                className="w-full p-5 bg-slate-800 border border-slate-700 rounded-2xl" 
                required 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              
              <select 
                className="w-full p-5 bg-slate-800 border border-slate-700 rounded-2xl text-white appearance-none"
                required
                value={itemSelecionado}
                onChange={(e) => setItemSelecionado(e.target.value)}
              >
                <option value="" disabled>Selecione seu item do cardápio</option>
                {SITE_IMAGES.categories.map((cat, idx) => (
                  <option key={idx} value={cat.alt}>{cat.alt}</option>
                ))}
              </select>

              <input 
                type="text" 
                placeholder="Endereço de Entrega (Rua, Número, Bairro)" 
                className="w-full p-5 bg-slate-800 border border-slate-700 rounded-2xl" 
                required 
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />

              <textarea 
                placeholder="Alguma observação no pedido?" 
                rows={5} 
                className="w-full p-5 bg-slate-800 border border-slate-700 rounded-2xl" 
                value={pedido}
                onChange={(e) => setPedido(e.target.value)}
              ></textarea>
              
              <button type="submit" className="w-full bg-red-600 py-6 rounded-2xl font-bold text-xl hover:bg-red-700 transition-all">
                ENVIAR PEDIDO 📲
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-2">Nossa Localização</h3>
            <p className="text-slate-400 mb-6">{SITE_CONFIG.contact.address}</p>
            <div className="w-full h-[480px] rounded-2xl overflow-hidden border border-slate-700">
              <iframe 
                title="Localização Shopping Barra"
                src={SITE_CONFIG.contact.mapLink}
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}