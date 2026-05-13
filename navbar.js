class MainNavbar extends HTMLElement {
  connectedCallback() {
    // Inyectar estilos para controlar la visibilidad de los idiomas
    if (!document.getElementById('lang-styles')) {
      const style = document.createElement('style');
      style.id = 'lang-styles';
      style.textContent = `
        html[lang="en"] .lang-es { display: none !important; }
        html[lang="es"] .lang-en { display: none !important; }
      `;
      document.head.appendChild(style);
    }

    this.innerHTML = `
    <div class="navbar bg-base-100 shadow-sm">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> 
            </svg>
          </div>
          <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a href="index.html">
              <span class="lang-en">Home</span>
              <span class="lang-es">Inicio</span>
            </a></li>
            <li><a>
              <span class="lang-en">Showcase</span>
              <span class="lang-es">Muestra</span>
            </a></li>
            <li>
              <a>
                <span class="lang-en">Community</span>
                <span class="lang-es">Comunidad</span>
              </a>
              <ul class="p-2">
                <li><a href="Tutorials.html">
                  <span class="lang-en">Tutorials</span>
                  <span class="lang-es">Tutoriales</span>
                </a></li>
                <li><a href="https://discord.gg/2Ecx7sF5" target="_blank" rel="noopener noreferrer">
                  <span class="lang-en">Discord</span>
                  <span class="lang-es">Discord</span>
                </a></li>
                <li><a href="https://github.com/Alexander-Cidbal/RZK-Flame-Spark-Bloom" target="_blank" rel="noopener noreferrer">
                  <span class="lang-en">Github</span>
                  <span class="lang-es">Github</span>
                </a></li>
              </ul>
            </li>
            <li><a href="Flashing.html">
              <span class="lang-en">Flasher</span>
              <span class="lang-es">Flasher</span>
            </a></li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl" href="index.html">XOTLA</a>
        
        <fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-23 border p-1">
          <label class="label cursor-pointer">
            <input id="lang-toggle" type="checkbox" class="toggle border-indigo-600 bg-indigo-500 checked:border-red-500 checked:bg-red-400 checked:text-red-800" /> 
            <span id="lang-label" class="ml-1 font-bold">ENGLISH</span>
          </label>
        </fieldset>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a href="index.html">
            <span class="lang-en">Home</span>
            <span class="lang-es">Inicio</span>
          </a></li>
          <li><a>
            <span class="lang-en">Showcase</span>
            <span class="lang-es">Muestra</span>
          </a></li>
          <li>
            <details>
              <summary>
                <span class="lang-en">Community</span>
                <span class="lang-es">Comunidad</span>
              </summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <li><a href="Tutorials.html">
                  <span class="lang-en">Tutorials</span>
                  <span class="lang-es">Tutoriales</span>
                </a></li>
                <li><a href="https://discord.gg/2Ecx7sF5" target="_blank" rel="noopener noreferrer">
                  <span class="lang-en">Discord</span>
                  <span class="lang-es">Discord</span>
                </a></li>
                <li><a href="https://github.com/Alexander-Cidbal/RZK-Flame-Spark-Bloom" target="_blank" rel="noopener noreferrer">
                  <span class="lang-en">Github</span>
                  <span class="lang-es">Github</span>
                </a></li>
              </ul>
            </details>
          </li>
          <li><a href="Flashing.html">
            <span class="lang-en">Flasher</span>
            <span class="lang-es">Flasher</span>
          </a></li>
        </ul>
      </div>
      
      <div class="navbar-end">
        <a href="Tutorials.html" class="btn btn-primary">
          <span class="lang-en">Get Started</span>
          <span class="lang-es">Comenzar</span>
        </a>
      </div>
    </div>
    `;

    this.setupLanguage();
  }

  setupLanguage() {
    const toggle = this.querySelector('#lang-toggle');
    const label = this.querySelector('#lang-label');
    
    // Leer idioma guardado o usar inglés por defecto
    const savedLang = localStorage.getItem('xotla-lang') || 'en';
    
    // Aplicar estado inicial
    document.documentElement.setAttribute('lang', savedLang);
    toggle.checked = (savedLang === 'es');
    label.textContent = savedLang === 'en' ? 'EN' : 'ES';

    // Escuchar cambios en el toggle
    toggle.addEventListener('change', (e) => {
      const newLang = e.target.checked ? 'es' : 'en';
      document.documentElement.setAttribute('lang', newLang);
      localStorage.setItem('xotla-lang', newLang);
      label.textContent = newLang === 'en' ? 'EN' : 'ES';
    });
  }
}

customElements.define('main-navbar', MainNavbar);