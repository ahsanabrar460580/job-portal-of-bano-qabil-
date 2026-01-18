
import React, { useState } from 'react';
import { Student, Company, UserRole, CourseProject } from '../types';
// Added Award to the import list
import { User, Building2, Github, Globe, MapPin, Phone, BookOpen, Briefcase, Plus, X, Trash2, Award } from 'lucide-react';

interface ProfileSetupProps {
  role: UserRole;
  onComplete: (data: any) => void;
}

export const StudentProfileForm: React.FC<{ onComplete: (s: Student) => void }> = ({ onComplete }) => {
  const [form, setForm] = useState<Partial<Student>>({
    name: '', email: '', number: '', address: '', campus: '', course: '', batch: '', 
    skills: [], experiences: '', github: '', portfolio: '', otherDetails: '', courseProjects: []
  });
  const [skillInput, setSkillInput] = useState('');
  const [newProject, setNewProject] = useState<CourseProject>({ title: '', description: '', link: '' });

  const addSkill = () => {
    if (skillInput && !form.skills?.includes(skillInput)) {
      setForm({ ...form, skills: [...(form.skills || []), skillInput] });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setForm({ ...form, skills: form.skills?.filter(s => s !== skill) });
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setForm({ ...form, courseProjects: [...(form.courseProjects || []), newProject] });
      setNewProject({ title: '', description: '', link: '' });
    }
  };

  const removeProject = (index: number) => {
    setForm({ ...form, courseProjects: form.courseProjects?.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ ...form, id: Date.now().toString() } as Student);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">BQ</div>
        <h2 className="text-3xl font-black text-gray-900">Build Your Career Profile</h2>
        <p className="text-gray-500">This will be used to generate your digital CV for companies.</p>
      </div>

      <div className="space-y-8">
        {/* Personal Details Section */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><User size={20} className="text-emerald-600" /> Personal Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
              <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Email Address</label>
              <input required type="email" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Phone Number</label>
              <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="03xx-xxxxxxx" value={form.number} onChange={e => setForm({...form, number: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Campus</label>
              <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={form.campus} onChange={e => setForm({...form, campus: e.target.value})} />
            </div>
          </div>
        </section>

        {/* Education & Experience */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><BookOpen size={20} className="text-emerald-600" /> Bano Qabil Journey</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Current/Completed Course</label>
              <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={form.course} onChange={e => setForm({...form, course: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Batch Number</label>
              <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={form.batch} onChange={e => setForm({...form, batch: e.target.value})} />
            </div>
          </div>

          <div className="space-y-1 pt-4">
            <label className="text-xs font-bold text-gray-400 uppercase">Technical Skills (Press Enter to add)</label>
            <div className="flex gap-2">
              <input className="flex-1 p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" value={skillInput} onChange={e => setSkillInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())} />
              <button type="button" onClick={addSkill} className="bg-emerald-600 text-white px-4 rounded-xl"><Plus size={20} /></button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {form.skills?.map(s => (
                <span key={s} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  {s} <X size={14} className="cursor-pointer" onClick={() => removeSkill(s)} />
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Course Projects */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Award size={20} className="text-emerald-600" /> Course Projects</h3>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 space-y-3">
            <input className="w-full p-2 border rounded-lg text-sm" placeholder="Project Title" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
            <textarea className="w-full p-2 border rounded-lg text-sm" placeholder="Brief Description" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})} />
            <div className="flex gap-2">
              <input className="flex-1 p-2 border rounded-lg text-sm" placeholder="Project Link (Optional)" value={newProject.link} onChange={e => setNewProject({...newProject, link: e.target.value})} />
              <button type="button" onClick={addProject} className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Add Project</button>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            {form.courseProjects?.map((p, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded-xl bg-white shadow-sm">
                <div>
                  <p className="font-bold text-sm">{p.title}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{p.description}</p>
                </div>
                <button type="button" onClick={() => removeProject(i)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Digital Presence */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Globe size={20} className="text-emerald-600" /> Digital Presence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">GitHub Profile URL</label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="w-full pl-10 p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="https://github.com/..." value={form.github} onChange={e => setForm({...form, github: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Portfolio Website URL</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input className="w-full pl-10 p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="https://..." value={form.portfolio} onChange={e => setForm({...form, portfolio: e.target.value})} />
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold border-b pb-2 flex items-center gap-2"><Briefcase size={20} className="text-emerald-600" /> Experiences & About</h3>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Relevant Experience (Work/Internship)</label>
            <textarea className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 h-32" placeholder="Tell us about your previous roles or projects..." value={form.experiences} onChange={e => setForm({...form, experiences: e.target.value})} />
          </div>
        </section>
      </div>

      <button type="submit" className="w-full bg-emerald-600 text-white font-black py-5 rounded-2xl shadow-xl hover:bg-emerald-700 transition-all text-lg mt-8">
        Create My Profile & CV
      </button>
    </form>
  );
};

export const CompanyProfileForm: React.FC<{ onComplete: (c: Company) => void }> = ({ onComplete }) => {
  const [form, setForm] = useState<Partial<Company>>({
    name: '', industry: '', website: '', requiredRoles: []
  });
  const [roleInput, setRoleInput] = useState('');

  const addRole = () => {
    if (roleInput && !form.requiredRoles?.includes(roleInput)) {
      setForm({ ...form, requiredRoles: [...(form.requiredRoles || []), roleInput] });
      setRoleInput('');
    }
  };

  const removeRole = (role: string) => {
    setForm({ ...form, requiredRoles: form.requiredRoles?.filter(r => r !== role) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({ ...form, id: Date.now().toString(), logo: `https://picsum.photos/seed/${form.name}/100/100` } as Company);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4">BQ</div>
        <h2 className="text-3xl font-black text-gray-900">Partner Registration</h2>
        <p className="text-gray-500">Discover and hire the best Bano Qabil talent.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400 uppercase">Company Name</label>
          <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Industry</label>
            <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase">Website</label>
            <input required className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." value={form.website} onChange={e => setForm({...form, website: e.target.value})} />
          </div>
        </div>

        <div className="space-y-1 pt-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Positions we are looking for</label>
          <div className="flex gap-2">
            <input className="flex-1 p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Shopify Developer, React Developer" value={roleInput} onChange={e => setRoleInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addRole())} />
            <button type="button" onClick={addRole} className="bg-blue-600 text-white p-3 rounded-xl"><Plus size={20} /></button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {form.requiredRoles?.map(r => (
              <span key={r} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1 font-bold">
                {r} <X size={14} className="cursor-pointer" onClick={() => removeRole(r)} />
              </span>
            ))}
          </div>
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all text-lg mt-8">
        Complete Company Registration
      </button>
    </form>
  );
};