import { Navbar } from '../components/Navbar';
import { CtaBanner } from '../components/CtaBanner';
import { FormularioPersonalizacao } from '../components/FormularioPersonalizacao';
import { Footer } from '../components/Footer';
import { GlobalEffects } from '../components/GlobalEffects';

export function HomePage() {
  return (
    <>
      <GlobalEffects />
      <Navbar />
      <CtaBanner />
      <FormularioPersonalizacao />
      <Footer />
    </>
  );
}
