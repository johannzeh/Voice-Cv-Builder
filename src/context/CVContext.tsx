import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CV, PersonalInfo, Experience, Education, Skill } from '../types';

interface CVContextType {
  cv: CV;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  changeTemplate: (template: CV['template']) => void;
  resetCV: () => void;
}

const defaultPersonalInfo: PersonalInfo = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
};

const defaultCV: CV = {
  personalInfo: defaultPersonalInfo,
  experiences: [],
  education: [],
  skills: [],
  template: 'modern',
};

const CVContext = createContext<CVContextType | undefined>(undefined);

export const CVProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cv, setCv] = useState<CV>(() => {
    const savedCV = localStorage.getItem('cv');
    return savedCV ? JSON.parse(savedCV) : defaultCV;
  });

  useEffect(() => {
    localStorage.setItem('cv', JSON.stringify(cv));
  }, [cv]);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setCv(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info,
      },
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuidv4(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCv(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const updateExperience = (id: string, data: Partial<Experience>) => {
    setCv(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, ...data } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setCv(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id),
    }));
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setCv(prev => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setCv(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, ...data } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setCv(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id),
    }));
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: uuidv4(),
      name: '',
      level: 3,
    };
    setCv(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, data: Partial<Skill>) => {
    setCv(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, ...data } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setCv(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id),
    }));
  };

  const changeTemplate = (template: CV['template']) => {
    setCv(prev => ({
      ...prev,
      template,
    }));
  };

  const resetCV = () => {
    setCv(defaultCV);
  };

  return (
    <CVContext.Provider
      value={{
        cv,
        updatePersonalInfo,
        addExperience,
        updateExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        addSkill,
        updateSkill,
        removeSkill,
        changeTemplate,
        resetCV,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};

export const useCV = (): CVContextType => {
  const context = useContext(CVContext);
  if (context === undefined) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};