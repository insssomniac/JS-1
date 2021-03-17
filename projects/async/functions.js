/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve();
    }, seconds * 1000);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  const url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

  async function getCitiesArray(url) {
    const response = await fetch(url);
    const result = await response.json();
    const arrCities = [];

    for (const n in result) {
      arrCities.push(result[n]);
    }

    return arrCities.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
    });
  }

  const result = getCitiesArray(url);

  return new Promise((resolve) => {
    resolve(result);
  });
}

export { delayPromise, loadAndSortTowns };
