export const portfolio = {
  name: "Kapil Kashyap",
  title: "AI Engineer, Full Stack Developer, Researcher",
  subtitle: "Software Developer & ML Engineer",
  heroText:
    "Building intelligent solutions at the intersection of AI and web technologies. Passionate about creating impactful applications that solve real-world problems.",
  summary:
    "Recent Computer Engineering graduate with a strong foundation in machine learning, data analytics, and software development. Passionate about using data to solve real-world problems.",
  about: [
    "As a Computer Engineering graduate with a focus on AI and Machine Learning, I've developed a unique blend of technical expertise and practical implementation skills. My research in neural networks has been published, and I've successfully applied these concepts to real-world projects in computer vision and natural language processing.",
    "Beyond the code, I've taken on leadership roles that have shaped my understanding of technology's business impact. As the Vice Chairperson of Marketing at E-Cell DJSCE, I learned to bridge the gap between technical innovation and market needs. My experience extends to organizing technical events and mentoring junior developers.",
    "I'm particularly interested in the ethical implications of AI and actively work towards developing responsible AI systems. In my free time, I contribute to open-source projects and share my knowledge through technical writing and community workshops."
  ],
  contact: {
    email: "kapilkashyap3105@gmail.com",
    workEmail: "kapilkashyap3105.work@gmail.com",
    phone: "+91 7304219586",
    alternatePhone: "+91 8591425664",
    location: "Mumbai, Maharashtra, India"
  },
  socials: {
    linkedin: "https://linkedin.com/in/kapilkashyap05",
    github: "https://github.com/kapilk05",
    codechef: "https://www.codechef.com/users/kashyap_kapil",
    leetcode: "https://leetcode.com/kashyap_kapil/"
  },
  resumeUrl: "/wac.pdf",
  skills: [
    { title: "Languages & Programming", items: ["Java", "Python", "C/C++", "JavaScript", "HTML", "CSS", "SQL", "R", "Ruby"] },
    { title: "Web Development", items: ["Spring Boot", "Spring Data JPA", "JDBC", "Node.js", "Express.js", "RESTful APIs", "React.js", "Tailwind CSS", "Three.js"] },
    { title: "Machine Learning & Data Science", items: ["TensorFlow", "PyTorch", "Scikit-learn", "Keras", "Hugging Face", "OpenCV", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "NLTK", "SpaCy"] },
    { title: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
    { title: "DevOps & Cloud", items: ["AWS (ECS, Lambda, EC2, S3, RDS)", "Docker", "Kubernetes"] },
    { title: "Backend Frameworks & Tools", items: ["Flask", "FastAPI", "Django", "Ruby on Rails", "Git", "MLflow", "Weights & Biases"] },
    { title: "Development Tools", items: ["VSCode", "IntelliJ", "Postman", "Swagger", "Figma"] }
  ],
  experience: [
    {
      title: "Cofounder & CTO",
      company: "Wedora",
      period: "August 2025 - Present",
      description: "Co-founded Wedora and led the technology vision, building scalable web solutions and managing the engineering team.",
      details: [
        "Architected and launched Wedora's core platform.",
        "Oversaw a team of developers, ensuring timely delivery and high code quality.",
        "Integrated modern tech stack including React, Node.js, and cloud services.",
        "Managed a team of 3 backend developers and 2 AI developers to build the AI Agent for the platform."
      ]
    },
    {
      title: "Software Developer",
      company: "Skima AI",
      period: "July 2025 - Present",
      description: "Backend Ruby on Rails developer. Star Employee Award - September 2025.",
      details: [
        "Optimized backend performance to under 250ms response time.",
        "Centralized batch statistics into a reusable Rails service.",
        "Integrated Notion and Zapier automations.",
        "Designed Notification Center system from scratch.",
        "Integrated Unified.to and Knit ATS APIs for automating ATS integration workflows."
      ]
    },
    {
      title: "Web Developer",
      company: "Suvidha Foundation",
      period: "June 2024 - July 2024",
      description: "Built efficient, low-latency campaign APIs using Spring Boot and MongoDB aggregation pipelines.",
      details: ["Used Redis caching for hot queries.", "Delivered performance-focused React components.", "Documented weekly metrics and improvements."]
    },
    {
      title: "Teaching Assistant",
      company: "Dwarkadas J. Sanghvi College of Engineering",
      period: "August 2024 - May 2025",
      description: "Assisted in core courses: Processor Architecture and Information Security.",
      details: ["Created structured lecture materials.", "Supported 100+ students with one-to-one guidance.", "Facilitated understanding of advanced topics."]
    },
    {
      title: "Founders Office Intern",
      company: "ParkIt.biz",
      period: "June 2023 - August 2023",
      description: "Generated leads, conducted market research, and fostered partnerships.",
      details: [
        "Conducted market analysis to identify growth opportunities.",
        "Generated revenue leads through targeted outreach campaigns and raised 1.5 lakhs in potential business.",
        "Managed attendance and payroll for other interns.",
        "Searched for potential tenders that could aid company growth."
      ]
    }
  ],
  projects: [
    {
      title: "Stock Forecasting and Event Impact Analysis",
      category: "Data Projects",
      description: "Time series forecasting on 15 years of stock data using Prophet and ETS models. Conducted event study on COVID-19 impact and created a Power BI dashboard for insights.",
      techStack: ["Python", "Prophet", "ETS", "Power BI", "Pandas"],
      liveLink: "https://app.powerbi.com/groups/me/reports/e27067ca-6478-4656-b829-4f1672332c7e?pbi_source=desktop"
    },
    {
      title: "Weighted Voting Detection for Liver Fibrosis",
      category: "AI & ML",
      description: "Combined clinical and ultrasound data using XGBoost and DenseNet-201 with a soft voting classifier, achieving 92.5% diagnostic accuracy.",
      techStack: ["Python", "XGBoost", "DenseNet-201", "Medical Imaging"],
      liveLink: "https://www.jneonatalsurg.com/index.php/jns/article/view/4685"
    },
    {
      title: "Automated Feature Extraction From Github Repos",
      category: "Automation",
      description: "Automated extraction and analysis of GitHub repo metadata using ML and NLP to identify development trends and patterns.",
      techStack: ["Python", "GitHub API", "NLP", "Data Analysis"],
      githubLink: "https://github.com/kapilk05/github-feature-extraction"
    },
    {
      title: "Dynamic Neural Style Transfer for Artistic Image Generation using VGG-19",
      category: "AI & ML",
      description: "Published paper with 5 citations. Introduces a VGG-19 based neural style transfer method that adaptively fuses content and style representations.",
      techStack: ["Python", "Machine Learning", "Deep Learning"],
      githubLink: "https://ijercse.com/dynamic-neural-style.phpe"
    },
    {
      title: "Disease Outbreak Prediction",
      category: "AI & ML",
      description: "Predicted disease outbreak severity using deep learning and DistilBERT embeddings with strong accuracy (R2 > 0.95).",
      techStack: ["Python", "DistilBERT", "Deep Learning", "Geospatial Analysis"],
      githubLink: "https://github.com/kapilk05/Disease-Outbreak-Prediction"
    },
    {
      title: "DJSCE E-Cell Website",
      category: "Web Applications",
      description: "Revamped the E-Cell website with React.js, Tailwind CSS, and Three.js, adding dynamic features and Instagram integration.",
      techStack: ["React.js", "Tailwind CSS", "Three.js", "Instagram API"],
      liveLink: "https://djsceecell.com/"
    }
  ],
  achievements: [
    "Subject Topper: Business Analytics, 85/100 marks and A Grade",
    "Global Rank 20: CodeChef Starters 135 Div 3, peak rating 1790",
    "B-Plan Winner: DJSCE TRINITY Business Plan Competition",
    "Creative Arts: Stage Play Writer 3rd place and Rap Battle 2nd place",
    "International Rank 3: Informatics Olympiad",
    "State Rank 1: Informatics Olympiad State Level",
    "State Rank 2: Mathematics Olympiad",
    "State Rank 3: Reasoning and French Olympiads"
  ],
  positions: [
    { title: "Vice Chairperson Marketing", organization: "DJSCE E-Cell", period: "August 2023 - October 2024", details: ["Managed team of 12 committee members", "Doubled initial budget from INR 50,000 through strategic fundraising", "Secured partnerships through MOUs with sponsors"] },
    { title: "Head of Finance Department", organization: "DJSCE Trinity", period: "December 2023 - September 2024", details: ["Managed INR 13 lakhs in funds", "Maintained accurate financial records", "Implemented financial controls and best practices"] },
    { title: "Technical Head", organization: "DJS CodeStars", period: "October 2023 - August 2024", details: ["Conducted DSA lectures for competitive programming", "Curated questions for competitions like Code Bounty", "Mentored 15-member technical team"] },
    { title: "Head of Corporate Relations", organization: "AIESEC in Mumbai", period: "December 2022 - March 2023", details: ["Developed recruitment strategies for international markets", "Led team of 6 members in talent recruitment", "Generated INR 4.3 lakhs cash flow"] }
  ]
} as const;

export type AppId =
  | "hero"
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "resume"
  | "contact"
  | "internet"
  | "minesweeper"
  | "paint"
  | "calculator"
  | "notepad";
