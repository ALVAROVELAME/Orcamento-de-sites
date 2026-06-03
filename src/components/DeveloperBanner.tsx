interface DeveloperBannerProps {
  whatsappLink: string;
}

export function DeveloperBanner({ whatsappLink }: DeveloperBannerProps) {
  return (
    <div className="fixed top-20 w-full z-40 bg-gradient-to-r from-red-700 via-red-600 to-orange-600 text-white py-3 px-4 text-center text-xs md:text-sm font-semibold shadow-md animate-pulse">
      🍔 Quer aumentar suas vendas? Tenha este site profissional de alta conversão para sua hamburgueria. 
      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer"
        className="underline ml-2 hover:text-yellow-200 transition-all font-bold"
      >
        Fale com Álvaro Velame
      </a>
    </div>
  );
}