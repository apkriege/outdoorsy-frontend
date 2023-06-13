import axios from 'axios';
import { Params, Image, ImageHashMap, Trailer } from './types';

export const rentalApiCall = async (params: Params) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://search.outdoorsy.com/rentals`, { params: params })
      .then((response) => {

        const images = createHashMapForImages(response.data.included);
        const trailers = modelTrailers(response.data.data);

        resolve({ trailers, images });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// USED FOR A CAROUSEL OF IMAGES ON THE RENTAL PAGE
const createHashMapForImages = (images: Image[]) => {
  if (!images || images.length === 0) return {};

  const hashMap: ImageHashMap<Image> = images.reduce((acc, image) => {
    return { ...acc, [image.id]: image };
  }, {});

  return hashMap;
};

const modelTrailers = (trailers: Trailer[]) => {
  if (!trailers || trailers.length === 0) return [];

  return trailers.map((trailer: Trailer) => {
    return { ...trailer };
  });
};
