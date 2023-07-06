const audioContext = new AudioContext();

export function createSynth(wave) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.value = wave;

  oscillator.connect(gainNode);

  return {
    start: () => {
      try {
        oscillator.start();
      } catch (e) {}

      return gainNode.connect(audioContext.destination);
    },
    stop: () => gainNode.disconnect(audioContext.destination),
    shape: (type) => (oscillator.type = type),
  };
}
