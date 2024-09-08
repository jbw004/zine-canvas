import React from 'react';
import { useEditor } from '@tldraw/tldraw';
import { generateZineOutline } from '../services/api';
import { createShapesFromOutline } from '../utils/tldrawUtils.jsx';
import PromptPanel from './PromptPanel';

function ZineEditor({ isLoading, setIsLoading, setError }) {
  const editor = useEditor();

  const handleGenerate = React.useCallback(async (promptData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await generateZineOutline(promptData.theme, promptData.style, promptData.complexity);
      console.log('Full API response:', response);
      
      if (response && response.content) {
        // Clear existing shapes
        const allShapeIds = editor.getCurrentPageShapeIds();
        if (allShapeIds.length > 0) {
          editor.deleteShapes(allShapeIds);
        }

        // Create new shapes and groups
        const shapesAndGroups = createShapesFromOutline(response.content);
        editor.createShapes(shapesAndGroups);

        // Adjust the camera
        editor.zoomToFit();
        editor.setCamera({ x: 0, y: 0, z: 1 });
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (err) {
      console.error('Error in handleGenerate:', err);
      setError('Failed to generate zine outline. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [editor, setIsLoading, setError]);

  return (
    <PromptPanel 
      isLoading={isLoading}
      onGenerate={handleGenerate}
    />
  );
}

export default ZineEditor;