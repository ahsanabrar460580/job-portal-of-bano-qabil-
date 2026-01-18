
import React from 'react';
import { Student } from '../types';
import { Mail, GraduationCap, Search, UserCheck, Phone, MapPin, Github, Globe, FileText, Send } from 'lucide-react';

interface StudentDirectoryProps {
  students: Student[];
  onViewCV: (student: Student) => void;
  onHire: (student: Student) => void;
}

export const StudentDirectory: React.FC<StudentDirectoryProps> = ({ students, onViewCV, onHire }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-900 leading-tight">Talent Hub</h2>
          <p className="text-gray-500">Find the brightest graduates from the Bano Qabil program.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search by skill, name or course..." 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map(student => (
          <div key={student.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-inner">
                {student.name[0]}
              </div>
              <div className="text-right">
                <span className="block bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-1 border border-emerald-100">
                  {student.batch}
                </span>
                <span className="block text-[10px] text-gray-400 font-bold uppercase">
                  {student.campus}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">{student.name}</h3>
            <p className="text-emerald-600 font-black text-sm mb-6">{student.course}</p>
            
            <div className="space-y-3 mb-6 flex-1">
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Mail size={16} className="text-emerald-500" />
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <Phone size={16} className="text-emerald-500" />
                {student.number}
              </div>
              <div className="flex items-center gap-3 text-gray-500 text-sm">
                <MapPin size={16} className="text-emerald-500" />
                <span className="truncate">{student.address}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {student.skills.slice(0, 5).map(s => (
                <span key={s} className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                  {s}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => onViewCV(student)}
                className="flex items-center justify-center gap-2 bg-gray-50 text-gray-700 font-bold py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-gray-200"
              >
                <FileText size={18} /> View CV
              </button>
              <button 
                onClick={() => onHire(student)}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
              >
                <Send size={18} /> Hire
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
