
import React from 'react';
import { Job } from '../types';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick }) => {
  return (
    <div 
      onClick={() => onClick(job)}
      className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        <img 
          src={job.logo} 
          alt={job.company} 
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {job.title}
            </h3>
            <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded">
              {job.type}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-3">{job.company}</p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-500 text-xs">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={14} />
              {job.salary}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {job.postedAt}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2 overflow-hidden">
        {job.requirements.slice(0, 3).map((req, idx) => (
          <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-full whitespace-nowrap">
            {req}
          </span>
        ))}
      </div>
    </div>
  );
};
