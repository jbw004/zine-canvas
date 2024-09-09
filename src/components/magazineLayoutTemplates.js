const magazineLayoutTemplates = {
  cover: {
    name: 'Cover Layout',
    width: 600,
    height: 800,
    elements: [
      { type: 'image', x: 0, y: 0, width: 600, height: 600, id: 'coverImage' },
      { type: 'text', x: 30, y: 620, width: 540, height: 100, id: 'magazineTitle' },
      { type: 'text', x: 30, y: 740, width: 540, height: 40, id: 'coverHeadline' },
    ]
  },
  contentsPage: {
    name: 'Contents Page',
    width: 600,
    height: 800,
    elements: [
      { type: 'text', x: 30, y: 30, width: 540, height: 60, id: 'contentsTitle' },
      { type: 'text', x: 30, y: 110, width: 260, height: 660, id: 'contentsLeft' },
      { type: 'text', x: 310, y: 110, width: 260, height: 660, id: 'contentsRight' },
    ]
  },
  featureSpread: {
    name: 'Feature Spread',
    width: 600,
    height: 800,
    elements: [
      { type: 'image', x: 30, y: 30, width: 540, height: 400, id: 'featureImage' },
      { type: 'text', x: 30, y: 450, width: 540, height: 80, id: 'featureTitle' },
      { type: 'text', x: 30, y: 550, width: 540, height: 220, id: 'featureContent' },
    ]
  },
};

export default magazineLayoutTemplates;