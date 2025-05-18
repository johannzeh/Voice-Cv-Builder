import React from 'react';
import { Card } from '../ui/Card';
import { VoiceInput } from '../ui/VoiceInput';
import { Button } from '../ui/Button';
import { useCV } from '../../context/CVContext';
import { Education } from '../../types';
import { School, GraduationCap, Calendar, Trash2, Plus, FileText } from 'lucide-react';

export const EducationForm: React.FC = () => {
  const { cv, addEducation, updateEducation, removeEducation } = useCV();
  const { education } = cv;

  const handleEducationChange = (id: string, field: keyof Education, value: any) => {
    updateEducation(id, { [field]: value });
  };

  return (
    <Card 
      title="Education" 
      className="mb-6"
      actions={
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={addEducation}
          icon={<Plus size={16} />}
        >
          Add Education
        </Button>
      }
    >
      {education.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="mb-3">No education added yet</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addEducation}
            icon={<Plus size={16} />}
          >
            Add Education
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={edu.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-800">Education {index + 1}</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => removeEducation(edu.id)}
                  icon={<Trash2 size={16} />}
                  className="text-red-600 hover:bg-red-50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><School size={16} /></span>
                    <label className="text-sm font-medium">Institution</label>
                  </div>
                  <VoiceInput
                    initialText={edu.institution}
                    onTextCapture={(text) => handleEducationChange(edu.id, 'institution', text)}
                    placeholder="Stanford University"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><GraduationCap size={16} /></span>
                    <label className="text-sm font-medium">Degree</label>
                  </div>
                  <VoiceInput
                    initialText={edu.degree}
                    onTextCapture={(text) => handleEducationChange(edu.id, 'degree', text)}
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><FileText size={16} /></span>
                    <label className="text-sm font-medium">Field of Study</label>
                  </div>
                  <VoiceInput
                    initialText={edu.field}
                    onTextCapture={(text) => handleEducationChange(edu.id, 'field', text)}
                    placeholder="Computer Science"
                  />
                </div>

                <div>
                  <div className="flex items-center mb-1 text-gray-700">
                    <span className="mr-1"><Calendar size={16} /></span>
                    <label className="text-sm font-medium">Start Date</label>
                  </div>
                  <VoiceInput
                    initialText={edu.startDate}
                    onTextCapture={(text) => handleEducationChange(edu.id, 'startDate', text)}
                    placeholder="September 2016"
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
                      id={`current-edu-${edu.id}`}
                      checked={edu.current}
                      onChange={(e) => handleEducationChange(edu.id, 'current', e.target.checked)}
                      className="mr-2"
                    />
                    <label htmlFor={`current-edu-${edu.id}`} className="text-xs text-gray-600">
                      I'm currently studying here
                    </label>
                  </div>
                  <VoiceInput
                    initialText={edu.endDate}
                    onTextCapture={(text) => handleEducationChange(edu.id, 'endDate', text)}
                    placeholder={edu.current ? "Present" : "June 2020"}
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center mb-1 text-gray-700">
                  <span className="mr-1"><FileText size={16} /></span>
                  <label className="text-sm font-medium">Description</label>
                </div>
                <VoiceInput
                  initialText={edu.description}
                  onTextCapture={(text) => handleEducationChange(edu.id, 'description', text)}
                  placeholder="Describe your academic achievements, relevant coursework, or thesis..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};