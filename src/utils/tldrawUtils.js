// src/utils/tldrawUtils.js
import { Tldraw, useEditor } from 'tldraw'

export const createShapesFromOutline = (outline) => {
  const shapes = []
  const lines = outline.split('\n')
  let yOffset = 0
  const pageWidth = 2000 // Adjust as needed
  const pageHeight = 3000 // Adjust as needed
  const padding = 20

  lines.forEach((line, index) => {
    if (line.trim() === '') return

    const isHeader = line.startsWith('#')
    const fontSize = isHeader ? 24 : 16
    const fontWeight = isHeader ? 'bold' : 'normal'

    const shape = {
      id: Utils.uniqueId(),
      type: 'text',
      x: padding,
      y: yOffset,
      text: line.trim(),
      style: {
        fontSize,
        fontWeight,
        textAlign: 'left',
        fill: 'black',
      },
    }

    shapes.push(shape)
    yOffset += fontSize + padding
  })

  // Add a background rectangle
  shapes.unshift({
    id: Utils.uniqueId(),
    type: 'rectangle',
    x: 0,
    y: 0,
    width: pageWidth,
    height: pageHeight,
    style: {
      fill: 'white',
      stroke: 'black',
      strokeWidth: 2,
    },
  })

  return shapes
}