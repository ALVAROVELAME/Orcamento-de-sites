import { Navbar } from '../components/Navbar';
import { Formulario} from '../components/Formulario';
import { Footer } from '../components/Footer';
import { GlobalEffects } from '../components/GlobalEffects';

export function HomePage() {
  return (
    <>
      <GlobalEffects />
      <Navbar />
      <Formulario />
      <Footer />
    </>
  );
}
