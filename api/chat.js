module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const message = (body.message || '').trim().toLowerCase();

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    let reply = "I'm Manik's AI portfolio assistant! You can ask me about Manik's background, projects, skills, education, or contact details.";

    if (/^(hi|hello|hey|greetings|hola)/i.test(message)) {
      reply = "Hello! 👋 I'm Manik Kukkar's AI Assistant. How can I assist you with exploring his portfolio today?";
    } else if (message.includes('who') || message.includes('about') || message.includes('name')) {
      reply = "Manik Kukkar is a passionate 2nd-year B.Tech Computer Science and Engineering student at JECRC University, Jaipur. He focuses on full-stack web development and software engineering.";
    } else if (message.includes('skill') || message.includes('tech') || message.includes('language') || message.includes('stack')) {
      reply = "Manik's technical skills include Python, HTML5, CSS3, JavaScript (ES6+), C++, C, Git, GitHub, Cursor AI, and responsive web design.";
    } else if (message.includes('project') || message.includes('work') || message.includes('built') || message.includes('repo')) {
      reply = "Manik has 6 active repositories on GitHub: 1) personal-portfolio, 2) python-programs-collection, 3) messy-python-code-improvement, 4) bug-fixing-using-cursor-ai, 5) interactive-quiz-application, and 6) book-reading-list-application. Explore them all at https://github.com/manikkukkar0-create.";
    } else if (message.includes('college') || message.includes('university') || message.includes('study') || message.includes('degree') || message.includes('education') || message.includes('cgpa')) {
      reply = "Manik is pursuing B.Tech in CSE at JECRC University, Jaipur (currently in second year, expected 2029) with a strong academic CGPA of 8.0.";
    } else if (message.includes('contact') || message.includes('email') || message.includes('mail') || message.includes('hire') || message.includes('reach')) {
      reply = "You can reach Manik directly via email at manikkukkar0@gmail.com, or check out his code on GitHub at https://github.com/manikkukkar0-create.";
    } else if (message.includes('github')) {
      reply = "Manik's GitHub profile and repositories can be found at: https://github.com/manikkukkar0-create";
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to process message' });
  }
};
