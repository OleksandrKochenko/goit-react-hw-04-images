import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { fetchPhotos } from '../services/api';
import Searchbar from './searchbar/searchbar';
import ImageGallery from './image-gallery/gallery';
import Loader from './loader/loader';
import Button from './load-button/load-button';
import './styles.css';

export default function App() {
  const [qValue, setQvalue] = useState('');
  const [photos, setPhotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (qValue === '') {
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      const responce = await fetchPhotos(qValue, 1);
      setPhotos(prevState => {
        return [...prevState, ...responce.hits];
      });
      setIsLoading(false);
      setTotal(responce.totalHits);
      setPage(prevState => {
        return prevState + 1;
      });
      Notiflix.Notify.success(`Succes! ${responce.totalHits} images was found`);
    }
    setTimeout(fetchData);
  }, [qValue]);

  useEffect(() => {
    if (total > 0 && total === photos.length) {
      Notiflix.Notify.info('You have reached the end of search result');
    }
    return;
  }, [total, photos]);

  const formSubmitHandler = quieryValue => {
    if (quieryValue.trim() === '') {
      Notiflix.Notify.warning('Enter a search query');
    } else {
      setPhotos([]);
      setQvalue(quieryValue.trim());
      setPage(1);
    }
  };

  const addPhotos = async () => {
    setIsLoading(true);
    const responce = await fetchPhotos(qValue, page);
    setPhotos(prevState => {
      return [...prevState, ...responce.hits];
    });
    setPage(prevState => {
      return prevState + 1;
    });
    setIsLoading(false);
  };

  return (
    <>
      <Searchbar onSubmit={formSubmitHandler} />
      {photos.length > 0 && <ImageGallery images={photos} />}
      {isLoading && <Loader />}
      {photos.length > 0 && photos.length < total && (
        <Button onClick={addPhotos} />
      )}
    </>
  );
}
