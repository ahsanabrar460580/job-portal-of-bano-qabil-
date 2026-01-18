
import React from 'react';
import { Student } from '../types';
import { Mail, Phone, MapPin, Github, Globe, GraduationCap, Briefcase, Award, ExternalLink, Printer } from 'lucide-react';

interface StudentCVProps {
  student: Student;
  onBack: () => void;
}

export const StudentCV: React.FC<StudentCVProps> = ({ student, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 print:py-0 print:px-0">
      <div className="flex justify-between items-center print:hidden">
        <button onClick={onBack} className="text-emerald-600 font-bold hover:underline">
          &larr; Back
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
        >
          <Printer size={18} /> Print CV
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 print:shadow-none print:border-none">
        {/* Header */}
        <div className="bg-emerald-600 p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">{student.name}</h1>
              <p className="text-xl text-emerald-100 font-medium uppercase tracking-widest">{student.course} Graduate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-sm space-y-2">
              <div className="flex items-center gap-2"><Mail size={16} /> {student.email}</div>
              <div className="flex items-center gap-2"><Phone size={16} /> {student.number}</div>
              <div className="flex items-center gap-2"><MapPin size={16} /> {student.campus}, Karachi</div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Award size={18} /> Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {student.skills.map(skill => (
                  <span key={skill} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-xs font-bold border border-emerald-100">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Globe size={18} /> Online Presence
              </h3>
              <div className="space-y-3">
                {student.github && (
                  <a href={student.github} target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    <Github size={16} /> GitHub Profile
                  </a>
                )}
                {student.portfolio && (
                  <a href={student.portfolio} target="_blank" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors text-sm">
                    <Globe size={16} /> Portfolio Website
                  </a>
                )}
              </div>
            </section>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-3 flex items-center gap-2">
                <GraduationCap size={18} /> Education
              </h3>
              <div className="space-y-1">
                <p className="font-bold text-gray-900">Bano Qabil Program</p>
                <p className="text-emerald-600 text-sm font-medium">{student.course}</p>
                <p className="text-xs text-gray-500">{student.batch}</p>
              </div>
            </section>
          </div>

          {/* Main Body */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-emerald-100 pb-2 mb-6 flex items-center gap-2">
                <Briefcase size={22} className="text-emerald-600" /> Work Experience
              </h3>
              <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {student.experiences || "Fresh graduate with a focus on project excellence through Bano Qabil."}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-emerald-100 pb-2 mb-6 flex items-center gap-2">
                <Award size={22} className="text-emerald-600" /> Course Projects
              </h3>
              <div className="grid grid-cols-1 gap-6">
                {student.courseProjects && student.courseProjects.length > 0 ? (
                  student.courseProjects.map((project, idx) => (
                    <div key={idx} className="border-l-4 border-emerald-500 pl-6 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 text-lg">{project.title}</h4>
                        {project.link && (
                          <a href={project.link} target="_blank" className="text-emerald-600 hover:text-emerald-700">
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No specific course projects listed.</p>
                )}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-gray-900 border-b-2 border-emerald-100 pb-2 mb-4">About Me</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {student.otherDetails || "Determined professional aiming to contribute effectively to the industry through technical expertise gained during the Bano Qabil vocational training."}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
