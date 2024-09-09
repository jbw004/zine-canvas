import React from 'react';
import { HTMLContainer, BaseBoxShapeUtil, Rectangle2d } from '@tldraw/tldraw';
import magazineLayoutTemplates from '../components/magazineLayoutTemplates';

class ZinePageLayoutUtil extends BaseBoxShapeUtil {
  static type = 'zine-page-layout';

  getDefaultProps() {
    return {
      w: 213,
      h: 276,
      layout: 'cover',
      content: {},
    };
  }

  getGeometry(shape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    });
  }

  component(shape) {
    const { w, h, layout, content } = shape.props;
    const template = magazineLayoutTemplates[layout];

    return (
      <HTMLContainer style={{ width: w, height: h }}>
        <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#fff' }}>
          {template.elements.map((element) => renderElement(element, content[element.id]))}
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}

function renderElement(element, content) {
  switch (element.type) {
    case 'text':
      return (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            fontSize: element.fontSize,
            fontWeight: element.fontWeight,
          }}
        >
          {content || '[Text Placeholder]'}
        </div>
      );
    case 'image':
      return (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            backgroundColor: '#ccc',
          }}
        >
          {content ? (
            <img src={content} alt="User uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            '[Image Placeholder]'
          )}
        </div>
      );
    default:
      return null;
  }
}

export default ZinePageLayoutUtil;