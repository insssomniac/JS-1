/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('input', function () {
  buildTable();
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  addNameInput.value = '';
  addValueInput.value = '';

  buildTable();
});

listTable.addEventListener('click', (e) => {
  if (e.target.getAttribute('name') === 'delete_row') {
    const closestTr = e.target.closest('tr');
    document.cookie = `${closestTr.firstChild.textContent}=''; max-age=0`;
    buildTable();
  }
});

function getCookies() {
  if (document.cookie) {
    return document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');
      prev[name] = value;
      return prev;
    }, {});
  }
}

function filterCookies() {
  const cookies = getCookies();
  const str = filterNameInput.value;
  if (str) {
    for (const elem in cookies) {
      if (!(elem.includes(str) || cookies[elem].includes(str))) {
        delete cookies[elem];
      }
    }
  }
  return cookies;
}

function buildTable() {
  listTable.innerHTML = '';
  const cookies = filterCookies();

  if (cookies) {
    for (const elem in cookies) {
      const tr = document.createElement('TR');

      const td1 = document.createElement('TD');
      td1.appendChild(document.createTextNode(elem));

      const td2 = document.createElement('TD');
      td2.appendChild(document.createTextNode(cookies[elem]));

      const removeBtn = document.createElement('BUTTON');
      removeBtn.setAttribute('name', 'delete_row');
      removeBtn.innerHTML = 'x';

      const td3 = document.createElement('TD');
      td3.appendChild(removeBtn);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      listTable.appendChild(tr);
    }
  }
}

buildTable();
