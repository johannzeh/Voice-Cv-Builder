import React from 'react';
import { CV, Skill } from '../../types';
import { Phone, Mail, MapPin, Globe } from 'lucide-react';

interface TemplateProps {
  cv: CV;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;

  const renderSkillBar = (level: number) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${Math.min(level * 20, 100)}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white p-8 shadow-lg min-h-full">
      {/* Header */}
      <header className="border-b-2 border-blue-600 pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">{personalInfo.name || 'Your Name'}</h1>
        <h2 className="text-xl text-blue-600 mb-4">{personalInfo.title || 'Your Title'}</h2>
        
        <div className="text-gray-600 flex flex-wrap gap-x-4 gap-y-2">
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
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">Summary</h3>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">Experience</h3>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h4 className="text-base font-semibold text-gray-800">{exp.position}</h4>
                  <div className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-blue-600 mb-1">{exp.company}</div>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">Education</h3>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h4 className="text-base font-semibold text-gray-800">{edu.degree} in {edu.field}</h4>
                  <div className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                <div className="text-blue-600 mb-1">{edu.institution}</div>
                <p className="text-gray-700 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-lg font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1">Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">{skill.name}</span>
                  <span className="text-sm text-gray-500">
                    {['Beginner', 'Elementary', 'Intermediate', 'Advanced', 'Expert'][skill.level - 1]}
                  </span>
                </div>
                {renderSkillBar(skill.level)}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};