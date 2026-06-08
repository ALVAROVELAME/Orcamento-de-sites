export function GlobalEffects() {
  return (
    <style>
      {`
        /* Otimização: Usando will-change para avisar a GPU que haverá movimento */
        @keyframes soft-float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-6px); } 
        }

        @keyframes shine-effect { 
          0% { transform: translateX(-105%) rotate(30deg); } 
          20%, 100% { transform: translateX(205%) rotate(30deg); } 
        }
        
        .animate-soft-float { 
          animation: soft-float 4s infinite ease-in-out; 
          will-change: transform; 
        }

        .btn-shine-container { 
          position: relative; 
          overflow: hidden; 
          /* Proteção extra para o botão nunca quebrar ou estourar o layout */
          max-width: 100%;
          isolation: isolate; 
        }

        .btn-shine-container::after { 
          content: ''; 
          position: absolute; 
          top: -50%; 
          height: 200%; 
          width: 50px; 
          background: rgba(255, 255, 255, 0.3); 
          left: 0; 
          animation: shine-effect 4s infinite ease-in-out; 
          will-change: transform;
          /* Garante que o efeito de brilho não crie clique fantasma fora do botão */
          pointer-events: none;
        }

        .no-select { 
          -webkit-user-drag: none; 
          user-select: none; 
          -webkit-tap-highlight-color: transparent; 
        }
      `}
    </style>
  );
}