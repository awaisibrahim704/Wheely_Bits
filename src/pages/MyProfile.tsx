import FallbackImage from "../components/FallbackImage";
import { Link } from 'react-router-dom';
import { User, Shield, Bell, ArrowLeft } from 'lucide-react';

export default function MyProfile() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header */}
      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-12 pt-24 md:pt-32 mb-8">
        <Link to="/garage" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Garage
        </Link>
        <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight mb-2">Account Settings</h1>
        <p className="text-on-surface-muted text-lg">Manage your personal information and preferences.</p>
      </div>

      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-12 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl border border-white/5 p-4 flex flex-col gap-2">
            <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-primary-brand/10 text-primary-brand font-bold text-sm">
              <User className="w-5 h-5" />
              Profile Information
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 text-on-surface-muted hover:text-on-surface transition-colors font-bold text-sm">
              <Shield className="w-5 h-5" />
              Security
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 text-on-surface-muted hover:text-on-surface transition-colors font-bold text-sm">
              <Bell className="w-5 h-5" />
              Notifications
            </button>
            <button className="w-full p-3 rounded-xl text-left hover:bg-white/5 text-on-surface-muted hover:text-on-surface transition-colors font-bold text-sm">
              Preferences
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow flex flex-col gap-8">
          
          <div className="bg-surface-high/60 backdrop-blur-md rounded-3xl border border-white/5 p-8">
            <div className="flex items-center gap-6 mb-8">
              <FallbackImage
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" 
                alt="Profile avatar" 
                className="w-24 h-24 rounded-full border-4 border-surface-highest object-cover"
              />
              <div>
                <button className="bg-surface-highest border border-white/10 text-on-surface px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors mb-2">
                  Change Avatar
                </button>
                <p className="description-copy text-on-surface-muted">JPG, GIF or PNG. Max size of 2MB.</p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-muted mb-2">First Name</label>
                  <input type="text" defaultValue="Alex" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-brand text-on-surface" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-muted mb-2">Last Name</label>
                  <input type="text" defaultValue="Driver" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-brand text-on-surface" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-muted mb-2">Email Address</label>
                <input type="email" defaultValue="alex@example.com" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-brand text-on-surface" />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-muted mb-2">Bio</label>
                <textarea rows={4} defaultValue="Automotive enthusiast building a track-focused GT3." className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-brand text-on-surface resize-none"></textarea>
              </div>

              <div className="flex justify-end pt-4">
                <button type="button" className="bg-primary-brand text-on-primary font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20">
                  Save Changes
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
