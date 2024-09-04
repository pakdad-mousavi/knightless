const playingStyles = {
  positional: {
    name: 'Positional',
    icon: 'chessboard',
    subtitle: 'Positioning Master',
    description: 'Focuses on long-term strategic advantages, optimal piece placement, and control of key squares.',
  },
  tactical: {
    name: 'Tactical',
    icon: 'tactical',
    subtitle: 'Tactics Maestro',
    description: 'Emphasizes sharp, aggressive play with a focus on short-term calculations, combinations, and sacrifices.',
  },
  aggressive: {
    name: 'Aggressive',
    icon: 'crossbones',
    subtitle: 'Relentless Attacker',
    description: "Prioritizes attacking the opponent's king and creating complications to pressure the opponent.",
  },
  defensive: {
    name: 'Defensive',
    icon: 'shield',
    subtitle: 'Fortress Builder',
    description: 'Focuses on solid, cautious play, prioritizing the safety of the king and the solidity of the position.',
  },
  universal: {
    name: 'Universal',
    icon: 'atlas',
    subtitle: 'Versatile Virtuoso',
    description: 'Versatile, capable of switching between different playing styles based on the situation and opponent.',
  },
  'endgame-specialist': {
    name: 'Endgame Specialist',
    icon: 'book-skull',
    subtitle: 'Closing Expert',
    description: 'Excels in the endgame phase, with a crippling understanding of technical positions and endgame theory.',
  },
  strategic: {
    name: 'Strategic',
    icon: 'strategic',
    subtitle: 'Focused Mastermind',
    description: 'Develops long-term plans and strategies, often focusing on the gradual improvement of position.',
  },
  dynamic: {
    name: 'Dynamic',
    icon: 'bolt',
    subtitle: 'Master of Adaptation',
    description: 'Adapts quickly to changing positions, often taking calculated risks to create imbalances.',
  },
  hypermodern: {
    name: 'Hypermodern',
    icon: 'bulb',
    subtitle: 'Innovative Thinker',
    description: 'Challenges classical principles by controlling the center with pieces rather than pawns, to provoke weaknesses.',
  },
  counterattacking: {
    name: 'Counter-Attacking',
    icon: 'ninja',
    subtitle: 'Counterattack Specialist',
    description: 'Invites the opponent to overextend, then seeks to exploit weaknesses and launch counterattacks.',
  },
  solid: {
    name: 'Solid',
    icon: 'fortress',
    subtitle: 'Stronghold Builder',
    description: 'Plays safely and solidly, avoiding unnecessary risks and focusing on building a strong, unassailable position.',
  },
  intuitive: {
    name: 'Intuitive',
    icon: 'brain',
    subtitle: 'Instinctive Strategist',
    description: 'Relies on instinct and experience rather than deep calculation, often making moves that "feel" right.',
  },
  creative: {
    name: 'Creative',
    icon: 'pen-nib',
    subtitle: 'Innovative Tactician',
    description: 'Known for thinking outside the box, creating unexpected and original moves that challenge conventional play.',
  },
};

export const getPlayingStyles = (styles) => {
  const requestedStyles = styles.map((style) => style.toLowerCase().trim().replace(' ', '-'));

  const result = []
  requestedStyles.forEach(style => {
    result.push(playingStyles[style]);
  });

  return result;
};

export const getDistinctPlayingStyles = () => {
  const result = [];
  for (let playingStyle of Object.values(playingStyles)) {
    result.push(playingStyle.name);
  }

  return result;
};