import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
      {/* Left Side: Form Container */}
      <div className="w-full flex items-center justify-center p-8 bg-background relative z-20">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-on-surface mb-2">Welcome Back</h2>
          </div>
          
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/garage'); }}>
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-on-surface-muted mb-1 uppercase tracking-wider" htmlFor="email">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted/50 w-5 h-5" />
                <input 
                  type="email" 
                  id="email" 
                  placeholder="enthusiast@wheelybits.com" 
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50" 
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-on-surface-muted uppercase tracking-wider" htmlFor="password">Password</label>
                <a href="#" className="text-xs font-semibold text-primary-brand hover:text-primary transition-colors">Forgot Password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted/50 w-5 h-5" />
                <input 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50" 
                />
              </div>
            </div>
            
            {/* Action Button */}
            <button 
              type="submit" 
              className="w-full bg-primary-brand text-on-primary font-bold py-4 rounded-lg hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary-brand/20 flex items-center justify-center gap-2 mt-4 group"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-subtle/50"></div>
            <span className="text-xs font-medium text-on-surface-muted">OR</span>
            <div className="flex-1 h-px bg-outline-subtle/50"></div>
          </div>
          
          {/* Secondary Action */}
          <div className="mt-6 text-center text-sm font-medium text-on-surface-muted">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-brand hover:text-primary transition-colors font-semibold underline underline-offset-4 decoration-primary-brand/50 hover:decoration-primary-brand">
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Brand Showcase */}
      <div className="hidden md:flex relative bg-surface items-center justify-center overflow-hidden border-l border-outline-subtle">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-low/80 via-surface/80 to-surface-low/80 z-0"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-brand/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary-brand/5 rounded-full blur-3xl z-0"></div>
        
        <div className="relative z-10 text-center px-12">
          <h2 className="text-5xl font-bold animate-shimmer-text tracking-tight mb-6">
            Wheely Bits
          </h2>
          <p className="text-lg text-on-surface-muted max-w-sm mx-auto opacity-80 leading-relaxed">
            Precision engineering meets organic design. A sophisticated platform for automotive enthusiasts who demand clarity and performance.
          </p>
        </div>
        
        {/* Structural lines overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
      </div>
    </>
  );
}
