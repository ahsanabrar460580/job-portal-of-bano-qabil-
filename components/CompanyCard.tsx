
import React from 'react';
import { Company } from '../types';
import { Globe, ExternalLink } from 'lucide-react';

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({ company }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center group min-w-[160px]">
      <div className="relative mb-3">
        <img 
          src={company.logo} 
          alt={company.name} 
          className="w-16 h-16 rounded-xl object-cover border border-gray-50"
        />
        <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white shadow-sm" />
      </div>
      <h4 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-emerald-600 transition-colors">
        {company.name}
      </h4>
      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-3">
        {company.industry}
      </p>
      <a 
        href={company.website.startsWith('http') ? company.website : `https://${company.website}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-emerald-600 text-[10px] font-black hover:underline mt-auto"
      >
        <Globe size={10} /> Visit <ExternalLink size={10} />
      </a>
    </div>
  );
};
