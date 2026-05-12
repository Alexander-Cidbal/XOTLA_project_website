class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer class="footer footer-center p-10 bg-base-100 text-base-content rounded">
      <nav class="grid grid-flow-col gap-4">
        <a class="link link-hover">About us</a>
        <a class="link link-hover">Contact</a>
        <a class="link link-hover">Jobs</a>
        <a class="link link-hover">Press kit</a>
      </nav> 
      <aside>
        <p>Copyright © 2026 - All right reserved by XOTLA Project</p>
      </aside>
    </footer>
    `;
  }
}

customElements.define('main-footer', MainFooter);