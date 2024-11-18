import axios from 'axios';

const apiKey = '11098125-871cfab26b5ca42e81d1a6284';

export async function fetchImages(query) {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data.hits;
  } catch (error) {
    throw new Error('Error during loading images');
  }
}
