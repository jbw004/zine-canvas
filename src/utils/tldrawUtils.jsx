import { HTMLContainer, BaseBoxShapeUtil, Rectangle2d } from 'tldraw'
import React from 'react'

export class ZinePageUtil extends BaseBoxShapeUtil {
  static type = 'zine-page'

  getDefaultProps() {
    return {
      w: 200,
      h: 300,
      text: '',
      color: 'black',
    }
  }

  getGeometry(shape) {
    return new Rectangle2d({
      width: shape.props.w,
      height: shape.props.h,
      isFilled: true,
    })
  }

  component(shape) {
    const { w, h, text, color } = shape.props
    return (
      <HTMLContainer style={{ width: w, height: h }}>
        <div style={{ padding: '10px', color, fontSize: '14px', whiteSpace: 'pre-wrap' }}>
          {text}
        </div>
      </HTMLContainer>
    )
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />
  }
}

export function createShapesFromOutline(outline) {
  const shapes = []
  const lines = outline.split('\n')
  const pageWidth = 200
  const pageHeight = 300
  const padding = 20

  lines.forEach((line, index) => {
    if (line.trim() === '') return

    shapes.push({
      type: 'zine-page',
      x: (index % 2) * (pageWidth + padding),
      y: Math.floor(index / 2) * (pageHeight + padding),
      props: {
        w: pageWidth,
        h: pageHeight,
        text: line.trim(),
        color: getColorForLine(line),
      },
    })
  })

  return shapes
}

function getColorForLine(line) {
  if (line.includes('Title:')) return 'blue'
  if (line.match(/^\d+\./)) return 'green'
  return 'black'
}