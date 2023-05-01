import { additionalButtons, additionalButtonsRu, button } from '../utils/button';
import { toUpperCaseButton, toLowerCaseButton } from '../utils/util';

let capsLockPress = false;

export function addButtonContentShift(arrButton) {
  arrButton.forEach((btn) => {
    const res = btn;
    if (res.classList.contains('button-content-shift')) {
      if (localStorage.getItem('locale') === 'eng') {
        res.textContent = additionalButtons[btn.id];
      } else {
        res.textContent = additionalButtonsRu[btn.id];
      }
    }
  });
}

export function capsLockEvent(arr) {
  if (capsLockPress) {
    toLowerCaseButton(arr);
    capsLockPress = false;
  } else {
    toUpperCaseButton(arr);
    capsLockPress = true;
  }
}

export function changeLanguage(arr, callback) {
  if (localStorage.getItem('locale') === 'ru') {
    callback(arr, button.keyEn, button.keyCode);
    localStorage.setItem('locale', 'eng');
  } else {
    callback(arr, button.Key, button.keyCode);
    localStorage.setItem('locale', 'ru');
  }
}
