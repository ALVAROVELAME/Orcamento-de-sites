import { getWhatsappLink } from '../data/config';

export function AboutUs() {
  const whatsappLink = getWhatsappLink("Olá! Quero conhecer mais sobre a hamburgueria.");

  return (
    <section id="sobre" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-red-600 font-bold uppercase tracking-widest">Sobre Nós</span>
          <h2 className="text-4xl font-bold mt-4 mb-6">Comida fresca e deliciosa que você não vai esquecer</h2>
          <p className="text-gray-600 leading-relaxed mb-8">
            Preparamos cada hambúrguer e pizza com paixão. Ingredientes selecionados e sabor autêntico no coração do Shopping Center Lapa.
          </p>
          <a href={whatsappLink} className="bg-red-600 text-white px-8 py-3 rounded-full font-bold">Falar no WhatsApp</a>
        </div>

        {/* Container da imagem com restrição de tamanho e formato quadrado */}
        <div className="relative mx-auto w-full max-w-sm">
          <img 
            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1000&auto=format&fit=crop" 
            alt="Interior da Hamburgueria" 
            className="rounded-2xl shadow-2xl w-full aspect-square object-cover" 
          />
          <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl whitespace-nowrap">
            <p className="font-bold text-red-600 text-sm">⭐ Prêmio de Melhor Hamburgueria</p>
          </div>
        </div>
      </div>
    </section>
  );
}