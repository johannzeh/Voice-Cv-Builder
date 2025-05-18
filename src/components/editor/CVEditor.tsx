import React from 'react';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { TemplateSelector } from './TemplateSelector';
import { Button } from '../ui/Button';
import { useCV } from '../../context/CVContext';
import { Download, Save, Trash2 } from 'lucide-react';

interface CVEditorProps {
  onExport: () => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({ onExport }) => {
  const { resetCV } = useCV();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your CV? This will delete all data.')) {
      resetCV();
    }
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">CV Editor</h1>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              icon={<Trash2 size={16} />}
            >
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {}}
              icon={<Save size={16} />}
            >
              Save
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onExport}
              icon={<Download size={16} />}
            >
              Export PDF
            </Button>
          </div>
        </div>

        <PersonalInfoForm />
        <ExperienceForm />
        <EducationForm />
        <SkillsForm />
        <TemplateSelector />
      </div>
    </div>
  );
};