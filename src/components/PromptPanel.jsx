import React, { useState } from 'react';

const PromptPanel = ({ onGenerate }) => {
  const [theme, setTheme] = useState('');
  const [style, setStyle] = useState('');
  const [complexity, setComplexity] = useState(5);

  const handleGenerate = () => {
    onGenerate({ theme, style, complexity });
  };

  return (
    <div>
      <h2>Create Your Zine</h2>
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="e.g., Cyberpunk, Nature"
      />
      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
      >
        <option value="">Select a style</option>
        <option value="minimalist">Minimalist</option>
        <option value="colorful">Colorful</option>
        <option value="vintage">Vintage</option>
        <option value="futuristic">Futuristic</option>
      </select>
      <div>
        <label>Complexity: {complexity}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={complexity}
          onChange={(e) => setComplexity(Number(e.target.value))}
        />
      </div>
      <button onClick={handleGenerate}>Generate Zine</button>
    </div>
  );
};

export default PromptPanel;