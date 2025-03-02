import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Upload, Clock, Users, Share2 } from 'lucide-react';
import ShareRoomModal from '../components/ShareRoomModal';

function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const roomPassword = localStorage.getItem(`room_${id}`);
    if (!roomPassword) {
      // If no password is found, redirect to home
      navigate('/');
    }
  }, [id, navigate]);

  const roomPassword = localStorage.getItem(`room_${id}`) || '';

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleSend = () => {
    // Implement send logic
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 h-[calc(100vh-5rem)]">
      <div className="h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 rounded-t-xl p-4 flex items-center justify-between"
        >
          <div className="flex items-center space-x-4">
            <Users className="w-5 h-5 text-purple-600" />
            <span className="text-sm">Room ID: {id}</span>
          </div>
          <div className="flex items-center space-x-4">
            <Clock className="w-5 h-5 text-purple-600" />
            <span className="text-sm">Time remaining: 59:59</span>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="btn-secondary py-1 px-3 flex items-center space-x-1"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </motion.div>

        <div 
          className="flex-1 bg-zinc-900/30 p-4 overflow-y-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="flex flex-col space-y-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-zinc-800/50 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Upload className="w-5 h-5 text-purple-600" />
                    <span>{file.name}</span>
                  </div>
                  <span className="text-sm text-zinc-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 rounded-b-xl p-4 flex items-center space-x-4"
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary p-2"
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => e.target.files && setFiles(prev => [...prev, ...Array.from(e.target.files)])}
            multiple
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="input flex-1"
          />
          <button
            onClick={handleSend}
            className="btn-primary p-2"
          >
            <Send className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <ShareRoomModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        roomId={id || ''}
        password={roomPassword}
      />
    </div>
  );
}

export default RoomPage;