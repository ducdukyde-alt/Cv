import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Save, 
  Upload, 
  Copy, 
  Check, 
  Briefcase, 
  User, 
  GraduationCap, 
  Code, 
  Globe2, 
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { CVData, Language, ExperienceItem, EducationItem, SkillGroup, ProjectItem, LanguageItem, CertificationItem } from '../types/cv';
import { UI_TRANSLATIONS } from '../translations/ui';

interface CVEditorProps {
  initialData: CVData;
  uiLang: Language;
  onSave: (newData: CVData) => void;
  onClose: () => void;
}

export const CVEditor: React.FC<CVEditorProps> = ({
  initialData,
  uiLang,
  onSave,
  onClose,
}) => {
  const [data, setData] = useState<CVData>(initialData);
  const [activeLangTab, setActiveLangTab] = useState<Language>(uiLang);
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'languages' | 'certifications'>('personal');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const t = UI_TRANSLATIONS[uiLang];

  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    onSave(data);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Helper to update personal info
  const updatePersonal = (field: keyof CVData['personal'], value: any) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  // Helper to update a multilingual string field in personal
  const updatePersonalML = (field: 'fullName' | 'title' | 'summary' | 'location', lang: Language, value: string) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: {
          ...prev.personal[field],
          [lang]: value,
        },
      },
    }));
  };

  // Copy text from one language to another for quick translation drafting
  const copyPersonalML = (field: 'fullName' | 'title' | 'summary' | 'location', from: Language, to: Language) => {
    const textToCopy = data.personal[field][from];
    updatePersonalML(field, to, textToCopy);
  };

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          updatePersonal('avatarUrl', reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  /* ---------------- EXPERIENCE HANDLERS ---------------- */
  const addExperience = () => {
    const newId = `exp-${Date.now()}`;
    const newExp: ExperienceItem = {
      id: newId,
      role: { vi: 'Vị trí công việc mới', zh: '新職位名稱', en: 'New Job Role' },
      company: { vi: 'Tên công ty', zh: '公司名稱', en: 'Company Name' },
      location: { vi: 'Hà Nội, Việt Nam', zh: '台北 / 河內', en: 'City, Country' },
      startDate: '01/2024',
      endDate: 'Hiện tại',
      current: true,
      highlights: [
        {
          vi: 'Mô tả thành tích hoặc nhiệm vụ chính...',
          zh: '主要工作職責與專案成果...',
          en: 'Key achievement or primary responsibility...',
        },
      ],
      technologies: ['React', 'TypeScript'],
    };
    setData((prev) => ({ ...prev, experiences: [newExp, ...prev.experiences] }));
    setExpandedItems((prev) => ({ ...prev, [newId]: true }));
  };

  const removeExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((item) => item.id !== id),
    }));
  };

  /* ---------------- EDUCATION HANDLERS ---------------- */
  const addEducation = () => {
    const newId = `edu-${Date.now()}`;
    const newEdu: EducationItem = {
      id: newId,
      degree: { vi: 'Cử nhân / Kỹ sư', zh: '學士學位 / 碩士學位', en: 'Bachelor of Science' },
      institution: { vi: 'Tên trường đại học', zh: '學校名稱', en: 'University Name' },
      location: { vi: 'Hà Nội', zh: '台北', en: 'City' },
      startYear: '2020',
      endYear: '2024',
      gpa: '3.5 / 4.0',
      details: {
        vi: 'Chuyên ngành Công nghệ thông tin',
        zh: '主修資訊工程學系',
        en: 'Major in Computer Science',
      },
    };
    setData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
    setExpandedItems((prev) => ({ ...prev, [newId]: true }));
  };

  const removeEducation = (id: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  /* ---------------- SKILLS HANDLERS ---------------- */
  const addSkillGroup = () => {
    const newId = `skill-${Date.now()}`;
    const newGroup: SkillGroup = {
      id: newId,
      category: { vi: 'Nhóm kỹ năng mới', zh: '新技能分類', en: 'New Skill Category' },
      skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    };
    setData((prev) => ({ ...prev, skillGroups: [...prev.skillGroups, newGroup] }));
  };

  const removeSkillGroup = (id: string) => {
    setData((prev) => ({
      ...prev,
      skillGroups: prev.skillGroups.filter((g) => g.id !== id),
    }));
  };

  /* ---------------- PROJECTS HANDLERS ---------------- */
  const addProject = () => {
    const newId = `proj-${Date.now()}`;
    const newProj: ProjectItem = {
      id: newId,
      title: { vi: 'Tên dự án mới', zh: '新專案名稱', en: 'New Project Title' },
      subtitle: { vi: 'Vai trò & Phạm vi', zh: '專案角色與規模', en: 'Role & Scope' },
      description: {
        vi: 'Mô tả chi tiết giải pháp, công nghệ sử dụng và kết quả đạt được.',
        zh: '專案說明、採用之核心架構與實質產出成效。',
        en: 'Detailed project description, architecture and measurable impact.',
      },
      technologies: ['TypeScript', 'React', 'Node.js'],
      link: 'https://example.com',
    };
    setData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
    setExpandedItems((prev) => ({ ...prev, [newId]: true }));
  };

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  /* ---------------- LANGUAGES HANDLERS ---------------- */
  const addLanguage = () => {
    const newId = `lang-${Date.now()}`;
    const newLang: LanguageItem = {
      id: newId,
      name: { vi: 'Ngoại ngữ mới', zh: '新語言', en: 'New Language' },
      proficiency: { vi: 'Thành thạo', zh: '商務精通', en: 'Fluent' },
      levelPercent: 80,
    };
    setData((prev) => ({ ...prev, languages: [...prev.languages, newLang] }));
  };

  const removeLanguage = (id: string) => {
    setData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  /* ---------------- CERTIFICATIONS HANDLERS ---------------- */
  const addCertification = () => {
    const newId = `cert-${Date.now()}`;
    const newCert: CertificationItem = {
      id: newId,
      name: { vi: 'Chứng chỉ chuyên môn', zh: '專業證照名稱', en: 'Professional Certification' },
      issuer: { vi: 'Tổ chức cấp', zh: '發證機構', en: 'Issuing Body' },
      year: new Date().getFullYear().toString(),
      credentialUrl: '',
    };
    setData((prev) => ({ ...prev, certifications: [...prev.certifications, newCert] }));
  };

  const removeCertification = (id: string) => {
    setData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  // Reusable Language Tab Selector for inline multilingual fields
  const renderLangTabs = (active: Language, onChange: (l: Language) => void) => (
    <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-md border border-stone-200">
      <button
        type="button"
        onClick={() => onChange('vi')}
        className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
          active === 'vi' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        🇻🇳 VI
      </button>
      <button
        type="button"
        onClick={() => onChange('zh')}
        className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
          active === 'zh' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        🇹🇼 繁中
      </button>
      <button
        type="button"
        onClick={() => onChange('en')}
        className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
          active === 'en' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500 hover:text-stone-800'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-xs flex justify-end no-print">
      <div className="w-full max-w-4xl bg-white h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Editor Top Bar */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800 shrink-0">
          <div>
            <h2 className="text-base font-bold text-stone-100 flex items-center gap-2">
              <span>{t.editor.title}</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono">
                VI · 繁中 · EN
              </span>
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              {t.editor.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                saveSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-400 hover:bg-amber-300 text-stone-950'
              }`}
            >
              {saveSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{saveSuccess ? t.actions.saved : t.actions.save}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors"
              title={t.actions.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Focus Language Switcher Toolbar */}
        <div className="bg-stone-100 border-b border-stone-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-stone-700">
              {t.editor.editingLanguageTab}
            </span>
            <div className="flex items-center bg-white p-1 rounded-lg border border-stone-300 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveLangTab('vi')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-colors ${
                  activeLangTab === 'vi'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🇻🇳</span>
                <span>Tiếng Việt</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab('zh')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-colors ${
                  activeLangTab === 'zh'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🇹🇼</span>
                <span>繁體中文</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-md transition-colors ${
                  activeLangTab === 'en'
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-stone-500 hidden sm:flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t.editor.multilingualNotice}</span>
          </div>
        </div>

        {/* Navigation Tabs for Sections */}
        <div className="flex border-b border-stone-200 bg-stone-50/50 px-6 overflow-x-auto shrink-0 gap-1 text-xs">
          {[
            { id: 'personal', label: t.sections.personal, icon: User },
            { id: 'experience', label: t.sections.experience, icon: Briefcase },
            { id: 'education', label: t.sections.education, icon: GraduationCap },
            { id: 'skills', label: t.sections.skills, icon: Code },
            { id: 'projects', label: t.sections.projects, icon: Code },
            { id: 'languages', label: t.sections.languages, icon: Globe2 },
            { id: 'certifications', label: t.sections.certifications, icon: Award },
          ].map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`flex items-center gap-1.5 py-3 px-3 border-b-2 font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-amber-600 text-amber-900 bg-white shadow-2xs font-semibold'
                    : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-stone-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/30">

          {/* SECTION 1: PERSONAL INFORMATION */}
          {activeSection === 'personal' && (
            <div className="space-y-6 max-w-3xl">
              {/* Photo & Basic details */}
              <div className="flex flex-col sm:flex-row gap-6 p-4 bg-white border border-stone-200 rounded-xl">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-24 h-24 rounded-lg border border-stone-200 overflow-hidden bg-stone-100 flex items-center justify-center">
                    {data.personal.avatarUrl ? (
                      <img src={data.personal.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-stone-400" />
                    )}
                  </div>
                  <label className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 px-2.5 py-1 rounded cursor-pointer transition-colors flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>{t.actions.uploadPhoto}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  </label>
                  {data.personal.avatarUrl && (
                    <button
                      type="button"
                      onClick={() => updatePersonal('avatarUrl', '')}
                      className="text-[11px] text-rose-600 hover:underline"
                    >
                      {t.actions.removePhoto}
                    </button>
                  )}
                </div>

                <div className="flex-1 space-y-3">
                  {/* Full Name Multilingual */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-stone-700">
                        {t.fields.fullName} ({activeLangTab.toUpperCase()})
                      </label>
                      <div className="flex items-center gap-2">
                        {renderLangTabs(activeLangTab, setActiveLangTab)}
                      </div>
                    </div>
                    <input
                      type="text"
                      value={data.personal.fullName[activeLangTab] || ''}
                      onChange={(e) => updatePersonalML('fullName', activeLangTab, e.target.value)}
                      placeholder={activeLangTab === 'vi' ? 'VD: Nguyễn Minh Khang' : activeLangTab === 'zh' ? '例：阮明康' : 'e.g. Minh Khang Nguyen'}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>

                  {/* Job Title Multilingual */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-stone-700">
                        {t.fields.jobTitle} ({activeLangTab.toUpperCase()})
                      </label>
                    </div>
                    <input
                      type="text"
                      value={data.personal.title[activeLangTab] || ''}
                      onChange={(e) => updatePersonalML('title', activeLangTab, e.target.value)}
                      placeholder={activeLangTab === 'vi' ? 'VD: Kỹ sư Phần mềm Cao cấp' : activeLangTab === 'zh' ? '例：資深軟體工程師' : 'e.g. Senior Software Engineer'}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>

                  {/* Location Multilingual */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.fields.location} ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={data.personal.location[activeLangTab] || ''}
                      onChange={(e) => updatePersonalML('location', activeLangTab, e.target.value)}
                      placeholder={activeLangTab === 'vi' ? 'VD: Hà Nội, Việt Nam / Đài Bắc' : activeLangTab === 'zh' ? '例：河內，越南 / 台北' : 'e.g. Hanoi, Vietnam / Taipei'}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Summary Bio Multilingual */}
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-stone-700">
                    {t.fields.summary} ({activeLangTab.toUpperCase()})
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400">{t.actions.copyFrom}:</span>
                    {(['vi', 'zh', 'en'] as Language[])
                      .filter((l) => l !== activeLangTab)
                      .map((fromL) => (
                        <button
                          key={fromL}
                          type="button"
                          onClick={() => copyPersonalML('summary', fromL, activeLangTab)}
                          className="text-[10px] text-stone-600 bg-stone-100 hover:bg-stone-200 px-1.5 py-0.5 rounded transition-colors"
                        >
                          {fromL.toUpperCase()}
                        </button>
                      ))}
                  </div>
                </div>
                <textarea
                  rows={5}
                  value={data.personal.summary[activeLangTab] || ''}
                  onChange={(e) => updatePersonalML('summary', activeLangTab, e.target.value)}
                  placeholder="Nhập phần tóm tắt kinh nghiệm, điểm mạnh và định hướng sự nghiệp..."
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              {/* Contact info (Universal across languages) */}
              <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  {t.sections.contact}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-stone-600 mb-1">{t.fields.email}</label>
                    <input
                      type="email"
                      value={data.personal.email}
                      onChange={(e) => updatePersonal('email', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1">{t.fields.phone}</label>
                    <input
                      type="text"
                      value={data.personal.phone}
                      onChange={(e) => updatePersonal('phone', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1">{t.fields.website}</label>
                    <input
                      type="url"
                      value={data.personal.website}
                      onChange={(e) => updatePersonal('website', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-stone-600 mb-1">{t.fields.github}</label>
                    <input
                      type="url"
                      value={data.personal.github}
                      onChange={(e) => updatePersonal('github', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:border-amber-600"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-stone-600 mb-1">{t.fields.linkedin}</label>
                    <input
                      type="url"
                      value={data.personal.linkedin}
                      onChange={(e) => updatePersonal('linkedin', e.target.value)}
                      className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg focus:border-amber-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: WORK EXPERIENCE */}
          {activeSection === 'experience' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {data.experiences.length} {t.sections.experience.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.actions.add}</span>
                </button>
              </div>

              {data.experiences.map((exp, expIdx) => {
                const isExpanded = expandedItems[exp.id] ?? true;
                return (
                  <div key={exp.id} className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                    {/* Header bar of experience item */}
                    <div 
                      className="p-4 bg-stone-50/80 border-b border-stone-200 flex items-center justify-between cursor-pointer hover:bg-stone-100/80 transition-colors"
                      onClick={() => toggleExpand(exp.id)}
                    >
                      <div className="flex items-center gap-2">
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
                        <span className="font-semibold text-sm text-stone-900">
                          {exp.role[activeLangTab] || exp.role.en || 'Vị trí công việc'}
                        </span>
                        <span className="text-stone-400 text-xs">at</span>
                        <span className="text-xs font-medium text-amber-800">
                          {exp.company[activeLangTab] || exp.company.en}
                        </span>
                      </div>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <span className="text-xs text-stone-500 font-mono">
                          {exp.startDate} – {exp.current ? 'Hiện tại' : exp.endDate}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeExperience(exp.id)}
                          className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                          title={t.actions.delete}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {t.fields.role} ({activeLangTab.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={exp.role[activeLangTab] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => ({
                                  ...prev,
                                  experiences: prev.experiences.map((item) =>
                                    item.id === exp.id
                                      ? { ...item, role: { ...item.role, [activeLangTab]: val } }
                                      : item
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {t.fields.company} ({activeLangTab.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={exp.company[activeLangTab] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => ({
                                  ...prev,
                                  experiences: prev.experiences.map((item) =>
                                    item.id === exp.id
                                      ? { ...item, company: { ...item.company, [activeLangTab]: val } }
                                      : item
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-stone-700 mb-1">
                              {t.fields.location} ({activeLangTab.toUpperCase()})
                            </label>
                            <input
                              type="text"
                              value={exp.location[activeLangTab] || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setData((prev) => ({
                                  ...prev,
                                  experiences: prev.experiences.map((item) =>
                                    item.id === exp.id
                                      ? { ...item, location: { ...item.location, [activeLangTab]: val } }
                                      : item
                                  ),
                                }));
                              }}
                              className="w-full px-3 py-1.5 text-sm bg-white border border-stone-300 rounded-lg"
                            />
                          </div>

                          <div className="flex gap-2">
                            <div className="flex-1">
                              <label className="block text-xs text-stone-600 mb-1">{t.fields.startDate}</label>
                              <input
                                type="text"
                                value={exp.startDate}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => ({
                                    ...prev,
                                    experiences: prev.experiences.map((item) =>
                                      item.id === exp.id ? { ...item, startDate: val } : item
                                    ),
                                  }));
                                }}
                                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                              />
                            </div>
                            <div className="flex-1">
                              <label className="block text-xs text-stone-600 mb-1">{t.fields.endDate}</label>
                              <input
                                type="text"
                                value={exp.endDate}
                                disabled={exp.current}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setData((prev) => ({
                                    ...prev,
                                    experiences: prev.experiences.map((item) =>
                                      item.id === exp.id ? { ...item, endDate: val } : item
                                    ),
                                  }));
                                }}
                                className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono disabled:bg-stone-100"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Current Checkbox */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id={`curr-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setData((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) =>
                                  item.id === exp.id ? { ...item, current: checked } : item
                                ),
                              }));
                            }}
                            className="rounded text-amber-600 focus:ring-amber-500"
                          />
                          <label htmlFor={`curr-${exp.id}`} className="text-xs text-stone-700 font-medium">
                            {t.fields.currentJob}
                          </label>
                        </div>

                        {/* Highlights (Achievements) for active language */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-xs font-semibold text-stone-700">
                              {t.fields.highlights} ({activeLangTab.toUpperCase()})
                            </label>
                            <span className="text-[11px] text-stone-400">{t.editor.onePerLine}</span>
                          </div>
                          <textarea
                            rows={4}
                            value={exp.highlights.map((h) => h[activeLangTab] || '').join('\n')}
                            onChange={(e) => {
                              const lines = e.target.value.split('\n');
                              setData((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) => {
                                  if (item.id !== exp.id) return item;
                                  const newHighlights = lines.map((line, idx) => {
                                    const old = item.highlights[idx] || { vi: '', zh: '', en: '' };
                                    return {
                                      ...old,
                                      [activeLangTab]: line,
                                    };
                                  });
                                  return { ...item, highlights: newHighlights };
                                }),
                              }));
                            }}
                            placeholder="Mỗi dòng là một thành tích nổi bật của bạn tại vị trí này..."
                            className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg focus:border-amber-600"
                          />
                        </div>

                        {/* Technologies */}
                        <div>
                          <label className="block text-xs font-semibold text-stone-700 mb-1">
                            {t.fields.technologies}
                          </label>
                          <input
                            type="text"
                            value={exp.technologies.join(', ')}
                            onChange={(e) => {
                              const techs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                              setData((prev) => ({
                                ...prev,
                                experiences: prev.experiences.map((item) =>
                                  item.id === exp.id ? { ...item, technologies: techs } : item
                                ),
                              }));
                            }}
                            placeholder="Go, TypeScript, React, Docker..."
                            className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* SECTION 3: EDUCATION */}
          {activeSection === 'education' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {data.education.length} {t.sections.education.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.actions.add}</span>
                </button>
              </div>

              {data.education.map((edu) => (
                <div key={edu.id} className="bg-white border border-stone-200 rounded-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-900">
                      {edu.degree[activeLangTab] || edu.degree.en}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeEducation(edu.id)}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.degree} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={edu.degree[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) =>
                              item.id === edu.id ? { ...item, degree: { ...item.degree, [activeLangTab]: val } } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.institution} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={edu.institution[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) =>
                              item.id === edu.id ? { ...item, institution: { ...item.institution, [activeLangTab]: val } } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-stone-600 mb-1">{t.fields.startYear}</label>
                        <input
                          type="text"
                          value={edu.startYear}
                          onChange={(e) => {
                            const val = e.target.value;
                            setData((prev) => ({
                              ...prev,
                              education: prev.education.map((item) =>
                                item.id === edu.id ? { ...item, startYear: val } : item
                              ),
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-stone-600 mb-1">{t.fields.endYear}</label>
                        <input
                          type="text"
                          value={edu.endYear}
                          onChange={(e) => {
                            const val = e.target.value;
                            setData((prev) => ({
                              ...prev,
                              education: prev.education.map((item) =>
                                item.id === edu.id ? { ...item, endYear: val } : item
                              ),
                            }));
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1">{t.fields.gpa}</label>
                      <input
                        type="text"
                        value={edu.gpa || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            education: prev.education.map((item) =>
                              item.id === edu.id ? { ...item, gpa: val } : item
                            ),
                          }));
                        }}
                        placeholder="3.65 / 4.0"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      {t.fields.details} ({activeLangTab.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      value={edu.details[activeLangTab] || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setData((prev) => ({
                          ...prev,
                          education: prev.education.map((item) =>
                            item.id === edu.id ? { ...item, details: { ...item.details, [activeLangTab]: val } } : item
                          ),
                        }));
                      }}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 4: SKILLS */}
          {activeSection === 'skills' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {data.skillGroups.length} {t.sections.skills.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={addSkillGroup}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.actions.add}</span>
                </button>
              </div>

              {data.skillGroups.map((group) => (
                <div key={group.id} className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 uppercase">
                      {group.category[activeLangTab] || group.category.en}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSkillGroup(group.id)}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.category} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={group.category[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            skillGroups: prev.skillGroups.map((g) =>
                              g.id === group.id ? { ...g, category: { ...g.category, [activeLangTab]: val } } : g
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.skillsList}
                      </label>
                      <input
                        type="text"
                        value={group.skills.join(', ')}
                        onChange={(e) => {
                          const skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setData((prev) => ({
                            ...prev,
                            skillGroups: prev.skillGroups.map((g) =>
                              g.id === group.id ? { ...g, skills } : g
                            ),
                          }));
                        }}
                        placeholder="React, TypeScript, Next.js..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 5: PROJECTS */}
          {activeSection === 'projects' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {data.projects.length} {t.sections.projects.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.actions.add}</span>
                </button>
              </div>

              {data.projects.map((proj) => (
                <div key={proj.id} className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-900">
                      {proj.title[activeLangTab] || proj.title.en}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeProject(proj.id)}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.projectTitle} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={proj.title[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, title: { ...p.title, [activeLangTab]: val } } : p
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.projectSubtitle} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={proj.subtitle[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, subtitle: { ...p.subtitle, [activeLangTab]: val } } : p
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.projectDesc} ({activeLangTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        value={proj.description[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, description: { ...p.description, [activeLangTab]: val } } : p
                            ),
                          }));
                        }}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1">
                        {t.fields.technologies}
                      </label>
                      <input
                        type="text"
                        value={proj.technologies.join(', ')}
                        onChange={(e) => {
                          const techs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          setData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, technologies: techs } : p
                            ),
                          }));
                        }}
                        placeholder="Go, Docker, React"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1">
                        {t.fields.projectLink}
                      </label>
                      <input
                        type="url"
                        value={proj.link || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            projects: prev.projects.map((p) =>
                              p.id === proj.id ? { ...p, link: val } : p
                            ),
                          }));
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 6: LANGUAGES */}
          {activeSection === 'languages' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {data.languages.length} {t.sections.languages.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={addLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.actions.add}</span>
                </button>
              </div>

              {data.languages.map((l) => (
                <div key={l.id} className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-900">
                      {l.name[activeLangTab] || l.name.en}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeLanguage(l.id)}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.languageName} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={l.name[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            languages: prev.languages.map((item) =>
                              item.id === l.id ? { ...item, name: { ...item.name, [activeLangTab]: val } } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.proficiency} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={l.proficiency[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            languages: prev.languages.map((item) =>
                              item.id === l.id ? { ...item, proficiency: { ...item.proficiency, [activeLangTab]: val } } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SECTION 7: CERTIFICATIONS */}
          {activeSection === 'certifications' && (
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500">
                  {data.certifications.length} {t.sections.certifications.toLowerCase()}
                </span>
                <button
                  type="button"
                  onClick={addCertification}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-stone-900 text-stone-100 hover:bg-stone-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.actions.add}</span>
                </button>
              </div>

              {data.certifications.map((c) => (
                <div key={c.id} className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-900">
                      {c.name[activeLangTab] || c.name.en}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeCertification(c.id)}
                      className="text-stone-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.certName} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={c.name[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item) =>
                              item.id === c.id ? { ...item, name: { ...item.name, [activeLangTab]: val } } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1">{t.fields.year}</label>
                      <input
                        type="text"
                        value={c.year}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item) =>
                              item.id === c.id ? { ...item, year: val } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        {t.fields.issuer} ({activeLangTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={c.issuer[activeLangTab] || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item) =>
                              item.id === c.id ? { ...item, issuer: { ...item.issuer, [activeLangTab]: val } } : item
                            ),
                          }));
                        }}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-stone-600 mb-1">{t.fields.credentialUrl}</label>
                      <input
                        type="url"
                        value={c.credentialUrl || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setData((prev) => ({
                            ...prev,
                            certifications: prev.certifications.map((item) =>
                              item.id === c.id ? { ...item, credentialUrl: val } : item
                            ),
                          }));
                        }}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="text-xs text-stone-500">
            {saveSuccess ? (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> {t.editor.subtitle.split('.')[1] || t.actions.saved}
              </span>
            ) : (
              <span>Tip: Bấm "Lưu thay đổi" để cập nhật nội dung xem trước và lưu vào trình duyệt.</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
            >
              {t.actions.close}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.actions.save}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
