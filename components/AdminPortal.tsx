
import React, { useState } from 'react';
import { Users, Building2, PlusCircle, LayoutDashboard, Search, Trash2, CheckCircle2, Activity, Send, FileText, Monitor, Globe } from 'lucide-react';
import { Student, Company, Job, Interaction } from '../types';

interface AdminPortalProps {
  students: Student[];
  companies: Company[];
  jobs: Job[];
  interactions: Interaction[];
  onAddStudent: (student: Student) => void;
  onAddCompany: (company: Company) => void;
  onAddJob: (job: Job) => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ 
  students, companies, jobs, interactions, onAddStudent, onAddCompany, onAddJob 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'companies' | 'jobs' | 'activity'>('overview');
  
  // Form States
  const [newStudent, setNewStudent] = useState({ name: '', email: '', course: '', batch: '' });
  const [newCompany, setNewCompany] = useState({ name: '', industry: '', website: '' });
  const [newJob, setNewJob] = useState({ title: '', company: '', location: '', type: 'Internship' as any, category: 'Software Development', description: '', requirements: '' });
  const [successMsg, setSuccessMsg] = useState('');

  const showToast = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    onAddStudent({ 
      ...newStudent, 
      id: Date.now().toString(),
      number: '',
      address: '',
      campus: 'Main Campus',
      skills: [],
      experiences: '',
      courseProjects: []
    });
    setNewStudent({ name: '', email: '', course: '', batch: '' });
    showToast('Student added successfully!');
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCompany({ 
      ...newCompany, 
      id: Date.now().toString(), 
      logo: `https://picsum.photos/seed/${newCompany.name}/100/100`,
      requiredRoles: []
    });
    setNewCompany({ name: '', industry: '', website: '' });
    showToast('Company added successfully!');
  };

  const handleAddJob = (e: React.FormEvent) => {
    e.preventDefault();
    onAddJob({
      ...newJob,
      id: Date.now().toString(),
      salary: 'Competitive',
      postedAt: 'Just now',
      requirements: newJob.requirements.split(',').map(r => r.trim()),
      logo: `https://picsum.photos/seed/${newJob.company}/100/100`
    });
    setNewJob({ title: '', company: '', location: '', type: 'Internship', category: 'Software Development', description: '', requirements: '' });
    showToast('Internship suggestion posted!');
  };

  // Derived: Active Sessions (Login interactions from the last 10 minutes)
  const activeSessions = interactions.filter(i => i.type === 'LOGIN');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {successMsg && (
        <div className="fixed top-24 right-4 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce z-50">
          <CheckCircle2 size={20} /> {successMsg}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        {/* Admin Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'activity' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Activity size={20} /> Interaction Logs
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'students' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Users size={20} /> Students
          </button>
          <button 
            onClick={() => setActiveTab('companies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'companies' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Building2 size={20} /> Companies
          </button>
        </aside>

        {/* Admin Panels */}
        <main className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 min-h-[600px]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900 leading-none">Admin Control Center</h2>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100">
                  <Monitor size={14} /> Systems Online
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <p className="text-emerald-600 text-xs font-black uppercase tracking-wider mb-2">Total Students</p>
                  <p className="text-4xl font-black text-emerald-900">{students.length}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-blue-600 text-xs font-black uppercase tracking-wider mb-2">Partners</p>
                  <p className="text-4xl font-black text-blue-900">{companies.length}</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <p className="text-amber-600 text-xs font-black uppercase tracking-wider mb-2">Live Entries</p>
                  <p className="text-4xl font-black text-amber-900">{activeSessions.length}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Students (Sessions) */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Globe size={20} className="text-emerald-600" /> Active on Portal
                  </h3>
                  <div className="space-y-3">
                    {activeSessions.length > 0 ? activeSessions.map(session => (
                      <div key={session.id} className="p-4 bg-gray-50 border rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center font-black text-xs">
                            {session.fromName[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{session.fromName}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Logged in at {session.timestamp.split(',')[1]}</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    )) : (
                       <p className="text-gray-400 text-sm italic py-4">No active users logged right now.</p>
                    )}
                  </div>
                </div>

                {/* Interactions Activity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Activity size={20} className="text-emerald-600" /> Platform Interactions
                  </h3>
                  <div className="space-y-3">
                    {interactions.filter(i => i.type !== 'LOGIN').slice(0, 5).map(i => (
                      <div key={i.id} className="p-4 bg-gray-50 border rounded-2xl flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${i.type === 'APPLICATION' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}>
                          {i.type === 'APPLICATION' ? <FileText size={16} /> : <Send size={16} />}
                        </div>
                        <div className="text-xs">
                          <p className="font-bold text-gray-900">
                            {i.fromName} {i.type === 'APPLICATION' ? 'applied to' : 'hired'} {i.toName}
                          </p>
                          <p className="text-gray-500">{i.itemName} • {i.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    {interactions.length === 0 && <p className="text-gray-400 text-sm italic py-4">No hiring or application events yet.</p>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-black text-gray-900">Comprehensive Logs</h2>
              <div className="border rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-black uppercase text-[10px] text-gray-500 tracking-widest">Type</th>
                      <th className="px-6 py-4 font-black uppercase text-[10px] text-gray-500 tracking-widest">Actor</th>
                      <th className="px-6 py-4 font-black uppercase text-[10px] text-gray-500 tracking-widest">Details</th>
                      <th className="px-6 py-4 font-black uppercase text-[10px] text-gray-500 tracking-widest">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {interactions.map(i => (
                      <tr key={i.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                            i.type === 'LOGIN' ? 'bg-gray-100 text-gray-600' :
                            i.type === 'APPLICATION' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'
                          }`}>
                            {i.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{i.fromName}</td>
                        <td className="px-6 py-4 text-gray-500">{i.itemName} {i.toName ? `(${i.toName})` : ''}</td>
                        <td className="px-6 py-4 text-gray-400 text-xs">{i.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
             <div className="space-y-8">
               <h2 className="text-2xl font-black text-gray-900">Manage Students</h2>
               <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <input required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="p-3 border rounded-xl" placeholder="Full Name" />
                 <input required type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="p-3 border rounded-xl" placeholder="Email" />
                 <button className="bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 md:col-span-2">Add Student</button>
               </form>
               <div className="grid grid-cols-1 gap-2">
                 {students.map(s => (
                   <div key={s.id} className="p-4 border rounded-2xl flex justify-between items-center hover:bg-gray-50">
                     <div>
                       <p className="font-bold text-gray-900">{s.name}</p>
                       <p className="text-xs text-gray-500">{s.course}</p>
                     </div>
                     <button className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === 'companies' && (
             <div className="space-y-8">
               <h2 className="text-2xl font-black text-gray-900">Manage Companies</h2>
               <form onSubmit={handleAddCompany} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <input required value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} className="p-3 border rounded-xl" placeholder="Company Name" />
                 <input required value={newCompany.industry} onChange={e => setNewCompany({...newCompany, industry: e.target.value})} className="p-3 border rounded-xl" placeholder="Industry" />
                 <button className="bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 md:col-span-2">Register Company</button>
               </form>
               <div className="grid grid-cols-1 gap-2">
                 {companies.map(c => (
                   <div key={c.id} className="p-4 border rounded-2xl flex justify-between items-center hover:bg-gray-50">
                     <div className="flex items-center gap-3">
                       <img src={c.logo} className="w-8 h-8 rounded-lg" />
                       <div>
                         <p className="font-bold text-gray-900">{c.name}</p>
                         <p className="text-xs text-gray-500">{c.industry}</p>
                       </div>
                     </div>
                     <button className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                   </div>
                 ))}
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};
