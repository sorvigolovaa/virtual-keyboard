const title = document.createElement('h1');
title.textContent = 'Press ctrl alt to switch the language';
title.classList.add('title');
document.body.appendChild(title);


const keys = [
  { label: 'ё', en: '`', keyCode: '192' },
  { label: '1', en: '1', keyCode: '49' },
  { label: '2', en: '2', keyCode: '50' },
  { label: '3', en: '3', keyCode: '51' },
  { label: '4', en: '4', keyCode: '52' },
  { label: '5', en: '5', keyCode: '53' },
  { label: '6', en: '6', keyCode: '54' },
  { label: '7', en: '7', keyCode: '55' },
  { label: '8', en: '8', keyCode: '56' },
  { label: '9', en: '9', keyCode: '57' },
  { label: '0', en: '0', keyCode: '48' },
  { label: '-', en: '-', keyCode: '189' },
  { label: '=', en: '=', keyCode: '187' },
  { label: 'Backspace', en: 'Backspace', keyCode: '8' },
  { label: 'Tab', en: 'Tab', keyCode: '9' },
  { label: 'й', en: 'q', keyCode: '81' },
  { label: 'ц', en: 'w', keyCode: '87' },
  { label: 'у', en: 'e', keyCode: '69' },
  { label: 'к', en: 'r', keyCode: '82' },
  { label: 'е', en: 't', keyCode: '84' },
  { label: 'н', en: 'y', keyCode: '89' },
  { label: 'г', en: 'u', keyCode: '85' },
  { label: 'ш', en: 'i', keyCode: '73' },
  { label: 'щ', en: 'o', keyCode: '79' },
  { label: 'з', en: 'p', keyCode: '80' },
  { label: 'х', en: '[', keyCode: '219' },
  { label: 'ъ', en: ']', keyCode: '221' },
  { label: '\\', en: '\\', keyCode: '220' },
  { label: 'del', en: 'del', keyCode: '46' },
  { label: 'CapsLock', en: 'CapsLock', keyCode: '20' },
  { label: 'ф', en: 'a', keyCode: '65' },
  { label: 'ы', en: 's', keyCode: '83' },
  { label: 'в', en: 'd', keyCode: '68' },
  { label: 'а', en: 'f', keyCode: '70' },
  { label: 'п', en: 'g', keyCode: '71' },
  { label: 'р', en: 'h', keyCode: '72' },
  { label: 'о', en: 'j', keyCode: '74' },
  { label: 'л', en: 'k', keyCode: '75' },
  { label: 'д', en: 'l', keyCode: '76' },
  { label: 'ж', en: ';', keyCode: '186' },
  { label: 'э', en: '\\', keyCode: '222' },
  { label: 'Enter', en: 'Enter', keyCode: '13' },
  { label: 'Shift', en: 'Shift', keyCode: '16' },
  { label: 'я', en: 'z', keyCode: '90' },
  { label: 'ч', en: 'x', keyCode: '88' },
  { label: 'с', en: 'c', keyCode: '67' },
  { label: 'м', en: 'v', keyCode: '86' },
  { label: 'и', en: 'b', keyCode: '66' },
  { label: 'т', en: 'n', keyCode: '78' },
  { label: 'ь', en: 'm', keyCode: '77' },
  { label: 'б', en: ',', keyCode: '188' },
  { label: 'ю', en: '.', keyCode: '190' },
  { label: '/', en: '/', keyCode: '191' },
  { label: '↑', en: '↑', keyCode: '38' },
  { label: 'Alt', en: 'Alt', keyCode: '18' },
  { label: 'Ctrl', en: 'Ctrl', keyCode: '17' },
  { label: 'Alt', en: 'Alt', keyCode: '18' },
  { label: 'Space', en: 'Space', keyCode: '32' },
  { label: '←', en: '←', keyCode: '37' },
  { label: '↓', en: '↓', keyCode: '40' },
  { label: '→', en: '→', keyCode: '39' },
  { label: 'Ctrl', en: 'Ctrl', keyCode: '17' },
];

const screen = document.createElement('textarea');
screen.focus()

document.body.appendChild(screen);

const keyboard = createKeyboard(keys);
document.body.appendChild(keyboard);

keyboard.classList.add('keyboard');
screen.classList.add('screen');

setInterval(function() {
  document.querySelector('.screen').focus();
}, 0);


let isCtrlPressed = false;
let isAltPressed = false;
let isRussianLayout = true;
let isCapsLockOn = false;
let isShiftPressed = false;

screen.addEventListener('keypress', (event) => {
  event.preventDefault(); // Запрещаем ввод символа с физической клавиатуры
  if (event.key === 'Backspace') {
    screen.value = screen.value.slice(0, -1);
  }
});

// Обработчик нажатия клавиши на физической клавиатуре
document.addEventListener('keydown', (event) => {
  if(event.key.includes('ArrowLeft') || event.key.includes('ArrowRight') || event.key.includes('ArrowUp') ||  event.key.includes('ArrowDown')) return
  if (event.key === 'Backspace') {
    event.preventDefault(); // Запрещаем стандартное поведение (удаление символа)
    screen.value = screen.value.slice(0, -1);
  } 
  else {
    // Проверяем, была ли уже нажата клавиша на виртуальной клавиатуре
    const virtualKey = document.querySelector(`button[data-key-code="${event.keyCode}"]`);
    if (virtualKey && !virtualKey.classList.contains('active')) {
      virtualKey.classList.add('active');
      handleKeyClick(virtualKey.textContent);
    }
    // Проверяем нажатие клавиш Shift, Ctrl и Alt
    if (event.key === 'Shift') {
      isShiftPressed = true;
      updateKeyboardLayout(isRussianLayout, isCapsLockOn, isShiftPressed);
    }
    if (event.key === 'Control') {
      isCtrlPressed = true;
    }
    if (event.key === 'Alt') {
      isAltPressed = true;
    }
    // Проверяем состояние Ctrl + Alt для смены языка
    if (isCtrlPressed && isAltPressed) {
      isRussianLayout = !isRussianLayout;
      updateKeyboardLayout(isRussianLayout, isCapsLockOn, isShiftPressed);
    }
    
  }
});


// Обработчик отпускания клавиши на физической клавиатуре
document.addEventListener('keyup', (event) => {
  // Удаляем активное состояние с нажатой клавиши на виртуальной клавиатуре
  const virtualKey = document.querySelector(`button[data-key-code="${event.keyCode}"]`);
  if (virtualKey) {
    virtualKey.classList.remove('active');
  }

  // Проверяем отпускание клавиш Shift, Ctrl и Alt
  if (event.key === 'Shift') {
    isShiftPressed = false;
    updateKeyboardLayout(isRussianLayout, isCapsLockOn, isShiftPressed);
  }
  if (event.key === 'Control') {
    isCtrlPressed = false;
  }
  if (event.key === 'Alt') {
    isAltPressed = false;
  }
});


// Функция для обновления раскладки клавиатуры
function updateKeyboardLayout(isRussian, isCapsLockOn, isShiftPressed) {
  keyboard.innerHTML = ''; // Очищаем клавиатуру

  keys.forEach(keyData => {
    const label = isRussian ? keyData.label : keyData.en;
    const button = createKeyButton(label, keyData.keyCode, isCapsLockOn, isShiftPressed);
    keyboard.appendChild(button);
  });

}

// Измененная функция handleKeyClick
// Измененная функция handleKeyClick
function handleKeyClick(keyText) {
  if (keyText === 'Backspace') {
    screen.value = screen.value.slice(0, -1);
  } else if (keyText === 'Enter') {
    screen.value += '\n';
  } else if (keyText === 'Tab') {
    screen.value += '\t';
  } else if (keyText === 'del') {
    screen.value = '';
  } else if (keyText === 'Space') {
    screen.value += ' ';
  }
   else if (keyText === 'CapsLock') {
    isCapsLockOn = !isCapsLockOn;
    updateKeyboardLayout(isRussianLayout, isCapsLockOn);
  } else if (keyText === 'Shift' || keyText === 'Ctrl' || keyText === 'Alt') {
    // Ничего не делаем при нажатии клавиш Shift, Ctrl или Alt
    return;
  } else if (keyText === '↑' || keyText === '←' || keyText === '↓' || keyText === '→') {
    handleArrowKeyClick(keyText); // Обрабатываем нажатие клавиш стрелок
  } else {
    let isUpperCase = isCapsLockOn;

if (isShiftPressed) {
  isUpperCase = !isUpperCase;
}

if (isCapsLockOn && isShiftPressed && isRussianLayout && keyText.match(/[а-яё]/i)) {
  isUpperCase = !isUpperCase;
}

screen.value += isUpperCase ? keyText.toUpperCase() : keyText.toLowerCase();

  }
}

// Добавляем функцию handleArrowKeyClick
function handleArrowKeyClick(arrowKey) {
  const cursorPosition = screen.selectionStart; // Получаем текущую позицию курсора в текстовом поле

  if (arrowKey === '↑') {
    screen.selectionStart = cursorPosition - 1; // Перемещаем курсор на одну позицию вверх
    screen.selectionEnd = cursorPosition - 1;
  } else if (arrowKey === '←') {
    screen.selectionStart = cursorPosition - 1; // Перемещаем курсор на одну позицию влево
    screen.selectionEnd = cursorPosition - 1;
  } else if (arrowKey === '↓') {
    screen.selectionStart = cursorPosition + 1; // Перемещаем курсор на одну позицию вниз
    screen.selectionEnd = cursorPosition + 1;
  } else if (arrowKey === '→') {
    screen.selectionStart = cursorPosition + 1; // Перемещаем курсор на одну позицию вправо
    screen.selectionEnd = cursorPosition + 1;
  }
}




// Обновляем раскладку клавиатуры на старте
updateKeyboardLayout(isRussianLayout);
// Изменение функции createKeyButton

function createKeyButton(label, keyCode, _isCapsLockOn, isShiftPressed) {
  const button = document.createElement('button');
  button.textContent = isShiftPressed ? label.toUpperCase() : label;
  button.dataset.keyCode = keyCode;
  button.addEventListener('click', () => handleKeyClick(button.textContent));
  return button;
}



function createKeyboard(keys) {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  keys.forEach(keyData => {
    const button = createKeyButton(keyData);
    keyboard.appendChild(button);
  });

  return keyboard;
}

// Добавляем обработчики событий для каждой клавиши
// получаем все элементы клавиатуры
const keyboardKeys = document.querySelectorAll('.key');

// добавляем обработчик событий на каждую клавишу
keyboardKeys.forEach(key => {
  key.addEventListener('click', () => {
    screen.value += key.textContent; // добавляем символ в текстовое поле
  });
});




