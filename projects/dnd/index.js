/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

const addDivButton = homeworkContainer.querySelector('#addDiv');

let currentDrag;

export function createDiv() {
  const divWidth = (Math.random() * 100 + 50).toFixed();
  const divHeight = (Math.random() * 100 + 50).toFixed();

  const color = '#' + Math.round(0xffffff * Math.random()).toString(16);

  const posX = (Math.random() * divWidth + 100).toFixed();
  const posY = (Math.random() * divHeight + 100).toFixed();

  const newDiv = document.createElement('div');

  newDiv.className = 'draggable-div';
  newDiv.style.cssText = `width: ${divWidth}px; height: ${divHeight}px; left: ${posX}px; top: ${posY}px; background-color: ${color};`;
  newDiv.draggable = true;

  return newDiv;
}

addDivButton.addEventListener('click', () => {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});

document.addEventListener('dragstart', (e) => {
  const zone = e.target.closest('#app');

  if (zone) {
    currentDrag = { startZone: zone, node: e.target };
    e.dataTransfer.setData('text/html', 'dragstart');
    currentDrag.offsetX = e.offsetX;
    currentDrag.offsetY = e.offsetY;
  }
});

document.addEventListener('dragover', (e) => {
  const zone = e.target.closest('#app');

  if (zone) {
    e.preventDefault();
  }
});

document.addEventListener('dragend', (e) => {
  e.preventDefault();

  const zone = e.target.closest('#app');

  if (currentDrag && zone && e.target === currentDrag.node) {
    e.target.style.left = `${e.clientX - currentDrag.offsetX}px`;
    e.target.style.top = `${e.clientY - currentDrag.offsetY}px`;
  }
});
