const magazineLayoutTemplates = {
  cover: {
    name: 'Cover Layout',
    width: 213,
    height: 276,
    elements: [
      { type: 'image', x: 0, y: 0, width: 213, height: 276, id: 'coverImage' },
      { type: 'text', x: 10, y: 20, width: 193, height: 40, id: 'magazineTitle' },
      { type: 'text', x: 10, y: 230, width: 193, height: 30, id: 'coverHeadline' },
    ]
  },
  contentsPage: {
    name: 'Contents Page',
    width: 213,
    height: 276,
    elements: [
      { type: 'text', x: 10, y: 10, width: 193, height: 30, id: 'contentsTitle' },
      { type: 'text', x: 10, y: 50, width: 93, height: 200, id: 'contentsLeft' },
      { type: 'text', x: 110, y: 50, width: 93, height: 200, id: 'contentsRight' },
      { type: 'image', x: 10, y: 210, width: 193, height: 60, id: 'contentsThumbnail' },
    ]
  },
  featureSpread: {
      name: 'Feature Spread',
      elements: [
        { type: 'image', x: 0, y: 0, width: 213, height: 180, id: 'featureImage' },
        { type: 'text', x: 10, y: 190, width: 193, height: 30, id: 'featureTitle', fontSize: 24, fontWeight: 'bold' },
        { type: 'text', x: 10, y: 230, width: 193, height: 40, id: 'featureSubtitle', fontSize: 16 },
      ]
    },
    // Add more templates as needed
  };
  
  export default magazineLayoutTemplates;