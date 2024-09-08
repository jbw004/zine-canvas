import React from 'react';
import { HTMLContainer, BaseBoxShapeUtil, Rectangle2d } from '@tldraw/tldraw';

class ZinePageLayoutUtil extends BaseBoxShapeUtil {
  static type = 'zine-page-layout';

  getDefaultProps() {
    return {
      w: 400,
      h: 600,
      layout: 'title',
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
    return (
      <HTMLContainer style={{ width: w, height: h }}>
        <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#fff' }}>
          {renderLayout(layout, content)}
        </div>
      </HTMLContainer>
    );
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />;
  }
}

function renderLayout(layout, content) {
  switch (layout) {
    case 'title':
      return (
        <>
          <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', fontSize: '24px', fontWeight: 'bold' }}>
            {content.title}
          </div>
          <div style={{ position: 'absolute', bottom: '10%', left: '10%', right: '10%', fontSize: '18px' }}>
            {content.subtitle}
          </div>
        </>
      );
    case 'text':
      return (
        <div style={{ padding: '10%', fontSize: '14px' }}>
          {content.text}
        </div>
      );
    case 'image':
      return (
        <>
          <div style={{ position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '30%', backgroundColor: '#ccc' }}>
            [Image Placeholder]
          </div>
          <div style={{ position: 'absolute', bottom: '10%', left: '10%', right: '10%', fontSize: '14px' }}>
            {content.caption}
          </div>
        </>
      );
    default:
      return null;
  }
}

export default ZinePageLayoutUtil;