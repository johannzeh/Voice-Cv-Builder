import React from 'react';
import { CV } from '../../types';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  cv: CV;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;

  return (
    <div className="bg-white p-8 shadow-lg min-h-full font-serif">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 uppercase tracking-wide mb-1">
          {personalInfo.name || 'Your Name'}
        </h1>
        <h2 className="text-xl text-gray-700 mb-4">
          {personalInfo.title || 'Your Title'}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail size={16} className="mr-1" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone size={16} className="mr-1" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe size={16} className="mr-1" />
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3 text-center uppercase border-b border-t border-gray-300 py-1">
            Professional Summary
          </h3>
          <p className="text-gray-700 text-center">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center uppercase border-b border-t border-gray-300 py-1">
            Professional Experience
          </h3>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between mb-1">
                  <h4 className="text-base font-bold text-gray-900">{exp.position}</h4>
                  <div className="text-gray-600 italic">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-gray-800 font-semibold mb-1">{exp.company}</div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center uppercase border-b border-t border-gray-300 py-1">
            Education
          </h3>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between mb-1">
                  <h4 className="text-base font-bold text-gray-900">{edu.degree} in {edu.field}</h4>
                  <div className="text-gray-600 italic">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                <div className="text-gray-800 font-semibold mb-1">{edu.institution}</div>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center uppercase border-b border-t border-gray-300 py-1">
            Skills
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {skills.map((skill) => (
              <div key={skill.id} className="bg-gray-100 text-gray-800 px-3 py-1 rounded">
                {skill.name}
                {' '}
                <span className="text-gray-500">
                  {
                    skill.level === 5 ? '(Expert)' : 
                    skill.level === 4 ? '(Advanced)' : 
                    skill.level === 3 ? '(Intermediate)' : 
                    skill.level === 2 ? '(Elementary)' : '(Beginner)'
                  }
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};