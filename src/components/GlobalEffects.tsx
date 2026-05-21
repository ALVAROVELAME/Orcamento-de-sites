export function GlobalEffects() {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes soft-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes shine-effect { 0% { left: -100%; } 20% { left: 125%; } 100% { left: 125%; } }
      
      .animate-soft-float { animation: soft-float 4s infinite ease-in-out; }
      .btn-shine-container { position: relative; overflow: hidden; }
      .btn-shine-container::after { 
        content: ''; position: absolute; top: -50%; height: 200%; width: 50px; 
        background: rgba(255, 255, 255, 0.3); transform: rotate(30deg); 
        left: -100%; animation: shine-effect 4s infinite ease-in-out; 
      }
      .no-select { -webkit-user-drag: none; user-select: none; -webkit-tap-highlight-color: transparent; }
    `}} />
  );
}