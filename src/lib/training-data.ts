// Default training content - used as fallback when Supabase data isn't loaded yet
// Admin can override all of this from the admin panel
//
// poster_url: if absent, falls back to derived `-poster.jpg` next to video_url,
// or to /posters/locked.png if no video_url.

export const defaultDays = [
  {
    day: 1,
    title: 'See the Problem',
    tagline: 'Why you keep getting stuck -- and the one shift that fixes it',
    videos: [
      {
        position: 1,
        title: 'The Loop That Keeps You Stuck',
        description: 'Most people consume more information thinking it will help. It does the opposite. This video shows you the exact pattern and why breaking it changes everything.',
        video_url: 'https://theproblemguide.com/videos/day-1-video-1.mp4',
        poster_url: '/posters/day-1-video-1.png',
        duration_minutes: 8,
        resources: [
          { id: 'd1v1-pdf', type: 'pdf', title: 'Day 1 V1 -- Action Guide (PDF)', url: 'https://theproblemguide.com/resources/day-1-video-1.pdf', description: 'The Loop diagram, 5th-grade SOP, 3 action steps you do today.' },
          { id: 'd1v1-claude', type: 'link', title: 'Open Claude.ai (the only AI we recommend)', url: 'https://claude.ai', description: 'Your AI assistant. Free. Sign up with Google.' },
          { id: 'd1v1-report', type: 'pdf', title: 'The Problem 2026 Report', url: 'https://theproblemguide.com/the-problem-2026-report.pdf?v=20260519', description: 'The book this training is built on. 21 pages.' },
        ],
      },
      {
        position: 2,
        title: 'What AI Actually Is (No Jargon)',
        description: 'Forget everything you think you know. AI is simpler than people make it sound. This is the only explanation you need.',
        video_url: 'https://theproblemguide.com/videos/day-1-video-2.mp4',
        duration_minutes: 5,
      },
      {
        position: 3,
        title: 'Your First Real Step',
        description: 'The basic loop: copy, paste, screenshot, ask. Four moves that turn AI from a toy into a real tool you can use today.',
        video_url: 'https://theproblemguide.com/videos/day-1-video-3.mp4',
        duration_minutes: 6,
      },
    ],
  },
  {
    day: 2,
    title: 'Talk to AI',
    tagline: 'Your first real conversation -- done-for-you prompts included',
    videos: [
      {
        position: 1,
        title: 'How to Talk to AI (It Is Just a Conversation)',
        description: 'Role. Audience. Style. Three lines that change every answer you get from AI.',
        video_url: 'https://theproblemguide.com/videos/day-2-video-1.mp4',
        poster_url: '/posters/day-2-video-1.png',
        duration_minutes: 4,
      },
      {
        position: 2,
        title: 'Copy These Prompts',
        description: 'Five exact prompts I run weekly. Word for word. Copy, paste, fill in the blanks, use today.',
        video_url: 'https://theproblemguide.com/videos/day-2-video-2.mp4',
        duration_minutes: 5,
      },
      {
        position: 3,
        title: 'Make It Useful Today',
        description: 'Three paths. Pick one. Take a real action in the next 20 minutes. Tell someone. Sleep on it.',
        video_url: 'https://theproblemguide.com/videos/day-2-video-3.mp4',
        duration_minutes: 4,
      },
    ],
  },
  {
    day: 3,
    title: 'Build Something',
    tagline: 'Turn a blank screen into something that actually works',
    videos: [
      { position: 1, title: 'Pick Your First Project', description: 'I give you 5 options. Pick the one that fits your life. We build it together.', video_url: '', duration_minutes: 12 },
      { position: 2, title: 'Build It Step by Step', description: 'Follow along on screen. I type, you type. By the end you have something real.', video_url: '', duration_minutes: 20 },
      { position: 3, title: 'Test It and Fix It', description: 'Things will not be perfect the first time. That is normal. I show you how to fix them fast.', video_url: '', duration_minutes: 13 },
    ],
  },
  {
    day: 4,
    title: 'Save Time',
    tagline: 'Automate one thing you do every week',
    videos: [
      { position: 1, title: 'What Should You Automate?', description: 'Look at your week. Find the one thing you do over and over. That is what we automate today.', video_url: '', duration_minutes: 10 },
      { position: 2, title: 'Build Your First Automation', description: 'We connect two tools together so one triggers the other. No code needed.', video_url: '', duration_minutes: 20 },
      { position: 3, title: 'Let It Run', description: 'Turn it on. Walk away. Come back and see it worked without you.', video_url: '', duration_minutes: 15 },
    ],
  },
  {
    day: 5,
    title: 'Create Content',
    tagline: 'Make AI write, design, and publish for you',
    videos: [
      { position: 1, title: 'Write Anything in Minutes', description: 'Emails, posts, bios, descriptions. AI writes them. You edit them. Done.', video_url: '', duration_minutes: 14 },
      { position: 2, title: 'Make It Look Professional', description: 'Images, formatting, and design. No Photoshop. No design skills. Just AI.', video_url: '', duration_minutes: 16 },
      { position: 3, title: 'Post It and Share It', description: 'Take what you made and put it somewhere real. A post. An email. A page. It is live now.', video_url: '', duration_minutes: 15 },
    ],
  },
  {
    day: 6,
    title: 'Go Deeper',
    tagline: 'Advanced moves that make you dangerous',
    videos: [
      { position: 1, title: 'Chain Prompts Together', description: 'One prompt feeds the next. The output gets better every round. This is how pros use AI.', video_url: '', duration_minutes: 16 },
      { position: 2, title: 'Build a Mini System', description: 'Take everything from this week and connect it into one workflow that runs together.', video_url: '', duration_minutes: 18 },
      { position: 3, title: 'Troubleshoot Like a Pro', description: 'When AI gives you garbage, here is how to fix it in 30 seconds flat.', video_url: '', duration_minutes: 11 },
    ],
  },
  {
    day: 7,
    title: 'Own It',
    tagline: 'You are not a beginner anymore -- here is what is next',
    videos: [
      { position: 1, title: 'Look at What You Built', description: 'Seven days ago you had not done anything with AI. Look at where you are now.', video_url: '', duration_minutes: 10 },
      { position: 2, title: 'Learn Any New Tool in Minutes', description: 'The skill is not one tool. It is knowing how to learn any tool fast. I show you the method.', video_url: '', duration_minutes: 15 },
      { position: 3, title: 'What Comes Next', description: 'You have the foundation. Here are 3 paths forward depending on what you want to build.', video_url: '', duration_minutes: 20 },
    ],
  },
]
