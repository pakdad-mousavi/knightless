const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const sounds = {};

const loadSound = async (name, url) => {
  const response = await fetch(url);
  const data = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(data);
  sounds[name] = audioBuffer;
};

const loadAllSounds = async () => {
  const promises = [loadSound('move', '/sounds/move.mp3'), loadSound('capture', '/sounds/capture.mp3'), loadSound('check', '/sounds/check.mp3')];
  await Promise.all(promises);
};

loadAllSounds();

export const playMoveAudio = (moveType) => {
  const source = audioContext.createBufferSource();
  source.buffer = sounds[moveType];
  source.connect(audioContext.destination);
  source.start(0);
};
