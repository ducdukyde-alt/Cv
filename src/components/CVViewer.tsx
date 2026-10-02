import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  ExternalLink,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  Code2,
  Calendar
} from 'lucide-react';
import { CVData, Language, CVTheme } from '../types/cv';
import { UI_TRANSLATIONS } from '../translations/ui';

interface CVViewerProps {
  data: CVData;
  lang: Language;
  theme: CVTheme;
}

export const CVViewer: React.FC<CVViewerProps> = ({ data, lang, theme }) => {
  const t = UI_TRANSLATIONS[lang];
  const { personal, experiences, education, skillGroups, projects, languages, certifications } = data;

  const isChinese = lang === 'zh';

  return (
    <div className={`w-full max-w-5xl mx-auto print-clean ${isChinese ? 'font-chinese' : ''}`}>
      {theme === 'editorial' && (
        <EditorialLayout 
          data={data} 
          lang={lang} 
          t={t} 
        />
      )}

      {theme === 'executive' && (
        <ExecutiveLayout 
          data={data} 
          lang={lang} 
          t={t} 
        />
      )}

      {theme === 'minimal' && (
        <MinimalLayout 
          data={data} 
          lang={lang} 
          t={t} 
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------
   THEME 1: EDITORIAL (Refined Classic & Academic Paper)
------------------------------------------------------------- */
const EditorialLayout: React.FC<{ data: CVData; lang: Language; t: any }> = ({
  data,
  lang,
  t,
}) => {
  const { personal, experiences, education, skillGroups, projects, languages, certifications } = data;

  return (
    <article className="bg-white border border-stone-200 shadow-sm rounded-none sm:rounded-xl overflow-hidden print-clean p-6 sm:p-12 transition-all">
      {/* Editorial Header */}
      <header className="border-b border-stone-200 pb-8 mb-8">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-serif-title font-bold text-stone-900 tracking-tight">
              {personal.fullName[lang] || personal.fullName.vi || personal.fullName.en}
            </h1>
            <p className="text-base sm:text-lg text-amber-900/90 font-medium tracking-wide">
              {personal.title[lang] || personal.title.en}
            </p>
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-stone-600 pt-2">
              {personal.email && (
                <a 
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <span>{personal.email}</span>
                </a>
              )}
              {personal.phone && (
                <a 
                  href={`tel:${personal.phone}`}
                  className="flex items-center gap-1.5 hover:text-stone-900 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-stone-500" />
                  <span>{personal.phone}</span>
                </a>
              )}
              {personal.location[lang] && (
                <span className="flex items-center gap-1.5 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>{personal.location[lang]}</span>
                </span>
              )}
              {personal.website && (
                <a 
                  href={personal.website} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-stone-900 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5 text-stone-500" />
                  <span>{personal.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {personal.github && (
                <a 
                  href={personal.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-stone-900 transition-colors"
                >
                  <Github className="w-3.5 h-3.5 text-stone-500" />
                  <span>{personal.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/')}</span>
                </a>
              )}
              {personal.linkedin && (
                <a 
                  href={personal.linkedin} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-1 hover:text-stone-900 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-stone-500" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {personal.avatarUrl && (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border border-stone-200 shadow-sm shrink-0 bg-stone-100">
              <img
                src={personal.avatarUrl}
                alt={personal.fullName[lang]}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* Grid Layout: Main Narrative + Sidebar Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-9">
          {/* Executive Summary */}
          {personal.summary[lang] && (
            <section className="space-y-2.5">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.summary}</span>
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif-title font-light">
                {personal.summary[lang]}
              </p>
            </section>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.experience}</span>
              </h2>

              <div className="space-y-7">
                {experiences.map((exp) => (
                  <div key={exp.id} className="page-break-inside-avoid space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <div>
                        <h3 className="text-base font-semibold text-stone-900">
                          {exp.role[lang] || exp.role.en}
                        </h3>
                        <div className="text-sm font-medium text-amber-900/90">
                          {exp.company[lang] || exp.company.en}
                          {exp.location[lang] && (
                            <span className="text-stone-500 font-normal text-xs ml-2">
                              · {exp.location[lang]}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-stone-500 font-mono tracking-tight shrink-0">
                        {exp.startDate} – {exp.current ? (t.fields.endDate === 'End Date' ? 'Present' : exp.endDate) : exp.endDate}
                      </div>
                    </div>

                    {/* Highlights bullet list */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="list-disc list-outside pl-4 space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        {exp.highlights.map((bullet, idx) => {
                          const text = bullet[lang] || bullet.en || bullet.vi;
                          if (!text) return null;
                          return <li key={idx}>{text}</li>;
                        })}
                      </ul>
                    )}

                    {/* Technologies used */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500 pt-1">
                        <span className="text-stone-400 font-medium">Stack:</span>
                        {exp.technologies.map((tech, idx) => (
                          <React.Fragment key={idx}>
                            <span>{tech}</span>
                            {idx < exp.technologies.length - 1 && (
                              <span className="text-stone-300" aria-hidden="true">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Featured Projects */}
          {projects.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.projects}</span>
              </h2>

              <div className="space-y-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="page-break-inside-avoid space-y-1.5">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
                        <span>{proj.title[lang] || proj.title.en}</span>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-stone-400 hover:text-stone-800 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </h3>
                      {proj.subtitle[lang] && (
                        <span className="text-xs text-stone-500 font-normal">
                          {proj.subtitle[lang]}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {proj.description[lang] || proj.description.en}
                    </p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-xs text-stone-500">
                        {proj.technologies.join(' · ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <aside className="lg:col-span-4 space-y-8 lg:border-l lg:border-stone-100 lg:pl-8">
          {/* Skills */}
          {skillGroups.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.skills}</span>
              </h2>

              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <div key={group.id} className="space-y-1.5">
                    <h3 className="text-xs font-semibold text-stone-800">
                      {group.category[lang] || group.category.en}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {group.skills.join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.education}</span>
              </h2>

              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-1 page-break-inside-avoid">
                    <h3 className="text-xs font-semibold text-stone-900">
                      {edu.degree[lang] || edu.degree.en}
                    </h3>
                    <div className="text-xs text-amber-900 font-medium">
                      {edu.institution[lang] || edu.institution.en}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      {edu.startYear} – {edu.endYear}
                      {edu.gpa && <span> · {edu.gpa}</span>}
                    </div>
                    {edu.details[lang] && (
                      <p className="text-xs text-stone-600 pt-0.5 leading-relaxed">
                        {edu.details[lang]}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.languages}</span>
              </h2>

              <div className="space-y-2.5">
                {languages.map((l) => (
                  <div key={l.id} className="space-y-0.5">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="font-medium text-stone-800">
                        {l.name[lang] || l.name.en}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-600 leading-snug">
                      {l.proficiency[lang] || l.proficiency.en}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-100 pb-1 flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-700" />
                <span>{t.sections.certifications}</span>
              </h2>

              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <div key={cert.id} className="space-y-0.5 page-break-inside-avoid">
                    <div className="text-xs font-medium text-stone-800 flex items-center justify-between">
                      <span>{cert.name[lang] || cert.name.en}</span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-stone-400 hover:text-stone-700"
                        >
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {cert.issuer[lang] || cert.issuer.en} {cert.year && `· ${cert.year}`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
      </div>
    </article>
  );
};

/* -------------------------------------------------------------
   THEME 2: EXECUTIVE (Modern High-Contrast Clean Structure)
------------------------------------------------------------- */
const ExecutiveLayout: React.FC<{ data: CVData; lang: Language; t: any }> = ({
  data,
  lang,
  t,
}) => {
  const { personal, experiences, education, skillGroups, projects, languages, certifications } = data;

  return (
    <article className="bg-white border-t-4 border-t-amber-600 shadow-md sm:rounded-b-xl overflow-hidden print-clean p-6 sm:p-12 transition-all">
      {/* Executive Header Banner */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 border-b-2 border-stone-900 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {personal.fullName[lang] || personal.fullName.vi || personal.fullName.en}
          </h1>
          <p className="text-lg font-semibold text-amber-700 mt-1">
            {personal.title[lang] || personal.title.en}
          </p>
        </div>

        <div className="text-right flex flex-col sm:items-end text-xs text-stone-600 space-y-1">
          {personal.email && <div className="font-mono">{personal.email}</div>}
          {personal.phone && <div>{personal.phone}</div>}
          {personal.location[lang] && <div>{personal.location[lang]}</div>}
          <div className="flex items-center gap-3 pt-1 text-stone-500">
            {personal.website && (
              <a href={personal.website} target="_blank" rel="noreferrer" className="hover:text-stone-900">
                {personal.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {personal.github && (
              <a href={personal.github} target="_blank" rel="noreferrer" className="hover:text-stone-900">
                GitHub
              </a>
            )}
            {personal.linkedin && (
              <a href={personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-stone-900">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personal.summary[lang] && (
        <section className="mb-8">
          <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
            {personal.summary[lang]}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-9 space-y-5">
          <div className="flex items-center gap-2 border-b-2 border-stone-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              {t.sections.experience}
            </h2>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-1.5 page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                  <span className="text-base font-bold text-stone-900">
                    {exp.role[lang] || exp.role.en} <span className="font-normal text-stone-500">|</span> <span className="text-amber-800 font-semibold">{exp.company[lang] || exp.company.en}</span>
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    {exp.startDate} – {exp.current ? (lang === 'vi' ? 'Hiện tại' : lang === 'zh' ? '迄今' : 'Present') : exp.endDate}
                  </span>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside pl-4 space-y-1 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h[lang] || h.en}</li>
                    ))}
                  </ul>
                )}

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="text-xs text-stone-500 pt-0.5">
                    <span className="font-semibold text-stone-600">Core Tech:</span> {exp.technologies.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-9 space-y-4">
          <div className="flex items-center gap-2 border-b-2 border-stone-200 pb-1.5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
              {t.sections.projects}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((proj) => (
              <div key={proj.id} className="border border-stone-200 p-4 rounded-lg space-y-2 page-break-inside-avoid bg-stone-50/50">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm text-stone-900">
                    {proj.title[lang] || proj.title.en}
                  </h3>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-stone-400 hover:text-stone-800">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                {proj.subtitle[lang] && (
                  <div className="text-xs text-amber-900 font-medium">
                    {proj.subtitle[lang]}
                  </div>
                )}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {proj.description[lang] || proj.description.en}
                </p>
                {proj.technologies && (
                  <div className="text-[11px] text-stone-500 font-mono">
                    {proj.technologies.join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Grid: Education + Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        {/* Education */}
        {education.length > 0 && (
          <section className="space-y-3">
            <div className="border-b-2 border-stone-200 pb-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                {t.sections.education}
              </h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5 page-break-inside-avoid">
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900">
                    {edu.degree[lang] || edu.degree.en}
                  </h3>
                  <div className="text-xs text-amber-800 font-medium">
                    {edu.institution[lang] || edu.institution.en}
                  </div>
                  <div className="text-xs text-stone-500 font-mono">
                    {edu.startYear} – {edu.endYear} {edu.gpa && `· ${edu.gpa}`}
                  </div>
                  {edu.details[lang] && (
                    <p className="text-xs text-stone-600">{edu.details[lang]}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skillGroups.length > 0 && (
          <section className="space-y-3">
            <div className="border-b-2 border-stone-200 pb-1.5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-900">
                {t.sections.skills}
              </h2>
            </div>
            <div className="space-y-2.5">
              {skillGroups.map((group) => (
                <div key={group.id} className="text-xs">
                  <span className="font-bold text-stone-900">{group.category[lang] || group.category.en}: </span>
                  <span className="text-stone-700">{group.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Bottom Row: Languages & Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-stone-200">
        {languages.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t.sections.languages}
            </h2>
            <div className="space-y-1.5 text-xs text-stone-800">
              {languages.map((l) => (
                <div key={l.id} className="flex justify-between">
                  <span className="font-medium">{l.name[lang] || l.name.en}</span>
                  <span className="text-stone-600">{l.proficiency[lang] || l.proficiency.en}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {t.sections.certifications}
            </h2>
            <div className="space-y-1.5 text-xs text-stone-800">
              {certifications.map((c) => (
                <div key={c.id}>
                  <span className="font-medium">{c.name[lang] || c.name.en}</span>
                  <span className="text-stone-500 ml-1.5">({c.issuer[lang]} {c.year})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

/* -------------------------------------------------------------
   THEME 3: MINIMAL (Single Column Modernist)
------------------------------------------------------------- */
const MinimalLayout: React.FC<{ data: CVData; lang: Language; t: any }> = ({
  data,
  lang,
  t,
}) => {
  const { personal, experiences, education, skillGroups, projects, languages, certifications } = data;

  return (
    <article className="bg-white border border-stone-100 shadow-sm sm:rounded-xl overflow-hidden print-clean p-6 sm:p-14 max-w-4xl mx-auto space-y-10 transition-all">
      {/* Minimal Header */}
      <header className="space-y-3 border-b border-stone-200/80 pb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          {personal.fullName[lang] || personal.fullName.vi || personal.fullName.en}
        </h1>
        <p className="text-lg text-stone-600 font-normal">
          {personal.title[lang] || personal.title.en}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500 pt-2 font-mono">
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && (
            <>
              <span className="text-stone-300">/</span>
              <span>{personal.phone}</span>
            </>
          )}
          {personal.location[lang] && (
            <>
              <span className="text-stone-300">/</span>
              <span>{personal.location[lang]}</span>
            </>
          )}
          {personal.website && (
            <>
              <span className="text-stone-300">/</span>
              <a href={personal.website} target="_blank" rel="noreferrer" className="text-stone-700 underline underline-offset-2">
                {personal.website.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {personal.summary[lang] && (
        <section className="space-y-2">
          <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-light">
            {personal.summary[lang]}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
            {t.sections.experience}
          </h2>

          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="space-y-2 page-break-inside-avoid">
                <div className="flex flex-col sm:flex-row justify-between sm:items-baseline">
                  <div className="text-sm font-semibold text-stone-900">
                    {exp.role[lang] || exp.role.en} · <span className="font-normal text-stone-600">{exp.company[lang] || exp.company.en}</span>
                  </div>
                  <div className="text-xs text-stone-400 font-mono">
                    {exp.startDate} – {exp.current ? (lang === 'vi' ? 'Hiện tại' : lang === 'zh' ? '迄今' : 'Present') : exp.endDate}
                  </div>
                </div>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed pl-4 list-disc">
                    {exp.highlights.map((h, i) => (
                      <li key={i}>{h[lang] || h.en}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="space-y-5">
          <h2 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
            {t.sections.projects}
          </h2>

          <div className="space-y-5">
            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1 page-break-inside-avoid">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-stone-900">
                    {proj.title[lang] || proj.title.en}
                  </span>
                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noreferrer" className="text-xs text-stone-400 hover:text-stone-800">
                      link ↗
                    </a>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {proj.description[lang] || proj.description.en}
                </p>
                {proj.technologies && (
                  <div className="text-[11px] text-stone-400 font-mono">
                    {proj.technologies.join(' · ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Skills Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4 border-t border-stone-100">
        {education.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
              {t.sections.education}
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="text-xs space-y-0.5">
                  <div className="font-semibold text-stone-900">{edu.degree[lang] || edu.degree.en}</div>
                  <div className="text-stone-600">{edu.institution[lang] || edu.institution.en}</div>
                  <div className="text-stone-400 font-mono">{edu.startYear} – {edu.endYear}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skillGroups.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
              {t.sections.skills}
            </h2>
            <div className="space-y-2 text-xs">
              {skillGroups.map((g) => (
                <div key={g.id}>
                  <span className="font-medium text-stone-800">{g.category[lang] || g.category.en}: </span>
                  <span className="text-stone-600">{g.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
};
