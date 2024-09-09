import React, { useCallback } from 'react';
import { useEditor, createShapeId } from '@tldraw/tldraw';
import TemplateSelector from '../components/TemplateSelector';
import magazineLayoutTemplates from '../components/magazineLayoutTemplates';

function ZineEditor() {
  const editor = useEditor();

  const handleTemplateSelect = useCallback((templateKey) => {
    const template = magazineLayoutTemplates[templateKey];
    const groupId = createShapeId();
    const shapes = template.elements.map(element => ({
      id: createShapeId(),
      type: 'geo',
      x: element.x,
      y: element.y,
      props: {
        w: element.width,
        h: element.height,
        geo: 'rectangle',
        color: 'light-blue',
        text: element.type === 'text' ? element.id : '',
        fill: element.type === 'image' ? 'none' : 'solid',
      },
    }));
  
    editor.createShapes(shapes);
    editor.groupShapes(shapes.map(shape => shape.id), groupId);
  
    // Position the new group
    const currentPageShapes = editor.getCurrentPageShapes();
    const existingGroups = currentPageShapes.filter(shape => shape.type === 'group');
    const xOffset = existingGroups.length * (template.width + 20);
    editor.updateShapes([{
      id: groupId,
      type: 'group',
      x: xOffset,
      y: 0,
    }]);
  
  }, [editor]);

  return (
    <div className="zine-editor">
      <TemplateSelector onSelect={handleTemplateSelect} />
    </div>
  );
}

export default ZineEditor;