
import React, { useState } from 'react';
import { Sparkles, X, Loader2 } from 'lucide-react';
import { getCareerAdvice } from '../services/geminiService';

interface AIModalProps {
  onClose: () => void;
  userSkills: string[];
}

export const AIModal: React.FC<AIModalProps> = ({ onClose, userSkills }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    const result = await getCareerAdvice(bio, userSkills);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="bg-emerald-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="text-yellow-300" />
            Bano Qabil AI Counselor
          </div>
          <button onClick={onClose} className="p-1 hover:bg-emerald-500 rounded transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {!advice ? (
            <div className="space-y-4">
              <p className="text-gray-600">Tell us a bit about yourself or your career goals, and I'll give you tailored advice based on your current skills.</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Career Bio</label>
                <textarea 
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g., I am a Bano Qabil Python graduate looking for my first internship in Karachi."
                  className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {userSkills.map(skill => (
                  <span key={skill} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{skill}</span>
                ))}
              </div>
              <button 
                onClick={handleGenerate}
                disabled={loading || !bio}
                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                Generate Career Roadmap
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-emerald-50 p-4 rounded-xl text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                {advice}
              </div>
              <button 
                onClick={() => setAdvice('')}
                className="w-full border border-emerald-600 text-emerald-600 font-bold py-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
