export const renderGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <div class="gallery-item">
          <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="image-info">
            <div><span>Likes</span> ${likes}</div>
            <div><span>Views</span> ${views}</div>
            <div><span>Comments</span> ${comments}</div>
            <div><span>Downloads</span> ${downloads}</div>
          </div>
        </div>
      `
    )
    .join('');
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
};
