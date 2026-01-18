
import React, { useState } from 'react';
import { Users, Building2, PlusCircle, LayoutDashboard, Search, Trash2, CheckCircle2, Activity, Send, FileText } from 'lucide-react';
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
            <LayoutDashboard size={20} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('activity')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'activity' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Activity size={20} /> Platform Activity
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'students' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Users size={20} /> Manage Students
          </button>
          <button 
            onClick={() => setActiveTab('companies')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'companies' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Building2 size={20} /> Manage Companies
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'jobs' ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <PlusCircle size={20} /> Post Internship
          </button>
        </aside>

        {/* Admin Panels */}
        <main className="flex-1 bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 min-h-[600px]">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-gray-900">Admin Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <p className="text-emerald-600 text-xs font-black uppercase tracking-wider mb-2">Total Students</p>
                  <p className="text-4xl font-black text-emerald-900">{students.length}</p>
                </div>
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-blue-600 text-xs font-black uppercase tracking-wider mb-2">Partner Companies</p>
                  <p className="text-4xl font-black text-blue-900">{companies.length}</p>
                </div>
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                  <p className="text-amber-600 text-xs font-black uppercase tracking-wider mb-2">Active Listings</p>
                  <p className="text-4xl font-black text-amber-900">{jobs.length}</p>
                </div>
              </div>
              
              <div className="pt-4">
                <h3 className="text-lg font-black mb-4 flex items-center gap-2"><Activity size={20} className="text-emerald-600" /> Recent Interactions</h3>
                <div className="space-y-3">
                  {interactions.slice(0, 5).map(i => (
                    <div key={i.id} className="p-4 bg-gray-50 rounded-2xl border flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${i.type === 'APPLICATION' ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                          {i.type === 'APPLICATION' ? <FileText size={18} /> : <Send size={18} />}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">
                            {i.fromName} {i.type === 'APPLICATION' ? 'applied to' : 'hired'} {i.toName}
                          </p>
                          <p className="text-xs text-gray-500">{i.itemName} • {i.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {interactions.length === 0 && <p className="text-gray-400 italic py-8 text-center">No recent interactions logged.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-black text-gray-900">Interaction Log</h2>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">{interactions.length} Actions</span>
              </div>
              <div className="overflow-hidden border rounded-2xl">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-black text-gray-600 uppercase text-[10px] tracking-widest">Type</th>
                      <th className="px-6 py-4 font-black text-gray-600 uppercase text-[10px] tracking-widest">From</th>
                      <th className="px-6 py-4 font-black text-gray-600 uppercase text-[10px] tracking-widest">To</th>
                      <th className="px-6 py-4 font-black text-gray-600 uppercase text-[10px] tracking-widest">Item</th>
                      <th className="px-6 py-4 font-black text-gray-600 uppercase text-[10px] tracking-widest">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {interactions.map(i => (
                      <tr key={i.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase ${i.type === 'APPLICATION' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {i.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-gray-900">{i.fromName}</td>
                        <td className="px-6 py-4 font-bold text-gray-900">{i.toName}</td>
                        <td className="px-6 py-4 text-gray-500">{i.itemName}</td>
                        <td className="px-6 py-4 text-xs text-gray-400">{i.timestamp}</td>
                      </tr>
                    ))}
                    {interactions.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center text-gray-400 italic">No activity recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-gray-900">Student Directory</h2>
              <form onSubmit={handleAddStudent} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Full Name</label>
                  <input required value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Ali Ahmed" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Email</label>
                  <input required type="email" value={newStudent.email} onChange={e => setNewStudent({...newStudent, email: e.target.value})} className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500" placeholder="ali@example.com" />
                </div>
                <button type="submit" className="md:col-span-2 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors mt-2">
                  Enroll Student
                </button>
              </form>
              <div className="space-y-3">
                {students.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-4 border rounded-2xl hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-black">
                        {s.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.course}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ... other tabs like companies and jobs ... */}
          {activeTab === 'companies' && (
             <div className="space-y-8">
               <h2 className="text-2xl font-black text-gray-900">Manage Companies</h2>
               <form onSubmit={handleAddCompany} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                 <input required value={newCompany.name} onChange={e => setNewCompany({...newCompany, name: e.target.value})} className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Company Name" />
                 <input required value={newCompany.industry} onChange={e => setNewCompany({...newCompany, industry: e.target.value})} className="w-full p-3 rounded-xl border outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Industry" />
                 <button type="submit" className="md:col-span-2 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700">Add Partner</button>
               </form>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {companies.map(c => (
                   <div key={c.id} className="flex items-center justify-between p-4 border rounded-2xl">
                     <div className="flex items-center gap-4">
                       <img src={c.logo} className="w-10 h-10 rounded-lg" />
                       <p className="font-bold">{c.name}</p>
                     </div>
                     <button className="text-gray-300 hover:text-red-500"><Trash2 size={18} /></button>
                   </div>
                 ))}
               </div>
             </div>
          )}

          {activeTab === 'jobs' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black text-gray-900">Post Internship</h2>
              <form onSubmit={handleAddJob} className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <input required value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="w-full p-3 rounded-xl border outline-none" placeholder="Job Title" />
                <textarea required value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} className="w-full p-3 rounded-xl border outline-none h-24" placeholder="Description" />
                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold">Post Listing</button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
