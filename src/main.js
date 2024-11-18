import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const perPage = 15;
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

loadMoreBtn.style.display = 'none';

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  if (query === '') {
    iziToast.error({ title: 'Error', message: 'Enter a valid search term!' });
    return;
  }

  try {
    const data = await fetchImages(query, page, perPage);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'No images found. Try another query.',
      });
      return;
    }

    renderGallery(data.hits);
    lightbox.refresh();
    iziToast.success({
      title: 'Success',
      message: `Found ${totalHits} images!`,
    });

    if (data.totalHits > perPage) {
      loadMoreBtn.style.display = 'block';
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again later.',
    });
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);
    lightbox.refresh();

    if (page * perPage >= totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    smoothScroll();
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Try again later.',
    });
  }
});

function smoothScroll() {
  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
