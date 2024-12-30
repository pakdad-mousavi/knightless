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
  const mapWidth = 2000;
  const mapHeight = 2000;
  // Select the SVG element and set its size
  const svg = d3.select('svg');
  svg.attr('width', mapWidth).attr('height', mapHeight);

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

  // Add drag behavior
  let currentX = 0, // Current mouse X position
    currentY = 0, // Current mouse Y position
    dx = 0, // Change in X position
    dy = 0, // Change in Y position
    pastdx = 0, // Past change in X position
    pastdy = 0; // Past change in Y position

  const drag = d3
    .drag()
    .on('start', (event) => {
      // Initial mouse position
      currentX = event.x;
      currentY = event.y;

      // Change the cursor style
      svg.style('cursor', 'grabbing');
    })
    .on('drag', (event) => {
      // Calculate the change in mouse position
      dx = event.x - currentX;
      dy = event.y - currentY;

      // Calculate the position of the SVG element, keep track of the past change in position
      let updatedPosX = pastdx + dx;
      let updatedPosY = pastdy + dy;

      // If the SVG element is moving off the left side of the screen
      if (updatedPosX > 0) {
        currentX = event.x;
        dx = event.x - currentX;
        pastdx = dx;
        updatedPosX = pastdx + dx;
      }

      // If the SVG element is moving off the right side of the screen
      else if (updatedPosX < window.innerWidth - mapWidth) {
        currentX = event.x;
        dx = event.x - currentX;
        pastdx = window.innerWidth - mapWidth;
        updatedPosX = pastdx + dx;
      }

      // If the SVG element is moving off the top of the screen
      if (updatedPosY > 0) {
        currentY = event.y;
        dy = event.y - currentY;
        pastdy = dy;
        updatedPosY = pastdy + dy;
      }

      // If the SVG element is moving off the bottom of the screen
      else if (updatedPosY < window.innerHeight - mapHeight) {
        currentY = event.y;
        dy = event.y - currentY;

        pastdy = window.innerHeight - mapHeight;
        updatedPosY = pastdy + dy;
      }

      // Update the position of the SVG element
      svg.attr('transform', `translate(${updatedPosX}, ${updatedPosY})`);
    })
    .on('end', (event) => {
      // Update the current mouse position and the past change in position
      currentX = event.x;
      currentY = event.y;
      pastdx += dx;
      pastdy += dy;

      // Reset the cursor style
      svg.style('cursor', 'grab');
    });

  svg.call(drag);
};
