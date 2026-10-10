import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function StudioLayout() {
  const { pathname } = useLocation();
  const isRimScanner = pathname === '/ai-recognition';

  return (
    <div className={`${isRimScanner ? 'min-h-screen overflow-x-hidden' : 'h-screen overflow-hidden'} w-full bg-background flex flex-col`}>
      <header className="h-14 bg-surface-low border-b border-outline-subtle flex items-center px-4 justify-between shrink-0">
        <Link to="/" className="text-on-surface-muted hover:text-primary transition-colors flex items-center gap-2">
          <Home className="w-4 h-4" />
          <span className="text-sm font-medium">Exit Studio</span>
        </Link>
        <div className="text-sm font-bold tracking-widest text-on-surface">
          WHEELY BITS STUDIO
        </div>
        <div className="w-24"></div> {/* Spacer for center alignment */}
      </header>
      <main className={`flex-1 relative ${isRimScanner ? '' : 'overflow-hidden'}`}>
        <Outlet />
      </main>
    </div>
  );
}
