-- Add missing columns to training_videos
ALTER TABLE training_videos ADD COLUMN IF NOT EXISTS day INTEGER;
ALTER TABLE training_videos ADD COLUMN IF NOT EXISTS position INTEGER;
ALTER TABLE training_videos ADD COLUMN IF NOT EXISTS duration_minutes INTEGER NOT NULL DEFAULT 0;
ALTER TABLE training_videos ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Add unique constraint on day+position (ignore if exists)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'training_videos_day_position_key'
  ) THEN
    ALTER TABLE training_videos ADD CONSTRAINT training_videos_day_position_key UNIQUE (day, position);
  END IF;
END $$;

-- Create index on day
CREATE INDEX IF NOT EXISTS idx_training_videos_day ON training_videos(day);

-- Seed 7-day training content (skip if already exists)
INSERT INTO training_videos (day, position, title, description, video_url, duration_minutes) VALUES
  (1, 1, 'The Loop That Keeps You Stuck', 'Most people consume more information thinking it will help. It does the opposite. This video shows you the exact pattern and why breaking it changes everything.', '', 15),
  (1, 2, 'What AI Actually Is (No Jargon)', 'Forget everything you think you know. AI is simpler than people make it sound. This is the only explanation you need.', '', 12),
  (1, 3, 'Your First Real Step', 'Open ChatGPT or Claude. Type exactly what I tell you. See what happens. That is Day 1.', '', 18),
  (2, 1, 'How to Talk to AI (It Is Just a Conversation)', 'AI is not code. It is not complicated. You talk to it like a person. I will show you how.', '', 14),
  (2, 2, 'Copy These Prompts', 'I give you the exact prompts to type. Word for word. No guessing, no blank screen paralysis.', '', 16),
  (2, 3, 'Make It Useful Today', 'Take what you just learned and apply it to something real in your life right now. Not tomorrow. Now.', '', 15),
  (3, 1, 'Pick Your First Project', 'I give you 5 options. Pick the one that fits your life. We build it together.', '', 12),
  (3, 2, 'Build It Step by Step', 'Follow along on screen. I type, you type. By the end you have something real.', '', 20),
  (3, 3, 'Test It and Fix It', 'Things will not be perfect the first time. That is normal. I show you how to fix them fast.', '', 13),
  (4, 1, 'What Should You Automate?', 'Look at your week. Find the one thing you do over and over. That is what we automate today.', '', 10),
  (4, 2, 'Build Your First Automation', 'We connect two tools together so one triggers the other. No code needed.', '', 20),
  (4, 3, 'Let It Run', 'Turn it on. Walk away. Come back and see it worked without you.', '', 15),
  (5, 1, 'Write Anything in Minutes', 'Emails, posts, bios, descriptions. AI writes them. You edit them. Done.', '', 14),
  (5, 2, 'Make It Look Professional', 'Images, formatting, and design. No Photoshop. No design skills. Just AI.', '', 16),
  (5, 3, 'Post It and Share It', 'Take what you made and put it somewhere real. A post. An email. A page. It is live now.', '', 15),
  (6, 1, 'Chain Prompts Together', 'One prompt feeds the next. The output gets better every round. This is how pros use AI.', '', 16),
  (6, 2, 'Build a Mini System', 'Take everything from this week and connect it into one workflow that runs together.', '', 18),
  (6, 3, 'Troubleshoot Like a Pro', 'When AI gives you garbage, here is how to fix it in 30 seconds flat.', '', 11),
  (7, 1, 'Look at What You Built', 'Seven days ago you had not done anything with AI. Look at where you are now.', '', 10),
  (7, 2, 'Learn Any New Tool in Minutes', 'The skill is not one tool. It is knowing how to learn any tool fast. I show you the method.', '', 15),
  (7, 3, 'What Comes Next', 'You have the foundation. Here are 3 paths forward depending on what you want to build.', '', 20)
ON CONFLICT (day, position) DO NOTHING;
