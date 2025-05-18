import React from 'react';
import { Card } from '../ui/Card';
import { VoiceInput } from '../ui/VoiceInput';
import { Button } from '../ui/Button';
import { useCV } from '../../context/CVContext';
import { Experience } from '../../types';
import { Building, Briefcase, Calendar, Trash2, Plus } from 'lucide-react';

export const ExperienceForm: React.FC = () => {
  const { cv, addExperience, updateExperience, removeExperience } = useCV();
  const { experiences } = cv;

  const handleExperienceChange = (id: string, field: keyof Experience, value: any) => {
    updateExperience(id, { [field]: value });
  };

  return (
    <Card 
      title="Work Experience" 
      className="mb-6"
      actions={
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={addExperience}
          icon={<Plus size={16} />}
        >
          Add Experience
        </Button>
      }
    >
      {experiences.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="mb-3">No work experience added yet</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addExperience}
            icon={<Plus size={16} />}
          >
            Add Work Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">Position {index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeExperience(experience.id)}
                  icon={<Trash2 size={16} />}
                  className="text-red-600 hover:bg-red-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><Building size={16} /></span>
                    <label className="text-sm font-medium">Company</label>
                  </div>
                  <VoiceInput
                    initialText={experience.company}
                    onTextCapture={(text) => handleExperienceChange(experience.id, 'company', text)}
                    placeholder="Google, Inc."
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><Briefcase size={16} /></span>
                    <label className="text-sm font-medium">Position</label>
                  </div>
                  <VoiceInput
                    initialText={experience.position}
                    onTextCapture={(text) => handleExperienceChange(experience.id, 'position', text)}
                    placeholder="Senior Software Engineer"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><Calendar size={16} /></span>
                    <label className="text-sm font-medium">Start Date</label>
                  </div>
                  <VoiceInput
                    initialText={experience.startDate}
                    onTextCapture={(text) => handleExperienceChange(experience.id, 'startDate', text)}
                    placeholder="January 2020"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><Calendar size={16} /></span>
                    <label className="text-sm font-medium">End Date</label>
                  </div>
                  <div className="flex items-center mb-1">
                    <input 
                      type="checkbox" 
                      id={`current-${experience.id}`}
                      checked={experience.current}
                      onChange={(e) => handleExperienceChange(experience.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-${experience.id}`} className="text-xs text-gray-600">
                      I currently work here
                    </label>
                  </div>
                  <VoiceInput
                    initialText={experience.endDate}
                    onTextCapture={(text) => handleExperienceChange(experience.id, 'endDate', text)}
                    placeholder={experience.current ? "Present" : "December 2022"}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center mb-1 text-gray-700">
                  <span className="mr-1"><FileText size={16} /></span>
                  <label className="text-sm font-medium">Description</label>
                </div>
                <VoiceInput
                  initialText={experience.description}
                  onTextCapture={(text) => handleExperienceChange(experience.id, 'description', text)}
                  placeholder="Describe your responsibilities, achievements and notable projects..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

// Import missing FileText icon
import { FileText } from 'lucide-react';