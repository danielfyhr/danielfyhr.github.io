import { createSynth } from './audioPlayer.mjs';

const notes = [
  {
    note: 'C',
    frequency: 261.63,
    color: 'white',
    hotkey: 'q',
    ...createSynth(261.63),
  },
  {
    note: 'C#',
    frequency: 277.18,
    color: 'black',
    hotkey: '2',
    ...createSynth(277.18),
  },
  {
    note: 'D',
    frequency: 293.66,
    color: 'white',
    hotkey: 'w',
    ...createSynth(293.66),
  },
  {
    note: 'D#',
    frequency: 311.13,
    color: 'black',
    hotkey: '3',
    ...createSynth(311.13),
  },
  {
    note: 'E',
    frequency: 329.63,
    color: 'white',
    hotkey: 'e',
    ...createSynth(329.63),
  },
  {
    note: 'F',
    frequency: 349.23,
    color: 'white',
    hotkey: 'r',
    ...createSynth(349.23),
  },
  {
    note: 'F#',
    frequency: 369.99,
    color: 'black',
    hotkey: 't',
    ...createSynth(369.99),
  },
  {
    note: 'G',
    frequency: 392.0,
    color: 'white',
    hotkey: '6',
    ...createSynth(392.0),
  },
  {
    note: 'G#',
    frequency: 415.3,
    color: 'black',
    hotkey: 'y',
    ...createSynth(415.3),
  },
  {
    note: 'A',
    frequency: 440.0,
    color: 'white',
    hotkey: 'u',
    ...createSynth(440.0),
  },
  {
    note: 'A#',
    frequency: 466.16,
    color: 'black',
    hotkey: '8',
    ...createSynth(466.16),
  },
  {
    note: 'B',
    frequency: 493.88,
    color: 'white',
    hotkey: 'i',
    ...createSynth(493.88),
  },
];

function createElementForKey(name, color) {
  const element = document.createElement('div');
  element.classList.add('key', `key-${name}`, `${color}`);
  element.textContent = name;
  return element;
}

export function createKeyboard(element) {
  notes.forEach((n) => {
    const keyElement = createElementForKey(n.note, n.color);
    keyElement.addEventListener('mousedown', () => {
      n.start();
    });
    keyElement.addEventListener('mouseup', () => {
      n.stop();
    });
    element.appendChild(keyElement);
  });
  addEventListener('keydown', (e) => {
    const found = notes.find((n) => n.hotkey === e.key);
    if (found) {
      found.start();
    }
  });
  addEventListener('keyup', (e) => {
    const found = notes.find((n) => n.hotkey === e.key);
    if (found) {
      found.stop();
    }
  });
}
