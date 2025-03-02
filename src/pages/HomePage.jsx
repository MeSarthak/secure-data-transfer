import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Key, Timer, Upload, Link as LinkIcon, Lock } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import JoinRoomModal from '../components/JoinRoomModal';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-purple-600" />,
    title: 'End-to-End Encryption',
    description: 'Your files and messages are encrypted before leaving your device'
  },
  {
    icon: <Key className="w-6 h-6 text-purple-600" />,
    title: 'Password Protection',
    description: 'Secure your rooms with passwords and OTP verification'
  },
  {
    icon: <Timer className="w-6 h-6 text-purple-600" />,
    title: 'Auto-Deletion',
    description: 'Rooms and data automatically delete after expiration'
  },
  {
    icon: <Upload className="w-6 h-6 text-purple-600" />,
    title: 'File Sharing',
    description: 'Share files of any type securely and efficiently'
  }
];

function HomePage() {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [roomPassword, setRoomPassword] = useState('');

  const createRoom = () => {
    if (!showPasswordInput) {
      setShowPasswordInput(true);
      return;
    }

    if (roomPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setIsCreating(true);
    const roomId = uuidv4();
    // In a real app, you would store this password securely
    localStorage.setItem(`room_${roomId}`, roomPassword);
    setTimeout(() => {
      navigate(`/room/${roomId}`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Secure File Transfer
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
          Create encrypted rooms to share files and messages securely.
          Your data is protected with end-to-end encryption.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center justify-center space-y-4 mb-16"
      >
        {showPasswordInput ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="w-full md:w-auto min-w-[300px]"
          >
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="password"
                value={roomPassword}
                onChange={(e) => setRoomPassword(e.target.value)}
                placeholder="Enter room password (min 6 characters)"
                className="input pl-10 w-full mb-4"
                autoFocus
              />
            </div>
            <button
              onClick={createRoom}
              disabled={isCreating}
              className="btn-primary w-full"
            >
              {isCreating ? (
                <span className="flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Creating Secure Room...
                </span>
              ) : (
                'Create Room'
              )}
            </button>
          </motion.div>
        ) : (
          <button
            onClick={createRoom}
            className="btn-primary w-full md:w-auto min-w-[200px]"
          >
            Create Secure Room
          </button>
        )}
        <button
          onClick={() => setIsJoinModalOpen(true)}
          className="btn-secondary w-full md:w-auto min-w-[200px] flex items-center justify-center space-x-2"
        >
          <LinkIcon className="w-4 h-4" />
          <span>Join Existing Room</span>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
            className="bg-zinc-900/50 backdrop-blur-lg p-6 rounded-xl border border-zinc-800 hover:border-purple-600/50 transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-zinc-400 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <JoinRoomModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}

export default HomePage;