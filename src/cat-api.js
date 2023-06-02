export function fetchBreeds() {
  const apiKey =
    'live_PhpAldyqlS2nVA0TDBJc7DONcCIsXARH5RAiOOs04M8Mwl2UYZpJY56gMTWcsOZ4';
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: { 'x-api-key': apiKey },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed');
      }
      return response.json();
    })
    .then(data => {
      return data.map(breed => ({
        value: breed.id,
        label: breed.name,
      }));
    });
}

export function fetchCatByBreed(breedId) {
  const apiKey =
    'live_PhpAldyqlS2nVA0TDBJc7DONcCIsXARH5RAiOOs04M8Mwl2UYZpJY56gMTWcsOZ4';
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`,
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  ).then(response => {
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return response.json();
  });
}
