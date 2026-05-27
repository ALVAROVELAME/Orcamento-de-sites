interface DeveloperBannerProps {
  whatsappLink: string;
}

export function DeveloperBanner({ whatsappLink }: DeveloperBannerProps) {
  return (
    <div className="fixed top-20 w-full z-40 bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-3 px-4 text-center text-xs md:text-sm font-semibold shadow-md animate-pulse">
      🚀 Este é um modelo premium de alta conversão para Contabilidade. Quer este site com a sua marca? 
      <a href={whatsappLink} className="underline ml-2 hover:text-slate-100 transition-all font-bold">Fale com Álvaro Velame</a>
    </div>
  );
}