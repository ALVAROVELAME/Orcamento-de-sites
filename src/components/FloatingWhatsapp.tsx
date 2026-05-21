interface FloatingWhatsappProps {
  phone?: string;
}

export function FloatingWhatsapp({ phone = "557598825022" }: FloatingWhatsappProps) {
  const whatsappLink = `https://wa.me/${phone}`;

  return (
    <>
      <style>{`
        @keyframes custom-pulse { 
          0%, 100% { transform: scale(1); box-shadow: 0 10px 25px -5px rgba(37, 211, 102, 0.4); } 
          50% { transform: scale(1.08); box-shadow: 0 20px 30px -5px rgba(37, 211, 102, 0.6); } 
        }
        .animate-wpp-float { animation: custom-pulse 2s infinite ease-in-out; }
      `}</style>

      <a 
        href={whatsappLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl animate-wpp-float hover:scale-110 transition-transform duration-300"
        aria-label="Falar no WhatsApp"
      >
        {/* Ícone padrão do WhatsApp */}
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 2c-5.523 0-10 4.477-10 10 0 1.76.46 3.48 1.34 4.99l-1.34 4.88 4.98-1.31c1.47.8 3.16 1.23 4.89 1.23 5.52 0 10-4.48 10-10s-4.48-10-10-10zm0 18c-1.55 0-3.04-.4-4.36-1.15l-.31-.18-3.13.82.83-3.04-.18-.31c-.75-1.32-1.15-2.82-1.15-4.37 0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.45-5.96c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.44-1.34-1.68-.14-.24-.02-.36.1-.48.12-.12.24-.32.36-.48.12-.16.16-.28.24-.46.08-.18.04-.34-.02-.48-.06-.14-.54-1.32-.74-1.82-.2-.48-.4-.42-.54-.42-.14 0-.3 0-.46 0-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.3 1.02 2.5c.16.2 2.22 3.39 5.38 4.76 2.52 1.08 2.52.72 2.98.68.46-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z"/>
        </svg>
      </a>
    </>
  );
}