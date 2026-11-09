const STORAGE_KEY = 'notes'
const FORM_CREATE = 'create'
const FORM_EDIT = 'edit'

let section = document.createElement('section')
section.classList.add('notes-box')
let container = getDiv('container')
let wrapper = getDiv('notes-box__wrapper')
let title = getTitle('h1', 'notes-box__title', 'Заметки')
let openModalBtn = getBtn('notes-box__btn', 'создать')
let cardsBox = getDiv('notes-box__cards-box')

//создание элементов формы данных для заметки
let overlay = getDiv('notes-box__form-overlay')
overlay.classList.add('close-form')
let form = document.createElement('form')
form.classList.add('notes-box__form', 'form-notes')
let formTitle = getTitle('h2', 'form-notes__title', 'Добавить заментку:')
let inputTitle = getInput('form-notes__input', 'text', 'Заголовок заметки')
let inputTitleWrapper = getDiv('form-notes__input-wrapper')
inputTitleWrapper.append(inputTitle)
let inputImg = getInput('form-notes__input', 'url', 'Укажите путь до картинки')
let intupImgWrapper = getDiv('form-notes__input-wrapper')
intupImgWrapper.append(inputImg)
let inputDesc = document.createElement('textarea')
inputDesc.name = 'desc'
let inputDescWrapper = getDiv('form-notes__input-wrapper')
inputDescWrapper.append(inputDesc)
inputDesc.classList.add('form-notes__textarea')
inputDesc.placeholder = 'Текст заметки'
let formBtn = getBtn('form-notes__btn', 'Добавить', 'submit')
let formCloseBtn = getBtn('form-notes__btn-close', 'X')
let errTitle = getDiv('error-mesage')
errTitle.textContent = ''
errTitle.style.opacity = 0
let errDesc = getDiv('error-mesage')
errDesc.textContent = ''
errDesc.style.opacity = 0
let indexCard

const defaultNotes = [
	{
		title: 'Хаос',
		img: 'https://media.sponsr.ru/project/4762/post/67478/image/161232/imagesprojects7624762hyc0og378hib67ag_original.webp?1726587410376',
		desc: 'Что такое хаос? Это тот порядок, который был уничтожен при сотворении мира',
		important: false,
	},
	{
		title: 'Космос',
		img: 'https://rg.ru/uploads/images/190/88/93/iStock-1153308175.jpg',
		desc: 'Космос не является абсолютно пустым пространством: в нём есть, хотя и с очень низкой плотностью, межзвёздное вещество (преимущественно ионы и атомы водорода), космические лучи и электромагнитное излучение, а также гипотетическая тёмная материя.',
		important: true,
	},
]
let formMode = FORM_CREATE
let notesList = loadNotes()

function loadNotes() {
	const savedNotes = localStorage.getItem(STORAGE_KEY)

	if (savedNotes === null) {
		return defaultNotes
	}

	try {
		const parsedNotes = JSON.parse(savedNotes)

		return Array.isArray(parsedNotes) ? parsedNotes : defaultNotes
	} catch (error) {
		return defaultNotes
	}
}

function saveNotes() {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(notesList))
}

function getDiv(className) {
	let div = document.createElement('div')
	div.classList.add(className)

	return div
}

function getBtn(className, text = '', type = 'button') {
	let btn = document.createElement('button')
	btn.classList.add(className)
	btn.textContent = text
	btn.type = type

	return btn
}

function getTitle(elem, className, text) {
	let title = document.createElement(elem)
	title.classList.add(className)
	title.textContent = text

	return title
}

function getInput(className, type, placeholder) {
	let input = document.createElement('input')
	input.classList.add(className)
	input.type = type
	input.placeholder = placeholder

	return input
}

function getFirstLetterCapitalized(str) {
	return str[0].toUpperCase() + str.slice(1)
}

function getCard(card, index) {
	let cardElem = getDiv('notes-box__card-note')
	cardElem.classList.add('card-note')
	if (card.important === true) {
		cardElem.classList.add('card-note_important')
	}
	let cardTitle = getTitle('h3', 'card-note__title', card.title)
	let cardImgWrapper = getDiv('card-note__img')
	let cardImg = document.createElement('img')
	cardImg.alt = 'Картинка для заменки'
	let cardDesc = document.createElement('p')
	cardDesc.classList.add('card-note__desc')
	let cardRemoveBtn = getBtn('card-note__remove-btn', 'Удалить')
	let cardImportantBtn = getBtn('card-note__important-btn', 'Важное')

	let cardGroupBtn = getDiv('card-note__btn-group')
	let changeBtn = getBtn('card-note__change-btn')
	changeBtn.insertAdjacentHTML(
		'afterbegin',
		`
    <!-- icon666.com - MILLIONS vector ICONS FREE -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 432.544 432.544" style="enable-background:new 0 0 432.544 432.544;" xml:space="preserve">
    <g><g>
    <path d="M0,313.775v118.77h118.771l237.541-237.541L237.539,76.232L0,313.775z M103.638,395.999L103.638,395.999l-30.55,0.004 v-36.546H36.545v-30.553l25.981-25.981l67.093,67.092L103.638,395.999z M246.683,124.77c4.182,0,6.276,2.095,6.276,6.28 c0,1.906-0.664,3.521-1.999,4.856L96.214,290.651c-1.333,1.328-2.952,1.995-4.854,1.995c-4.184,0-6.279-2.098-6.279-6.279 c0-1.906,0.666-3.521,1.997-4.856l154.747-154.743C243.154,125.436,244.773,124.77,246.683,124.77z"/><path d="M421.976,77.654l-67.091-66.806C347.653,3.619,338.992,0,328.903,0c-10.283,0-18.842,3.619-25.693,10.848l-47.394,47.109 l118.773,118.77l47.394-47.392c7.042-7.043,10.561-15.608,10.561-25.697C432.54,93.743,429.022,85.08,421.976,77.654z"/>
    </g></g>
    </svg>
  `,
	)

	if (card.important === true) {
		cardImportantBtn.textContent = 'Не важное'
	}

	cardImg.src = card.img
	cardDesc.textContent = card.desc

	cardRemoveBtn.onclick = function () {
		notesList.splice(index, 1)
		saveNotes()
		render(notesList)
	}

	cardImportantBtn.onclick = function () {
		if (cardElem.classList.contains('card-note_important') === false) {
			cardElem.classList.add('card-note_important')
			cardImportantBtn.textContent = 'Не важное'
			card.important = true
			saveNotes()
		} else {
			cardElem.classList.remove('card-note_important')
			card.important = false
			saveNotes()
			cardImportantBtn.textContent = 'Важное'
		}
	}

	changeBtn.onclick = function () {
		formTitle.textContent = 'Изменить заметку:'
		let titleOld = notesList[index].title
		let descOld = notesList[index].desc
		let imgOld = notesList[index].img
		openForm(titleOld, descOld, imgOld, 'Изменить', FORM_EDIT)
		indexCard = index
	}

	cardImgWrapper.append(cardImg)
	cardGroupBtn.append(cardImportantBtn, cardRemoveBtn)
	cardElem.append(cardTitle, cardImgWrapper, cardDesc, cardGroupBtn, changeBtn)

	return cardElem
}

function openForm(title, desc, img, btnText, mode) {
	formMode = mode

	inputTitle.value = title
	inputDesc.value = desc
	inputImg.value = img
	formBtn.textContent = btnText

	overlay.classList.remove('close-form')

	setTimeout(() => {
		overlay.style.opacity = 1
	}, 1)
}

function closeForm() {
	overlay.classList.add('close-form')
	setTimeout(() => {
		overlay.style.opacity = 0
	}, 1)
}

function errorForm(elemErr, elemInput, text) {
	elemErr.textContent = text
	elemErr.style.opacity = 1
	elemInput.classList.add('error')
}

function clearForm() {
	inputTitle.value = ''
	inputImg.value = ''
	inputDesc.value = ''
}

function clearFormErrors() {
	errTitle.textContent = ''
	errDesc.textContent = ''

	errTitle.style.opacity = 0
	errDesc.style.opacity = 0

	inputTitle.classList.remove('error')
	inputDesc.classList.remove('error')
}

function render(arrNotes) {
	cardsBox.innerHTML = ''

	if (arrNotes.length === 0) {
		const emptyMessage = getTitle(
			'p',
			'notes-box__empty',
			'У вас пока нет заметок. Создай первую!',
		)
		cardsBox.append(emptyMessage)
	} else {
		for (let i = 0; i < arrNotes.length; i++) {
			let card = getCard(arrNotes[i], i)
			cardsBox.append(card)
		}
	}
}

function validateForm() {
	const title = inputTitle.value.trim()
	const desc = inputDesc.value.trim()

	clearFormErrors()

	if (!title) {
		errorForm(errTitle, inputTitle, 'Заголовок не должен быть пустым')
		return false
	}
	if (title.length < 3) {
		errorForm(errTitle, inputTitle, 'Заголовок не должен меньше 3 символов')
		return false
	}
	if (!desc) {
		errorForm(errDesc, inputDesc, 'Текст заметки не должен быть пустым')
		return false
	}

	if (desc.length < 12) {
		errorForm(errDesc, inputDesc, 'Текст заметки не должен быть меньше 12 символов ')
		return false
	}

	return true
}

function addNote(note) {
	notesList.push(note)
	saveNotes()
}

function updatedNote(index, updateNode) {
	if (!notesList[index]) {
		return
	}
	notesList[index] = {
		...notesList[index],
		...updateNode,
	}
	saveNotes()
}

function saveNote(note) {
	if (formMode === FORM_CREATE) {
		addNote(note)
	} else if (formMode === FORM_EDIT) {
		updatedNote(indexCard, note)
	} else {
		return
	}

	render(notesList)
	clearForm()
	closeForm()
}

openModalBtn.addEventListener('click', (e) => {
	e.preventDefault()

	formTitle.textContent = 'Создание заметки:'
	openForm('', '', '', 'Добавить', FORM_CREATE)
})

form.addEventListener('submit', (e) => {
	e.preventDefault()

	if (!validateForm()) {
		return
	}

	const titleValue = getFirstLetterCapitalized(inputTitle.value.trim())
	const imgSrc =
		inputImg.value.trim() ||
		'https://funik.ru/wp-content/uploads/2018/10/6db3f15d0a21589aaa1b.jpg'
	const descValue = inputDesc.value.trim()

	const newNoteObj = {
		title: titleValue,
		img: imgSrc,
		desc: descValue,
	}

	if (formMode === FORM_CREATE) {
		newNoteObj.important = false
	}

	saveNote(newNoteObj)
})

formCloseBtn.addEventListener('click', (e) => {
	e.preventDefault()
	closeForm()
	clearForm()
	clearFormErrors()
})

overlay.addEventListener('click', (e) => {
	if (e.target === overlay) {
		closeForm()
		clearForm()
		clearFormErrors()
	}
})

render(notesList)
// добавление элементов
document.body.append(section)
section.append(container)
container.append(wrapper)
wrapper.append(title, openModalBtn, cardsBox)
wrapper.append(overlay)
overlay.append(form)
form.append(
	formTitle,
	inputTitleWrapper,
	intupImgWrapper,
	inputDescWrapper,
	formBtn,
	formCloseBtn,
)
inputTitleWrapper.append(errTitle)
inputDescWrapper.append(errDesc)
