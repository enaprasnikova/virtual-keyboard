import './style.css';
import {button, additionalButtons, additionalButtonsRu} from "./utils/button";


const pageHtml = document.querySelector(".body");

pageHtml.insertAdjacentHTML("afterbegin",
  '<header class="header">\n' +
  '    <h1 class="header__caption">RSS Виртуальная клавиатура</h1>\n' +
  '  </header>\n' +
  '  <main class="main">\n' +
  '    <section class="text">\n' +
  '      <textarea class="textarea"></textarea>\n' +
  '    </section>\n' +
  '    <section class="virtual-keyboard">\n' +
  '      <div class="keyboard">\n' +
  '        <ul class="keyboard__line">\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button keyboard__button_backspace not-uppercase"></li>\n' +
  '          <li class="keyboard__button keyboard__button_tab not-uppercase"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button keyboard__button_caps not-uppercase"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button keyboard__button_enter not-uppercase"></li>\n' +
  '          <li class="keyboard__button keyboard__button_caps not-uppercase"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button button-content-shift"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button keyboard__button_enter not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button keyboard__button_space not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '          <li class="keyboard__button not-uppercase"></li>\n' +
  '        </ul>\n' +
  '      </div>\n' +
  '    </section>\n' +
  '  </main>\n' +
  '\n' +
  '  <footer>\n' +
  '\n' +
  '  </footer>' +
  '');

const keyboardButton = document.querySelectorAll('.keyboard__button');
const textarea = document.querySelector('.textarea');

function addButtonContent(arrButton, arrContent, buttonId) {
  arrButton.forEach((el, index) => {
    el.textContent = arrContent[index];
    el.setAttribute('id', buttonId[index])
  })
}

function addButtonContentShift(arrButton) {
  arrButton.forEach((btn) => {
    if (btn.classList.contains('button-content-shift')) {
      if (localStorage.getItem('locale') === 'eng') {
        btn.textContent = !additionalButtons[btn.id] ? btn.textContent : additionalButtons[btn.id]
      } else {
        btn.textContent = !additionalButtonsRu[btn.id] ? btn.textContent : additionalButtonsRu[btn.id]
      }
    }
  })
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
}
init();


let ctrlPress = false;
let altPress = false;

document.addEventListener('keydown', (el) => keyDownButton(keyboardButton, el))
const keyDownButton = (arr, el) => {

  arr.forEach((btn) => {
    if (btn.id === el.code) {
      btn.classList.add('keyboard__button_active');

      if (el.code === 'Tab') {
        el.preventDefault()
        textarea.textContent += '\t';
      } else if (el.code === 'Backspace') {
        textarea.textContent = textarea.textContent.slice(0, -1);
      } else if (el.code === 'Enter') {
        textarea.textContent += '\n';
      } else if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') {
        toUpperCaseButton(keyboardButton);
        addButtonContentShift(keyboardButton);
      } else if (el.key === 'Control' && altPress) {

        el.preventDefault();
        if (localStorage.getItem('locale') === 'ru') {
          addButtonContent(keyboardButton, button.keyEn, button.keyCode);
          localStorage.setItem('locale', 'eng');
        } else {
          addButtonContent(keyboardButton, button.Key, button.keyCode);
          localStorage.setItem('locale', 'ru');
        }
      } else if (el.key === 'Alt' && ctrlPress) {

        el.preventDefault();
        if (localStorage.getItem('locale') === 'ru') {
          addButtonContent(keyboardButton, button.keyEn, button.keyCode);
          localStorage.setItem('locale', 'eng');
        } else {

          addButtonContent(keyboardButton, button.Key, button.keyCode);
          localStorage.setItem('locale', 'ru');
        }
      } else if (el.key === 'Control') {
        el.preventDefault();
        ctrlPress = true;
      } else if (el.key === 'Alt') {
        el.preventDefault();
        altPress = true;
      } else if (el.key === 'Delete') {

      } else {
        textarea.textContent += el.key;
      }
    }

  })

}

function addMouseDown(arr) {
  arr.forEach((el) => {
    el.addEventListener('mousedown', (e) => {
      el.classList.add('keyboard__button_active');
      if (e.target.id === 'Backspace') {
        textarea.textContent = textarea.textContent.slice(0, -1);
      } else if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
        toUpperCaseButton(keyboardButton);
        addButtonContentShift(keyboardButton);
      } else if (e.target.id === 'Delete') {

      } else if (e.target.id === 'Tab') {
        textarea.textContent += '\t';
      } else if (e.target.id === 'Enter') {
        textarea.textContent += '\n';

      } else if (e.target.id === 'ControlLeft' || e.target.id === 'AltLeft' || e.target.id === 'ControlRight' || e.target.id === 'AltRight') {

      } else if (e.target.id === 'MetaLeft') {
        e.preventDefault()
      } else if (e.target.id === 'Space') {
        textarea.textContent += ' ';
      } else {
        textarea.textContent += e.target.innerText;
      }
    })
  })
}

function addMouseUp(arr) {
  arr.forEach((el) => {
    el.addEventListener('mouseup', (e) => {
      el.classList.remove('keyboard__button_active');
      if (e.target.id === 'CapsLock') {

        toUpperCaseButton(keyboardButton);

      } else if (e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
        toLowerCaseButton(keyboardButton);
        init();
      }

    })
  })
}

addMouseUp(keyboardButton);
addMouseDown(keyboardButton);


document.addEventListener('keyup', (el) => {
  for (let i = 0; i < keyboardButton.length; i++) {
    if (keyboardButton[i].id === el.code) {
      keyboardButton[i].classList.remove('keyboard__button_active');
      if (el.code === 'Delete') {

      } else if (el.code === 'CapsLock') {
        if (el.getModifierState(el.key) === true) {
          toUpperCaseButton(keyboardButton)
        } else {
          toLowerCaseButton(keyboardButton)
        }

      } else if (el.code === 'ShiftLeft' || el.code === 'ShiftRight') {
        toLowerCaseButton(keyboardButton);
        init();

      } else if (el.key === 'Alt') {
        altPress = false;
      } else if (el.key === 'Control') {
        ctrlPress = false;
      } else if (el.code === 'MetaLeft') {
        el.preventDefault()
      }
      // else {
      //   textarea.textContent += el.key;
      // }
      break;
    }
  }
})

function toUpperCaseButton(arr) {
  arr.forEach((el) => {
    if (!el.classList.contains('not-uppercase')) {
      el.textContent = el.textContent.toUpperCase();
    }
  })
}

function toLowerCaseButton(arr) {
  arr.forEach((el) => {
    el.textContent = el.textContent.toLowerCase();
  })
}
