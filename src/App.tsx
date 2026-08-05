import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import JourneyLayout from "./layouts/JourneyLayout";
import StudioLayout from "./layouts/StudioLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
import Home from "./pages/Home";
import Community from "./pages/Community";
import CommunityThread from "./pages/CommunityThread";
import EducationHub from "./pages/EducationHub";
import TechnicalGuide from "./pages/TechnicalGuide";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import VendorDirectory from "./pages/VendorDirectory";
import VendorDetail from "./pages/VendorDetail";
import ScheduleInstallation from "./pages/ScheduleInstallation";
import BookingConfirmed from "./pages/BookingConfirmed";

import RimRecognition from "./pages/RimRecognition";
import RimOverview from "./pages/RimOverview";
import RimSelection from "./pages/RimSelection";
import RimDetail from "./pages/RimDetailPage";
import RimFitment from "./pages/RimFitment";
import RimVisualization from "./pages/RimVisualization";
import RimVendor from "./pages/RimVendor";

import WrapStyles from "./pages/WrapStyles";
import WrapColor from "./pages/WrapColor";
import WrapVisualization from "./pages/WrapVisualization";
import WrapVendor from "./pages/WrapVendor";

import TintTypes from "./pages/TintTypes";
import TintShadeSelection from "./pages/TintShadeSelection";
import TintVisualization from "./pages/TintVisualization";
import TintVendor from "./pages/TintVendor";

import Studio from "./pages/Studio";
import FitmentEngine from "./pages/FitmentEngine";
import AIRecognition from "./pages/AIRecognition";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NewUserWelcome from "./pages/NewUserWelcome";
import UserDashboard from "./pages/UserDashboard";
import MyProfile from "./pages/MyProfile";

import BuildLog from "./pages/BuildLog";
import DiscussionThread from "./pages/DiscussionThread";
import CreateBuildLog from "./pages/CreateBuildLog";

import NotFound from "./pages/NotFound";
import LoadingState from "./pages/LoadingState";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* Studio / Tools (No Nav/Footer) */}
          <Route element={<StudioLayout />}>
            <Route path="/studio" element={<Studio />} />
            <Route path="/fitment-engine" element={<FitmentEngine />} />
            <Route path="/ai-recognition" element={<AIRecognition />} />
          </Route>

          {/* Journey Routes */}
          <Route element={<JourneyLayout />}>
            <Route path="/rim/recognition" element={<RimRecognition />} />
            <Route path="/rim/overview" element={<RimOverview />} />
            <Route path="/rim/selection" element={<RimSelection />} />
            <Route path="/rim/detail/:id" element={<RimDetail />} />
            <Route path="/rim/fitment" element={<RimFitment />} />
            <Route path="/rim/visualization" element={<RimVisualization />} />
            <Route path="/rim/vendor" element={<RimVendor />} />

            <Route path="/wrap/styles" element={<WrapStyles />} />
            <Route path="/wrap/color" element={<WrapColor />} />
            <Route path="/wrap/visualization" element={<WrapVisualization />} />
            <Route path="/wrap/vendor" element={<WrapVendor />} />

            <Route path="/tint/types" element={<TintTypes />} />
            <Route path="/tint/shade" element={<TintShadeSelection />} />
            <Route path="/tint/visualization" element={<TintVisualization />} />
            <Route path="/tint/vendor" element={<TintVendor />} />
          </Route>

          {/* Main Routes (TopNav + Footer) */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />

            {/* Rim routing entry points */}
            <Route path="/rim" element={<RimSelection />} />
            <Route path="/wrap" element={<WrapStyles />} />
            <Route path="/tint" element={<TintTypes />} />

            <Route path="/community" element={<Community />} />
            <Route path="/community/thread/:id" element={<CommunityThread />} />
            <Route path="/community/build-log" element={<BuildLog />} />
            <Route
              path="/community/discussion"
              element={<DiscussionThread />}
            />
            <Route
              path="/community/create-build-log"
              element={<CreateBuildLog />}
            />

            <Route path="/education" element={<EducationHub />} />
            <Route
              path="/education/article/:slug"
              element={<TechnicalGuide />}
            />
            <Route path="/rim/fitment-101" element={<TechnicalGuide />} />

            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/vendors" element={<VendorDirectory />} />
            <Route path="/vendors/:id" element={<VendorDetail />} />
            <Route
              path="/booking/schedule"
              element={<ScheduleInstallation />}
            />
            <Route path="/booking/success" element={<BookingConfirmed />} />

            <Route path="/welcome" element={<NewUserWelcome />} />
            <Route path="/garage" element={<UserDashboard />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/loading" element={<LoadingState />} />

            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
