import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-low border-t border-outline-subtle py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl mb-4">WHEELY BITS</h3>
          <p className="text-on-surface-muted text-sm">
            Precision Engineering & Design.
            <br />
            Pakistan's first AI-powered automotive canvas.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-on-surface">Explore</h4>
          <ul className="space-y-2 text-sm text-on-surface-muted">
            <li><Link to="/rim" className="hover:text-primary">Rim Configurator</Link></li>
            <li><Link to="/wrap" className="hover:text-primary">Wrap Studio</Link></li>
            <li><Link to="/vendors" className="hover:text-primary">Vendor Directory</Link></li>
            <li><Link to="/community" className="hover:text-primary">Community Builds</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-on-surface">Support</h4>
          <ul className="space-y-2 text-sm text-on-surface-muted">
            <li><Link to="/faq" className="hover:text-primary">FAQ</Link></li>
            <li><Link to="/education" className="hover:text-primary">Education Hub</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-on-surface">Legal</h4>
          <ul className="space-y-2 text-sm text-on-surface-muted">
            <li><Link to="#" className="hover:text-primary">Terms of Service</Link></li>
            <li><Link to="#" className="hover:text-primary">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-outline-subtle text-sm text-on-surface-muted flex justify-between items-center">
        <p>© 2026 Wheely Bits. All rights reserved.</p>
      </div>
    </footer>
  );
}
