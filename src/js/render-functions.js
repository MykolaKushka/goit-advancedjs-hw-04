import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.getElementById('gallery');

export function renderGallery(images) {
  const markup = images
    .map(
      image => `
    <a href="${image.largeImageURL}" class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}" />
      <div class="image-info">
        <div>Likes <span>${image.likes}</span></div>
        <div>Views <span>${image.views}</span></div>
        <div>Comments <span>${image.comments}</span></div>
        <div>Downloads <span>${image.downloads}</span></div>
      </div>
    </a>
  `
    )
    .join('');

  galleryContainer.innerHTML = markup;

  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}
