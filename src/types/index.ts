export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
}

export interface CV {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  template: "modern" | "classic" | "minimal";
}

export enum VoiceStatus {
  Inactive = "inactive",
  Listening = "listening",
  Processing = "processing",
}

export enum SectionType {
  PersonalInfo = "personalInfo",
  Experience = "experience",
  Education = "education",
  Skills = "skills",
}