import React, { useState } from 'react';
import { 
  Globe, 
  Printer, 
  Edit3, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Share2, 
  Palette, 
  Menu, 
  X,
  FileText
} from 'lucide-react';
import { Language, CVTheme } from '../types/cv';
import { UI_TRANSLATIONS } from '../translations/ui';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: CVTheme;
  onThemeChange: (theme: CVTheme) => void;
  onOpenEditor: () => void;
  onExportJSON: () => void;
  onImportJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetDefault: () => void;
  notification: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  onOpenEditor,
  onExportJSON,
  onImportJSON,
  onResetDefault,
  notification,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const t = UI_TRANSLATIONS[currentLang];

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const languages: { id: Language; label: string; flag: string; nativeName: string }[] = [
    { id: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', nativeName: 'Việt Nam' },
    { id: 'zh', label: '繁體中文', flag: '🇹🇼', nativeName: '臺灣 / 香港' },
    { id: 'en', label: 'English', flag: '🇬🇧', nativeName: 'International' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-stone-100 border-b border-stone-800 transition-all no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-stone-800 border border-stone-700 flex items-center justify-center text-amber-400 font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base tracking-tight text-stone-100 flex items-center gap-2">
              <span>{t.siteTitle}</span>
              <span className="hidden md:inline-block text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800/60">
                3-Lang CV
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Segmented Language Switcher */}
          <div className="flex items-center bg-stone-950 p-1 rounded-lg border border-stone-800">
            {languages.map((lang) => {
              const isActive = currentLang === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => onLanguageChange(lang.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-stone-800 text-amber-300 shadow-sm border border-stone-700 font-semibold'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                  }`}
                  title={`${lang.label} (${lang.nativeName})`}
                >
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              );
            })}
          </div>

          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-stone-100 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors"
              title={t.themeSelect}
            >
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.themes[currentTheme]}</span>
            </button>

            {themeDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setThemeDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-48 bg-stone-900 border border-stone-700 rounded-lg shadow-xl p-1 z-20">
                  {(['editorial', 'executive', 'minimal'] as CVTheme[]).map((themeKey) => (
                    <button
                      key={themeKey}
                      onClick={() => {
                        onThemeChange(themeKey);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors flex items-center justify-between ${
                        currentTheme === themeKey
                          ? 'bg-amber-500/10 text-amber-300 font-medium'
                          : 'text-stone-300 hover:bg-stone-800'
                      }`}
                    >
                      <span>{t.themes[themeKey]}</span>
                      {currentTheme === themeKey && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors cursor-pointer"
            title={t.actions.print}
          >
            <Printer className="w-3.5 h-3.5 text-stone-400" />
            <span>{t.actions.print}</span>
          </button>

          {/* More Tools Dropdown (Export, Import, Reset, Share) */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-stone-100 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-lg transition-colors"
            >
              <span>{t.actions.exportJSON.split(' ')[0]} / {t.actions.importJSON.split(' ')[0]}</span>
            </button>

            {toolsDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setToolsDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1 w-52 bg-stone-900 border border-stone-700 rounded-lg shadow-xl p-1.5 z-20 space-y-0.5">
                  <button
                    onClick={() => {
                      onExportJSON();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:bg-stone-800 rounded flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-stone-400" />
                    <span>{t.actions.exportJSON}</span>
                  </button>

                  <label className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:bg-stone-800 rounded flex items-center gap-2 cursor-pointer">
                    <Upload className="w-3.5 h-3.5 text-stone-400" />
                    <span>{t.actions.importJSON}</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        onImportJSON(e);
                        setToolsDropdownOpen(false);
                      }}
                      className="hidden"
                    />
                  </label>

                  <button
                    onClick={() => {
                      handleShare();
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:bg-stone-800 rounded flex items-center gap-2"
                  >
                    {copiedLink ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5 text-stone-400" />
                    )}
                    <span>{copiedLink ? t.actions.saved : t.actions.share}</span>
                  </button>

                  <div className="border-t border-stone-800 my-1" />

                  <button
                    onClick={() => {
                      if (window.confirm(t.editor.confirmReset)) {
                        onResetDefault();
                      }
                      setToolsDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:bg-rose-950/40 rounded flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
                    <span>{t.actions.resetDefault}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Edit CV Button - Primary Call To Action */}
          <button
            onClick={onOpenEditor}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-stone-900" />
            <span>{t.actions.editCV}</span>
          </button>
        </div>

        {/* Mobile quick controls */}
        <div className="flex lg:hidden items-center gap-1.5">
          {/* Quick Language switch buttons */}
          <div className="flex items-center bg-stone-950 p-0.5 rounded-lg border border-stone-800">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => onLanguageChange(l.id)}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  currentLang === l.id
                    ? 'bg-stone-800 text-amber-300 font-bold'
                    : 'text-stone-400'
                }`}
                title={l.label}
              >
                {l.flag}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-amber-400 text-stone-950 rounded-lg"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.actions.editCV}</span>
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg"
            aria-label="Menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-stone-800 bg-stone-950 px-4 py-4 space-y-3">
          <div>
            <div className="text-xs text-stone-400 font-medium mb-1.5 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>{t.languageSelect}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {languages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    onLanguageChange(lang.id);
                  }}
                  className={`flex items-center justify-center gap-1.5 py-2 px-2 text-xs rounded-lg border text-center ${
                    currentLang === lang.id
                      ? 'bg-stone-800 border-amber-500/50 text-amber-300 font-semibold'
                      : 'bg-stone-900 border-stone-800 text-stone-300'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-stone-400 font-medium mb-1.5 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>{t.themeSelect}</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {(['editorial', 'executive', 'minimal'] as CVTheme[]).map((themeKey) => (
                <button
                  key={themeKey}
                  onClick={() => {
                    onThemeChange(themeKey);
                  }}
                  className={`py-1.5 px-2 text-xs rounded-lg border text-center ${
                    currentTheme === themeKey
                      ? 'bg-stone-800 border-amber-500/50 text-amber-300 font-semibold'
                      : 'bg-stone-900 border-stone-800 text-stone-300'
                  }`}
                >
                  {t.themes[themeKey]}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-800/80 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                handlePrint();
                setMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium bg-stone-900 border border-stone-800 text-stone-200 rounded-lg"
            >
              <Printer className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.actions.print}</span>
            </button>

            <button
              onClick={() => {
                handleShare();
                setMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium bg-stone-900 border border-stone-800 text-stone-200 rounded-lg"
            >
              <Share2 className="w-3.5 h-3.5 text-stone-400" />
              <span>{copiedLink ? t.actions.saved : t.actions.share}</span>
            </button>

            <button
              onClick={() => {
                onExportJSON();
                setMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium bg-stone-900 border border-stone-800 text-stone-200 rounded-lg"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.actions.exportJSON}</span>
            </button>

            <label className="flex items-center justify-center gap-2 py-2 text-xs font-medium bg-stone-900 border border-stone-800 text-stone-200 rounded-lg cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-stone-400" />
              <span>{t.actions.importJSON}</span>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  onImportJSON(e);
                  setMenuOpen(false);
                }}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={() => {
              if (window.confirm(t.editor.confirmReset)) {
                onResetDefault();
              }
              setMenuOpen(false);
            }}
            className="w-full text-center py-2 text-xs text-rose-300 hover:text-rose-200"
          >
            {t.actions.resetDefault}
          </button>
        </div>
      )}

      {/* Floating notification bar if present */}
      {notification && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-200 text-xs py-1.5 px-4 text-center">
          {notification}
        </div>
      )}
    </header>
  );
};
