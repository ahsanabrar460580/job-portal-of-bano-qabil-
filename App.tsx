
import React, { useState, useMemo } from 'react';
// Added missing DollarSign import
import { Search, MapPin, Filter, User, Bell, LayoutDashboard, Briefcase, Sparkles, LogOut, ChevronRight, DollarSign } from 'lucide-react';
import { MOCK_JOBS, JOB_CATEGORIES } from './constants';
import { Job, ViewState } from './types';
import { JobCard } from './components/JobCard';
import { AIModal } from './components/AIModal';

export default function App() {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

  // User State Mock
  const [userSkills] = useState(['Python', 'JavaScript', 'SQL']);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
    setView(ViewState.JOB_DETAILS);
  };

  const renderHome = () => (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Filter size={18} /> Filters
          </h3>
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Category</p>
            <button 
              onClick={() => setSelectedCategory('All')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === 'All' ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              All Jobs
            </button>
            {JOB_CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-emerald-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg text-white space-y-4">
          <Sparkles className="w-10 h-10 text-yellow-300" />
          <h3 className="font-bold text-lg leading-tight">Bano Qabil Career AI</h3>
          <p className="text-emerald-100 text-sm">Let our AI help you find the perfect role based on your coursework.</p>
          <button 
            onClick={() => setIsAIModalOpen(true)}
            className="w-full bg-white text-emerald-600 font-bold py-2 rounded-lg hover:bg-emerald-50 transition-colors shadow-md"
          >
            Get Advice
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-6">
        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search jobs, companies, or keywords..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative min-w-[150px]">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 appearance-none text-gray-600">
              <option>Pakistan</option>
              <option>Karachi</option>
              <option>Lahore</option>
              <option>Islamabad</option>
            </select>
          </div>
          <button className="bg-emerald-600 text-white px-8 py-2 rounded-xl font-bold hover:bg-emerald-700 transition-colors">
            Search
          </button>
        </div>

        {/* Job Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onClick={handleJobClick} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
              No jobs found matching your criteria.
            </div>
          )}
        </div>
      </main>
    </div>
  );

  const renderJobDetails = () => (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <button 
        onClick={() => setView(ViewState.HOME)}
        className="flex items-center gap-2 text-emerald-600 font-semibold hover:underline"
      >
        <ChevronRight size={20} className="rotate-180" /> Back to Listings
      </button>

      {selectedJob && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-emerald-600 relative">
            <img 
              src={selectedJob.logo} 
              alt={selectedJob.company} 
              className="absolute -bottom-6 left-8 w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
            />
          </div>
          <div className="pt-12 p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{selectedJob.title}</h1>
                <p className="text-lg text-emerald-600 font-medium">{selectedJob.company}</p>
              </div>
              <button className="bg-emerald-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-shadow shadow-lg">
                Apply Now
              </button>
            </div>

            <div className="flex flex-wrap gap-4 py-4 border-y border-gray-50">
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <MapPin size={18} /> {selectedJob.location}
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <Briefcase size={18} /> {selectedJob.type}
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                <DollarSign size={18} className="hidden" /> {selectedJob.salary}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">About the Role</h2>
              <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold">Requirements</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedJob.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(ViewState.HOME)}>
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-black text-xl">BQ</div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-none text-emerald-600">Bano Qabil</h1>
              <span className="text-xs text-gray-400 font-medium tracking-widest uppercase">Job Hub</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <button 
              onClick={() => setView(ViewState.HOME)} 
              className={`hover:text-emerald-600 transition-colors ${view === ViewState.HOME ? 'text-emerald-600' : ''}`}
            >
              Jobs
            </button>
            <button className="hover:text-emerald-600 transition-colors">Training</button>
            <button className="hover:text-emerald-600 transition-colors">Resources</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
              <Bell size={20} />
            </button>
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                <img src="https://picsum.photos/seed/user/100/100" alt="Avatar" />
              </div>
              <span className="text-sm font-bold text-gray-700 hidden sm:block">Ali Ahmed</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Area */}
      <div className="flex-1">
        {view === ViewState.HOME ? renderHome() : renderJobDetails()}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-black">BQ</div>
              <h2 className="font-bold text-gray-900">Bano Qabil</h2>
            </div>
            <p className="text-sm text-gray-500">Connecting Bano Qabil graduates with top tier industry opportunities across Pakistan.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Candidates</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="hover:text-emerald-600 cursor-pointer">Browse Jobs</li>
              <li className="hover:text-emerald-600 cursor-pointer">Career Advice</li>
              <li className="hover:text-emerald-600 cursor-pointer">Bano Qabil Courses</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">For Employers</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="hover:text-emerald-600 cursor-pointer">Post a Job</li>
              <li className="hover:text-emerald-600 cursor-pointer">Hiring Solutions</li>
              <li className="hover:text-emerald-600 cursor-pointer">Pricing</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-4">Get the latest job updates delivered.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-gray-50 border rounded-lg px-3 py-2 text-sm flex-1 outline-none focus:ring-1 focus:ring-emerald-500" />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Join</button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Bano Qabil Job Hub. All rights reserved.
        </div>
      </footer>

      {isAIModalOpen && <AIModal onClose={() => setIsAIModalOpen(false)} userSkills={userSkills} />}
    </div>
  );
}
