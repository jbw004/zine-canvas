import React from 'react'
import { BaseBoxShapeUtil, HTMLContainer, Rectangle2d } from 'tldraw'
import { nanoid } from 'nanoid'

export const ZinePageShapeUtil = () => {
  return class ZinePageUtil extends BaseBoxShapeUtil {
    static type = 'zine-page'
    static props = {
      w: Number,
      h: Number,
      text: String,
      color: String,
    }

    getDefaultProps() {
      return {
        w: 200,
        h: 300,
        text: '',
        color: 'black',
      }
    }

    component(shape) {
      const { w, h, text, color } = shape.props
      return (
        <HTMLContainer style={{ width: w, height: h, overflow: 'hidden' }}>
          <div style={{ padding: '10px', color, fontSize: '14px' }}>{text}</div>
        </HTMLContainer>
      )
    }

    indicator(shape) {
      return <rect width={shape.props.w} height={shape.props.h} />
    }
  }
}

export const createShapesFromOutline = (outline) => {
  const shapes = []
  const lines = outline.split('\n')
  const pageWidth = 200
  const pageHeight = 300
  const padding = 20

  lines.forEach((line, index) => {
    if (line.trim() === '') return

    const shape = {
      id: `shape:${nanoid()}`,
      type: 'zine-page',
      x: (index % 2) * (pageWidth + padding),
      y: Math.floor(index / 2) * (pageHeight + padding),
      props: {
        w: pageWidth,
        h: pageHeight,
        text: line.trim(),
        color: getColorForLine(line),
      },
    }

    shapes.push(shape)
  })

  return shapes
}

function getColorForLine(line) {
  if (line.includes('Title:')) {
    return 'blue'
  } else if (line.match(/^\d+\./)) {
    return 'green'
  } else {
    return 'black'
  }
}