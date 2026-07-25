import { Outlet, Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function StudioLayout() {
  return (
    <div className="h-screen w-full bg-background overflow-hidden flex flex-col">
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
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
