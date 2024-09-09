import React from 'react';
import magazineLayoutTemplates from '../components/magazineLayoutTemplates';

function TemplateSelector({ onSelect }) {
  return (
    <div className="template-selector">
      <h2>Select a Template</h2>
      <div className="template-list">
        {Object.entries(magazineLayoutTemplates).map(([key, template]) => (
          <button key={key} onClick={() => onSelect(key)}>
            {template.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TemplateSelector;