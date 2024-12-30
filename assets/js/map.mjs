const biomes = ['forest', 'desert', 'mountain', 'plains', 'swamp', 'tundra', 'volcano', 'water'];
const regions = ['heartland', 'shatteredPlains', 'Ironspire'];

const hexGrid = [
  { c: 0, r: 0, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 2, r: 1, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 0, r: 1, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 1, r: 1, conquered: true, biome: 0, mine: false, region: 0 },
  { c: -1, r: 1, conquered: true, biome: 0, mine: false, region: 0 },
  { c: -1, r: 2, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 0, r: 2, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 1, r: 2, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 2, r: 2, conquered: true, biome: 0, mine: false, region: 0 },
  { c: -2, r: 3, conquered: true, biome: 0, mine: false, region: 0 },
  { c: -1, r: 3, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 0, r: 3, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 1, r: 3, conquered: true, biome: 0, mine: false, region: 0 },
  { c: 2, r: 3, conquered: true, biome: 1, mine: false, region: 0 },
  { c: 3, r: 3, conquered: true, biome: 1, mine: false, region: 0 },
];

const hexToPixel = (q, r, hexRadius, gap = 10) => {
  // Calculate spacing factors
  const initialXGap = 200; // Initial horizontal gap
  const initialYGap = 100; // Initial vertical gap
  const hexWidth = Math.sqrt(3) * hexRadius; // Width of a hexagon
  const hexHeight = 2 * hexRadius; // Height of a hexagon
  const xGap = gap; // Horizontal gap
  const yGap = gap * (3 / 4); // Vertical gap (adjusted for staggering)

  // Adjust coordinates with the gap
  const x = initialXGap + (hexWidth + xGap) * (q + r / 2); // Add gap to hex width
  const y = initialYGap + (hexHeight * (3 / 4) + yGap) * r; // Add gap to hex height
  return { x, y };
};

// Function to generate the points for a hexagon with the sharp point pointing downwards
const hexagonPath = (x, y, radius) => {
  const angle = Math.PI / 3; // 60 degrees in radians
  const points = [];
  for (let i = 0; i < 6; i++) {
    // Rotate the points by 90 degrees (π/2 radians) to point the sharp end down
    const xOffset = radius * Math.cos(angle * i - Math.PI / 2);
    const yOffset = radius * Math.sin(angle * i - Math.PI / 2);
    points.push([x + xOffset, y + yOffset]);
  }
  return points;
};

export const createMap = () => {
  const svg = d3.select('svg');
  console.log(svg);

  // Define hexagon size and properties
  const hexRadius = 55; // Radius of the hexagon
  const gap = 5; // Gap size between the outline and the fill

  for (const hex of hexGrid) {
    const { x, y } = hexToPixel(hex.c, hex.r, hexRadius);
    const outerPoints = hexagonPath(x, y, hexRadius); // Outer hexagon (for the outline)
    const innerPoints = hexagonPath(x, y, hexRadius - gap); // Inner hexagon (for the fill)

    // Draw the outer hexagon
    svg
      .append('polygon')
      .attr('points', outerPoints.map((point) => point.join(',')).join(' '))
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('fill', 'none'); // No fill for the outer hexagon

    // Draw the inner hexagon
    svg.append('polygon').attr('points', innerPoints.map((point) => point.join(',')).join(' '));

    // Add background image to the inner hexagon
    svg
      .append('image')
      .attr('x', x - hexRadius + gap)
      .attr('y', y - hexRadius + gap)
      .attr('width', (hexRadius - gap) * 2)
      .attr('height', (hexRadius - gap) * 2)
      .attr('href', `/images/biomes/${biomes[hex.biome]}.png`)
      .attr('transform', `rotate(30 ${x} ${y})`);
  }
};
