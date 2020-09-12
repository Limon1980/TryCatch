'use strict';

const filterByType = (type, ...values) => values.filter(value => typeof value === type), // получаем элементы селекта и фильтруем, возвращаем те значения, у которых тип равен названию

	hideAllResponseBlocks = () => {
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block')); // получаем коллекцию по селектору, и делаем из нее массив
		responseBlocksArray.forEach(block => block.style.display = 'none'); // пробегаемся по массиву результата и скрываем все блоки
	},

	showResponseBlock = (blockSelector, msgText, spanSelector) => { // функция отображения результатов
		hideAllResponseBlocks(); // скрываем блок результатов
		document.querySelector(blockSelector).style.display = 'block'; // делаем стиль block, отображаем блок после 'none'
		if (spanSelector) {
			document.querySelector(spanSelector).textContent = msgText; // выводим контент сообщение в span
		}
	},

	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'), // вывод ошбибки в нужный селектор с нужным span

	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'), // вывод результата в нужный селектор с нужным span

	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'), // когда поле пустое, срабатывает функция очистки блока результата

	tryFilterByType = (type, values) => {
		try {
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); // вызываем первую функцию с фильтром и получаем строку значений удовлетворяющих фильтру
			console.log(valuesArray);
			const alertMsg = (valuesArray.length) ? // если длина строки valuesArray TRUE, тогда выводим первое условие, если FALSE тогда второе
				`Данные с типом ${type}: ${valuesArray}` : // если нашли данные выбранного типа, то выводим их
				`Отсутствуют данные типа ${type}`; // иначе пишим что данные отсутствуют выбранного типа
			showResults(alertMsg); // вывод результата
		} catch (e) {
			showError(`Ошибка: ${e}`); // вывод ошибки в блок результата
		}
	};

const filterButton = document.querySelector('#filter-btn'); // получаем кнопку отфильтровать

filterButton.addEventListener('click', e => { // событие на кнопку
	const typeInput = document.querySelector('#type'); // выбранный тип для сравнения
	const dataInput = document.querySelector('#data'); // поле дата, по которому и пробегается фильтр

	if (dataInput.value === '') { // условие что поле ввода не пустое
		dataInput.setCustomValidity('Поле не должно быть пустым!'); // специальное сообщение для выбранного элемента
		showNoResults(); // показываем блок без результата
	} else {
		dataInput.setCustomValidity(''); // очищаем специальное сообщение
		e.preventDefault(); // отключаем действие кнопки по умолчанию, т.е. не обновляем страницу, не отправляем данные
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //  получаем значения value input отфильтрованные по выбранному типу.
	}
});