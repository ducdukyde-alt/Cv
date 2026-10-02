/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CVData, Language, CVTheme } from './types/cv';
import { DEFAULT_CV_DATA } from './data/defaultCV';
import { Header } from './components/Header';
import { CVViewer } from './components/CVViewer';
import { CVEditor } from './components/CVEditor';
import { UI_TRANSLATIONS } from './translations/ui';
import { Edit3, Printer, ArrowUp, Globe } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'cv_data_trilingual_v1';
const LANG_STORAGE_KEY = 'cv_display_lang';
const THEME_STORAGE_KEY = 'cv_display_theme';

export default function App() {
  const [cvData, setCvData] = useState<CVData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.personal?.fullName) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading CV from localStorage', e);
    }
    return DEFAULT_CV_DATA;
  });

  const [currentLang, setCurrentLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'vi' || saved === 'zh' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.error('Error loading language', e);
    }
    return 'vi';
  });

  const [currentTheme, setCurrentTheme] = useState<CVTheme>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'editorial' || saved === 'executive' || saved === 'minimal') {
        return saved;
      }
    } catch (e) {
      console.error('Error loading theme', e);
    }
    return 'editorial';
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const t = UI_TRANSLATIONS[currentLang];

  // Save changes to localStorage
  const handleSaveData = (newData: CVData) => {
    setCvData(newData);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
      showToast(t.actions.saved);
    } catch (e) {
      console.error('Error saving CV to localStorage', e);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error(e);
    }
  };

  const handleThemeChange = (theme: CVTheme) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `trilingual-cv-${currentLang}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast(t.actions.exportJSON + ' OK');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json?.personal?.fullName) {
          handleSaveData(json);
          showToast(t.editor.importSuccess);
        } else {
          showToast(t.editor.importError);
        }
      } catch (err) {
        showToast(t.editor.importError);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to sample CV
  const handleResetDefault = () => {
    handleSaveData(DEFAULT_CV_DATA);
    showToast(t.actions.resetDefault);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onOpenEditor={() => setIsEditorOpen(true)}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        onResetDefault={handleResetDefault}
        notification={notification}
      />

      {/* Main CV Content Display */}
      <main className="flex-1 py-6 sm:py-10 px-3 sm:px-6">
        <CVViewer
          data={cvData}
          lang={currentLang}
          theme={currentTheme}
        />
      </main>

      {/* Bottom Floating Action Dock (Mobile/Desktop helper) */}
      <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-30 flex items-center gap-2 no-print">
        <button
          onClick={() => setIsEditorOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-950 font-semibold text-xs rounded-full shadow-lg border border-amber-300 transition-all hover:scale-105 cursor-pointer"
          title={t.actions.editCV}
        >
          <Edit3 className="w-4 h-4" />
          <span>{t.actions.editCV}</span>
        </button>

        <button
          onClick={() => window.print()}
          className="p-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-full shadow-lg border border-stone-700 transition-all hover:scale-105 cursor-pointer"
          title={t.actions.print}
          aria-label={t.actions.print}
        >
          <Printer className="w-4 h-4 text-stone-300" />
        </button>

        <button
          onClick={scrollToTop}
          className="p-2.5 bg-white hover:bg-stone-50 text-stone-700 rounded-full shadow-md border border-stone-200 transition-all hover:scale-105 cursor-pointer"
          title="Scroll to top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </aside>

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-white py-6 text-center text-xs text-stone-500 no-print">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-stone-400" />
            <span>
              {cvData.personal.fullName[currentLang] || cvData.personal.fullName.vi} · {t.tagline}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLanguageChange('vi')}
              className={`hover:underline ${currentLang === 'vi' ? 'font-bold text-stone-900' : ''}`}
            >
              Tiếng Việt
            </button>
            <span>·</span>
            <button
              onClick={() => handleLanguageChange('zh')}
              className={`hover:underline ${currentLang === 'zh' ? 'font-bold text-stone-900' : ''}`}
            >
              繁體中文
            </button>
            <span>·</span>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`hover:underline ${currentLang === 'en' ? 'font-bold text-stone-900' : ''}`}
            >
              English
            </button>
          </div>
        </div>
      </footer>

      {/* Full-Featured Multilingual CV Editor Modal */}
      {isEditorOpen && (
        <CVEditor
          initialData={cvData}
          uiLang={currentLang}
          onSave={handleSaveData}
          onClose={() => setIsEditorOpen(false)}
        />
      )}
    </div>
  );
}
