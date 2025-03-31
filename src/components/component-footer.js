export class ComponentFooter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <footer class="footer">
                <div class="footer__line-first">
                  <img src="./logo-big.svg" alt="logo" class="footer__logo">
                  <ul class="footer__nav">
                    <li class="footer__nav-point">Home</li>
                    <li class="footer__nav-point">About</li>
                    <li class="footer__nav-point footer__nav-point_fix">Pricing</li>
                    <li class="footer__nav-point">Open positions</li>
                    <li class="footer__nav-point">Blog</li>
                  </ul>
                  <div class="footer__contacts">
                    <a href="#" class="footer__contact">
                      <img src="./insta.svg" alt="contact" class="footer__contact-img">
                    </a>
                    <a href="#" class="footer__contact">
                      <img src="./x.svg" alt="contact" class="footer__contact-img">
                    </a>
                    <a href="#" class="footer__contact">
                      <img src="./in.svg" alt="contact" class="footer__contact-img">
                    </a>
                  </div>
                </div>
                <div class="footer__line-second">
                  <p class="footer__webflow">© Molecule, LLC. All rights reserved. Powered by <a href="" class="footer__webflow-link">Webflow</a>.</p>
                  <ul class="footer__policy">
                    <li class="footer__point-policy">Licensing</li>
                    <li class="footer__point-policy">Privacy Policy</li>
                    <li class="footer__point-policy">Terms & conditions</li>
                    <li class="footer__point-policy">Cookie policy</li>
                  </ul>
                </div>
            </footer>
        `;
    }
}
