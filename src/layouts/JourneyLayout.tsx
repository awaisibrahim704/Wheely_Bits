import { Outlet } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';

export default function JourneyLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavBar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
