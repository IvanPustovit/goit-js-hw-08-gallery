'use scrict'
// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-modal"].
// Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

import gallery from './gallery-items.js'

const galleryJs = document.querySelector('.js-gallery')
const lightbox = document.querySelector('.js-lightbox')
const closeBtn = document.querySelector('[data-action="close-lightbox"]')
const imgLightbox = document.querySelector('.lightbox__image')


//добавление картинок в разметку
function addMarkup(original, preview, description) {
    const link = document.createElement('a')
    const list = document.createElement('li')
    const img = document.createElement('img')
    list.append(link)
    link.append(img)
    list.classList.add('gallery__item')
    link.classList.add('gallery__link')
    img.classList.add('gallery__image')
    link.setAttribute('href', original)
    img.setAttribute('src', preview)
    img.setAttribute('data-source', original)
    img.setAttribute('alt', description)
    return list.outerHTML
}

galleryJs.insertAdjacentHTML('afterbegin', `${gallery.reduce((acc,el)=>addMarkup(el.original,el.preview,el.description)+acc,'')})`)


//модальное окно
function bigImg(e) {
    e.preventDefault()
    if (e.target.nodeName === 'IMG') {
        lightbox.classList.add('is-open');
        imgLightbox.src = e.target.dataset.source;
        imgLightbox.alt = e.target.alt;
    }
}

//кнопка закрытия модального окна
function btnClosed() {
    lightbox.classList.remove('is-open')
    imgLightbox.src = '';
    imgLightbox.alt = '';
}

galleryJs.addEventListener('click', bigImg)
closeBtn.addEventListener('click', btnClosed)