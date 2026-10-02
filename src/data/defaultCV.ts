import { CVData } from '../types/cv';

export const DEFAULT_CV_DATA: CVData = {
  personal: {
    fullName: {
      vi: 'Nguyễn Minh Khang',
      zh: '阮明康 (Minh Khang Nguyen)',
      en: 'Minh Khang Nguyen',
    },
    title: {
      vi: 'Kỹ sư Phần mềm Cao cấp & Kiến trúc sư Giải pháp',
      zh: '資深軟體工程師 / 雲端架構師',
      en: 'Senior Software Engineer & Solutions Architect',
    },
    summary: {
      vi: 'Kỹ sư phần mềm với hơn 7 năm kinh nghiệm chuyên sâu trong việc thiết kế và phát triển các hệ thống phân tán chịu tải cao, kiến trúc vi dịch vụ (microservices) và các ứng dụng web hiện đại. Có bề dày kinh nghiệm làm việc trong môi trường đa quốc gia tại Việt Nam, Đài Loan và Singapore. Đam mê tối ưu hiệu năng hệ thống, văn hóa DevOps và dẫn dắt đội ngũ kỹ thuật phát triển bền vững.',
      zh: '擁有超過 7 年分散式系統、微服務架構與現代化 Web 應用程式開發經驗的資深軟體工程師。具備越南、台灣與新加坡等多國跨文化跨團隊協作背景，擅長高併發雲端架構設計、系統效能調優與 DevOps 文化落地。重視軟體工程卓越品質與技術團隊敏捷成長。',
      en: 'Senior Software Engineer with 7+ years of expertise in designing and architecting high-concurrency distributed systems, cloud microservices, and modern web applications. Proven track record across international engineering teams in Vietnam, Taiwan, and Singapore. Passionate about system performance optimization, robust DevOps practices, and mentoring high-velocity engineering teams.',
    },
    email: 'khang.nguyen.tech@example.com',
    phone: '+84 912 345 678 / +886 987 654 321',
    location: {
      vi: 'Hà Nội, Việt Nam / Đài Bắc (Sẵn sàng công tác quốc tế)',
      zh: '越南河內 / 台灣台北（可配合跨國出差與遠端）',
      en: 'Hanoi, Vietnam / Taipei (Open to relocation & hybrid)',
    },
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    website: 'https://minhkhang.dev',
    github: 'https://github.com/minhkhang-tech',
    linkedin: 'https://linkedin.com/in/minhkhang-tech',
  },
  experiences: [
    {
      id: 'exp-1',
      role: {
        vi: 'Trưởng nhóm Kỹ thuật (Technical Lead)',
        zh: '技術組長 / 資深技術主管 (Technical Lead)',
        en: 'Technical Lead & Staff Engineer',
      },
      company: {
        vi: 'Tập đoàn Công nghệ Tài chính APAC (APAC Fintech Group)',
        zh: '亞太金融科技集團 (APAC Fintech Group)',
        en: 'APAC Fintech Group',
      },
      location: {
        vi: 'Hà Nội & Đài Bắc (Hybrid)',
        zh: '河內 & 台北 (混合辦公)',
        en: 'Hanoi & Taipei (Hybrid)',
      },
      startDate: '01/2023',
      endDate: 'Hiện tại',
      current: true,
      highlights: [
        {
          vi: 'Chỉ đạo kiến trúc và tái cấu trúc hệ thống thanh toán xuyên biên giới phục vụ hơn 2,5 triệu người dùng hoạt động hàng tháng, giảm 42% độ trễ xử lý giao dịch.',
          zh: '主導亞太區跨國跨境支付清算系統之架構重構，服務逾 250 萬月活躍用戶，成功將平均交易延遲降低 42%。',
          en: 'Architected and directed the re-engineering of the cross-border payment gateway processing $120M+ monthly for 2.5M MAU, slashing latency by 42%.',
        },
        {
          vi: 'Quản lý và cố vấn chuyên môn cho đội ngũ kỹ thuật gồm 14 kỹ sư tại 3 quốc gia (Việt Nam, Đài Loan, Singapore) theo mô hình Agile/Scrum.',
          zh: '帶領並指導涵蓋越南、台灣及新加坡三地共 14 位工程師之敏捷跨國研發團隊，推行高標準代碼審查與 CI/CD 自動化。',
          en: 'Mentored and guided a cross-border engineering team of 14 across Vietnam, Taiwan, and Singapore, establishing CI/CD automation and code review rigor.',
        },
        {
          vi: 'Triển khai hạ tầng Kubernetes đa cụm (Multi-cluster) trên AWS, nâng cao tính khả dụng của hệ thống lên 99.98% và giảm 25% chi phí điện toán đám mây.',
          zh: '在 AWS 雲端部署多叢集 Kubernetes 與自動彈性擴展，使系統 SLA 提升至 99.98%，年化雲端運算支出降低 25%。',
          en: 'Deployed multi-region Kubernetes infrastructure on AWS, lifting overall uptime to 99.98% while reducing annual cloud infrastructure spend by 25%.',
        },
      ],
      technologies: ['Go', 'TypeScript', 'Node.js', 'React', 'Kubernetes', 'AWS', 'PostgreSQL', 'Kafka', 'Terraform'],
    },
    {
      id: 'exp-2',
      role: {
        vi: 'Kỹ sư Phần mềm Cấp cao (Senior Software Engineer)',
        zh: '資深全端軟體工程師 (Senior Full-Stack Engineer)',
        en: 'Senior Full-Stack Software Engineer',
      },
      company: {
        vi: 'Công ty Công nghệ Thương mại Điện tử Nexus (Nexus Commerce)',
        zh: 'Nexus 智慧商務科技 (Nexus Commerce)',
        en: 'Nexus Commerce Inc.',
      },
      location: {
        vi: 'Hà Nội, Việt Nam',
        zh: '越南河內',
        en: 'Hanoi, Vietnam',
      },
      startDate: '04/2020',
      endDate: '12/2022',
      current: false,
      highlights: [
        {
          vi: 'Xây dựng dịch vụ danh mục sản phẩm và tìm kiếm thời gian thực với Elasticsearch, xử lý 15.000 truy vấn/giây trong các đợt Siêu Sale.',
          zh: '建置高乘載商品型錄即時搜尋引擎（基於 Elasticsearch），於雙十一等大促期間穩定承載每秒 15,000 次高頻查詢。',
          en: 'Engineered real-time product catalog & search engine using Elasticsearch, handling peak throughput of 15,000 QPS during major retail sales events.',
        },
        {
          vi: 'Thiết kế hệ thống micro-frontend bằng Module Federation, cho phép 5 phân nhóm sản phẩm triển khai độc lập mà không gây xung đột.',
          zh: '主導微前端 (Micro-frontend) 架構轉型，實現 5 個業務線子系統獨立部署與無縫整合，提升發布頻率 3 倍。',
          en: 'Designed micro-frontend modular architecture enabling 5 autonomous sub-teams to deploy continuously without deployment contention.',
        },
        {
          vi: 'Tối ưu hóa Core Web Vitals của trang mua sắm: điểm số LCP từ 3.8s xuống 1.2s, tăng 18% tỷ lệ chuyển đổi đơn hàng.',
          zh: '深度優化前端 Core Web Vitals 指標，LCP 載入時間自 3.8 秒降至 1.2 秒，直接推動結帳轉換率增長 18%。',
          en: 'Optimized web vitals across web storefronts, dropping LCP from 3.8s to 1.2s and boosting overall user checkout conversion by 18%.',
        },
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Golang', 'Redis', 'Elasticsearch', 'Docker', 'GraphQL'],
    },
    {
      id: 'exp-3',
      role: {
        vi: 'Kỹ sư Phần mềm (Full-Stack Engineer)',
        zh: '全端軟體工程師 (Full-Stack Engineer)',
        en: 'Full-Stack Software Engineer',
      },
      company: {
        vi: 'FPT Software / Dự án Đối tác Toàn cầu',
        zh: 'FPT Software 全球技術解決方案部',
        en: 'FPT Software Global Solutions',
      },
      location: {
        vi: 'Hà Nội, Việt Nam & Tokyo',
        zh: '越南河內 & 日本東京 (跨國協同)',
        en: 'Hanoi, Vietnam & Tokyo (Collaborative)',
      },
      startDate: '07/2018',
      endDate: '03/2020',
      current: false,
      highlights: [
        {
          vi: 'Tham gia xây dựng ứng dụng web và cổng quản trị ERP cho khách hàng doanh nghiệp sản xuất Nhật Bản và khu vực Đông Nam Á.',
          zh: '為日本及東南亞大型製造業客戶開發企業級 ERP 數位化雲端入口與物流管理平台。',
          en: 'Delivered mission-critical enterprise ERP & logistics portals for industrial clients across Japan and Southeast Asia.',
        },
        {
          vi: 'Viết hơn 200 bài kiểm thử tự động (Unit & Integration tests), giảm 35% tỷ lệ lỗi phát sinh sau khi đưa lên môi trường thử nghiệm.',
          zh: '編寫逾 200 項單元與整合端對端自動化測試，將測試環境發布後的 Regression 缺陷率有效壓降 35%。',
          en: 'Authored 200+ unit and integration tests, slashing staging regression bugs by 35% and improving release confidence.',
        },
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'Express', 'MySQL', 'Jest', 'GitLab CI'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: {
        vi: 'Kỹ sư Công nghệ Thông tin (Hệ Chất lượng cao)',
        zh: '資訊工程學士 (特優榮譽學程)',
        en: 'B.S. in Computer Science & Information Technology (Honors Program)',
      },
      institution: {
        vi: 'Đại học Bách Khoa Hà Nội (HUST)',
        zh: '河內理工大學 (Hanoi University of Science and Technology)',
        en: 'Hanoi University of Science and Technology (HUST)',
      },
      location: {
        vi: 'Hà Nội, Việt Nam',
        zh: '越南河內',
        en: 'Hanoi, Vietnam',
      },
      startYear: '2014',
      endYear: '2018',
      gpa: '3.65 / 4.0 (Top 5%)',
      details: {
        vi: 'Giải Nhì cuộc thi Olympic Tin học Sinh viên Toàn quốc năm 2017; Trưởng nhóm Câu lạc bộ Thuật toán & Mã nguồn mở.',
        zh: '2017 年全國大專院校資訊奧林匹亞競賽二等獎；校園演算法與開源社團發起人。',
        en: '2nd Prize in National Collegiate Programming Contest 2017; Head of Student Algorithm & Open-Source Community.',
      },
    },
  ],
  skillGroups: [
    {
      id: 'skill-1',
      category: {
        vi: 'Ngôn ngữ Lập trình & Nền tảng',
        zh: '程式語言與核心架構',
        en: 'Programming Languages & Core',
      },
      skills: ['TypeScript', 'JavaScript (ESNext)', 'Go (Golang)', 'Python', 'HTML5 & CSS3 / Modern CSS', 'SQL'],
    },
    {
      id: 'skill-2',
      category: {
        vi: 'Frontend & Ứng dụng Web',
        zh: '前端技術與 Web 應用',
        en: 'Frontend & Web Applications',
      },
      skills: ['React 19', 'Next.js', 'Tailwind CSS', 'Redux Toolkit / Zustand', 'Vite', 'GraphQL', 'Responsive UX / Accessibility'],
    },
    {
      id: 'skill-3',
      category: {
        vi: 'Backend, Dữ liệu & Đám mây',
        zh: '後端、雲端架構與資料庫',
        en: 'Backend, Cloud & Database',
      },
      skills: ['Node.js', 'Express / Fastify', 'PostgreSQL', 'Redis', 'Apache Kafka', 'AWS (ECS, S3, RDS, Lambda)', 'Docker & Kubernetes'],
    },
    {
      id: 'skill-4',
      category: {
        vi: 'Quy trình, Công cụ & Kỹ năng Mềm',
        zh: '敏捷開發、工具與軟實力',
        en: 'Practices, DevOps & Leadership',
      },
      skills: ['CI/CD Pipelines (GitHub Actions)', 'Terraform', 'Agile / Scrum Master', 'Cross-cultural Communication', 'Technical Mentorship'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: {
        vi: 'Cổng Thanh toán Trực tuyến Đa Tiền tệ (OmniPay Gateway)',
        zh: '跨國多幣別全通流通訊閘道 (OmniPay Gateway)',
        en: 'OmniPay Multi-Currency Cross-Border Payment Engine',
      },
      subtitle: {
        vi: 'Kiến trúc trưởng & Lập trình chính · APAC Fintech',
        zh: '主要架構設計與核心研發 · 亞太金融科技',
        en: 'Lead Architect & Core Implementer · APAC Fintech',
      },
      description: {
        vi: 'Hệ thống định tuyến giao dịch thông minh hỗ trợ 10 loại tiền tệ (VND, TWD, USD, SGD,...), tự động tái định tuyến qua nhà cung cấp chi phí thấp nhất và giảm thiểu rủi ro gián đoạn dịch vụ với cơ chế Circuit Breaker.',
        zh: '智慧型跨國交易路由機制，支援 VND、TWD、USD 等 10 種幣別自動比價與智慧路由，內建熔斷保護機制保障高可用性。',
        en: 'High-availability smart routing transaction engine supporting 10 Asian currencies with automated lowest-cost routing and resilient circuit breaker safeguards.',
      },
      technologies: ['Go', 'Kafka', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      link: 'https://github.com/example/omnipay-core',
      github: 'https://github.com/example/omnipay-core',
    },
    {
      id: 'proj-2',
      title: {
        vi: 'Nền tảng Tự động hóa Tài liệu Hợp đồng Thông minh (DocFlow AI)',
        zh: '多語言合約與企業文件自動化處理平台 (DocFlow AI)',
        en: 'DocFlow Intelligent Multi-Language Document Processor',
      },
      subtitle: {
        vi: 'Dự án Mã nguồn mở cá nhân & Khách hàng Doanh nghiệp',
        zh: '個人代表專案與企業商用解決方案',
        en: 'Open Source Initiative & Enterprise Workflow Tool',
      },
      description: {
        vi: 'Giải pháp bóc tách và phân loại tài liệu đa ngôn ngữ (Việt - Hoa - Anh) sử dụng mô hình ngôn ngữ lớn (LLM), phục vụ ký kết hợp đồng điện tử và số hóa hồ sơ tự động.',
        zh: '結合現代大語言模型技術，支援越、中、英三語合約關鍵條款快速擷取與比對，節省法務與行政人工審核時間 70% 以上。',
        en: 'Automated multi-lingual contract parsing and verification tool (Vietnamese, Traditional Chinese, English) leveraging LLMs to reduce manual auditing time by 70%.',
      },
      technologies: ['TypeScript', 'React', 'Python', 'FastAPI', 'Gemini API', 'Tailwind CSS'],
      link: 'https://docflow-demo.example.com',
      github: 'https://github.com/example/docflow-app',
    },
  ],
  languages: [
    {
      id: 'lang-1',
      name: {
        vi: 'Tiếng Việt',
        zh: '越南語 (Tiếng Việt)',
        en: 'Vietnamese',
      },
      proficiency: {
        vi: 'Tiếng mẹ đẻ (Bản ngữ)',
        zh: '母語 (Native)',
        en: 'Native Speaker',
      },
      levelPercent: 100,
    },
    {
      id: 'lang-2',
      name: {
        vi: 'Tiếng Anh',
        zh: '英語 (English)',
        en: 'English',
      },
      proficiency: {
        vi: 'Thành thạo chuyên nghiệp (IELTS 8.0 - Giao tiếp và làm việc quốc tế)',
        zh: '商務精通 (IELTS 8.0 / 流暢跨國工作協作)',
        en: 'Full Professional Proficiency (IELTS 8.0 / C2 Equivalent)',
      },
      levelPercent: 95,
    },
    {
      id: 'lang-3',
      name: {
        vi: 'Tiếng Trung (Phồn thể / Giản thể)',
        zh: '華語 / 中文 (繁體 & 簡體)',
        en: 'Chinese (Traditional & Simplified)',
      },
      proficiency: {
        vi: 'Giao tiếp công việc thành thạo (TOCFL B2 / HSK 5 - Đọc hiểu tài liệu & đàm phán)',
        zh: '流利商務溝通 (TOCFL 流利級 B2 / HSK 5 級以上)',
        en: 'Professional Working Proficiency (TOCFL B2 / HSK 5 / Business Fluent)',
      },
      levelPercent: 82,
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: {
        vi: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
        zh: 'AWS 認證解決方案架構師 – 專業級 (SAP-C02)',
        en: 'AWS Certified Solutions Architect – Professional (SAP-C02)',
      },
      issuer: {
        vi: 'Amazon Web Services',
        zh: '亞馬遜雲端服務 (Amazon Web Services)',
        en: 'Amazon Web Services',
      },
      year: '2024',
      credentialUrl: 'https://aws.amazon.com/verification',
    },
    {
      id: 'cert-2',
      name: {
        vi: 'Certified Kubernetes Administrator (CKA)',
        zh: 'Kubernetes 認證管理者 (CKA)',
        en: 'Certified Kubernetes Administrator (CKA)',
      },
      issuer: {
        vi: 'Cloud Native Computing Foundation (CNCF)',
        zh: '雲端原生運算基金會 (CNCF / Linux Foundation)',
        en: 'Cloud Native Computing Foundation (CNCF)',
      },
      year: '2023',
      credentialUrl: 'https://cncf.io/certification/cka',
    },
  ],
};
