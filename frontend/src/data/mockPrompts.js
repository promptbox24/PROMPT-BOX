// Mock data for AI Prompt Library

export const promptCategories = [
  {
    id: 'homework',
    title: 'Homework Helper',
    description: 'Get help with your homework and learn faster',
    icon: '📚',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'creative',
    title: 'Creative Writing',
    description: 'Write amazing stories and adventures',
    icon: '✍️',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'gaming',
    title: 'Gaming & Fun',
    description: 'Create game ideas and fun activities',
    icon: '🎮',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'science',
    title: 'Science Explorer',
    description: 'Discover cool science facts and experiments',
    icon: '🔬',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  },
  {
    id: 'art',
    title: 'Art & Drawing',
    description: 'Get creative ideas for your art projects',
    icon: '🎨',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  },
  {
    id: 'coding',
    title: 'Coding Adventures',
    description: 'Learn to code with fun projects',
    icon: '💻',
    color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: 'math',
    title: 'Math Magic',
    description: 'Make math fun and easy to understand',
    icon: '🔢',
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
  },
  {
    id: 'reading',
    title: 'Reading & Books',
    description: 'Find book summaries and reading tips',
    icon: '📖',
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
  },
  {
    id: 'languages',
    title: 'Learn Languages',
    description: 'Practice new languages with AI help',
    icon: '🌍',
    color: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  },
  {
    id: 'health',
    title: 'Health & Fitness',
    description: 'Stay healthy and active with tips',
    icon: '💪',
    color: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
  }
];

export const featuredPrompts = [
  {
    id: 1,
    title: 'Essay Outline Generator',
    category: 'Student Prompts',
    description: 'Create structured essay outlines with key arguments and supporting evidence',
    prompt: 'Create a detailed essay outline for [TOPIC]. Include: thesis statement, 3 main arguments with supporting evidence, counterarguments, and conclusion. Make it academic and well-structured.',
    example: 'Generated a 5-paragraph outline with thesis, arguments, and citations',
    tags: ['writing', 'academic', 'structure'],
    isFavorite: false
  },
  {
    id: 2,
    title: 'Social Media Hook Creator',
    category: 'Creator Prompts',
    description: 'Generate attention-grabbing hooks for social media posts',
    prompt: 'Write 5 different attention-grabbing hooks for a social media post about [TOPIC]. Make them: emotional, curiosity-driven, contrarian, storytelling, and data-backed. Keep each under 15 words.',
    example: '5 unique hooks with different psychological triggers',
    tags: ['social media', 'content', 'engagement'],
    isFavorite: false
  },
  {
    id: 3,
    title: 'Email Campaign Writer',
    category: 'Business & Marketing',
    description: 'Craft high-converting email sequences',
    prompt: 'Write a 3-email welcome sequence for [PRODUCT/SERVICE]. Email 1: Welcome + value. Email 2: Social proof + benefits. Email 3: Clear CTA + urgency. Use conversational tone and keep each under 150 words.',
    example: '3-email sequence with compelling CTAs',
    tags: ['email', 'marketing', 'conversion'],
    isFavorite: false
  },
  {
    id: 4,
    title: 'Daily Planning Assistant',
    category: 'Productivity & Life',
    description: 'Organize your day with priority-based task planning',
    prompt: 'Help me plan my day. I have these tasks: [LIST TASKS]. Organize them by: 1) Urgent & Important, 2) Important but not urgent, 3) Quick wins. Include estimated time for each and suggest best time of day.',
    example: 'Prioritized task list with time blocks',
    tags: ['productivity', 'planning', 'time management'],
    isFavorite: false
  },
  {
    id: 5,
    title: 'Code Debug Helper',
    category: 'Coding & Tech',
    description: 'Debug code with detailed explanations',
    prompt: 'I have this code error: [PASTE ERROR]. My code: [PASTE CODE]. Please: 1) Explain what\'s causing the error, 2) Provide the fix, 3) Explain why the fix works, 4) Suggest how to prevent this in future.',
    example: 'Detailed debugging with explanation and prevention tips',
    tags: ['coding', 'debugging', 'learning'],
    isFavorite: false
  },
  {
    id: 6,
    title: 'Research Summarizer',
    category: 'Student Prompts',
    description: 'Summarize complex research papers into key insights',
    prompt: 'Summarize this research paper: [PASTE TEXT/LINK]. Include: 1) Main thesis, 2) Key findings (bullet points), 3) Methodology, 4) Limitations, 5) Real-world applications. Keep it under 300 words.',
    example: 'Concise summary with actionable insights',
    tags: ['research', 'academic', 'summary'],
    isFavorite: false
  }
];

export const features = [
  {
    title: 'Ready-to-Use',
    description: 'Copy and paste immediately. No editing required.',
    icon: '⚡'
  },
  {
    title: 'Real Examples',
    description: 'See actual outputs before you try them.',
    icon: '👁️'
  },
  {
    title: 'One-Click Copy',
    description: 'Copy button on every prompt for instant use.',
    icon: '📋'
  },
  {
    title: 'Regular Updates',
    description: 'New prompts added weekly based on user needs.',
    icon: '🔄'
  },
  {
    title: 'Beginner Friendly',
    description: 'Clear explanations for every prompt.',
    icon: '🎓'
  },
  {
    title: 'Tested & Proven',
    description: 'All prompts tested across multiple AI models.',
    icon: '✅'
  }
];

export const howItWorks = [
  {
    step: 1,
    title: 'Choose a Prompt',
    description: 'Browse by category or search for what you need'
  },
  {
    step: 2,
    title: 'Copy & Paste',
    description: 'One-click copy into ChatGPT, Claude, or any AI tool'
  },
  {
    step: 3,
    title: 'Get Results',
    description: 'Receive high-quality AI outputs instantly'
  }
];
