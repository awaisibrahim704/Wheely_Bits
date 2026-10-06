import { Outlet, useLocation } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import ProgressStepper from '../components/ProgressStepper';

export default function JourneyLayout() {
  const location = useLocation();
  const path = location.pathname;
  
  let steps = ['Selection', 'Configuration', 'Visualization', 'Vendor'];
  let currentStep = 0;
  
  if (path.includes('rim')) steps = ['Recognition', 'Selection', 'Fitment', 'Visualization', 'Vendor'];
  if (path.includes('wrap')) steps = ['Styles', 'Color', 'Visualization', 'Vendor'];
  if (path.includes('tint')) steps = ['Types', 'Shade', 'Visualization', 'Vendor'];

  if (path.includes('recognition')) currentStep = 0;
  else if (path.includes('selection') || path.includes('color') || path.includes('shade')) currentStep = 1;
  else if (path.includes('fitment')) currentStep = 2;
  else if (path.includes('visualization')) currentStep = steps.length - 2;
  else if (path.includes('vendor')) currentStep = steps.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavBar />
      {!path.includes('rim') && (
        <ProgressStepper steps={steps} currentStep={currentStep} />
      )}
      <main className={`flex-1 ${path.includes('rim') ? 'pt-16' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
