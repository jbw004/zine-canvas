import { BaseBoxShapeUtil, Rectangle2d, createShapeId } from '@tldraw/tldraw'
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
        <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#f0f0f0', padding: '10px' }}>
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
    case 'title-image':
      return (
        <>
          <div style={{ width: '100%', height: '30%', backgroundColor: 'lightblue', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            [Insert Title]
          </div>
          <div style={{ width: '100%', height: '65%', backgroundColor: 'lightpink', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            [Upload Image]
          </div>
        </>
      )
    case 'full-image':
      return (
        <div style={{ width: '100%', height: '100%', backgroundColor: 'lightpink', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          [Upload Image]
        </div>
      )
    case 'image-text':
      return (
        <>
          <div style={{ width: '100%', height: '60%', backgroundColor: 'lightpink', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
            [Upload Image]
          </div>
          <div style={{ width: '100%', height: '35%', backgroundColor: 'lightblue', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            [Insert Text]
          </div>
        </>
      )
    default:
      return null
  }
}

export function createShapesFromOutline(content) {
  const shapes = []
  const pages = content[0].text.split('\n\n')
  const pageWidth = 400
  const pageHeight = 600
  const padding = 20

  pages.forEach((page, pageIndex) => {
    const lines = page.split('\n')
    if (lines[0].startsWith('Page')) {
      const layout = determineLayout(lines[1])
      const groupId = createShapeId()
      
      // Create group shape
      shapes.push({
        id: groupId,
        type: 'group',
        x: (pageIndex % 2) * (pageWidth + padding),
        y: Math.floor(pageIndex / 2) * (pageHeight + padding),
        props: {}
      })

      // Create child shapes
      const pageShapes = createPageShapes(layout, pageIndex, pageWidth, pageHeight, padding)
      pageShapes.forEach(shape => {
        shapes.push({
          ...shape,
          parentId: groupId
        })
      })
    }
  })

  return shapes
}

function createPageShapes(layout, pageIndex, width, height, padding) {
  const baseX = (pageIndex % 2) * (width + padding)
  const baseY = Math.floor(pageIndex / 2) * (height + padding)
  
  const commonShapeProps = {
    type: 'geo',
    props: {
      w: width,
      h: height,
      fill: 'solid',
      color: 'light-blue',
    },
  }

  switch (layout) {
    case 'title-image':
      return [
        {
          ...commonShapeProps,
          id: createShapeId(),
          x: baseX,
          y: baseY,
          props: { ...commonShapeProps.props, h: height * 0.3, color: 'light-blue' },
        },
        {
          ...commonShapeProps,
          id: createShapeId(),
          x: baseX,
          y: baseY + height * 0.3,
          props: { ...commonShapeProps.props, h: height * 0.7, color: 'light-red' },
        },
      ]
    case 'full-image':
      return [
        {
          ...commonShapeProps,
          id: createShapeId(),
          x: baseX,
          y: baseY,
          props: { ...commonShapeProps.props, color: 'light-red' },
        },
      ]
    case 'image-text':
      return [
        {
          ...commonShapeProps,
          id: createShapeId(),
          x: baseX,
          y: baseY,
          props: { ...commonShapeProps.props, h: height * 0.6, color: 'light-red' },
        },
        {
          ...commonShapeProps,
          id: createShapeId(),
          x: baseX,
          y: baseY + height * 0.6,
          props: { ...commonShapeProps.props, h: height * 0.4, color: 'light-blue' },
        },
      ]
    default:
      return []
  }
}

function determineLayout(layoutLine) {
  if (layoutLine.includes('title-image')) {
    return 'title-image'
  } else if (layoutLine.includes('full-image')) {
    return 'full-image'
  } else if (layoutLine.includes('image-text')) {
    return 'image-text'
  }
  return 'title-image' // default layout
}

export function getColorForLine(line) {
  if (line.includes('Title:')) return 'blue'
  if (line.match(/^\d+\./)) return 'green'
  return 'black'
}

export { createPageShapes, determineLayout }