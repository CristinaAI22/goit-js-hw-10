import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

new SlimSelect({
  select: '.slim-select',
});

function updateCatInfo(cat) {
  loader.classList.add('hidden');
  catInfo.classList.remove('hidden');
  catInfo.innerHTML = '';
  const image = document.createElement('img');
  image.src = cat[0].url;
  image.alt = 'Cat';
  catInfo.appendChild(image);
  const name = document.createElement('h2');
  name.textContent = cat[0].breeds[0].name;
  catInfo.appendChild(name);
  const description = document.createElement('p');
  description.textContent = cat[0].breeds[0].description;
  catInfo.appendChild(description);
  const temper = document.createElement('p');
  temper.textContent = 'Temper: ' + cat[0].breeds[0].temperament;
  catInfo.appendChild(temper);
}

function showLoader() {
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
  loader.classList.remove('hidden');
  error.classList.add('hidden');
}
function hideLoader() {
  breedSelect.classList.remove('hidden');
  catInfo.classList.remove('hidden');
  loader.classList.add('hidden');
}
function showError() {
  breedSelect.classList.add('hidden');
  catInfo.classList.add('hidden');
  loader.classList.add('hidden');
  error.classList.remove('hidden');
}
showLoader();
fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.value;
      option.textContent = breed.label;
      breedSelect.appendChild(option);
    });
    hideLoader();
  })
  .catch(error => {
    Notiflix.Notify.failure('Failed to fetch breeds:'), error;
    showError();
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(cat => {
      updateCatInfo(cat);
      hideLoader();
    })
    .catch(error => {
      Notiflix.Notify.failure(document.querySelector('.error'), error);
      showError();
    });
});
