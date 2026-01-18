
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Filter, User, Bell, LayoutDashboard, Briefcase, Sparkles, LogOut, ChevronRight, DollarSign, Settings, Building2, Users, FileText, CheckCircle2, Building } from 'lucide-react';
import { MOCK_JOBS, JOB_CATEGORIES, MOCK_STUDENTS, MOCK_COMPANIES } from './constants';
import { Job, ViewState, Student, Company, UserRole, Interaction } from './types';
import { JobCard } from './components/JobCard';
import { AIModal } from './components/AIModal';
import { AdminPortal } from './components/AdminPortal';
import { LoginPage } from './components/LoginPage';
import { StudentDirectory } from './components/StudentDirectory';
import { StudentProfileForm, CompanyProfileForm } from './components/ProfileSetupForms';
import { StudentCV } from './components/StudentCV';
import { CompanyCard } from './components/CompanyCard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('STUDENT');
  const [view, setView] = useState<ViewState>(ViewState.LOGIN);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Global State
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [interactions, setInteractions] = useState<Interaction[]>([]);

  // User Identity State
  const [currentUserProfile, setCurrentUserProfile] = useState<Student | Company | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, jobs]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setView(ViewState.JOB_DETAILS);
  };

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    if (role === 'ADMIN') {
      setView(ViewState.ADMIN);
    } else {
      setView(ViewState.PROFILE_SETUP);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole('STUDENT');
    setCurrentUserProfile(null);
    setView(ViewState.LOGIN);
  };

  const onProfileComplete = (data: any) => {
    setCurrentUserProfile(data);
    if (userRole === 'STUDENT') {
      setStudents(prev => [...prev, data]);
      setView(ViewState.HOME);
    } else if (userRole === 'COMPANY') {
      setCompanies(prev => [...prev, data]);
      setView(ViewState.COMPANY_PORTAL);
    }
  };

  const handleApply = (job: Job) => {
    if (!currentUserProfile) return;
    const newInteraction: Interaction = {
      id: Date.now().toString(),
      type: 'APPLICATION',
      fromName: currentUserProfile.name,
      toName: job.company,
      itemName: job.title,
      timestamp: new Date().toLocaleString()
    };
    setInteractions([newInteraction, ...interactions]);
    showToast(`Application email sent to ${job.company}!`);
  };

  const handleHire = (student: Student) => {
    if (!currentUserProfile) return;
    const newInteraction: Interaction = {
      id: Date.now().toString(),
      type: 'HIRING',
      fromName: currentUserProfile.name,
      toName: student.name,
      itemName: student.course,
      timestamp: new Date().toLocaleString()
    };
    setInteractions([newInteraction, ...interactions]);
    showToast(`Hiring invitation email sent to ${student.name}!`);
  };

  const addStudent = (s: Student) => setStudents([s, ...students]);
  const addCompany = (c: Company) => setCompanies([c, ...companies]);
  const addJob = (j: Job) => setJobs([j, ...jobs]);

  const handleViewCV = (student: Student) => {
    setSelectedStudent(student);
    setView(ViewState.STUDENT_CV);
  };

  const renderContent = () => {
    if (!isLoggedIn) return <LoginPage onLogin={handleLogin} />;

    switch (view) {
      case ViewState.PROFILE_SETUP:
        return userRole === 'STUDENT' ? 
          <div className="py-12 px-4"><StudentProfileForm onComplete={onProfileComplete} /></div> : 
          <div className="py-12 px-4"><CompanyProfileForm onComplete={onProfileComplete} /></div>;
      case ViewState.ADMIN:
        return (
          <AdminPortal 
            students={students} 
            companies={companies} 
            jobs={jobs}
            interactions={interactions}
            onAddStudent={addStudent}
            onAddCompany={addCompany}
            onAddJob={addJob}
          />
        );
      case ViewState.COMPANY_PORTAL:
        return <StudentDirectory students={students} onViewCV={handleViewCV} onHire={handleHire} />;
      case ViewState.JOB_DETAILS:
        return renderJobDetails();
      case ViewState.STUDENT_CV:
        return <StudentCV student={selectedStudent!} onBack={() => setView(userRole === 'COMPANY' ? ViewState.COMPANY_PORTAL : ViewState.HOME)} />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Filter size={18} /> Filters
          </h3>
          <div className="space-y-2">
            {['All', ...JOB_CATEGORIES].map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors ${selectedCategory === cat ? 'bg-emerald-600 text-white font-bold' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {cat === 'All' ? 'All Jobs' : cat}
              </button>
            ))}
          </div>
        </div>

        {userRole === 'STUDENT' && (
          <div className="bg-gray-900 p-6 rounded-3xl shadow-lg text-white space-y-4">
            <FileText className="w-10 h-10 text-emerald-400" />
            <h3 className="font-bold text-lg leading-tight">My Digital CV</h3>
            <p className="text-gray-400 text-sm">Your professional CV is ready for employers.</p>
            <button 
              onClick={() => currentUserProfile ? handleViewCV(currentUserProfile as Student) : setView(ViewState.PROFILE_SETUP)}
              className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
            >
              Preview My CV
            </button>
          </div>
        )}

        <div className="bg-emerald-600 p-6 rounded-3xl shadow-lg text-white space-y-4">
          <Sparkles className="w-10 h-10 text-yellow-300" />
          <h3 className="font-bold text-lg leading-tight">Bano Qabil AI</h3>
          <p className="text-emerald-100 text-sm">Let our AI counselor guide your career.</p>
          <button onClick={() => setIsAIModalOpen(true)} className="w-full bg-white text-emerald-600 font-bold py-2 rounded-xl hover:bg-emerald-50 transition-colors shadow-md">
            Ask AI Assistant
          </button>
        </div>
      </aside>

      <main className="flex-1 space-y-10">
        {/* Partner Companies Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-gray-900 leading-none mb-1">Partner Companies</h2>
              <p className="text-gray-500 text-sm">Top employers hiring Bano Qabil talent.</p>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">{companies.length} active partners</span>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {companies.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
            {companies.length === 0 && (
              <div className="w-full py-10 bg-white border border-dashed rounded-3xl flex flex-col items-center justify-center text-gray-400">
                <Building size={32} className="mb-2 opacity-20" />
                <p className="text-xs">No partner companies registered yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Search & Jobs Section */}
        <section className="space-y-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs, roles, or companies..."
                className="w-full pl-12 pr-4 py-4 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg">
              Search Jobs
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onClick={handleJobClick} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed text-gray-400">
                No jobs found matching your criteria.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );

  const renderJobDetails = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button onClick={() => setView(ViewState.HOME)} className="flex items-center gap-2 text-emerald-600 font-black hover:underline group">
        <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Listings
      </button>
      {selectedJob && (
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="h-40 bg-emerald-600 relative">
            <img src={selectedJob.logo} className="absolute -bottom-10 left-10 w-32 h-32 rounded-3xl border-8 border-white object-cover shadow-2xl" />
          </div>
          <div className="pt-16 p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
              <div>
                <h1 className="text-4xl font-black text-gray-900">{selectedJob.title}</h1>
                <p className="text-xl text-emerald-600 font-bold">{selectedJob.company}</p>
              </div>
              <button 
                onClick={() => handleApply(selectedJob)}
                className="bg-emerald-600 text-white px-12 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl"
              >
                Apply Now
              </button>
            </div>
            <div className="flex flex-wrap gap-4 py-6 border-y border-gray-100">
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold border border-gray-100"><MapPin size={20} /> {selectedJob.location}</div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold border border-gray-100"><Briefcase size={20} /> {selectedJob.type}</div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold border border-gray-100"><DollarSign size={20} /> {selectedJob.salary}</div>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <h2 className="text-2xl font-black text-gray-900">Job Description</h2>
              <p>{selectedJob.description}</p>
              <div className="space-y-4 mt-8">
                <h3 className="text-xl font-bold text-gray-900">Requirements</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-sm font-medium">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-['Inter']">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="text-emerald-400" />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      {isLoggedIn && view !== ViewState.PROFILE_SETUP && (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm print:hidden">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView(userRole === 'COMPANY' ? ViewState.COMPANY_PORTAL : ViewState.HOME)}>
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">BQ</div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-black text-emerald-600">Bano Qabil</h1>
                <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Portal</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10 text-sm font-bold text-gray-500">
              {(userRole === 'STUDENT' || userRole === 'ADMIN') && (
                <button onClick={() => setView(ViewState.HOME)} className={`flex items-center gap-2 hover:text-emerald-600 transition-colors ${view === ViewState.HOME ? 'text-emerald-600' : ''}`}>
                  <Briefcase size={20} /> Jobs
                </button>
              )}
              {(userRole === 'COMPANY' || userRole === 'ADMIN') && (
                <button onClick={() => setView(ViewState.COMPANY_PORTAL)} className={`flex items-center gap-2 hover:text-emerald-600 transition-colors ${view === ViewState.COMPANY_PORTAL ? 'text-emerald-600' : ''}`}>
                  <Users size={20} /> Talent Hub
                </button>
              )}
              {userRole === 'ADMIN' && (
                <button onClick={() => setView(ViewState.ADMIN)} className={`flex items-center gap-2 hover:text-emerald-600 transition-colors ${view === ViewState.ADMIN ? 'text-emerald-600' : ''}`}>
                  <Settings size={20} /> Admin Panel
                </button>
              )}
            </div>

            <div className="flex items-center gap-6">
              <button onClick={handleLogout} className="text-xs font-black uppercase text-gray-400 hover:text-red-600 transition-colors flex items-center gap-2">
                <LogOut size={18} /> Sign Out
              </button>
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-black text-xs border border-emerald-200">
                {userRole[0]}
              </div>
            </div>
          </div>
        </nav>
      )}
      <div className="flex-1">{renderContent()}</div>
      {isAIModalOpen && <AIModal onClose={() => setIsAIModalOpen(false)} userSkills={currentUserProfile && 'skills' in currentUserProfile ? currentUserProfile.skills : []} />}
    </div>
  );
}
