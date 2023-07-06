import { createKeyboard } from './keyboard.mjs';

document.addEventListener('DOMContentLoaded', () => {
  const pianoKeyboard = document.getElementById('keyboard');
  createKeyboard(pianoKeyboard);
});
