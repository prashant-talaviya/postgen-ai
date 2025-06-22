import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import './styles.css';

// const API_URL = process.env.REACT_APP_API_URL;
const API_URL = process.env.REACT_APP_API_URL;

function App() {
  // State for theme toggle
  const [darkMode, setDarkMode] = useState(false);
  
  // State for form inputs
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [tone, setTone] = useState('professional');
  const [variations, setVariations] = useState('1');
  const [includeThread, setIncludeThread] = useState(false);
  const [includeHashtags, setIncludeHashtags] = useState(false);
  const [includeEmojis, setIncludeEmojis] = useState(false);
  
  // State for results
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPosts, setGeneratedPosts] = useState([]);
  const [error, setError] = useState(null);

  // Theme effect
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.body.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode ? 'dark' : 'light';
    setDarkMode(!darkMode);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const createPrompt = () => {
    let prompt = `Generate ${variations} engaging social media post${variations > 1 ? 's' : ''} for ${platform} about: ${topic}\n\n`;
    prompt += `Tone: ${tone}\n`;
    
    if (includeThread) prompt += "Format as a thread (multiple connected posts)\n";
    if (includeHashtags) prompt += "Include relevant and trending hashtags\n";
    if (includeEmojis) prompt += "Include appropriate and engaging emojis\n";
    if (platform === 'twitter') prompt += "Keep each post within 280 characters\n";

    return prompt;
  };

  const generatePosts = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic for your post');
      return;
    }

    setIsLoading(true);
    setGeneratedPosts([]);
    setError(null);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: createPrompt() }] }]
        })
      });
      
      const data = await response.json();
      if (data.candidates?.length > 0) {
        const content = data.candidates[0].content.parts[0].text;
        setGeneratedPosts(content.split('\n\n').filter(post => post.trim()));
      } else {
        throw new Error('No response from API');
      }
    } catch (err) {
      setError('Error generating posts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      setError('Failed to copy to clipboard');
      return false;
    }
  };

  return (
    <div className="app">
      {/* Theme Toggle */}
      <div className="theme-toggle">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className="slider"></span>
        </label>
        <span id="theme-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>

      {/* Main Container */}
      <div className="container">
        {/* Header */}
        <header>
          <h1>PostGen AI</h1>
          <p className="subtitle">Craft Your Perfect Post with AI Magic ✨</p>
        </header>

        {/* Input Section */}
        <div className="input-section">
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What's on your mind? Enter your topic or idea here..."
          />

          <div className="options-grid">
            <div className="option-group">
              <label>Choose Platform</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="twitter">X (Twitter)</option>
                <option value="linkedin">LinkedIn</option>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>

            <div className="option-group">
              <label>Select Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)}>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="friendly">Friendly</option>
                <option value="humorous">Humorous</option>
              </select>
            </div>

            <div className="option-group">
              <label>Post Variations</label>
              <select value={variations} onChange={(e) => setVariations(e.target.value)}>
                <option value="1">1 variation</option>
                <option value="2">2 variations</option>
                <option value="3">3 variations</option>
              </select>
            </div>
          </div>

          <div className="toggles">
            <div className="toggle-group">
              <label>Create Thread</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={includeThread} 
                  onChange={() => setIncludeThread(!includeThread)} 
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-group">
              <label>Add Hashtags</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={includeHashtags} 
                  onChange={() => setIncludeHashtags(!includeHashtags)} 
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="toggle-group">
              <label>Add Emojis</label>
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={includeEmojis} 
                  onChange={() => setIncludeEmojis(!includeEmojis)} 
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <button 
            onClick={generatePosts}
            disabled={isLoading}
          >
            ✨ Generate Magic Posts
          </button>
        </div>

        {/* Output Section */}
        <div className="output-section">
          {isLoading && (
            <div id="loading">
              Crafting your perfect posts...
            </div>
          )}

          {error && (
            <div className="error">{error}</div>
          )}

          {generatedPosts.map((post, index) => (
            <div key={index} className="generated-post">
              <p>{post}</p>
              <button 
                className="copy-btn"
                onClick={async () => {
                  const success = await copyToClipboard(post);
                  if (success) {
                    alert('Copied to clipboard!');
                  }
                }}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>Developed by <strong>Prashant Talaviya</strong></p>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/prashant-talaviya/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/prashant-talaviya" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;