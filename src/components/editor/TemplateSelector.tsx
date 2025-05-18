import React from 'react';
import { Card } from '../ui/Card';
import { useCV } from '../../context/CVContext';
import { Layout } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { cv, changeTemplate } = useCV();
  const { template } = cv;

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with a fresh look',
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional and professional layout',
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple and elegant design focused on content',
    },
  ] as const;

  return (
    <Card title="CV Template" className="mb-6">
      <div className="flex items-center mb-3 text-gray-700">
        <span className="mr-1"><Layout size={16} /></span>
        <label className="text-sm font-medium">Select a template</label>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div 
            key={t.id}
            className={`
              border rounded-md p-4 cursor-pointer transition-all
              ${template === t.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            onClick={() => changeTemplate(t.id)}
          >
            <div className="flex items-center mb-2">
              <div 
                className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center
                  ${template === t.id ? 'border-blue-500' : 'border-gray-300'}
                `}
              >
                {template === t.id && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
              </div>
              <h3 className="font-medium text-gray-800">{t.name}</h3>
            </div>
            <p className="text-sm text-gray-500">{t.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};