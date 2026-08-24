import { AppProvider, useApp } from './context/AppContext';
import { useButtonLift } from './hooks/useButtonLift';
import { ChatWidget } from './components/ChatWidget';
import { Toast } from './components/Toast';
import { AppShell } from './components/app/AppShell';
import { AvatarDropdown } from './components/app/AvatarDropdown';
import { LandingPage } from './components/landing/LandingPage';
import {
  HowToPage,
  PricingPage,
  TeamsPage,
} from './components/marketing/MarketingPages';
import { Modals } from './components/modals/Modals';
import { OnboardingView } from './components/onboarding/OnboardingView';

function CurrentView() {
  const { view } = useApp();

  switch (view) {
    case 'landing':
      return <LandingPage />;
    case 'howto':
      return <HowToPage />;
    case 'teams':
      return <TeamsPage />;
    case 'pricing':
      return <PricingPage />;
    case 'onboarding':
      return <OnboardingView />;
    case 'app':
      return <AppShell />;
  }
}

function AppContent() {
  useButtonLift();

  return (
    <>
      <ChatWidget />
      <CurrentView />
      <Modals />
      <AvatarDropdown />
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
