import './Footer.css';

const companyLinks = ['About Us', 'Careers', 'Store Locations', 'Privacy Policy'];
const supportLinks = ['Contact Support', 'Terms of Service', 'Shipping & Returns', 'FAQ'];
const connectLinks = ['FB', 'IG', 'TW'];
const paymentLinks = ['VISA', 'MC', 'PP'];

const Footer = () => (
  <footer className="lumina-footer">
    <div className="lumina-footer__inner">
      <div className="lumina-footer__brand">
        <div className="lumina-footer__logo">
          <span />
          <h2>LuminaStore</h2>
        </div>
        <p>
          Your one-stop destination for premium modern goods. We source the finest materials to
          bring you quality products.
        </p>
      </div>

      <div className="lumina-footer__links">
        <div className="lumina-footer__column">
          <p className="lumina-footer__title">Company</p>
          <ul>
            {companyLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lumina-footer__column">
          <p className="lumina-footer__title">Support</p>
          <ul>
            {supportLinks.map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lumina-footer__column">
          <p className="lumina-footer__title">Connect</p>
          <div className="lumina-footer__pills">
            {connectLinks.map((item) => (
              <button key={item} type="button">
                {item}
              </button>
            ))}
          </div>
          <p className="lumina-footer__title">Payment</p>
          <div className="lumina-footer__pills">
            {paymentLinks.map((item) => (
              <button key={item} type="button">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>

    <div className="lumina-footer__bottom">
      <p>© 2024 Lumina Store Inc. All rights reserved.</p>
      <div className="lumina-footer__bottom-links">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Sitemap</a>
      </div>
    </div>
  </footer>
);

export default Footer;
