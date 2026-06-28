import { Suspense, lazy, useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Formulario} from '../components/Formulario';
import { Footer } from '../components/Footer';
import { GlobalEffects } from '../components/GlobalEffects';

const SnowBackground = lazy(() =>
  import('../components/SnowBackground').then((module) => ({ default: module.SnowBackground }))
);

type WindowWithIdleCallback = typeof window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function HomePage() {
  const [mostrarFundoAnimado, setMostrarFundoAnimado] = useState(false);

  useEffect(() => {
    const browserWindow = window as WindowWithIdleCallback;

    if (browserWindow.requestIdleCallback) {
      const idleId = browserWindow.requestIdleCallback(() => setMostrarFundoAnimado(true), { timeout: 900 });
      return () => browserWindow.cancelIdleCallback?.(idleId);
    }

    const timeoutId = window.setTimeout(() => setMostrarFundoAnimado(true), 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative isolate min-h-screen overflow-x-hidden bg-slate-50">
      {mostrarFundoAnimado ? (
        <Suspense fallback={null}>
          <SnowBackground />
        </Suspense>
      ) : null}
      <div className="relative z-10">
        <GlobalEffects />
        <Navbar />
        <Formulario />
        <Footer />
      </div>
    </div>
  );
}
