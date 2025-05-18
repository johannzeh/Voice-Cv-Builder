import React from 'react';
import { Card } from '../ui/Card';
import { VoiceInput } from '../ui/VoiceInput';
import { Button } from '../ui/Button';
import { useCV } from '../../context/CVContext';
import { Skill } from '../../types';
import { Code, Trash2, Plus } from 'lucide-react';

export const SkillsForm: React.FC = () => {
  const { cv, addSkill, updateSkill, removeSkill } = useCV();
  const { skills } = cv;

  const handleSkillChange = (id: string, field: keyof Skill, value: any) => {
    updateSkill(id, { [field]: value });
  };

  return (
    <Card 
      title="Skills" 
      className="mb-6"
      actions={
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={addSkill}
          icon={<Plus size={16} />}
        >
          Add Skill
        </Button>
      }
    >
      {skills.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Code size={48} className="mx-auto mb-3 text-gray-400" />
          <p className="mb-3">No skills added yet</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={addSkill}
            icon={<Plus size={16} />}
          >
            Add Skill
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.id} className="flex items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center mb-1 text-gray-700">
                  <span className="mr-1"><Code size={16} /></span>
                  <label className="text-sm font-medium">Skill</label>
                </div>
                <VoiceInput
                  initialText={skill.name}
                  onTextCapture={(text) => handleSkillChange(skill.id, 'name', text)}
                  placeholder="JavaScript, Leadership, Project Management..."
                />
              </div>
              <div className="mt-6">
                <label className="block text-sm text-gray-700 mb-1">Level</label>
                <select
                  value={skill.level}
                  onChange={(e) => handleSkillChange(skill.id, 'level', parseInt(e.target.value))}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={1}>Beginner</option>
                  <option value={2}>Elementary</option>
                  <option value={3}>Intermediate</option>
                  <option value={4}>Advanced</option>
                  <option value={5}>Expert</option>
                </select>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeSkill(skill.id)}
                icon={<Trash2 size={16} />}
                className="text-red-600 hover:bg-red-50 mt-6"
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};