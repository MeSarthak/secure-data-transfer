import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Link as LinkIcon } from 'lucide-react';

export default function ShareRoomModal({ isOpen, onClose, roomId, password }) {
  const [copied, setCopied] = useState(false);
  const roomLink = `${window.location.origin}/room/${roomId}`;

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold mb-6">Share Room</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Room Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                  <input
                    type="text"
                    value={roomLink}
                    readOnly
                    className="input pl-10 pr-24 w-full bg-zinc-800"
                  />
                  <button
                    onClick={() => copyToClipboard(roomLink)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-secondary py-1 px-3 flex items-center space-x-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1">
                  Room Password
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={password}
                    readOnly
                    className="input pr-24 w-full bg-zinc-800 font-mono"
                  />
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 btn-secondary py-1 px-3 flex items-center space-x-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 text-sm text-zinc-400">
                <p className="mb-2">Share these details with people you want to invite:</p>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Send them the room link</li>
                  <li>Share the room password securely</li>
                  <li>They can join using these credentials</li>
                </ol>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}