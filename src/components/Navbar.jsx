import { Link, useLocation } from 'react-router-dom';
import React from 'react'; // Add this import
import { useLang, T } from '../context/LanguageContext';

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

const navLinks = [
    { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
    { path: '/details', labelEn: 'Showcase', labelEs: 'Muestra' },
    // Community will now be handled separately for placement consistency
    { path: '/downloads', labelEn: 'Downloads', labelEs: 'Descargas' },
    { path: '/flashing', labelEn: 'Flasher', labelEs: 'Flasher' },
  ];

  const communityLinks = [
    { href: '/tutorials', labelEn: 'Tutorials', labelEs: 'Tutoriales', internal: true },
    { href: 'https://github.com/Alexander-Cidbal/RZK_XOTLA_Beatmachine', labelEn: 'GitHub', labelEs: 'GitHub', internal: false },
    { href: 'https://discord.gg/2Ecx7sF5', labelEn: 'Discord', labelEs: 'Discord', internal: false },
  ];
const mainNavItems = [
    { path: '/', labelEn: 'Home', labelEs: 'Inicio' },
    { path: '/details', labelEn: 'Showcase', labelEs: 'Muestra' },
    { isCommunity: true, communityLinks: communityLinks, labelEn: 'Community', labelEs: 'Comunidad' },
    { path: '/downloads', labelEn: 'Downloads', labelEs: 'Descargas' },
    { path: '/flashing', labelEn: 'Flasher', labelEs: 'Flasher' },
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
            {mainNavItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.isCommunity ? (
                  <li className="border-t pt-2 mt-1"><a onClick={() => { /* Prevent navigation if opening dropdown */ }}><T en={item.labelEn} es={item.labelEs} /></a>
                    <ul className="p-2">
                      {item.communityLinks.map(link => (
                        <li key={link.href}>
                          {link.internal
                            ? <Link to={link.href} className="block p-1"><T en={link.labelEn} es={link.labelEs} /></Link>
                            : <a href={link.href} target="_blank" rel="noopener noreferrer" className="block p-1"><T en={link.labelEn} es={link.labelEs} /></a>
                          }
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={`nav-${item.path}`}>
                    <Link to={item.path} className={isActive(item.path) ? 'active' : ''}>
                      <T en={item.labelEn} es={item.labelEs} />
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div >

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
          {mainNavItems.map((item, index) => (
            <React.Fragment key={`nav-${index}`}>
              {item.isCommunity ? (
                <li key="community-dropdown">
                  <details>
                    <summary className="cursor-pointer"><T en={item.labelEn} es={item.labelEs} /></summary>
                    <ul className="p-2 bg-base-100 w-40 z-1 border mt-1">
                      {item.communityLinks.map(link => (
                        <li key={link.href}>
                          {link.internal
                            ? <Link to={link.href} className="block"><T en={link.labelEn} es={link.labelEs} /></Link>
                            : <a href={link.href} target="_blank" rel="noopener noreferrer" className="block"><T en={link.labelEn} es={link.labelEs} /></a>
                          }
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={`nav-${item.path}`}>
                  <Link to={item.path} className={isActive(item.path) ? 'active' : ''}>
                    <T en={item.labelEn} es={item.labelEs} />
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
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
