import React, { useState } from 'react';
import { WebinarProvider } from './WebinarContext';
import Navbar from './Navbar';
import HostStudio from './HostStudio';
import AttendeeRoom from './AttendeeRoom';
import BrandingSettings from './BrandingSettings';

function MainApp() {
  const [activeTab, setActiveTab] = useState('attendee');
  const [showBranding, setShowBranding] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenBranding={() => setShowBranding(true)} 
      />

      <main className="flex-1 container mx-auto p-4 md:p-6">
        {activeTab === 'host' ? <HostStudio /> : <AttendeeRoom />}
      </main>

      {showBranding && (
        <BrandingSettings onClose={() => setShowBranding(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <WebinarProvider>
      <MainApp />
    </WebinarProvider>
  );
}
