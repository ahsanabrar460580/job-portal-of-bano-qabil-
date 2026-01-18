
import React, { useState, useMemo, useEffect } from 'react';
import { Search, MapPin, Filter, User, Bell, LayoutDashboard, Briefcase, Sparkles, LogOut, ChevronRight, DollarSign, Settings, Building2, Users, FileText, CheckCircle2, Building, MessageSquare, Send, Inbox } from 'lucide-react';
import { MOCK_JOBS, JOB_CATEGORIES, MOCK_STUDENTS, MOCK_COMPANIES } from './constants';
import { Job, ViewState, Student, Company, UserRole, Interaction, Notification, ChatThread, Message } from './types';
import { JobCard } from './components/JobCard';
import { AIModal } from './components/AIModal';
import { AdminPortal } from './components/AdminPortal';
import { LoginPage } from './components/LoginPage';
import { StudentDirectory } from './components/StudentDirectory';
import { StudentProfileForm, CompanyProfileForm } from './components/ProfileSetupForms';
import { StudentCV } from './components/StudentCV';
import { CompanyCard } from './components/CompanyCard';
import { ChatSystem } from './components/ChatSystem';

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
  const [showNotifications, setShowNotifications] = useState(false);

  // Global State
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [threads, setThreads] = useState<ChatThread[]>([]);

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

  const myNotifications = useMemo(() => {
    if (!currentUserProfile) return [];
    return notifications.filter(n => n.recipientId === currentUserProfile.id);
  }, [notifications, currentUserProfile]);

  const unreadCount = myNotifications.filter(n => !n.isRead).length;

  const handleLogin = (role: UserRole) => {
    setIsLoggedIn(true);
    setUserRole(role);
    
    // Log entry for admin tracking
    const tempId = `temp-${Date.now()}`;
    const tempName = role === 'ADMIN' ? 'Site Administrator' : 'Guest User';
    
    setInteractions(prev => [{
      id: `login-${Date.now()}`,
      type: 'LOGIN',
      fromId: tempId,
      fromName: tempName,
      itemName: 'Bano Qabil Portal Session',
      timestamp: new Date().toLocaleString()
    }, ...prev]);

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
    setThreads([]);
    setNotifications([]);
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

  const startOrGetThread = (participant: { id: string, name: string, role: UserRole }) => {
    if (!currentUserProfile) return;
    const existing = threads.find(t => t.participants.some(p => p.id === participant.id));
    if (existing) {
      setView(ViewState.MESSAGES);
      return;
    }

    const newThread: ChatThread = {
      id: `thread-${Date.now()}`,
      participants: [
        { id: currentUserProfile.id, name: currentUserProfile.name, role: userRole },
        participant
      ],
      lastMessage: '',
      messages: []
    };
    setThreads([newThread, ...threads]);
    setView(ViewState.MESSAGES);
  };

  const handleApply = (job: Job) => {
    if (!currentUserProfile) return;
    const company = companies.find(c => c.name === job.company);
    
    const newInteraction: Interaction = {
      id: Date.now().toString(),
      type: 'APPLICATION',
      fromId: currentUserProfile.id,
      fromName: currentUserProfile.name,
      toId: company?.id,
      toName: job.company,
      itemName: job.title,
      timestamp: new Date().toLocaleString()
    };

    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      recipientId: company?.id || 'all-companies',
      senderName: currentUserProfile.name,
      message: `is interested in your post: ${job.title}`,
      type: 'APPLICATION_ALERT',
      timestamp: new Date().toLocaleString(),
      isRead: false
    };

    setInteractions([newInteraction, ...interactions]);
    setNotifications([newNotification, ...notifications]);
    showToast(`Application sent! Employer has been notified.`);
  };

  const handleHire = (student: Student) => {
    if (!currentUserProfile) return;
    
    // Log interaction
    const newInteraction: Interaction = {
      id: Date.now().toString(),
      type: 'HIRING',
      fromId: currentUserProfile.id,
      fromName: currentUserProfile.name,
      toId: student.id,
      toName: student.name,
      itemName: student.course,
      timestamp: new Date().toLocaleString()
    };

    // Notify student
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      recipientId: student.id,
      senderName: currentUserProfile.name,
      message: `has officially invited you to join their team!`,
      type: 'HIRE_OFFER',
      timestamp: new Date().toLocaleString(),
      isRead: false
    };

    setInteractions([newInteraction, ...interactions]);
    setNotifications([newNotification, ...notifications]);
    
    // Switch to message side automatically
    startOrGetThread({ id: student.id, name: student.name, role: 'STUDENT' });
    showToast(`Hire request sent! You can now message ${student.name} directly.`);
  };

  const handleSendMessage = (threadId: string, text: string) => {
    if (!currentUserProfile) return;
    setThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        const newMessage: Message = {
          id: Date.now().toString(),
          senderId: currentUserProfile.id,
          senderName: currentUserProfile.name,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        return {
          ...t,
          lastMessage: text,
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => n.recipientId === currentUserProfile?.id ? { ...n, isRead: true } : n));
    setShowNotifications(false);
  };

  const handleViewCV = (student: Student) => {
    setSelectedStudent(student);
    setView(ViewState.STUDENT_CV);
  };

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setView(ViewState.JOB_DETAILS);
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
      case ViewState.MESSAGES:
        return <ChatSystem threads={threads} currentUserId={currentUserProfile?.id || ''} onSendMessage={handleSendMessage} />;
      default:
        return renderHome();
    }
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 space-y-6">
        {/* Proposals Section for Students */}
        {userRole === 'STUDENT' && interactions.some(i => i.type === 'HIRING' && i.toId === currentUserProfile?.id) && (
          <div className="bg-amber-600 p-6 rounded-3xl shadow-lg text-white space-y-4">
            <Inbox className="w-10 h-10 text-amber-200" />
            <h3 className="font-bold text-lg leading-tight">Hire Offers</h3>
            <p className="text-amber-100 text-sm">Companies want to work with you!</p>
            <div className="space-y-2">
              {interactions.filter(i => i.type === 'HIRING' && i.toId === currentUserProfile?.id).map(proposal => (
                <div key={proposal.id} className="bg-white/10 p-3 rounded-xl border border-white/20">
                  <p className="text-xs font-bold">{proposal.fromName}</p>
                  <button 
                    onClick={() => startOrGetThread({ id: proposal.fromId, name: proposal.fromName, role: 'COMPANY' })}
                    className="text-[10px] text-amber-200 font-black uppercase tracking-widest mt-1 hover:underline flex items-center gap-1"
                  >
                    Reply in Messages <ChevronRight size={10} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Filter size={18} /> Categories
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
            <h3 className="font-bold text-lg leading-tight">Professional CV</h3>
            <button 
              onClick={() => currentUserProfile ? handleViewCV(currentUserProfile as Student) : setView(ViewState.PROFILE_SETUP)}
              className="w-full bg-emerald-600 text-white font-bold py-2 rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
            >
              My Digital CV
            </button>
          </div>
        )}
      </aside>

      <main className="flex-1 space-y-10">
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-black text-gray-900 leading-none mb-1">Partner Companies</h2>
              <p className="text-gray-500 text-sm">Active recruiters on Bano Qabil Hub.</p>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            {companies.map(company => (
              <div key={company.id} className="relative group">
                <CompanyCard company={company} />
                <button 
                  onClick={() => startOrGetThread({ id: company.id, name: company.name, role: 'COMPANY' })}
                  className="absolute top-2 right-2 p-2 bg-emerald-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <MessageSquare size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search jobs or roles..."
                className="w-full pl-12 pr-4 py-4 border-none rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg">
              Find Jobs
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );

  const renderJobDetails = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button onClick={() => setView(ViewState.HOME)} className="flex items-center gap-2 text-emerald-600 font-black hover:underline group">
        <ChevronRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back
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
              <div className="flex gap-3">
                <button 
                   onClick={() => {
                     const c = companies.find(comp => comp.name === selectedJob.company);
                     if(c) startOrGetThread({ id: c.id, name: c.name, role: 'COMPANY' });
                   }}
                   className="bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <MessageSquare size={20} /> Discussion
                </button>
                <button 
                  onClick={() => handleApply(selectedJob)}
                  className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl"
                >
                  Submit Application
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 py-6 border-y border-gray-100">
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold border border-gray-100"><MapPin size={20} /> {selectedJob.location}</div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold border border-gray-100"><Briefcase size={20} /> {selectedJob.type}</div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-5 py-3 rounded-2xl text-sm font-bold border border-gray-100"><DollarSign size={20} /> {selectedJob.salary}</div>
            </div>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <h2 className="text-2xl font-black text-gray-900">Responsibilities</h2>
              <p>{selectedJob.description}</p>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">Key Qualifications</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm bg-gray-50 p-3 rounded-xl border">
                      <CheckCircle2 size={16} className="text-emerald-500" /> {req}
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

  const addStudent = (s: Student) => setStudents([s, ...students]);
  const addCompany = (c: Company) => setCompanies([c, ...companies]);
  const addJob = (j: Job) => setJobs([j, ...jobs]);

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
                <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Careers</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
              {(userRole === 'STUDENT' || userRole === 'ADMIN') && (
                <button onClick={() => setView(ViewState.HOME)} className={`hover:text-emerald-600 ${view === ViewState.HOME ? 'text-emerald-600' : ''}`}>Browse Jobs</button>
              )}
              {(userRole === 'COMPANY' || userRole === 'ADMIN') && (
                <button onClick={() => setView(ViewState.COMPANY_PORTAL)} className={`hover:text-emerald-600 ${view === ViewState.COMPANY_PORTAL ? 'text-emerald-600' : ''}`}>Find Talent</button>
              )}
              <button onClick={() => setView(ViewState.MESSAGES)} className={`hover:text-emerald-600 ${view === ViewState.MESSAGES ? 'text-emerald-600' : ''}`}>Messages</button>
              {userRole === 'ADMIN' && (
                <button onClick={() => setView(ViewState.ADMIN)} className={`hover:text-emerald-600 ${view === ViewState.ADMIN ? 'text-emerald-600' : ''}`}>Admin</button>
              )}
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-xl transition-all relative ${unreadCount > 0 ? 'bg-emerald-50 text-emerald-600' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                  <Bell size={20} />
                  {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-black">{unreadCount}</span>}
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b flex justify-between items-center">
                      <span className="font-black text-sm text-gray-900">Alerts</span>
                      <button onClick={markNotificationsRead} className="text-[10px] font-black uppercase text-emerald-600 hover:underline">Clear all</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto no-scrollbar">
                      {myNotifications.length > 0 ? myNotifications.map(n => (
                        <div key={n.id} className={`p-4 border-b flex gap-3 transition-colors ${!n.isRead ? 'bg-emerald-50/50' : ''}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-[10px] flex-shrink-0 ${n.type === 'HIRE_OFFER' ? 'bg-amber-500' : 'bg-blue-500'}`}>
                            {n.senderName[0]}
                          </div>
                          <div>
                            <p className="text-xs text-gray-700 leading-snug">
                              <span className="font-bold">{n.senderName}</span> {n.message}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">{n.timestamp}</p>
                          </div>
                        </div>
                      )) : (
                        <div className="p-10 text-center text-gray-400">
                          <p className="text-xs">No alerts yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={handleLogout} className="text-xs font-black uppercase text-gray-400 hover:text-red-600 transition-colors">Log Out</button>
            </div>
          </div>
        </nav>
      )}
      <div className="flex-1">{renderContent()}</div>
      {isAIModalOpen && <AIModal onClose={() => setIsAIModalOpen(false)} userSkills={currentUserProfile && 'skills' in currentUserProfile ? currentUserProfile.skills : []} />}
    </div>
  );
}
