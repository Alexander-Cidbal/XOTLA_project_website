class MainNavbar extends HTMLElement {
  connectedCallback() {
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
            <li><a href="index.html">Home</a></li>
            <li><a>Showcase</a></li>
            <li>
              <a>Community</a>
              <ul class="p-2">
                <li><a href="Tutorials.html">Tutorials</a></li>
                <li><a>Discord</a></li>
                <li><a href="https://github.com/Alexander-Cidbal/RZK-Flame-Spark-Bloom">Github</a></li>
              </ul>
            </li>
            <li><a href="Flashing.html">Flasher</a></li>
          </ul>
        </div>
        <a class="btn btn-ghost text-xl" href="index.html">XOTLA</a>
        
        <fieldset class="fieldset bg-base-100 border-base-300 rounded-box w-35 border p-4">
          <label class="label cursor-pointer">
            <input type="checkbox" class="toggle border-indigo-600 bg-indigo-500 checked:border-red-500 checked:bg-red-400 checked:text-red-800" /> 
            <span class="ml-2">ENGLISH</span>
          </label>
        </fieldset>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li><a href="index.html">Home</a></li>
          <li><a>Showcase</a></li>
          <li>
            <details>
              <summary>Community</summary>
              <ul class="p-2 bg-base-100 w-40 z-1">
                <li><a href="Tutorials.html">Tutorials</a></li>
                <li><a>Discord</a></li>
                <li><a href="https://github.com/Alexander-Cidbal/RZK-Flame-Spark-Bloom">Github</a></li>
              </ul>
            </details>
          </li>
          <li><a href="Flashing.html">Flasher</a></li>
        </ul>
      </div>
      
      <div class="navbar-end">
        <a class="btn btn-primary">Get Started</a>
      </div>
    </div>
    `;
  }
}

customElements.define('main-navbar', MainNavbar);