const playingStyles = {
  positional: {
    name: 'Positional',
    subtitle: 'Positioning Master',
    description: 'Focuses on long-term strategic advantages, optimal piece placement, and control of key squares.',
  },
  tactical: {
    name: 'Tactical',
    subtitle: 'Tactics Maestro',
    description: 'Emphasizes sharp, aggressive play with a focus on short-term calculations, combinations, and sacrifices.',
  },
  aggressive: {
    name: 'Aggressive',
    subtitle: 'Relentless Attacker',
    description: "Prioritizes attacking the opponent's king and creating complications to pressure the opponent.",
  },
  defensive: {
    name: 'Defensive',
    subtitle: 'Fortress Builder',
    description: 'Focuses on solid, cautious play, prioritizing the safety of the king and the solidity of the position.',
  },
  universal: {
    name: 'Universal',
    subtitle: 'Versatile Virtuoso',
    description: 'Versatile, capable of switching between different playing styles based on the situation and opponent.',
  },
  'endgame-specialist': {
    name: 'Endgame Specialist',
    subtitle: 'Closing Expert',
    description: 'Excels in the endgame phase, with a crippling understanding of technical positions and endgame theory.',
  },
  strategic: {
    name: 'Strategic',
    subtitle: 'Focused Mastermind',
    description: 'Develops long-term plans and strategies, often focusing on the gradual improvement of position.',
  },
  dynamic: {
    name: 'Dynamic',
    subtitle: 'Master of Adaptation',
    description: 'Adapts quickly to changing positions, often taking calculated risks to create imbalances.',
  },
  hypermodern: {
    name: 'Hypermodern',
    subtitle: 'Innovative Thinker',
    description: 'Challenges classical principles by controlling the center with pieces rather than pawns, to provoke weaknesses.',
  },
  counterattacking: {
    name: 'Counterattacking',
    subtitle: 'Counterattack Specialist',
    description: 'Invites the opponent to overextend, then seeks to exploit weaknesses and launch counterattacks.',
  },
  solid: {
    name: 'Solid',
    subtitle: 'Stronghold Builder',
    description: 'Plays safely and solidly, avoiding unnecessary risks and focusing on building a strong, unassailable position.',
  },
  intuitive: {
    name: 'Intuitive',
    subtitle: 'Instinctive Strategist',
    description: 'Relies on instinct and experience rather than deep calculation, often making moves that "feel" right.',
  },
  creative: {
    name: 'Creative',
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