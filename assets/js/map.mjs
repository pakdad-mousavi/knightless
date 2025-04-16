const biomes = ['plains', 'forest', 'cactus', 'desert', 'metallic-gears', 'metallic-rust', 'lava', 'lava-cracks', 'snowy-mountain', 'snowy-trees'];
const territories = [{ type: 'land' }, { type: 'boss', name: 'Alaric' }, { type: 'demiboss', name: 'Jaden' }, { type: 'mine', resource: 'wood' }];

const hexGrid = [
  { c: 0, r: 0, conquered: true, biome: 0, region: 0, territory: 0 },
  { c: -1, r: 1, conquered: true, biome: 0, region: 0, territory: 0 },
  { c: 0, r: 1, conquered: true, biome: 1, region: 0, territory: 0 },
  { c: 1, r: 1, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 2, r: 1, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 6, r: 1, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 7, r: 1, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 8, r: 1, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 9, r: 1, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 10, r: 1, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 11, r: 1, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 13, r: 1, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 14, r: 1, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 15, r: 1, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 1, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 0, r: 2, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 1, r: 2, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 2, r: 2, conquered: false, biome: 1, region: 2, territory: 0 },
  { c: 3, r: 2, conquered: false, biome: 1, region: 2, territory: 0 },
  { c: 4, r: 2, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 5, r: 2, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 6, r: 2, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 7, r: 2, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 8, r: 2, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 9, r: 2, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 10, r: 2, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 11, r: 2, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 12, r: 2, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 13, r: 2, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 14, r: 2, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 15, r: 2, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 2, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 17, r: 2, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 18, r: 2, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: -1, r: 3, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 0, r: 3, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 1, r: 3, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 2, r: 3, conquered: false, biome: 1, region: 2, territory: 0 },
  { c: 3, r: 3, conquered: false, biome: 0, region: 1, territory: 0 },
  { c: 4, r: 3, conquered: false, biome: 0, region: 1, territory: 0 },
  { c: 5, r: 3, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 6, r: 3, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 7, r: 3, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 8, r: 3, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 9, r: 3, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 10, r: 3, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 11, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 12, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 13, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 14, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 15, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 17, r: 3, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 18, r: 3, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 19, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 20, r: 3, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 1, r: 4, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 2, r: 4, conquered: false, biome: 1, region: 0, territory: 0 },
  { c: 3, r: 4, conquered: false, biome: 0, region: 1, territory: 0 },
  { c: 4, r: 4, conquered: false, biome: 0, region: 1, territory: 0 },
  { c: 5, r: 4, conquered: false, biome: 1, region: 1, territory: 0 },
  { c: 6, r: 4, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 7, r: 4, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 8, r: 4, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 9, r: 4, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 10, r: 4, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 11, r: 4, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 12, r: 4, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 13, r: 4, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 14, r: 4, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 15, r: 4, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 4, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 17, r: 4, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 18, r: 4, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 19, r: 4, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 20, r: 4, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 0, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 1, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 2, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 3, r: 5, conquered: false, biome: 0, region: 1, territory: 0 },
  { c: 4, r: 5, conquered: false, biome: 1, region: 1, territory: 0 },
  { c: 5, r: 5, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 6, r: 5, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 7, r: 5, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 8, r: 5, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 9, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 10, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 11, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 12, r: 5, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 13, r: 5, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 14, r: 5, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 15, r: 5, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 5, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 17, r: 5, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 18, r: 5, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 19, r: 5, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 1, r: 6, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 2, r: 6, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 3, r: 6, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 4, r: 6, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 5, r: 6, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 6, r: 6, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 7, r: 6, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 8, r: 6, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 9, r: 6, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 10, r: 6, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 11, r: 6, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 12, r: 6, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 13, r: 6, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 14, r: 6, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 15, r: 6, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 6, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 17, r: 6, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 18, r: 6, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 19, r: 6, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 20, r: 6, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 0, r: 7, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 1, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 2, r: 7, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 3, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 4, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 5, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 6, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 7, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 8, r: 7, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 9, r: 7, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 10, r: 7, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 11, r: 7, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 12, r: 7, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 13, r: 7, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 14, r: 7, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 15, r: 7, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 16, r: 7, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 17, r: 7, conquered: false, biome: 7, region: 0, territory: 0 },
  { c: 18, r: 7, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 19, r: 7, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 0, r: 8, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 1, r: 8, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 2, r: 8, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 3, r: 8, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 4, r: 8, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 5, r: 8, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 6, r: 8, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 7, r: 8, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 8, r: 8, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 9, r: 8, conquered: false, biome: 3, region: 0, territory: 0 },
  { c: 10, r: 8, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 11, r: 8, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 12, r: 8, conquered: false, biome: 0, region: 0, territory: 0 },
  { c: 13, r: 8, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 14, r: 8, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 15, r: 8, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 16, r: 8, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 17, r: 8, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 18, r: 8, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 19, r: 8, conquered: false, biome: 6, region: 0, territory: 0 },
  { c: 20, r: 8, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 0, r: 9, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 1, r: 9, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 2, r: 9, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 3, r: 9, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 4, r: 9, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 5, r: 9, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 6, r: 9, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 7, r: 9, conquered: false, biome: 2, region: 0, territory: 0 },
  { c: 8, r: 9, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 9, r: 9, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 10, r: 9, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 11, r: 9, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 12, r: 9, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 13, r: 9, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 14, r: 9, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 15, r: 9, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 16, r: 9, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 17, r: 9, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 18, r: 9, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 19, r: 9, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 20, r: 9, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 1, r: 10, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 2, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 3, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 4, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 5, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 6, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 7, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 8, r: 10, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 9, r: 10, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 10, r: 10, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 11, r: 10, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 12, r: 10, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 13, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 14, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 15, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 16, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 17, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 18, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 19, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 20, r: 10, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 1, r: 11, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 2, r: 11, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 3, r: 11, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 4, r: 11, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 5, r: 11, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 6, r: 11, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 7, r: 11, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 8, r: 11, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 9, r: 11, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 10, r: 11, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 11, r: 11, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 12, r: 11, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 13, r: 11, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 14, r: 11, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 15, r: 11, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 16, r: 11, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 16, r: 11, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 17, r: 11, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 18, r: 11, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 19, r: 11, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 1, r: 12, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 2, r: 12, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 3, r: 12, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 4, r: 12, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 5, r: 12, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 6, r: 12, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 7, r: 12, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 8, r: 12, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 9, r: 12, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 10, r: 12, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 11, r: 12, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 12, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 13, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 14, r: 12, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 15, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 16, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 17, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 18, r: 12, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 19, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 20, r: 12, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 3, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 4, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 5, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 6, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 7, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 8, r: 13, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 9, r: 13, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 10, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 11, r: 13, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 12, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 13, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 14, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 15, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 16, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 17, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 18, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 19, r: 13, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 20, r: 13, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 4, r: 14, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 5, r: 14, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 6, r: 14, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 7, r: 14, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 8, r: 14, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 9, r: 14, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 10, r: 14, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 11, r: 14, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 12, r: 14, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 13, r: 14, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 14, r: 14, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 15, r: 14, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 16, r: 14, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 17, r: 14, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 18, r: 14, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 19, r: 14, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 5, r: 15, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 6, r: 15, conquered: false, biome: 5, region: 0, territory: 0 },
  { c: 7, r: 15, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 9, r: 15, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 10, r: 15, conquered: false, biome: 4, region: 0, territory: 0 },
  { c: 11, r: 15, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 12, r: 15, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 13, r: 15, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 14, r: 15, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 16, r: 15, conquered: false, biome: 9, region: 0, territory: 0 },
  { c: 17, r: 15, conquered: false, biome: 8, region: 0, territory: 0 },
  { c: 18, r: 15, conquered: false, biome: 9, region: 0, territory: 0 },
];

const hexToPixel = (c, r, hexRadius, gap = 10) => {
  // Calculate spacing factors
  const initialXGap = 200; // Initial horizontal gap
  const initialYGap = 100; // Initial vertical gap
  const hexWidth = Math.sqrt(3) * hexRadius; // Width of a hexagon
  const hexHeight = 2 * hexRadius; // Height of a hexagon
  const xGap = gap; // Horizontal gap
  const yGap = gap * (9 / 10); // Vertical gap (adjusted for staggering)

  // Adjust the horizontal position for odd rows
  const offset = r % 2 === 0 ? 0 : hexWidth / Math.sqrt(4); // Only odd rows shift

  // Calculate positions
  const x = initialXGap + (hexWidth + xGap) * c + offset; // Add stagger for odd rows
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
  const mapWidth = 2300;
  const mapHeight = 1500;
  // Select the SVG element and set its size
  const svg = d3.select('#map');
  svg.attr('width', mapWidth).attr('height', mapHeight);

  // Define hexagon size and properties
  const hexRadius = 55; // Radius of the hexagon
  const innerGap = 1; // Gap size between the outline and the fill
  const outerGap = 0; // Gap size between the shade and the outline

  for (const hex of hexGrid) {
    const { x, y } = hexToPixel(hex.c, hex.r, hexRadius, 0);
    const shadePoints = hexagonPath(x, y, hexRadius + outerGap); // Hexagon with the shade
    const outerPoints = hexagonPath(x, y, hexRadius); // Outer hexagon (for the outline)

    const group = svg.append('g').attr('class', 'hexagon');

    // Draw the outer hexagon
    group
      .append('polygon')
      .attr('points', outerPoints.map((point) => point.join(',')).join(' '))
      // .attr('stroke', hex.conquered ? '#047f85' : 'red')
      // .attr('stroke-width', 2)
      .attr('fill', 'none'); // No fill for the outer hexagon

    // Add background image to the inner hexagon
    group
      .append('image')
      .attr('x', x - hexRadius + innerGap)
      .attr('y', y - hexRadius + innerGap)
      .attr('width', (hexRadius - innerGap) * 2)
      .attr('height', (hexRadius - innerGap) * 2)
      .attr('href', `/images/biomes/${biomes[hex.biome]}.png`);

    // // Draw the shade hexagon
    // const shadeColor = territories[hex.region].type === 'boss' ? 'red' : territories[hex.region].type === 'demiboss' ? 'orange' : 'transparent';
    // const shadeOpacity = territories[hex.region].type === 'boss' || territories[hex.region].type === 'demiboss' ? 0.3 : 0;
    // group
    //   .append('polygon')
    //   .attr('points', shadePoints.map((point) => point.join(',')).join(' '))
    //   .attr('fill', shadeColor)
    //   .attr('fill-opacity', shadeOpacity); // Semi-transparent fill
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

// For even rows
const evenRowOffsets = [
  { dc: 1, dr: 0 }, // Right
  { dc: -1, dr: 0 }, // Left
  { dc: 0, dr: 1 }, // Bottom-right
  { dc: -1, dr: 1 }, // Bottom-left
  { dc: 0, dr: -1 }, // Top-right
  { dc: -1, dr: -1 }, // Top-left
];

// For odd rows
const oddRowOffsets = [
  { dc: 1, dr: 0 }, // Right
  { dc: -1, dr: 0 }, // Left
  { dc: 1, dr: 1 }, // Bottom-right
  { dc: 0, dr: 1 }, // Bottom-left
  { dc: 1, dr: -1 }, // Top-right
  { dc: 0, dr: -1 }, // Top-left
];

function findNeighbors(hexGrid, targetHex) {
  const { c, r } = targetHex; // Target hex's coordinates
  const isOddRow = r % 2 === 1;

  // Choose the correct neighbor offsets based on row parity
  const neighborOffsets = isOddRow ? oddRowOffsets : evenRowOffsets;

  const neighbors = neighborOffsets
    .map(({ dc, dr }) => {
      // Calculate neighbor's coordinates
      const neighborC = c + dc;
      const neighborR = r + dr;
      // Find the neighbor in the hexGrid
      return hexGrid.find((hex) => hex.c === neighborC && hex.r === neighborR);
    })
    .filter(Boolean); // Remove undefined (non-existent neighbors)

  return neighbors;
}

// Example usage
const targetHex = { c: 0, r: 1, conquered: true, biome: 0, region: 0 };
const neighbors = findNeighbors(hexGrid, targetHex);

console.log(neighbors);
