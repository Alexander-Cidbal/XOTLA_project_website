import { Link, useLocation } from 'react-router-dom';
import { useLang, T } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
    { path: '/details', labelEn: 'Showcase', labelEs: 'Muestra' },
    { path: '/downloads', labelEn: 'Downloads', labelEs: 'Descargas' },
    { path: '/flashing', labelEn: 'Flasher', labelEs: 'Flasher' },
  ];

  const communityLinks = [
    { href: '/tutorials', labelEn: 'Tutorials', labelEs: 'Tutoriales', internal: true },
    { href: 'https://github.com/Alexander-Cidbal/RZK-Flame-Spark-Bloom', labelEn: 'GitHub', labelEs: 'GitHub', internal: false },
    { href: 'https://discord.gg/2Ecx7sF5', labelEn: 'Discord', labelEs: 'Discord', internal: false },
  ];

  return (
    <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50">
      {/* ── Navbar Start ── */}
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={-1} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks.map(link => (
              <li key={link.path}>
                <Link to={link.path} className={isActive(link.path) ? 'active' : ''}>
                  <T en={link.labelEn} es={link.labelEs} />
                </Link>
              </li>
            ))}
            <li>
              <a><T en="Community" es="Comunidad" /></a>
              <ul className="p-2">
                {communityLinks.map(link => (
                  <li key={link.href}>
                    {link.internal
                      ? <Link to={link.href}><T en={link.labelEn} es={link.labelEs} /></Link>
                      : <a href={link.href} target="_blank" rel="noopener noreferrer"><T en={link.labelEn} es={link.labelEs} /></a>
                    }
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link className="btn btn-ghost text-xl" to="/">XOTLA</Link>

        {/* Language toggle */}
        <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-23 border p-1">
          <label className="label cursor-pointer">
            <input
              id="lang-toggle"
              type="checkbox"
              className="toggle border-indigo-600 bg-indigo-500 checked:border-red-500 checked:bg-red-400 checked:text-red-800"
              checked={lang === 'es'}
              onChange={toggleLang}
            />
            <span className="ml-1 font-bold">{lang === 'en' ? 'EN' : 'ES'}</span>
          </label>
        </fieldset>
      </div>

      {/* ── Navbar Center (desktop) ── */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks.map(link => (
            <li key={link.path}>
              <Link to={link.path} className={isActive(link.path) ? 'active' : ''}>
                <T en={link.labelEn} es={link.labelEs} />
              </Link>
            </li>
          ))}
          <li>
            <details>
              <summary><T en="Community" es="Comunidad" /></summary>
              <ul className="p-2 bg-base-100 w-40 z-1">
                {communityLinks.map(link => (
                  <li key={link.href}>
                    {link.internal
                      ? <Link to={link.href}><T en={link.labelEn} es={link.labelEs} /></Link>
                      : <a href={link.href} target="_blank" rel="noopener noreferrer"><T en={link.labelEn} es={link.labelEs} /></a>
                    }
                  </li>
                ))}
              </ul>
            </details>
          </li>
        </ul>
      </div>

      {/* ── Navbar End ── */}
      <div className="navbar-end">
        <Link to="/tutorials" className="buttonglow">
          <T en="Get Started" es="Comenzar" />
        </Link>
      </div>
    </div>
  );
}
