import React from 'react';
import { CV } from '../../types';

interface TemplateProps {
  cv: CV;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ cv }) => {
  const { personalInfo, experiences, education, skills } = cv;

  return (
    <div className="bg-white p-8 shadow-lg min-h-full font-sans">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-1">
          {personalInfo.name || 'Your Name'}
        </h1>
        <h2 className="text-lg text-gray-600 mb-3">
          {personalInfo.title || 'Your Title'}
        </h2>
        
        <div className="text-sm text-gray-600 space-y-1">
          {personalInfo.email && (
            <div>{personalInfo.email}</div>
          )}
          
          {personalInfo.phone && (
            <div>{personalInfo.phone}</div>
          )}
          
          {personalInfo.location && (
            <div>{personalInfo.location}</div>
          )}
          
          {personalInfo.website && (
            <div>{personalInfo.website}</div>
          )}
        </div>
      </header>
      
      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <h3 className="text-base uppercase tracking-wider text-gray-500 mb-2">About</h3>
          <div className="h-px bg-gray-200 mb-3"></div>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </section>
      )}
      
      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h3 className="text-base uppercase tracking-wider text-gray-500 mb-2">Experience</h3>
          <div className="h-px bg-gray-200 mb-3"></div>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-gray-800 font-medium">{exp.position}</h4>
                  <div className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </div>
                </div>
                <div className="text-gray-600 mb-2">{exp.company}</div>
                <p className="text-gray-700 text-sm">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h3 className="text-base uppercase tracking-wider text-gray-500 mb-2">Education</h3>
          <div className="h-px bg-gray-200 mb-3"></div>
          <div className="space-y-5">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-gray-800 font-medium">{edu.degree} in {edu.field}</h4>
                  <div className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  </div>
                </div>
                <div className="text-gray-600 mb-2">{edu.institution}</div>
                <p className="text-gray-700 text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h3 className="text-base uppercase tracking-wider text-gray-500 mb-2">Skills</h3>
          <div className="h-px bg-gray-200 mb-3"></div>
          <div className="grid grid-cols-2 gap-y-3">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">{skill.name}</span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div 
                        key={level}
                        className={`w-2 h-2 mx-0.5 rounded-full ${
                          level <= skill.level ? 'bg-gray-700' : 'bg-gray-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};