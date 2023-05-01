import './style.css';
import { button, arrowSymbols } from './utils/button';
import { toUpperCaseButton, toLowerCaseButton } from './utils/util';
import addHtml from './components/page';
import { addButtonContentShift, capsLockEvent, changeLanguage } from './components/events';

addHtml();

const keyboardButton = document.querySelectorAll('.keyboard__button');
const textarea = document.querySelector('.textarea');

let ctrlPress = false;
let altPress = false;

function addButtonContent(arrButton, arrContent, buttonId) {
  arrButton.forEach((el, index) => {
    const res = el;
    res.textContent = arrContent[index];
    res.setAttribute('id', buttonId[index]);
  });
}

const init = () => {
  if (!localStorage.getItem('locale')) {
    localStorage.setItem('locale', 'ru');
    addButtonContent(keyboardButton, button.Key, button.keyCode);
  } else if (localStorage.getItem('locale') === 'ru') {
    addButtonContent(keyboardButton, button.Key, button.keyCode);
  } else {
    addButtonContent(keyboardButton, button.keyEn, button.keyCode);
  }
};
init();

const keyDownButton = (arr, el) => {
  arr.forEach((btn) => {
    if (btn.id === el.code) {
      btn.classList.add('keyboard__button_active');

      if (el.code === 'Tab') {
        el.preventDefault();
        textarea.textContent += '\t';
      } else if (el.code === 'Backspace') {
        textarea.textContent = textarea.textContent.slice(0, -1);
      } else if (el.code === 'Enter') {
        textarea.textContent += '\n';
      } else if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') {
        toUpperCaseButton(keyboardButton);
        addButtonContentShift(keyboardButton);
      } else if ((el.key === 'Control' && altPress) || (el.key === 'Alt' && ctrlPress)) {
        el.preventDefault();
        changeLanguage(keyboardButton, addButtonContent);
      } else if (el.key === 'Control') {
        el.preventDefault();
        ctrlPress = true;
      } else if (el.key === 'Alt') {
        el.preventDefault();
        altPress = true;
      } else if (el.key === 'ArrowUp' || el.key === 'ArrowLeft' || el.key === 'ArrowDown' || el.key === 'ArrowRight') {
        textarea.textContent += arrowSymbols[el.key];
      } else if (el.key !== 'Delete' && el.key !== 'CapsLock' && el.key !== 'Meta') {
        textarea.textContent += el.key;
      }
    }
  });
};

document.addEventListener('keydown', (el) => keyDownButton(keyboardButton, el));

function addMouseDown(arr) {
  arr.forEach((el) => {
    el.addEventListener('mousedown', (e) => {
      el.classList.add('keyboard__button_active');
      if (e.target.id === 'Backspace') {
        textarea.textContent = textarea.textContent.slice(0, -1);
      } else if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
        toUpperCaseButton(keyboardButton);
        addButtonContentShift(keyboardButton);
      } else if (e.target.id === 'Tab') {
        textarea.textContent += '\t';
      } else if (e.target.id === 'Enter') {
        textarea.textContent += '\n';
      } else if (e.target.id === 'MetaLeft') {
        e.preventDefault();
      } else if (e.target.id === 'Space') {
        textarea.textContent += ' ';
      } else if (e.target.id !== 'ControlLeft' && e.target.id !== 'AltLeft' && e.target.id !== 'ControlRight' && e.target.id !== 'AltRight' && e.target.id !== 'CapsLock' && e.target.id !== 'Delete' && e.target.id !== 'MetaLeft') {
        textarea.textContent += e.target.innerText;
      }
    });
  });
}

function addMouseUp(arr) {
  arr.forEach((el) => {
    el.addEventListener('mouseup', (e) => {
      el.classList.remove('keyboard__button_active');
      if (e.target.id === 'CapsLock') {
        capsLockEvent(keyboardButton);
      } else if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
        toLowerCaseButton(keyboardButton);
        init();
      }
    });
  });
}
addMouseUp(keyboardButton);
addMouseDown(keyboardButton);

document.addEventListener('keyup', (el) => {
  for (let i = 0; i < keyboardButton.length; i += 1) {
    if (keyboardButton[i].id === el.code) {
      keyboardButton[i].classList.remove('keyboard__button_active');
      if (el.code === 'CapsLock') {
        capsLockEvent(keyboardButton);
      } else if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') {
        toLowerCaseButton(keyboardButton);
        init();
      } else if (el.key === 'Alt') {
        altPress = false;
      } else if (el.key === 'Control') {
        ctrlPress = false;
      } else if (el.code === 'Meta') {
        el.preventDefault();
      }

      break;
    }
  }
});
