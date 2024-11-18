import { fetchImages } from './js/pixabay-api';
import { renderGallery, clearGallery } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const loader = document.getElementById('loader');

form.addEventListener('submit', async event => {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Enter keyword for searching',
    });
    return;
  }

  clearGallery();
  loader.style.display = 'block';

  try {
    const images = await fetchImages(query);
    loader.style.display = 'none';

    if (images.length === 0) {
      iziToast.info({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
      });
      return;
    }

    renderGallery(images);
  } catch (error) {
    loader.style.display = 'none';
    iziToast.error({ title: 'Error', message: error.message });
  }
});
