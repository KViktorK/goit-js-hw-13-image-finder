import PicturesFetchApi from './js/apiService'
import imgMarkUp from './templates/galleryMarkUp'
import './sass/main.scss';

import { success, info } from '../node_modules/@pnotify/core/dist/PNotify'
import '../node_modules/@pnotify/core/dist/PNotify.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'

const refs = {
  form: document.getElementById('search-form'),
  loadBtn: document.querySelector('.load'),
  gallery: document.querySelector('.gallery'),
}

hide()

refs.form.addEventListener('submit', onSubmit)
refs.loadBtn.addEventListener('click', onLoad)

let picturesFetchApi = new PicturesFetchApi()

function onSubmit(e) {
    e.preventDefault(e);
    clearGallery();
    const searchQuery = e.currentTarget.elements.query.value;
    picturesFetchApi.query = searchQuery;
    if (searchQuery.trim() === '') {
    hide()
    return info({
      text: "Oops! You haven't entered anything!",
      delay: 1500,
      closerHover: true,
    });
    }
    
    show()

    picturesFetchApi.resetPage();
    onLoad();

}

function onLoad() {
    picturesFetchApi.fetchApi().then((data) => {
        createGallery(data);
        showNotification();
    });
}



function clearGallery() {
    refs.gallery.innerHTML = '';
}

function createGallery(markUp) {
    refs.gallery.insertAdjacentHTML('beforeend', imgMarkUp(markUp));
}


function hide() {
    refs.loadBtn.classList.add('is-hidden');
}
function show() {
    refs.loadBtn.classList.remove('is-hidden');
}


function showNotification() {
    success({
        text: 'downloaded succesfully',
        delay: 1500,
        closerHover: true, });
}
