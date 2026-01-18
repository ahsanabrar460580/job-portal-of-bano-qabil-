
import React, { useState } from 'react';
import { ChatThread, Message, UserRole } from '../types';
import { Send, User, Building2, Search, MessageSquare } from 'lucide-react';

interface ChatSystemProps {
  threads: ChatThread[];
  currentUserId: string;
  onSendMessage: (threadId: string, text: string) => void;
}

export const ChatSystem: React.FC<ChatSystemProps> = ({ threads, currentUserId, onSendMessage }) => {
  const [activeThreadId, setActiveThreadId] = useState<string | null>(threads[0]?.id || null);
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId);
  const otherParticipant = activeThread?.participants.find(p => p.id !== currentUserId);

  const handleSend = () => {
    if (!inputText.trim() || !activeThreadId) return;
    onSendMessage(activeThreadId, inputText);
    setInputText('');
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-black text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input className="w-full pl-10 pr-4 py-2 bg-gray-50 border rounded-xl outline-none text-sm" placeholder="Search conversations..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {threads.map(thread => {
            const participant = thread.participants.find(p => p.id !== currentUserId);
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full p-4 flex items-center gap-3 transition-colors text-left ${activeThreadId === thread.id ? 'bg-emerald-50 border-r-4 border-emerald-600' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shadow-sm ${participant?.role === 'COMPANY' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                  {participant?.name[0]}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-gray-900 truncate">{participant?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{thread.lastMessage || 'Start a conversation'}</p>
                </div>
              </button>
            );
          })}
          {threads.length === 0 && (
            <div className="p-10 text-center text-gray-400">
              <MessageSquare className="mx-auto mb-2 opacity-20" size={40} />
              <p className="text-xs">No active conversations</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50/30">
        {activeThread ? (
          <>
            <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-white ${otherParticipant?.role === 'COMPANY' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                  {otherParticipant?.name[0]}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{otherParticipant?.name}</p>
                  <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Online</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {activeThread.messages.map(msg => {
                const isMine = msg.senderId === currentUserId;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-4 rounded-2xl text-sm ${isMine ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white border text-gray-800 rounded-tl-none shadow-sm'}`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 ${isMine ? 'text-emerald-100' : 'text-gray-400'}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-6 bg-white border-t border-gray-100">
              <div className="flex gap-3">
                <input 
                  className="flex-1 bg-gray-50 border rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Type your message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="bg-emerald-600 text-white p-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare size={64} className="opacity-10 mb-4" />
            <p className="text-sm font-medium">Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};
