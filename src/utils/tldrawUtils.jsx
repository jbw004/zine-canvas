import { HTMLContainer, BaseBoxShapeUtil, Rectangle2d } from '@tldraw/tldraw'
import React from 'react'

export class ZinePageLayoutUtil extends BaseBoxShapeUtil {
  static type = 'zine-page-layout'

  getDefaultProps() {
    return {
      w: 400,
      h: 600,
      layout: 'title',
      content: {},
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
    const { w, h, layout, content } = shape.props
    return (
      <HTMLContainer style={{ width: w, height: h }}>
        <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#fff' }}>
          {renderLayout(layout, content)}
        </div>
      </HTMLContainer>
    )
  }

  indicator(shape) {
    return <rect width={shape.props.w} height={shape.props.h} />
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
      )
    case 'text':
      return (
        <div style={{ padding: '10%', fontSize: '14px' }}>
          {content.text}
        </div>
      )
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
      )
    default:
      return null
  }
}

export function createShapesFromOutline(outline) {
  const shapes = []
  const lines = outline.split('\n')
  const pageWidth = 400
  const pageHeight = 600
  const padding = 20

  let currentPage = { type: 'title', content: {} }
  let pageIndex = 0

  lines.forEach((line, index) => {
    if (line.trim() === '') return

    if (line.startsWith('Title:')) {
      if (currentPage.content.title) {
        shapes.push(createPageShape(currentPage, pageIndex, pageWidth, pageHeight, padding))
        pageIndex++
        currentPage = { type: 'title', content: {} }
      }
      currentPage.content.title = line.replace('Title:', '').trim()
    } else if (line.match(/^\d+\./)) {
      if (currentPage.type !== 'text') {
        shapes.push(createPageShape(currentPage, pageIndex, pageWidth, pageHeight, padding))
        pageIndex++
        currentPage = { type: 'text', content: { text: '' } }
      }
      currentPage.content.text += line + '\n'
    } else {
      if (currentPage.type === 'title') {
        currentPage.content.subtitle = line.trim()
      } else {
        currentPage.content.text += line + '\n'
      }
    }
  })

  // Add the last page
  shapes.push(createPageShape(currentPage, pageIndex, pageWidth, pageHeight, padding))

  return shapes
}

function createPageShape(page, index, width, height, padding) {
  return {
    type: 'zine-page-layout',
    x: (index % 2) * (width + padding),
    y: Math.floor(index / 2) * (height + padding),
    props: {
      w: width,
      h: height,
      layout: page.type,
      content: page.content,
    },
  }
}

export function getColorForLine(line) {
  if (line.includes('Title:')) return 'blue'
  if (line.match(/^\d+\./)) return 'green'
  return 'black'
}