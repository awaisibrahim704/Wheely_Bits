import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <TopNavBar />
      <main className="flex-1 flex items-center justify-center p-4">
        {/* Moody automotive background effect */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-low to-background"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-brand/5 to-transparent"></div>
        </div>
        <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-low/50 backdrop-blur-xl border border-outline-subtle rounded-2xl overflow-hidden shadow-2xl relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
