import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Components from './components';

const { 
  Header, 
  HeroSection, 
  AIFeatures, 
  OffspringSimulation,
  GenomeAnalysis,
  SocialProof, 
  Testimonials, 
  Footer,
  SignInModal,
  Dashboard,
  GeneticProfile,
  SimulationHistory
} = Components;

const Home = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onSignInClick={() => setShowSignInModal(true)} />
      <HeroSection />
      <AIFeatures />
      <OffspringSimulation />
      <GenomeAnalysis />
      <SocialProof />
      <Testimonials />
      <Footer />
      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/genetic-profile" element={<GeneticProfile />} />
            <Route path="/simulations" element={<SimulationHistory />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;