import React from 'react';
import { useEditor } from '@tldraw/tldraw';

function ImageUploader() {
  const editor = useEditor();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        const selectedShapes = editor.getSelectedShapes();
        if (selectedShapes.length === 1 && selectedShapes[0].type === 'zine-page-layout') {
          const shape = selectedShapes[0];
          const imageElement = shape.props.content.find(el => el.type === 'image');
          if (imageElement) {
            editor.updateShapes([
              {
                id: shape.id,
                type: 'zine-page-layout',
                props: {
                  ...shape.props,
                  content: {
                    ...shape.props.content,
                    [imageElement.id]: imageUrl,
                  },
                },
              },
            ]);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <input type="file" accept="image/*" onChange={handleImageUpload} />
  );
}

export default ImageUploader;