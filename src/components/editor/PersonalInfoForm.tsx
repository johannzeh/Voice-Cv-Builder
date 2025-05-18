import React from 'react';
import { Card } from '../ui/Card';
import { VoiceInput } from '../ui/VoiceInput';
import { useCV } from '../../context/CVContext';
import { PersonalInfo } from '../../types';
import { User, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

export const PersonalInfoForm: React.FC = () => {
  const { cv, updatePersonalInfo } = useCV();
  const { personalInfo } = cv;

  const handleTextInput = (field: keyof PersonalInfo, value: string) => {
    updatePersonalInfo({ [field]: value });
  };
  
  const inputFields = [
    {
      label: 'Full Name',
      field: 'name' as keyof PersonalInfo,
      value: personalInfo.name,
      placeholder: 'John Doe',
      icon: <User size={16} />,
    },
    {
      label: 'Job Title',
      field: 'title' as keyof PersonalInfo,
      value: personalInfo.title,
      placeholder: 'Software Engineer',
      icon: <FileText size={16} />,
    },
    {
      label: 'Email',
      field: 'email' as keyof PersonalInfo,
      value: personalInfo.email,
      placeholder: 'john.doe@example.com',
      icon: <Mail size={16} />,
    },
    {
      label: 'Phone',
      field: 'phone' as keyof PersonalInfo,
      value: personalInfo.phone,
      placeholder: '+1 (555) 123-4567',
      icon: <Phone size={16} />,
    },
    {
      label: 'Location',
      field: 'location' as keyof PersonalInfo,
      value: personalInfo.location,
      placeholder: 'New York, NY',
      icon: <MapPin size={16} />,
    },
    {
      label: 'Website',
      field: 'website' as keyof PersonalInfo,
      value: personalInfo.website || '',
      placeholder: 'https://johndoe.com',
      icon: <Globe size={16} />,
    },
  ];

  return (
    <Card title="Personal Information" className="mb-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map((field) => (
            <div key={field.field} className="col-span-1">
              <div className="flex items-center mb-1 text-gray-700">
                <span className="mr-1">{field.icon}</span>
                <label className="text-sm font-medium">{field.label}</label>
              </div>
              <VoiceInput
                initialText={field.value}
                onTextCapture={(text) => handleTextInput(field.field, text)}
                placeholder={field.placeholder}
              />
            </div>
          ))}
        </div>

        <div>
          <div className="flex items-center mb-1 text-gray-700">
            <span className="mr-1"><FileText size={16} /></span>
            <label className="text-sm font-medium">Professional Summary</label>
          </div>
          <VoiceInput
            initialText={personalInfo.summary}
            onTextCapture={(text) => handleTextInput('summary', text)}
            placeholder="Briefly describe your professional background, key skills, and career objectives..."
          />
        </div>
      </div>
    </Card>
  );
};