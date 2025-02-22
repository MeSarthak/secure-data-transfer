import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, LogIn, UserPlus } from 'lucide-react';
import HomePage from './pages/HomePage';
import RoomPage from './pages/RoomPage';
import AuthModal from './components/AuthModal';

function App() {
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'login'
  });

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthModal({ isOpen: true, mode });
  };

  const closeAuthModal = () => {
    setAuthModal({ ...authModal, isOpen: false });
  };

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-lg fixed w-full z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Shield className="w-8 h-8 text-purple-600" />
              <span className="text-xl font-bold">SecureShare</span>
            </motion.div>
            <div className="flex items-center space-x-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-2 text-green-500"
              >
                <Lock className="w-5 h-5" />
                <span className="text-sm hidden sm:inline">End-to-End Encrypted</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center space-x-2"
              >
                <button
                  onClick={() => openAuthModal('login')}
                  className="btn-secondary flex items-center space-x-1"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  onClick={() => openAuthModal('signup')}
                  className="btn-primary flex items-center space-x-1"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </button>
              </motion.div>
            </div>
          </div>
        </nav>
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:id" element={<RoomPage />} />
          </Routes>
        </main>

        <AuthModal
          isOpen={authModal.isOpen}
          onClose={closeAuthModal}
          mode={authModal.mode}
        />
      </div>
    </Router>
  );
}

export default App;