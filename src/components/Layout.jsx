import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

/**
 * Layout global: envuelve todas las páginas con Navbar y Footer.
 * <Outlet /> renderiza la página activa según la ruta.
 */
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
