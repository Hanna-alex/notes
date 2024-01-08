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
form.classList.add('notes-box__form')
form.classList.add('form-notes')
let formTitle = getTitle('h2', 'form-notes__title', 'Добавить заментку:')
let intupTitle = getInput('form-notes__input', 'text', 'Заголовок заметки')
let intupTitleWrapper = getDiv('form-notes__input-wrapper')
intupTitleWrapper.append(intupTitle)
let inputImg = getInput('form-notes__input', 'url', 'Укажите путь до картинки')
let intupImgWrapper = getDiv('form-notes__input-wrapper')
intupImgWrapper.append(inputImg)
let inputDesc = document.createElement('textarea')
let inputDescWrapper = getDiv('form-notes__input-wrapper')
inputDescWrapper.append(inputDesc)
inputDesc.classList.add('form-notes__textarea')
inputDesc.type = 'textarea'
inputDesc.placeholder = 'Текст заметки'
form.classList.add('form-notes')
let formBtn = getBtn('form-notes__btn', 'Добавить')
let formCloseBtn = getBtn('form-notes__btn-close', 'X')
let errTitle = getDiv('error-mesage')
errTitle.textContent = ''
errTitle.style.opacity = 0
let errDesc = getDiv('error-mesage')
errDesc.textContent = ''
errDesc.style.opacity = 0
let indexCard


let notesList = [
  {
    title: 'Хаос',
    img: 'https://mirpozitiva.ru/wp-content/uploads/2019/11/1480494344_kot_sneg.jpg',
    desc: 'Что такое хаос? Это тот порядок, который был уничтожен при сотворении мира',
    important: false,

  },
  {
    title: 'Космос ',
    img: 'https://rg.ru/uploads/images/190/88/93/iStock-1153308175.jpg',
    desc: 'Космос не является абсолютно пустым пространством: в нём есть, хотя и с очень низкой плотностью, межзвёздное вещество (преимущественно ионы и атомы водорода), космические лучи и электромагнитное излучение, а также гипотетическая тёмная материя.',
    important: true,
  },

]


function getDiv(className) {
  let div = document.createElement('div')
  div.classList.add(className)

  return div
}

function getBtn(className, text = '') {
  let btn = document.createElement('button')
  btn.classList.add(className)
  btn.textContent = text

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

function openForm(title, desc, img, btnText) {

  intupTitle.value = title
  inputDesc.value = desc
  inputImg.value = img
  formBtn.textContent = btnText

  overlay.classList.remove('close-form')

  setTimeout(() => { overlay.style.opacity = 1; }, 1);
}

function closeForm() {
  overlay.classList.add('close-form')
  setTimeout(() => { overlay.style.opacity = 0; }, 1);

}

function getFirstLetterCapitalized(str) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

function checkingField(elem, elemErr, errText) {
  elemErr.textContent = ''
  elem.classList.add('error')
  elemErr.textContent = errText
  setTimeout(() => elemErr.style.opacity = 1, 250)
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
  let cardDesc = document.createElement('p')
  cardDesc.classList.add('card-note__desc')
  let cardRemoveBtn = getBtn('card-note__remove-btn', 'Удалить')
  let cardImportantBtn = getBtn('card-note__important-btn', 'Важное')

  let cardGroupBtn = getDiv('card-note__btn-group')
  let changeBtn = getBtn('card-note__change-btn')
  changeBtn.insertAdjacentHTML('afterbegin', `
    <!-- icon666.com - MILLIONS vector ICONS FREE -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 432.544 432.544" style="enable-background:new 0 0 432.544 432.544;" xml:space="preserve">
    <g><g>
    <path d="M0,313.775v118.77h118.771l237.541-237.541L237.539,76.232L0,313.775z M103.638,395.999L103.638,395.999l-30.55,0.004 v-36.546H36.545v-30.553l25.981-25.981l67.093,67.092L103.638,395.999z M246.683,124.77c4.182,0,6.276,2.095,6.276,6.28 c0,1.906-0.664,3.521-1.999,4.856L96.214,290.651c-1.333,1.328-2.952,1.995-4.854,1.995c-4.184,0-6.279-2.098-6.279-6.279 c0-1.906,0.666-3.521,1.997-4.856l154.747-154.743C243.154,125.436,244.773,124.77,246.683,124.77z"/><path d="M421.976,77.654l-67.091-66.806C347.653,3.619,338.992,0,328.903,0c-10.283,0-18.842,3.619-25.693,10.848l-47.394,47.109 l118.773,118.77l47.394-47.392c7.042-7.043,10.561-15.608,10.561-25.697C432.54,93.743,429.022,85.08,421.976,77.654z"/>
    </g></g>
    </svg>
  `)

  if (card.important === true) {
    cardElem.classList.add('card-note_important')
    cardImportantBtn.textContent = 'Не важное'
  }

  cardImg.src = card.img
  cardDesc.textContent = card.desc

  cardRemoveBtn.onclick = function () {
    notesList.splice(index, 1)
    render(notesList)
  }

  cardImportantBtn.onclick = function () {
    if (cardElem.classList.contains('card-note_important') === false) {
      cardElem.classList.add('card-note_important')
      cardImportantBtn.textContent = 'Не важное'
      card.important = true
    }
    else {
      cardElem.classList.remove('card-note_important')
      card.important = false
      cardImportantBtn.textContent = 'Важное'

    }

  }

  changeBtn.onclick = function () {
    formTitle.textContent = 'Изменить заметку:'
    let titleOld = notesList[index].title
    let descOld = notesList[index].desc
    let imgOld = notesList[index].img
    openForm(titleOld, descOld, imgOld, 'Изменить', 'Редактировать заметку:')
    indexCard = index

  }

  cardImgWrapper.append(cardImg)
  cardGroupBtn.append(cardImportantBtn, cardRemoveBtn)
  cardElem.append(cardTitle, cardImgWrapper, cardDesc, cardGroupBtn, changeBtn)

  return cardElem
}

function errorForm(elemErr, elemInput, text) {
  elemErr.textContent = text
  elemErr.style.opacity = 1
  elemInput.classList.add('error')
}

function clearForm() {
  errTitle.textContent = ''
  errDesc.textContent = ''
  intupTitle.classList.remove('error')
  inputDesc.classList.remove('error')

  intupTitle.value = ''
  inputImg.value = ''
  inputDesc.value = ''
}

function render(arrNotes) {
  cardsBox.innerHTML = ''
  for (let i = 0; i < arrNotes.length; i++) {

    let card = getCard(arrNotes[i], i)
    cardsBox.append(card)

  }
}


openModalBtn.addEventListener('click', (e) => {
  e.preventDefault

  formTitle.textContent = 'Создание заметки:'
  openForm('', '', '', 'Добавить')
})


formBtn.addEventListener('click', (e) => {
  e.preventDefault(e)


  let validValue = false
  let titleValue = intupTitle.value
  let imgSrc = inputImg.value ? inputImg.value : 'https://funik.ru/wp-content/uploads/2018/10/6db3f15d0a21589aaa1b.jpg'
  let descValue = inputDesc.value
  let newNoteObj

  // валидация формы
  if (titleValue == '') {
    errorForm(errTitle, intupTitle, 'Заголовок не должен быть пустым')
  }
  else if (titleValue.length < 3) {
    errorForm(errTitle, intupTitle, 'Заголовок не должен меньше 3 символов')
  }
  else if (descValue == '') {
    errTitle.textContent = ''
    intupTitle.classList.remove('error')
    errorForm(errDesc, inputDesc, 'Текст заметки не должен быть пустым')
  }
  else if (descValue.length < 12) {
    errorForm(errDesc, inputDesc, 'Текст заметки не должен быть меньше 12 символов ')
  }
  else {
    titleValue = getFirstLetterCapitalized(titleValue)
    validValue = true

    newNoteObj = {
      title: titleValue,
      img: imgSrc,
      desc: descValue,
      important: false,

    }
    clearForm()
  }

  if (validValue && formBtn.textContent === 'Добавить') {
    // добавили новые элементы массива
    notesList.push(newNoteObj)
    // рендер  карточек
    render(notesList)

    //очистить форму
    intupTitle.value = ''
    inputImg.value = ''
    inputDesc.value = ''

    closeForm()

  }
  if (validValue && formBtn.textContent === 'Изменить') {

    notesList[indexCard].title = titleValue
    notesList[indexCard].img = imgSrc
    notesList[indexCard].desc = descValue

    render(notesList)
    closeForm()

  }

})

formCloseBtn.addEventListener('click', (e) => {
  e.preventDefault()
  closeForm()
  clearForm()
})

overlay.addEventListener('click', (e) => {

  if (e.target.className === 'notes-box__form-overlay') {
    closeForm()
    clearForm()
  }
})

// 
render(notesList)
// добавление элементов
document.body.append(section)
section.append(container)
container.append(wrapper)
wrapper.append(title, openModalBtn, cardsBox)
wrapper.append(overlay)
overlay.append(form)
form.append(formTitle, intupTitleWrapper, intupImgWrapper, inputDescWrapper, formBtn, formCloseBtn)
intupTitleWrapper.append(errTitle)
inputDescWrapper.append(errDesc)

function startModal(title,) {

}

