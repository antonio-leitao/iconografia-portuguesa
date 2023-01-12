function countPoints(svgString) {
  let pointsCount = 0;
  let elementCount = 0;
  const pathRegex = /<path[^>]* d="([^"]*)"[^>]*>/g;
  let match;
  while ((match = pathRegex.exec(svgString))) {
    const pathData = match[1];
    const points = pathData.split(/[\s,]+/);
    pointsCount += points.length;
    elementCount++;
  }

  const shapeRegex = /<(rect|circle|ellipse)[^>]*\/>/g;
  while ((match = shapeRegex.exec(svgString))) {
    pointsCount += 4;
    elementCount++;
  }

  const polygonRegex = /<(polygon|polyline)[^>]* points="([^"]*)"[^>]*>/g;
  while ((match = polygonRegex.exec(svgString))) {
    const polyPoints = match[2];
    const points = polyPoints.split(/[\s,]+/);
    pointsCount += points.length;
    elementCount++;
  }
  return { pointsCount: pointsCount, elementCount: elementCount };
}

module.exports = { countPoints };
