
import React, { useState } from 'react';
import { UserRole } from '../types';
import { ShieldCheck, User, Building2, ChevronRight, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');

  const roles = [
    { id: 'STUDENT', title: 'Student', icon: <User size={24} />, desc: 'Find internships & jobs' },
    { id: 'COMPANY', title: 'Company', icon: <Building2 size={24} />, desc: 'Find Bano Qabil talent' },
    { id: 'ADMIN', title: 'Admin', icon: <ShieldCheck size={24} />, desc: 'Manage the portal' },
  ];

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-8 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-emerald-600 font-black text-3xl mx-auto mb-4">BQ</div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-emerald-100 text-sm">Select your role to continue to the portal</p>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-3">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                  selectedRole === role.id 
                  ? 'border-emerald-600 bg-emerald-50' 
                  : 'border-gray-100 hover:border-emerald-200'
                }`}
              >
                <div className={`${selectedRole === role.id ? 'text-emerald-600' : 'text-gray-400'}`}>
                  {role.icon}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{role.title}</p>
                  <p className="text-xs text-gray-500">{role.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="space-y-4 pt-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                defaultValue="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Password"
              />
            </div>
            
            <button 
              onClick={() => onLogin(selectedRole)}
              className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
            >
              Enter Portal
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-400">
            For demo purposes, just click "Enter Portal"
          </p>
        </div>
      </div>
    </div>
  );
};
