// Создаем элементы <div> для виртуальной клавиатуры и экрана
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
document.body.appendChild(keyboard);

const screen = document.createElement('div');
screen.classList.add('screen');
document.body.insertBefore(screen, keyboard);

// Массивы с символами клавиатуры
const keysEnglishLayout = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl'],
  ['↑', '←', '↓', '→'] // Стрелки
];

const keysRussianLayout = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\'],
  ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl'],
  ['↑', '←', '↓', '→'] // Стрелки
];


// Флаг для определения текущего языка клавиатуры
let isRussianLayout = false;

// Флаги для отслеживания состояния клавиш Shift и Alt
let shiftPressed = false;
let altPressed = false;

// Функция для генерации HTML-кода клавиатуры
function keyboardHTML(layout) {
  return layout
    .map(row => {
      const keysHTML = row.map(key => `<div class="key">${key}</div>`).join('');
      return `<div class="row">${keysHTML}</div>`;
    })
    .join('');
}

// Функция для обновления клавиатурного HTML
function updateKeyboardLayout(layout) {
  keyboard.innerHTML = keyboardHTML(layout);
  keyboardKeys = Array.from(keyboard.querySelectorAll('.key')); // Обновляем список клавиш

  // Добавляем обработчики событий для каждой клавиши
  keyboardKeys.forEach(key => {
    key.addEventListener('click', () => {
      const keyText = key.textContent;
      handleKeyClick(keyText);
    });
  });

  // Обработчик для нажатия клавиш на физической клавиатуре
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);
}

// Функция для обработки клика по клавише
function handleKeyClick(keyText) {
if (keyText === 'Backspace') {
screen.textContent = screen.textContent.slice(0, -1);
} else if (keyText === 'Enter') {
screen.textContent += '\n';
} else if (keyText === 'Tab') {
screen.textContent += '\t';
} else {
screen.textContent += keyText;
}
}


// Функция для переключения раскладки клавиатуры
function toggleKeyboardLayout() {
isRussianLayout = !isRussianLayout;
if (isRussianLayout) {
updateKeyboardLayout(keysRussianLayout);
} else {
updateKeyboardLayout(keysEnglishLayout);
}
}

// Функция для обработки нажатия клавиш на физической клавиатуре
function handleKeyDown(event) {
const { key, code } = event;
if (key === 'Shift' || code === 'ShiftLeft' || code === 'ShiftRight') {
shiftPressed = true;
} else if (key === 'Alt' || code === 'AltLeft' || code === 'AltRight') {
altPressed = true;
} else if (key === 'Control' || code === 'ControlLeft' || code === 'ControlRight') {
// Добавьте обработку нажатия клавиши Control, если необходимо
} else {
const keyText = mapPhysicalKeyToVirtualKey(key);
handleKeyClick(keyText);
}
}

// Функция для обработки отпускания клавиш на физической клавиатуре
function handleKeyUp(event) {
const { key, code } = event;
if (key === 'Shift' || code === 'ShiftLeft' || code === 'ShiftRight') {
shiftPressed = false;
} else if (key === 'Alt' || code === 'AltLeft' || code === 'AltRight') {
altPressed = false;
} else if (key === 'Control' || code === 'ControlLeft' || code === 'ControlRight') {
// Добавьте обработку отпускания клавиши Control, если необходимо
}
}

// Функция для отображения символа виртуальной клавиатуры
function mapPhysicalKeyToVirtualKey(key) {
// Добавьте соответствующие маппинги для физических клавиш
// в соответствии с выбранной раскладкой клавиатуры и состоянием клавиш Shift и Alt
// Например:
if (isRussianLayout) {
if (key === 'a' && !shiftPressed) {
return 'ф';
} else if (key === 'a' && shiftPressed) {
return 'А';
}
// Добавьте другие маппинги для русской раскладки
} else {
if (key === 'ф' && !shiftPressed) {
return 'a';
} else if (key === 'ф' && shiftPressed) {
return 'A';
}

// Добавьте другие маппинги для английской раскладки
}

// Если необходимо добавить маппинги для других клавиш,
// можно использовать условные операторы или switch-конструкцию

// Если не найден соответствующий символ, вернуть исходный ключ
return key;
}

// Инициализация клавиатуры
updateKeyboardLayout(keysEnglishLayout);

// Функция для смены раскладки клавиатуры при нажатии клавиши Shift
function handleShiftKey() {
shiftPressed = !shiftPressed;
if (shiftPressed) {
toggleKeyboardLayout(); // Переключаемся на другую раскладку
} else {
if (isRussianLayout) {
toggleKeyboardLayout(); // Переключаемся обратно на русскую раскладку
}
}
}

// Обработчик события для нажатия клавиши Shift
keyboardKeys.find(key => key.textContent === 'Shift').addEventListener('click', handleShiftKey);

// Обработчик события для нажатия клавиши Caps Lock
keyboardKeys.find(key => key.textContent === 'Caps Lock').addEventListener('click', toggleKeyboardLayout);

// При запуске скрипта используем английскую раскладку клавиатуры
updateKeyboardLayout(keysEnglishLayout);

