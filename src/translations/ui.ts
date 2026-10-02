import { Language } from '../types/cv';

export interface UITranslation {
  siteTitle: string;
  tagline: string;
  languageSelect: string;
  themeSelect: string;
  themes: {
    editorial: string;
    executive: string;
    minimal: string;
  };
  actions: {
    editCV: string;
    viewCV: string;
    print: string;
    share: string;
    exportJSON: string;
    importJSON: string;
    resetDefault: string;
    save: string;
    saved: string;
    cancel: string;
    close: string;
    add: string;
    delete: string;
    uploadPhoto: string;
    removePhoto: string;
    preview: string;
    copyFrom: string;
  };
  sections: {
    personal: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    languages: string;
    certifications: string;
    contact: string;
  };
  fields: {
    fullName: string;
    jobTitle: string;
    summary: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string;
    website: string;
    github: string;
    linkedin: string;
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    currentJob: string;
    highlights: string;
    technologies: string;
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
    gpa: string;
    details: string;
    category: string;
    skillsList: string;
    projectTitle: string;
    projectSubtitle: string;
    projectDesc: string;
    projectLink: string;
    languageName: string;
    proficiency: string;
    certName: string;
    issuer: string;
    year: string;
    credentialUrl: string;
  };
  editor: {
    title: string;
    subtitle: string;
    editingLanguageTab: string;
    multilingualNotice: string;
    dragOrAddTip: string;
    addItem: string;
    unsavedWarning: string;
    confirmReset: string;
    importSuccess: string;
    importError: string;
    enterCommaSeparated: string;
    onePerLine: string;
  };
  languagesList: {
    vi: string;
    zh: string;
    en: string;
  };
}

export const UI_TRANSLATIONS: Record<Language, UITranslation> = {
  vi: {
    siteTitle: 'Hồ sơ Chuyên nghiệp',
    tagline: 'CV đa ngôn ngữ: Tiếng Việt · 繁體中文 · English',
    languageSelect: 'Ngôn ngữ hiển thị',
    themeSelect: 'Phong cách hiển thị',
    themes: {
      editorial: 'Báo chí & Cổ điển',
      executive: 'Chuyên gia & Hiện đại',
      minimal: 'Tối giản & Tinh gọn',
    },
    actions: {
      editCV: 'Đăng & Sửa CV',
      viewCV: 'Xem CV',
      print: 'In / Tải PDF',
      share: 'Sao chép liên kết',
      exportJSON: 'Xuất tệp JSON',
      importJSON: 'Nhập tệp JSON',
      resetDefault: 'Khôi phục CV mẫu',
      save: 'Lưu thay đổi',
      saved: 'Đã lưu vào bộ nhớ',
      cancel: 'Hủy',
      close: 'Đóng',
      add: 'Thêm mới',
      delete: 'Xóa',
      uploadPhoto: 'Tải ảnh đại diện',
      removePhoto: 'Gỡ ảnh',
      preview: 'Xem trước',
      copyFrom: 'Sao chép từ',
    },
    sections: {
      personal: 'Thông tin cá nhân',
      summary: 'Giới thiệu bản thân',
      experience: 'Kinh nghiệm làm việc',
      education: 'Học vấn & Đào tạo',
      skills: 'Kỹ năng chuyên môn',
      projects: 'Dự án nổi bật',
      languages: 'Trình độ ngoại ngữ',
      certifications: 'Chứng chỉ chuyên nghiệp',
      contact: 'Thông tin liên hệ',
    },
    fields: {
      fullName: 'Họ và tên',
      jobTitle: 'Chức danh / Vị trí chuyên môn',
      summary: 'Tóm tắt tiểu sử chuyên môn',
      email: 'Hòm thư điện tử (Email)',
      phone: 'Số điện thoại liên lạc',
      location: 'Địa chỉ / Thành phố',
      avatarUrl: 'Đường dẫn ảnh đại diện',
      website: 'Trang web cá nhân',
      github: 'GitHub profile',
      linkedin: 'LinkedIn profile',
      role: 'Chức vụ / Vị trí',
      company: 'Tên công ty / Cơ quan',
      startDate: 'Bắt đầu (VD: 03/2022)',
      endDate: 'Kết thúc (VD: Hiện tại)',
      currentJob: 'Đang làm việc tại đây',
      highlights: 'Điểm nổi bật / Thành tựu (mỗi dòng một ý)',
      technologies: 'Công nghệ / Công cụ (phân cách bằng dấu phẩy)',
      degree: 'Bằng cấp / Ngành học',
      institution: 'Trường đại học / Tổ chức đào tạo',
      startYear: 'Năm bắt đầu',
      endYear: 'Năm tốt nghiệp',
      gpa: 'Điểm số / GPA (không bắt buộc)',
      details: 'Mô tả thêm / Hoạt động nổi bật',
      category: 'Nhóm kỹ năng (VD: Lập trình Backend)',
      skillsList: 'Các kỹ năng (cách nhau bằng dấu phẩy)',
      projectTitle: 'Tên dự án',
      projectSubtitle: 'Vai trò / Khách hàng / Phạm vi',
      projectDesc: 'Mô tả chi tiết giải pháp và kết quả',
      projectLink: 'Đường dẫn dự án (Website/Demo)',
      languageName: 'Tên ngoại ngữ (VD: Tiếng Anh)',
      proficiency: 'Trình độ (VD: Thành thạo / IELTS 7.5)',
      certName: 'Tên chứng chỉ',
      issuer: 'Tổ chức cấp (VD: AWS / Google / PMI)',
      year: 'Năm cấp chứng chỉ',
      credentialUrl: 'Liên kết xác minh chứng chỉ',
    },
    editor: {
      title: 'Trình biên tập CV Đa Ngôn Ngữ',
      subtitle: 'Nhập nội dung bằng 3 ngôn ngữ: Tiếng Việt, 繁體中文, English. Hệ thống lưu tự động vào trình duyệt.',
      editingLanguageTab: 'Đang chỉnh sửa cho ngôn ngữ:',
      multilingualNotice: 'Mẹo: Bạn có thể chuyển đổi giữa các tab ngôn ngữ ở mỗi mục để đăng nội dung tương ứng.',
      dragOrAddTip: 'Bạn có thể thêm, chỉnh sửa hoặc xóa bất kỳ mục nào theo nhu cầu.',
      addItem: 'Thêm mục mới',
      unsavedWarning: 'Bạn có thay đổi chưa lưu. Bạn có chắc muốn đóng không?',
      confirmReset: 'Bạn có chắc chắn muốn khôi phục lại dữ liệu CV mẫu ban đầu không? Các chỉnh sửa hiện tại sẽ bị thay thế.',
      importSuccess: 'Đã nhập thành công dữ liệu CV!',
      importError: 'Tệp JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc tệp.',
      enterCommaSeparated: 'Nhập các mục cách nhau bởi dấu phẩy',
      onePerLine: 'Mỗi dòng một gạch đầu dòng thành tích',
    },
    languagesList: {
      vi: 'Tiếng Việt',
      zh: '繁體中文',
      en: 'English',
    },
  },
  zh: {
    siteTitle: '專業個人履歷',
    tagline: '三語履歷展示：繁體中文 · English · Tiếng Việt',
    languageSelect: '顯示語言',
    themeSelect: '版面風格',
    themes: {
      editorial: '人文經典 / 典雅排版',
      executive: '現代商務 / 專業高管',
      minimal: '簡約純粹 / 極簡精簡',
    },
    actions: {
      editCV: '發布與編輯履歷',
      viewCV: '檢視履歷',
      print: '列印 / 匯出 PDF',
      share: '複製連結',
      exportJSON: '匯出 JSON 備份',
      importJSON: '匯入 JSON 檔案',
      resetDefault: '還原範本內容',
      save: '儲存變更',
      saved: '已儲存至本機',
      cancel: '取消',
      close: '關閉',
      add: '新增項目',
      delete: '刪除',
      uploadPhoto: '上傳大頭照',
      removePhoto: '移除照片',
      preview: '即時預覽',
      copyFrom: '複製內容自',
    },
    sections: {
      personal: '個人基本資訊',
      summary: '專業簡介與自述',
      experience: '工作與經歷',
      education: '學歷與教育背景',
      skills: '專業技能與專長',
      projects: '代表性專案作品',
      languages: '語言能力',
      certifications: '專業證照與榮譽',
      contact: '聯絡方式',
    },
    fields: {
      fullName: '中文姓名 / 英文姓名',
      jobTitle: '專業職稱 / 目前職位',
      summary: '專業自述與個人優勢摘要',
      email: '電子郵件 (Email)',
      phone: '聯絡電話',
      location: '現居城市 / 國家',
      avatarUrl: '個人照片網址',
      website: '個人網站 / 作品集',
      github: 'GitHub 連結',
      linkedin: 'LinkedIn 連結',
      role: '擔任職位',
      company: '任職公司 / 機構名稱',
      startDate: '開始時間 (例：2022年3月)',
      endDate: '結束時間 (例：迄今)',
      currentJob: '目前在職中',
      highlights: '工作成果與專案亮點 (每行一項成果)',
      technologies: '使用技術與工具 (以逗號分隔)',
      degree: '獲得學位 / 主修科系',
      institution: '畢業學校 / 大學院校',
      startYear: '入學年份',
      endYear: '畢業年份',
      gpa: '在校成績 / GPA (選填)',
      details: '詳細說明 / 校內成就與活動',
      category: '技能類別 (例：後端架構與雲端平台)',
      skillsList: '各項技能 (以逗號分隔)',
      projectTitle: '專案名稱',
      projectSubtitle: '專案角色 / 客戶或規模',
      projectDesc: '專案詳細描述與實際成效',
      projectLink: '專案連結 (網站 / 成果展示)',
      languageName: '語言名稱 (例：英語)',
      proficiency: '熟練程度 (例：精通 / 多益 900 分)',
      certName: '證照名稱',
      issuer: '發證機構 (例：AWS / Google / 專案管理學會)',
      year: '取得年份',
      credentialUrl: '證書線上查驗連結',
    },
    editor: {
      title: '三語履歷內容編輯器',
      subtitle: '支援繁體中文、English、Tiếng Việt 三語同步編修，自動儲存至本機瀏覽器。',
      editingLanguageTab: '目前編輯之語系：',
      multilingualNotice: '提示：您可以在各輸入區塊切換語言分頁，分別編輯三種語言的對應內容。',
      dragOrAddTip: '您可以依需求新增、修改或刪除任何履歷區塊。',
      addItem: '新增項目',
      unsavedWarning: '您有尚未儲存的變更，確定要關閉嗎？',
      confirmReset: '確定要還原為系統預設範本內容嗎？您目前的所有修改將會被覆蓋。',
      importSuccess: '成功匯入履歷資料！',
      importError: 'JSON 格式不正確，請確認檔案內容結構。',
      enterCommaSeparated: '請以逗點分隔輸入各項目',
      onePerLine: '每行一項重點條列內容',
    },
    languagesList: {
      vi: '越南文 (Tiếng Việt)',
      zh: '繁體中文',
      en: '英文 (English)',
    },
  },
  en: {
    siteTitle: 'Professional Resume',
    tagline: 'Trilingual Showcase: English · 繁體中文 · Tiếng Việt',
    languageSelect: 'Display Language',
    themeSelect: 'Visual Theme',
    themes: {
      editorial: 'Editorial & Classic',
      executive: 'Executive & Modern',
      minimal: 'Clean & Minimalist',
    },
    actions: {
      editCV: 'Post & Edit CV',
      viewCV: 'View Resume',
      print: 'Print / Save PDF',
      share: 'Copy Share Link',
      exportJSON: 'Export JSON',
      importJSON: 'Import JSON',
      resetDefault: 'Reset to Sample',
      save: 'Save Changes',
      saved: 'Saved to local storage',
      cancel: 'Cancel',
      close: 'Close',
      add: 'Add Item',
      delete: 'Delete',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
      preview: 'Live Preview',
      copyFrom: 'Copy from',
    },
    sections: {
      personal: 'Personal Information',
      summary: 'Professional Summary',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Competencies',
      projects: 'Key Projects',
      languages: 'Languages',
      certifications: 'Certifications & Honors',
      contact: 'Contact Information',
    },
    fields: {
      fullName: 'Full Name',
      jobTitle: 'Professional Title',
      summary: 'Executive Summary',
      email: 'Email Address',
      phone: 'Phone Number',
      location: 'Location / City',
      avatarUrl: 'Profile Image URL',
      website: 'Personal Website',
      github: 'GitHub Profile',
      linkedin: 'LinkedIn Profile',
      role: 'Job Role / Title',
      company: 'Company / Organization',
      startDate: 'Start Date (e.g. Mar 2022)',
      endDate: 'End Date (e.g. Present)',
      currentJob: 'Currently working here',
      highlights: 'Key Achievements (one bullet per line)',
      technologies: 'Technologies & Tools (comma separated)',
      degree: 'Degree / Major',
      institution: 'University / Institution',
      startYear: 'Start Year',
      endYear: 'Graduation Year',
      gpa: 'GPA / Honors (optional)',
      details: 'Additional details or campus activities',
      category: 'Skill Category (e.g. Cloud & Backend)',
      skillsList: 'Skills (comma separated)',
      projectTitle: 'Project Name',
      projectSubtitle: 'Role / Client / Scope',
      projectDesc: 'Description, Solution & Measurable Impact',
      projectLink: 'Project Link (Demo / Code)',
      languageName: 'Language Name (e.g. English)',
      proficiency: 'Proficiency (e.g. Native / Fluent / C1)',
      certName: 'Certification Name',
      issuer: 'Issuing Organization',
      year: 'Year Issued',
      credentialUrl: 'Credential Verification URL',
    },
    editor: {
      title: 'Trilingual CV Editor',
      subtitle: 'Post and manage your resume content in English, 繁體中文, and Tiếng Việt. Changes persist automatically in your browser.',
      editingLanguageTab: 'Currently editing language:',
      multilingualNotice: 'Tip: Switch between language tabs in any section to provide dedicated translations for each language.',
      dragOrAddTip: 'Easily add, reorder, or customize sections to match your professional background.',
      addItem: 'Add Item',
      unsavedWarning: 'You have unsaved changes. Are you sure you want to close?',
      confirmReset: 'Are you sure you want to reset to the default sample CV? Current modifications will be replaced.',
      importSuccess: 'CV data successfully imported!',
      importError: 'Invalid JSON file. Please check file format.',
      enterCommaSeparated: 'Enter items separated by commas',
      onePerLine: 'One achievement per line',
    },
    languagesList: {
      vi: 'Vietnamese',
      zh: 'Traditional Chinese',
      en: 'English',
    },
  },
};
