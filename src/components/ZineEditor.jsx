import React, { useCallback } from 'react';
import { useEditor, createShapeId } from '@tldraw/tldraw';
import TemplateSelector from '../components/TemplateSelector';
import magazineLayoutTemplates from '../components/magazineLayoutTemplates';

function ZineEditor() {
  const editor = useEditor();

  const handleTemplateSelect = useCallback((templateKey) => {
    const template = magazineLayoutTemplates[templateKey];
    const groupId = createShapeId();
    const shapes = template.elements.map(element => {
      const baseShape = {
        id: createShapeId(),
        type: element.type === 'image' ? 'image' : 'geo',
        x: element.x,
        y: element.y,
        props: {
          w: element.width,
          h: element.height,
        },
      };
  
      if (element.type === 'image') {
        baseShape.props.assetId = null;  // You'll need to set this to a valid asset ID when you have an image
      } else if (element.type === 'text') {
        baseShape.props.text = element.id;
        baseShape.props.color = 'light-blue';
        baseShape.props.size = 'm';
        baseShape.props.font = 'draw';
        baseShape.props.align = 'middle';
        baseShape.props.verticalAlign = 'middle';
      } else {
        baseShape.props.geo = 'rectangle';
        baseShape.props.color = 'light-blue';
        baseShape.props.fill = 'solid';
      }
  
      return baseShape;
    });
  
    editor.createShapes(shapes);
    editor.groupShapes(shapes.map(shape => shape.id), groupId);
  
    // Position the new group
    const currentPageShapes = editor.getCurrentPageShapes();
    const existingGroups = currentPageShapes.filter(shape => shape.type === 'group');
    const xOffset = existingGroups.length * (template.width + 40); // Increased spacing between layouts
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