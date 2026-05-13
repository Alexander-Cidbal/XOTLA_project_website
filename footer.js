class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="footer footer-center p-10 bg-base-100 text-base-content rounded">
      <nav class="grid grid-flow-col gap-4">
        <a class="link link-hover">About me</a>
        <a class="link link-hover">Contact</a>
  
      </nav> 
      <aside>
        <p>Copyright © 2026 - All right reserved by XOTLA Project</p>
      </aside>
    </footer>
    `;
  }
}

customElements.define('main-footer', MainFooter);